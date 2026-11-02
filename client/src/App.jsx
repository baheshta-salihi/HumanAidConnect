
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const API = "http://localhost:5000";

const translations = {
  en: {
    dashboard: "Dashboard",
    beneficiaries: "Beneficiaries",
    requests: "Assistance Requests",
    projects: "Projects",
    distributions: "Distributions",
    reports: "Reports",
    overview: "Humanitarian Overview",
    welcome: "Welcome back",
    subtitle: "Here is what is happening across your humanitarian programs.",
    people: "Registered Beneficiaries",
    pending: "Pending Requests",
    active: "Active Projects",
    distributed: "Completed Distributions",
    recent: "Recent Assistance Requests",
    viewAll: "View all",
    name: "Beneficiary",
    type: "Assistance Type",
    location: "Location",
    status: "Status",
    food: "Food Support",
    education: "Education",
    health: "Healthcare",
    approved: "Approved",
    pendingStatus: "Pending",
    review: "Under Review",
    search: "Search...",
    language: "Language",
    add: "Add Beneficiary",
    total: "Total",
    today: "Updated today",
    tagline: "Connecting Communities with Compassionate Assistance",
    newRequest: "New Request",
    newProject: "New Project",
    records: "Records",
    description: "Manage and monitor humanitarian activities.",
    id: "ID",
    assistance: "Assistance",
    target: "Target",
    date: "Date",
    items: "Items",
    report: "Report",
    period: "Period",
    preparedBy: "Prepared By",
    completed: "Completed",
    inProgress: "In Progress",
    activeStatus: "Active",
    planning: "Planning",
    addNew: "Add New",
    sample: "Records from the system",
    noResults: "No matching records found.",
    workspace: "WORKSPACE",
    purpose: "Assistance with dignity.",
    purposeText: "Connecting vulnerable communities with timely, transparent and accountable humanitarian support.",
    loading: "Loading dashboard...",
    age: "Age",
    gender: "Gender",
    vulnerability: "Vulnerability",
    budget: "Budget",
    startDate: "Start Date",
    endDate: "End Date",
    quantity: "Quantity",
    beneficiaryName: "Beneficiary Name",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    descriptionField: "Description",
    select: "Select",
    male: "Male",
    female: "Female",
    inactive: "Inactive",
    rejected: "Rejected",
    distributedStatus: "Distributed",
    reportTitle: "Humanitarian Assistance Report",
    print: "Print Report",
    totalRequests: "Total Requests",
    totalProjects: "Total Projects",
    totalDistributions: "Total Distributions",
    noDescription: "No description",
    saved: "Record saved successfully.",
    deleted: "Record deleted successfully.",
    confirmDelete: "Are you sure you want to delete this record?",
    required: "Please complete all required fields.",
    serverError: "Could not connect to the server. Please check the backend.",
    formAdd: "Add New Record",
    formEdit: "Edit Record"
  },

  dr: {
    dashboard: "داشبورد",
    beneficiaries: "مستفیدشوندگان",
    requests: "درخواست‌های کمک",
    projects: "پروژه‌ها",
    distributions: "توزیع کمک‌ها",
    reports: "گزارش‌ها",
    overview: "نمای کلی کمک‌های بشردوستانه",
    welcome: "خوش آمدید",
    subtitle: "آخرین وضعیت برنامه‌های بشردوستانه شما.",
    people: "افراد ثبت‌شده",
    pending: "درخواست‌های در انتظار",
    active: "پروژه‌های فعال",
    distributed: "توزیع‌های تکمیل‌شده",
    recent: "آخرین درخواست‌های کمک",
    viewAll: "مشاهده همه",
    name: "مستفیدشونده",
    type: "نوع کمک",
    location: "موقعیت",
    status: "وضعیت",
    food: "کمک غذایی",
    education: "آموزش",
    health: "خدمات صحی",
    approved: "تأیید شده",
    pendingStatus: "در انتظار",
    review: "در حال بررسی",
    search: "جستجو...",
    language: "زبان",
    add: "ثبت مستفیدشونده",
    total: "مجموع",
    today: "به‌روزرسانی امروز",
    tagline: "پیوند جوامع با کمک‌های انسانی",
    newRequest: "درخواست جدید",
    newProject: "پروژه جدید",
    records: "ریکارد",
    description: "مدیریت و نظارت بر فعالیت‌های بشردوستانه.",
    id: "شناسه",
    assistance: "کمک",
    target: "هدف",
    date: "تاریخ",
    items: "اقلام",
    report: "گزارش",
    period: "دوره",
    preparedBy: "تهیه‌کننده",
    completed: "تکمیل شده",
    inProgress: "در حال اجرا",
    activeStatus: "فعال",
    planning: "در حال برنامه‌ریزی",
    addNew: "افزودن جدید",
    sample: "معلومات ثبت‌شده در سیستم",
    noResults: "موردی پیدا نشد.",
    workspace: "بخش کاری",
    purpose: "کمک با حفظ کرامت انسانی.",
    purposeText: "پیوند جوامع آسیب‌پذیر با کمک‌های به‌موقع، شفاف و پاسخگو.",
    loading: "در حال دریافت معلومات داشبورد...",
    age: "سن",
    gender: "جنسیت",
    vulnerability: "وضعیت آسیب‌پذیری",
    budget: "بودجه",
    startDate: "تاریخ آغاز",
    endDate: "تاریخ ختم",
    quantity: "تعداد",
    beneficiaryName: "نام مستفیدشونده",
    actions: "عملیات",
    edit: "ویرایش",
    delete: "حذف",
    save: "ذخیره",
    cancel: "لغو",
    descriptionField: "توضیحات",
    select: "انتخاب",
    male: "مرد",
    female: "زن",
    inactive: "غیرفعال",
    rejected: "ردشده",
    distributedStatus: "توزیع‌شده",
    reportTitle: "گزارش کمک‌های بشردوستانه",
    print: "چاپ گزارش",
    totalRequests: "مجموع درخواست‌ها",
    totalProjects: "مجموع پروژه‌ها",
    totalDistributions: "مجموع توزیع‌ها",
    noDescription: "بدون توضیحات",
    saved: "معلومات موفقانه ذخیره شد.",
    deleted: "معلومات موفقانه حذف شد.",
    confirmDelete: "آیا مطمئن هستید که این معلومات حذف شود؟",
    required: "لطفاً خانه‌های ضروری را تکمیل کنید.",
    serverError: "اتصال به سرور برقرار نشد. فعال بودن Backend را بررسی کنید.",
    formAdd: "افزودن معلومات جدید",
    formEdit: "ویرایش معلومات"
  },

  ps: {
    dashboard: "ډشبورډ",
    beneficiaries: "ګټه اخیستونکي",
    requests: "د مرستې غوښتنې",
    projects: "پروژې",
    distributions: "د مرستو وېش",
    reports: "راپورونه",
    overview: "د بشري مرستو عمومي کتنه",
    welcome: "ښه راغلاست",
    subtitle: "ستاسو د بشري مرستو د پروګرامونو تازه معلومات.",
    people: "ثبت شوي کسان",
    pending: "د انتظار غوښتنې",
    active: "فعالې پروژې",
    distributed: "بشپړ شوي وېشونه",
    recent: "د مرستې وروستۍ غوښتنې",
    viewAll: "ټول وګورئ",
    name: "ګټه اخیستونکی",
    type: "د مرستې ډول",
    location: "ځای",
    status: "حالت",
    food: "خوراکي مرسته",
    education: "زده کړه",
    health: "روغتیايي خدمتونه",
    approved: "تایید شوی",
    pendingStatus: "په انتظار کې",
    review: "تر ارزونې لاندې",
    search: "لټون...",
    language: "ژبه",
    add: "ګټه اخیستونکی ثبت کړئ",
    total: "ټول",
    today: "نن تازه شوی",
    tagline: "ټولنې له بشري مرستو سره نښلوو",
    newRequest: "نوې غوښتنه",
    newProject: "نوې پروژه",
    records: "ریکارډونه",
    description: "د بشري مرستو فعالیتونه اداره او وڅارئ.",
    id: "شمېره",
    assistance: "مرسته",
    target: "هدف",
    date: "نېټه",
    items: "توکي",
    report: "راپور",
    period: "موده",
    preparedBy: "چمتو کوونکی",
    completed: "بشپړ شوی",
    inProgress: "د اجرا په حال کې",
    activeStatus: "فعال",
    planning: "د پلان جوړولو په حال کې",
    addNew: "نوی اضافه کړئ",
    sample: "په سیستم کې ثبت شوي معلومات",
    noResults: "معلومات ونه موندل شول.",
    workspace: "کاري برخه",
    purpose: "د انساني کرامت په ساتلو مرسته.",
    purposeText: "زیانمنو ټولنو ته پر وخت، شفافې او حساب ورکوونکې مرستې رسول.",
    loading: "د ډشبورډ معلومات ترلاسه کېږي...",
    age: "عمر",
    gender: "جنسیت",
    vulnerability: "د زیان‌مننې حالت",
    budget: "بودجه",
    startDate: "د پیل نېټه",
    endDate: "د پای نېټه",
    quantity: "اندازه",
    beneficiaryName: "د ګټه اخیستونکي نوم",
    actions: "کړنې",
    edit: "سمون",
    delete: "ړنګول",
    save: "ثبتول",
    cancel: "لغوه کول",
    descriptionField: "تشریحات",
    select: "وټاکئ",
    male: "نارینه",
    female: "ښځینه",
    inactive: "غیرفعال",
    rejected: "رد شوی",
    distributedStatus: "وېشل شوی",
    reportTitle: "د بشري مرستو راپور",
    print: "راپور چاپ کړئ",
    totalRequests: "ټولې غوښتنې",
    totalProjects: "ټولې پروژې",
    totalDistributions: "ټول وېشونه",
    noDescription: "تشریحات نشته",
    saved: "معلومات په بریالیتوب ثبت شول.",
    deleted: "معلومات په بریالیتوب ړنګ شول.",
    confirmDelete: "ایا ډاډه یاست چې دا معلومات ړنګ کړئ؟",
    required: "مهرباني وکړئ اړین ځایونه بشپړ کړئ.",
    serverError: "له سرور سره اړیکه نشته. د Backend فعالوالی وګورئ.",
    formAdd: "نوي معلومات اضافه کړئ",
    formEdit: "د معلوماتو سمون"
  }
};

const initialRequests = [
  { id: 1, name: "Family A-102", type: "food", location: "Kabul", status: "Pending" },
  { id: 2, name: "Family B-205", type: "education", location: "Nangarhar", status: "Approved" },
  { id: 3, name: "Family C-311", type: "health", location: "Herat", status: "Under Review" },
  { id: 4, name: "Family D-418", type: "food", location: "Kandahar", status: "Approved" }
];

const menu = [
  ["dashboard", "layout-dashboard"],
  ["beneficiaries", "users"],
  ["requests", "clipboard-list"],
  ["projects", "folder-kanban"],
  ["distributions", "hand-heart"],
  ["reports", "chart-no-axes-combined"]
];

const resourceConfig = {
  beneficiaries: {
    fields: [
      { name: "name", label: "name", required: true },
      { name: "age", label: "age", type: "number", required: true },
      { name: "gender", label: "gender", type: "select", options: ["Female", "Male"], required: true },
      { name: "location", label: "location", required: true },
      { name: "vulnerability", label: "vulnerability", required: true },
      { name: "status", label: "status", type: "select", options: ["Pending", "Approved", "Under Review"], required: true }
    ]
  },

  requests: {
    fields: [
      { name: "name", label: "name", required: true },
      { name: "type", label: "type", required: true },
      { name: "location", label: "location", required: true },
      { name: "date", label: "date", type: "date", required: true },
      { name: "status", label: "status", type: "select", options: ["Pending", "Approved", "Rejected", "Completed"], required: true },
      { name: "description", label: "descriptionField", type: "textarea" }
    ]
  },

  projects: {
    fields: [
      { name: "name", label: "name", required: true },
      { name: "location", label: "location", required: true },
      { name: "target", label: "target", type: "number", required: true },
      { name: "budget", label: "budget", type: "number" },
      { name: "status", label: "status", type: "select", options: ["Active", "Completed", "Inactive"], required: true },
      { name: "startDate", label: "startDate", type: "date", required: true },
      { name: "endDate", label: "endDate", type: "date", required: true },
      { name: "description", label: "descriptionField", type: "textarea" }
    ]
  },

  distributions: {
    fields: [
      { name: "location", label: "location", required: true },
      { name: "items", label: "items", required: true },
      { name: "quantity", label: "quantity", type: "number", required: true },
      { name: "beneficiaryName", label: "beneficiaryName" },
      { name: "date", label: "date", type: "date", required: true },
      { name: "status", label: "status", type: "select", options: ["Pending", "Distributed", "Completed"], required: true }
    ]
  }
};

const emptyData = {
  beneficiaries: [],
  requests: [],
  projects: [],
  distributions: []
};

const emptyBeneficiary = {
  name: "",
  age: "",
  gender: "Female",
  location: "",
  vulnerability: "",
  status: "Pending"
};

function App() {
  const [language, setLanguage] = useState("en");
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");

  const [dashboardData, setDashboardData] = useState({
    totalBeneficiaries: 0,
    totalRequests: 0,
    pendingRequests: 0,
    activeProjects: 0,
    totalDistributions: 0,
    completedDistributions: 0
  });

  const [records, setRecords] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({});
  const [notice, setNotice] = useState("");

  const t = translations[language];
  const isRTL = language !== "en";

  const apiRequest = async (url, options = {}) => {
    const response = await fetch(`${API}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  };

  const loadResource = useCallback(async (resource) => {
    const data = await apiRequest(`/api/${resource}`);

    setRecords(previous => ({
      ...previous,
      [resource]: Array.isArray(data[resource]) ? data[resource] : []
    }));
  }, []);

  const loadDashboard = useCallback(async () => {
    const data = await apiRequest("/api/dashboard");
    setDashboardData(previous => ({ ...previous, ...data }));
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);

    try {
      await Promise.all([
        loadDashboard(),
        ...Object.keys(resourceConfig).map(resource => loadResource(resource))
      ]);

      setApiError(false);
    } catch (error) {
      console.error("Loading error:", error);
      setApiError(true);
      setNotice(translations[language].serverError);
    } finally {
      setLoading(false);
    }
  }, [loadDashboard, loadResource, language]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const openAddForm = () => {
    setEditingRecord(null);

    if (activePage === "beneficiaries") {
      setFormData({ ...emptyBeneficiary });
    } else {
      setFormData({});
    }

    setShowForm(true);
  };

  const openEditForm = (record) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingRecord(null);
    setFormData({});
  };

  const handleFieldChange = (field, value) => {
    setFormData(previous => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const config = resourceConfig[activePage];
    if (!config) return;

    const missing = config.fields.some(field =>
      field.required && !String(formData[field.name] ?? "").trim()
    );

    if (missing) {
      setNotice(t.required);
      return;
    }

    const payload = { ...formData };

    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;

    if (payload.age !== undefined) payload.age = Number(payload.age);
    if (payload.target !== undefined) payload.target = Number(payload.target);
    if (payload.budget !== undefined && payload.budget !== "") {
      payload.budget = Number(payload.budget);
    }
    if (payload.quantity !== undefined) {
      payload.quantity = Number(payload.quantity);
    }

    try {
      const isEditing = Boolean(editingRecord?.id);
      const endpoint = isEditing
        ? `/api/${activePage}/${editingRecord.id}`
        : `/api/${activePage}`;

      const result = await apiRequest(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });

      await Promise.all([
        loadResource(activePage),
        loadDashboard()
      ]);

      closeForm();
      setNotice(result.message || t.saved);
    } catch (error) {
      console.error(error);
      setNotice(error.message || t.serverError);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t.confirmDelete)) return;

    try {
      const result = await apiRequest(`/api/${activePage}/${id}`, {
        method: "DELETE"
      });

      await Promise.all([
        loadResource(activePage),
        loadDashboard()
      ]);

      setNotice(result.message || t.deleted);
    } catch (error) {
      console.error(error);
      setNotice(error.message || t.serverError);
    }
  };

  const changePage = (page) => {
    setActivePage(page);
    setSearch("");
    setShowForm(false);
    setEditingRecord(null);
  };

  const getStatusClass = (value) => {
    const status = String(value || "").toLowerCase();

    if (status.includes("pending")) return "pending";
    if (status.includes("review")) return "review";
    if (status.includes("reject")) return "pending";
    if (status.includes("active") || status.includes("approved")) return "approved";
    if (status.includes("complete") || status.includes("distribut")) return "approved";

    return "review";
  };

  const getStatusLabel = (value) => {
    const status = String(value || "");
    const key = status.toLowerCase();

    if (key === "pending") return t.pendingStatus;
    if (key === "approved") return t.approved;
    if (key === "under review") return t.review;
    if (key === "active") return t.activeStatus;
    if (key === "inactive") return t.inactive;
    if (key === "completed") return t.completed;
    if (key === "distributed") return t.distributedStatus;
    if (key === "rejected") return t.rejected;

    return status;
  };

  const stats = [
    {
      title: t.people,
      value: Number(dashboardData.totalBeneficiaries ?? records.beneficiaries.length).toLocaleString(),
      change: t.today,
      icon: "♙",
      color: "teal"
    },
    {
      title: t.pending,
      value: Number(
        dashboardData.pendingRequests ??
        records.requests.filter(item => item.status === "Pending").length
      ).toLocaleString(),
      change: `${dashboardData.totalRequests ?? records.requests.length} ${t.total}`,
      icon: "◷",
      color: "orange"
    },
    {
      title: t.active,
      value: Number(
        dashboardData.activeProjects ??
        records.projects.filter(item => item.status === "Active").length
      ).toLocaleString(),
      change: `${records.projects.length} ${t.total}`,
      icon: "▤",
      color: "sand"
    },
    {
      title: t.distributed,
      value: Number(
        dashboardData.completedDistributions ??
        records.distributions.filter(item =>
          ["Completed", "Distributed"].includes(item.status)
        ).length
      ).toLocaleString(),
      change: `${dashboardData.totalDistributions ?? records.distributions.length} ${t.total}`,
      icon: "♡",
      color: "rose"
    }
  ];

  const recentRequests = records.requests.length
    ? [...records.requests]
        .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
        .slice(0, 5)
    : initialRequests;

  const filterRecords = (items) => {
    const term = search.toLowerCase().trim();
    if (!term) return items;

    return items.filter(item =>
      Object.values(item).some(value =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  };

  const renderBeneficiaryForm = () => (
    <div className="module-card" style={{ marginBottom: 24 }}>
      <h2>{editingRecord ? t.formEdit : t.add}</h2>

      <form onSubmit={handleSave}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 20
        }}>
          {resourceConfig.beneficiaries.fields.map(field => (
            <label key={field.name}>
              {t[field.label] || field.label}
              {field.required ? " *" : ""}

              {field.type === "select" ? (
                <select
                  value={formData[field.name] ?? ""}
                  required={field.required}
                  onChange={event => handleFieldChange(field.name, event.target.value)}
                >
                  {field.options.map(option => (
                    <option key={option} value={option}>
                      {t[option.toLowerCase()] || option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  min={field.type === "number" ? "0" : undefined}
                  required={field.required}
                  value={formData[field.name] ?? ""}
                  onChange={event => handleFieldChange(field.name, event.target.value)}
                />
              )}
            </label>
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: 12,
          marginTop: 22,
          flexWrap: "wrap"
        }}>
          <button className="btn-primary" type="submit">{t.save}</button>
          <button className="btn-secondary" type="button" onClick={closeForm}>
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );

  const renderGenericForm = () => {
    const config = resourceConfig[activePage];
    if (!config) return null;

    return (
      <div className="module-card" style={{ marginBottom: 24 }}>
        <h2>{editingRecord ? t.formEdit : t.formAdd}</h2>

        <form onSubmit={handleSave}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 20
          }}>
            {config.fields.map(field => (
              <label
                key={field.name}
                style={field.type === "textarea" ? { gridColumn: "1 / -1" } : {}}
              >
                {t[field.label] || field.label}
                {field.required ? " *" : ""}

                {field.type === "select" ? (
                  <select
                    required={field.required}
                    value={formData[field.name] ?? ""}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                  >
                    <option value="">{t.select}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {t[option.toLowerCase()] || option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    rows="3"
                    value={formData[field.name] ?? ""}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    min={field.type === "number" ? "0" : undefined}
                    required={field.required}
                    value={formData[field.name] ?? ""}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                  />
                )}
              </label>
            ))}
          </div>

          <div style={{
            display: "flex",
            gap: 12,
            marginTop: 22,
            flexWrap: "wrap"
          }}>
            <button className="btn-primary" type="submit">{t.save}</button>
            <button className="btn-secondary" type="button" onClick={closeForm}>
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderBeneficiariesTable = () => {
    const people = filterRecords(records.beneficiaries);

    return (
      <div className="module-card">
        <div className="section-heading">
          <div>
            <h2>{t.beneficiaries}</h2>
            <p>{t.sample}</p>
          </div>
          <span className="period-label">{people.length} {t.records}</span>
        </div>

        {loading ? (
          <p>{t.loading}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.id}</th>
                  <th>{t.name}</th>
                  <th>{t.age}</th>
                  <th>{t.gender}</th>
                  <th>{t.location}</th>
                  <th>{t.vulnerability}</th>
                  <th>{t.status}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr key={person.id}>
                    <td>{String(person.id).slice(0, 8)}</td>
                    <td><strong>{person.name}</strong></td>
                    <td>{person.age}</td>
                    <td>{t[String(person.gender).toLowerCase()] || person.gender}</td>
                    <td>{person.location}</td>
                    <td>{person.vulnerability}</td>
                    <td>
                      <span className={`status ${getStatusClass(person.status)}`}>
                        {getStatusLabel(person.status)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          className="btn-secondary"
                          type="button"
                          onClick={() => openEditForm(person)}
                        >
                          {t.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(person.id)}
                          style={{
                            border: "1px solid #d77b52",
                            color: "#b84f32",
                            background: "#fff",
                            borderRadius: 8,
                            padding: "8px 12px",
                            cursor: "pointer"
                          }}
                        >
                          {t.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {people.length === 0 && (
                  <tr>
                    <td colSpan="8">{t.noResults}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderResourceTable = () => {
    const data = filterRecords(records[activePage] || []);

    const columns = {
      requests: [
        ["name", t.name],
        ["type", t.type],
        ["location", t.location],
        ["date", t.date],
        ["status", t.status]
      ],
      projects: [
        ["name", t.name],
        ["location", t.location],
        ["target", t.target],
        ["budget", t.budget],
        ["status", t.status],
        ["startDate", t.startDate],
        ["endDate", t.endDate]
      ],
      distributions: [
        ["location", t.location],
        ["items", t.items],
        ["quantity", t.quantity],
        ["beneficiaryName", t.beneficiaryName],
        ["date", t.date],
        ["status", t.status]
      ]
    };

    const fields = columns[activePage] || [];

    return (
      <div className="module-card">
        <div className="section-heading">
          <div>
            <h2>{t[activePage]}</h2>
            <p>{t.sample}</p>
          </div>
          <span className="period-label">{data.length} {t.records}</span>
        </div>

        {loading ? (
          <p>{t.loading}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.id}</th>
                  {fields.map(([key, label]) => <th key={key}>{label}</th>)}
                  <th>{t.actions}</th>
                </tr>
              </thead>

              <tbody>
                {data.map(record => (
                  <tr key={record.id}>
                    <td>{String(record.id).slice(0, 8)}</td>

                    {fields.map(([key]) => (
                      <td key={key}>
                        {key === "status" ? (
                          <span className={`status ${getStatusClass(record[key])}`}>
                            {getStatusLabel(record[key])}
                          </span>
                        ) : (
                          record[key] ?? "—"
                        )}
                      </td>
                    ))}

                    <td>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          className="btn-secondary"
                          type="button"
                          onClick={() => openEditForm(record)}
                        >
                          {t.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(record.id)}
                          style={{
                            border: "1px solid #d77b52",
                            color: "#b84f32",
                            background: "#fff",
                            borderRadius: 8,
                            padding: "8px 12px",
                            cursor: "pointer"
                          }}
                        >
                          {t.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan={fields.length + 2}>{t.noResults}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderReports = () => {
    const reportStats = [
      [t.people, records.beneficiaries.length],
      [t.totalRequests, records.requests.length],
      [t.totalProjects, records.projects.length],
      [t.totalDistributions, records.distributions.length],
      [t.pending, records.requests.filter(item => item.status === "Pending").length],
      [t.active, records.projects.filter(item => item.status === "Active").length]
    ];

    return (
      <section className="module-page">
        <div className="module-header">
          <div>
            <span className="eyebrow">HUMANAID CONNECT / REPORTS</span>
            <h1>{t.reportTitle}</h1>
            <p>{t.description}</p>
          </div>

          <button className="btn-primary" onClick={() => window.print()}>
            {t.print}
          </button>
        </div>

        <div className="stats-grid">
          {reportStats.map(([label, value]) => (
            <article className="stat-card" key={label}>
              <p>{label}</p>
              <h2>{value}</h2>
            </article>
          ))}
        </div>

        <div className="module-card">
          <h2>{t.overview}</h2>
          <p>{t.people}: {records.beneficiaries.length}</p>
          <p>{t.totalRequests}: {records.requests.length}</p>
          <p>{t.totalProjects}: {records.projects.length}</p>
          <p>{t.totalDistributions}: {records.distributions.length}</p>
          <p>{t.pending}: {records.requests.filter(item => item.status === "Pending").length}</p>
          <p>{t.active}: {records.projects.filter(item => item.status === "Active").length}</p>
        </div>
      </section>
    );
  };

  const renderModulePage = () => {
    const isBeneficiaries = activePage === "beneficiaries";

    return (
      <section className="module-page">
        <div className="module-header">
          <div>
            <span className="eyebrow">HUMANAID CONNECT / MANAGEMENT</span>
            <h1>{t[activePage]}</h1>
            <p>{t.description}</p>
          </div>

          <button className="btn-primary" onClick={openAddForm}>
            + {isBeneficiaries ? t.add : t.addNew}
          </button>
        </div>

        {showForm && (
          isBeneficiaries ? renderBeneficiaryForm() : renderGenericForm()
        )}

        <div className="toolbar" style={{ marginBottom: 18 }}>
          <input
            className="search-input"
            type="search"
            placeholder={t.search}
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>

        {isBeneficiaries
          ? renderBeneficiariesTable()
          : renderResourceTable()}
      </section>
    );
  };

  return (
    <div
      className={`app ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-symbol">H+</div>
          <div>
            <h2>HumanAid</h2>
            <span>CONNECT</span>
          </div>
        </div>

        <div className="nav-label">{t.workspace}</div>

        <nav>
          {menu.map(([key, icon]) => (
            <button
              key={key}
              className={`nav-item ${activePage === key ? "selected" : ""}`}
              onClick={() => changePage(key)}
            >
              <span className="nav-icon">
                {icon === "layout-dashboard" ? "▦" :
                 icon === "users" ? "♙" :
                 icon === "clipboard-list" ? "☷" :
                 icon === "folder-kanban" ? "▤" :
                 icon === "hand-heart" ? "♡" : "▥"}
              </span>

              {t[key]}

              {key === "requests" && (
                <span className="nav-count">
                  {records.requests.filter(item => item.status === "Pending").length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">♡</div>
            <strong>Making a difference</strong>
            <p>Every action brings hope to a community.</p>
          </div>

          <div className="user-profile">
            <div className="avatar">HA</div>
            <div>
              <strong>Admin User</strong>
              <span>Program Manager</span>
            </div>
            <span className="profile-more">···</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>HumanAid Connect</span>
            <span>/</span>
            <strong>{t[activePage]}</strong>
          </div>

          <div className="top-actions">
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={t.search}
              />
            </div>

            <select
              value={language}
              onChange={event => setLanguage(event.target.value)}
              aria-label={t.language}
            >
              <option value="en">EN | English</option>
              <option value="dr">دری | دری</option>
              <option value="ps">PS | پښتو</option>
            </select>

            <button className="notification" type="button">♧</button>
          </div>
        </header>

        <section className="page-content">
          {notice && (
            <div
              className="notice-message"
              role="status"
              style={{ marginBottom: 16 }}
            >
              {notice}
            </div>
          )}

          {activePage === "dashboard" ? (
            <>
              <div className="welcome-row">
                <div>
                  <div className="eyebrow">
                    HUMANITARIAN MANAGEMENT PLATFORM
                  </div>
                  <h1>{t.overview}</h1>
                  <p>{t.subtitle}</p>
                </div>

                <div className="welcome-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => changePage("projects")}
                  >
                    + {t.newProject}
                  </button>

                  <button
                    className="btn-primary"
                    onClick={() => changePage("requests")}
                  >
                    + {t.newRequest}
                  </button>
                </div>
              </div>

              <div className="hero-banner">
                <div>
                  <span className="hero-kicker">HUMANITY IN ACTION</span>
                  <h2>{t.welcome}!</h2>
                  <p>{t.tagline}</p>
                </div>

                <div className="hero-art" aria-hidden="true">
                  <span className="hero-circle circle-one"></span>
                  <span className="hero-circle circle-two"></span>
                  <span className="hero-heart">♡</span>
                </div>
              </div>

              <div className="section-heading">
                <div>
                  <h2>Impact at a glance</h2>
                  <p>{loading ? t.loading : t.today}</p>
                  {apiError && (
                    <small style={{ color: "#b84f32" }}>
                      {t.serverError}
                    </small>
                  )}
                </div>

                <span className="period-label">● Live overview</span>
              </div>

              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <article className="stat-card" key={index}>
                    <div className="stat-top">
                      <span className={`stat-icon ${stat.color}`}>
                        {stat.icon}
                      </span>
                      <span className="stat-change">{stat.change}</span>
                    </div>
                    <p>{stat.title}</p>
                    <h2>{stat.value}</h2>
                  </article>
                ))}
              </div>

              <div className="content-grid">
                <section className="panel requests-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>{t.recent}</h2>
                      <p>Review and monitor incoming support needs</p>
                    </div>

                    <button
                      className="text-button"
                      onClick={() => changePage("requests")}
                    >
                      {t.viewAll} →
                    </button>
                  </div>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>{t.name}</th>
                          <th>{t.type}</th>
                          <th>{t.location}</th>
                          <th>{t.status}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentRequests.map(item => (
                          <tr key={item.id}>
                            <td><strong>{item.name}</strong></td>
                            <td>
                              {t[String(item.type || "").toLowerCase()] || item.type}
                            </td>
                            <td>{item.location}</td>
                            <td>
                              <span className={`status ${getStatusClass(item.status)}`}>
                                {getStatusLabel(item.status)}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {recentRequests.length === 0 && (
                          <tr>
                            <td colSpan="4">{t.noResults}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="panel mission-panel">
                  <div className="mission-mark">♡</div>
                  <span className="eyebrow">OUR PURPOSE</span>
                  <h2>{t.purpose}</h2>
                  <p>{t.purposeText}</p>
                  <div className="mission-line">
                    <span>PEOPLE FIRST</span>
                    <span>•</span>
                    <span>IMPACT ALWAYS</span>
                  </div>
                </section>
              </div>
            </>
          ) : activePage === "reports" ? (
            renderReports()
          ) : (
            renderModulePage()
          )}

          <footer>
            <span>© 2026 HumanAid Connect</span>
            <span>Compassion • Dignity • Accountability</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
