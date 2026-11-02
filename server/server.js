
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ======================================
// DATA STORAGE
// ======================================

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

const resources = {
  beneficiaries: {
    file: "beneficiaries.json",
    samples: [
      {
        name: "Ahmad Rahimi",
        age: 35,
        gender: "Male",
        location: "Kabul",
        vulnerability: "Low Income",
        status: "Approved"
      },
      {
        name: "Maryam Ahmadi",
        age: 28,
        gender: "Female",
        location: "Kabul",
        vulnerability: "Single Mother",
        status: "Approved"
      },
      {
        name: "Fatima Noori",
        age: 42,
        gender: "Female",
        location: "Nangarhar",
        vulnerability: "Disability",
        status: "Pending"
      }
    ]
  },

  requests: {
    file: "requests.json",
    samples: [
      {
        name: "Family A-102",
        type: "Food Support",
        location: "Kabul",
        status: "Pending",
        date: "2026-10-20",
        description: "Request for food assistance"
      },
      {
        name: "Family B-205",
        type: "Education",
        location: "Nangarhar",
        status: "Approved",
        date: "2026-10-22",
        description: "School supplies assistance"
      },
      {
        name: "Family C-311",
        type: "Healthcare",
        location: "Herat",
        status: "Under Review",
        date: "2026-10-25",
        description: "Medical assistance request"
      }
    ]
  },

  projects: {
    file: "projects.json",
    samples: [
      {
        name: "Food Support Program",
        location: "Kabul",
        target: "100 Families",
        budget: 15000,
        status: "Active",
        startDate: "2026-10-01",
        endDate: "2027-03-01",
        description: "Food assistance for vulnerable families"
      },
      {
        name: "Education Support",
        location: "Nangarhar",
        target: "60 Children",
        budget: 10000,
        status: "Active",
        startDate: "2026-10-10",
        endDate: "2027-04-10",
        description: "Educational support for children"
      },
      {
        name: "Health Assistance",
        location: "Herat",
        target: "80 Families",
        budget: 12000,
        status: "Planning",
        startDate: "2026-11-01",
        endDate: "2027-05-01",
        description: "Healthcare support program"
      }
    ]
  },

  distributions: {
    file: "distributions.json",
    samples: [
      {
        location: "Kabul",
        items: "Food Packages",
        quantity: 100,
        beneficiaryName: "Family A-102",
        date: "2026-10-20",
        status: "Completed"
      },
      {
        location: "Nangarhar",
        items: "School Kits",
        quantity: 60,
        beneficiaryName: "Family B-205",
        date: "2026-10-22",
        status: "Completed"
      },
      {
        location: "Herat",
        items: "Medical Kits",
        quantity: 40,
        beneficiaryName: "Family C-311",
        date: "2026-10-25",
        status: "Pending"
      }
    ]
  }
};

const filePaths = {};

for (const [key, config] of Object.entries(resources)) {
  const filePath = path.join(dataFolder, config.file);
  filePaths[key] = filePath;

  if (!fs.existsSync(filePath)) {
    const initialData = config.samples.map(item => ({
      id: randomUUID(),
      ...item
    }));

    fs.writeFileSync(
      filePath,
      JSON.stringify(initialData, null, 2)
    );
  }
}

// ======================================
// HELPER FUNCTIONS
// ======================================

function readData(resource) {
  return JSON.parse(fs.readFileSync(filePaths[resource], "utf8"));
}

function saveData(resource, data) {
  fs.writeFileSync(
    filePaths[resource],
    JSON.stringify(data, null, 2)
  );
}

function clean(value) {
  return String(value ?? "").trim();
}

function validateRecord(resource, data) {
  const requiredFields = {
    beneficiaries: [
      "name", "age", "gender", "location",
      "vulnerability", "status"
    ],
    requests: [
      "name", "type", "location", "status", "date"
    ],
    projects: [
      "name", "location", "target", "status",
      "startDate", "endDate"
    ],
    distributions: [
      "location", "items", "quantity", "date", "status"
    ]
  };

  for (const field of requiredFields[resource]) {
    if (
      data[field] === undefined ||
      data[field] === null ||
      clean(data[field]) === ""
    ) {
      return `${field} is required`;
    }
  }

  if (resource === "beneficiaries") {
    if (!Number.isFinite(Number(data.age)) || Number(data.age) < 0) {
      return "Age must be a valid non-negative number";
    }
  }

  if (resource === "projects") {
    if (
      data.budget !== undefined &&
      data.budget !== "" &&
      (!Number.isFinite(Number(data.budget)) || Number(data.budget) < 0)
    ) {
      return "Budget must be a valid non-negative number";
    }
  }

  if (resource === "distributions") {
    if (!Number.isFinite(Number(data.quantity)) || Number(data.quantity) < 1) {
      return "Quantity must be at least 1";
    }
  }

  return null;
}

function normalizeRecord(resource, data, existing = {}) {
  const record = {
    ...existing,
    ...data,
    id: existing.id || randomUUID()
  };

  const textFields = {
    beneficiaries: [
      "name", "gender", "location", "vulnerability", "status"
    ],
    requests: [
      "name", "type", "location", "status", "date", "description"
    ],
    projects: [
      "name", "location", "target", "status",
      "startDate", "endDate", "description"
    ],
    distributions: [
      "location", "items", "beneficiaryName", "date", "status"
    ]
  };

  for (const field of textFields[resource]) {
    if (record[field] !== undefined) {
      record[field] = clean(record[field]);
    }
  }

  if (resource === "beneficiaries") {
    record.age = Number(record.age);
  }

  if (resource === "projects") {
    record.budget = Number(record.budget || 0);
  }

  if (resource === "distributions") {
    record.quantity = Number(record.quantity);
  }

  return record;
}

// ======================================
// HOME AND HEALTH CHECK
// ======================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to HumanAid Connect API",
    status: "Server is running successfully"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "Healthy",
    application: "HumanAid Connect"
  });
});

// ======================================
// DASHBOARD STATISTICS
// ======================================

app.get("/api/dashboard", (req, res) => {
  try {
    const beneficiaries = readData("beneficiaries");
    const requests = readData("requests");
    const projects = readData("projects");
    const distributions = readData("distributions");

    res.json({
      totalBeneficiaries: beneficiaries.length,
      totalRequests: requests.length,
      activeProjects: projects.filter(
        item => item.status.toLowerCase() === "active"
      ).length,
      totalDistributions: distributions.length,
      pendingRequests: requests.filter(
        item => item.status.toLowerCase() === "pending"
      ).length,
      completedDistributions: distributions.filter(
        item => item.status.toLowerCase() === "completed"
      ).length
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Could not load dashboard statistics"
    });
  }
});

// ======================================
// REPORTS
// ======================================

app.get("/api/reports", (req, res) => {
  try {
    const beneficiaries = readData("beneficiaries");
    const requests = readData("requests");
    const projects = readData("projects");
    const distributions = readData("distributions");

    res.json({
      success: true,
      summary: {
        beneficiaries: beneficiaries.length,
        requests: requests.length,
        approvedRequests: requests.filter(
          item => item.status.toLowerCase() === "approved"
        ).length,
        pendingRequests: requests.filter(
          item => item.status.toLowerCase() === "pending"
        ).length,
        projects: projects.length,
        activeProjects: projects.filter(
          item => item.status.toLowerCase() === "active"
        ).length,
        distributions: distributions.length,
        completedDistributions: distributions.filter(
          item => item.status.toLowerCase() === "completed"
        ).length
      },
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Reports Error:", error);
    res.status(500).json({
      success: false,
      message: "Could not generate reports"
    });
  }
});

// ======================================
// GENERIC CRUD API
// ======================================

function registerResourceRoutes(resource) {

  // GET all records + search
  app.get(`/api/${resource}`, (req, res) => {
    try {
      const search = clean(req.query.search).toLowerCase();
      const records = readData(resource);

      const filtered = records.filter(record =>
        Object.values(record).some(value =>
          String(value).toLowerCase().includes(search)
        )
      );

      res.json({
        success: true,
        total: filtered.length,
        [resource]: filtered
      });
    } catch (error) {
      console.error(`GET ${resource} Error:`, error);
      res.status(500).json({
        success: false,
        message: `Could not load ${resource}`
      });
    }
  });

  // GET one record
  app.get(`/api/${resource}/:id`, (req, res) => {
    try {
      const records = readData(resource);
      const record = records.find(item => item.id === req.params.id);

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "Record not found"
        });
      }

      res.json({
        success: true,
        [resource.slice(0, -1)]: record
      });
    } catch (error) {
      console.error(`GET single ${resource} Error:`, error);
      res.status(500).json({
        success: false,
        message: "Could not load record"
      });
    }
  });

  // CREATE
  app.post(`/api/${resource}`, (req, res) => {
    try {
      const validationError = validateRecord(resource, req.body);

      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      const records = readData(resource);
      const newRecord = normalizeRecord(resource, req.body);

      records.push(newRecord);
      saveData(resource, records);

      res.status(201).json({
        success: true,
        message: "Record added successfully",
        record: newRecord
      });
    } catch (error) {
      console.error(`POST ${resource} Error:`, error);
      res.status(500).json({
        success: false,
        message: "Could not add record"
      });
    }
  });

  // UPDATE
  app.put(`/api/${resource}/:id`, (req, res) => {
    try {
      const records = readData(resource);
      const index = records.findIndex(
        item => item.id === req.params.id
      );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Record not found"
        });
      }

      const updated = normalizeRecord(
        resource,
        req.body,
        records[index]
      );

      const validationError = validateRecord(resource, updated);

      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      records[index] = updated;
      saveData(resource, records);

      res.json({
        success: true,
        message: "Record updated successfully",
        record: updated
      });
    } catch (error) {
      console.error(`PUT ${resource} Error:`, error);
      res.status(500).json({
        success: false,
        message: "Could not update record"
      });
    }
  });

  // DELETE
  app.delete(`/api/${resource}/:id`, (req, res) => {
    try {
      const records = readData(resource);
      const updated = records.filter(
        item => item.id !== req.params.id
      );

      if (updated.length === records.length) {
        return res.status(404).json({
          success: false,
          message: "Record not found"
        });
      }

      saveData(resource, updated);

      res.json({
        success: true,
        message: "Record deleted successfully"
      });
    } catch (error) {
      console.error(`DELETE ${resource} Error:`, error);
      res.status(500).json({
        success: false,
        message: "Could not delete record"
      });
    }
  });
}

// Register all resource routes
Object.keys(resources).forEach(registerResourceRoutes);

// ======================================
// UNKNOWN ROUTES AND ERROR HANDLING
// ======================================

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {
  console.log(
    `HumanAid Connect server running at http://localhost:${PORT}`
  );
});
