
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const API = "https://humanaid-connect-api.onrender.com";

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
    distributed: "Aid Distributions",
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
    sample: "Sample records for demonstration",
    noResults: "No matching records found.",
    workspace: "WORKSPACE",
    purpose: "Assistance with dignity.",
    purposeText: "Connecting vulnerable communities with timely, transparent and accountable humanitarian support.",
    loading: "Loading dashboard..."
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
    distributed: "توزیع کمک‌ها",
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
    sample: "اطلاعات نمونه برای نمایش",
    noResults: "موردی پیدا نشد.",
    workspace: "بخش کاری",
    purpose: "کمک با حفظ کرامت انسانی.",
    purposeText: "پیوند جوامع آسیب‌پذیر با کمک‌های به‌موقع، شفاف و پاسخگو.",
    loading: "در حال دریافت معلومات داشبورد..."
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
    distributed: "وېشل شوې مرستې",
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
    sample: "د ښودلو لپاره نمونوي معلومات",
    noResults: "معلومات ونه موندل شول.",
    workspace: "کاري برخه",
    purpose: "د انساني کرامت په ساتلو مرسته.",
    purposeText: "زیانمنو ټولنو ته پر وخت، شفافې او حساب ورکوونکې مرستې رسول.",
    loading: "د ډشبورډ معلومات ترلاسه کېږي..."
  }
};

const initialRequests = [
  { id: 1, name: "Family A-102", type: "food", location: "Kabul", status: "pendingStatus" },
  { id: 2, name: "Family B-205", type: "education", location: "Nangarhar", status: "approved" },
  { id: 3, name: "Family C-311", type: "health", location: "Herat", status: "review" },
  { id: 4, name: "Family D-418", type: "food", location: "Kandahar", status: "approved" }
];

const menu = [
  ["dashboard", "layout-dashboard"],
  ["beneficiaries", "users"],
  ["requests", "clipboard-list"],
  ["projects", "folder-kanban"],
  ["distributions", "hand-heart"],
  ["reports", "chart-no-axes-combined"]
];

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    totalBeneficiaries: 120,
    totalRequests: 85,
    activeProjects: 6,
    totalDistributions: 250
  });

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiaryLoading, setBeneficiaryLoading] = useState(false);
  const [beneficiaryError, setBeneficiaryError] = useState("");

  const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [beneficiaryForm, setBeneficiaryForm] = useState(emptyBeneficiary);

  const t = translations[language];
  const isRTL = language !== "en";

  // Load dashboard data
  useEffect(() => {
    fetch(`${API}/api/dashboard`)
      .then(response => {
        if (!response.ok) throw new Error("Dashboard request failed");
        return response.json();
      })
      .then(data => {
        setDashboardData(data);
        setApiError(false);
      })
      .catch(error => {
        console.error("Dashboard API Error:", error);
        setApiError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // Load beneficiaries from backend
  const loadBeneficiaries = useCallback(async () => {
    setBeneficiaryLoading(true);
    setBeneficiaryError("");

    try {
      const response = await fetch(
        `${API}/api/beneficiaries?search=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error("Could not load beneficiaries");
      }

      const data = await response.json();
      setBeneficiaries(data.beneficiaries || []);
    } catch (error) {
      console.error("Beneficiary API Error:", error);
      setBeneficiaryError(
        "Could not connect to the beneficiaries API. Please check the backend server."
      );
    } finally {
      setBeneficiaryLoading(false);
    }
  }, [search]);

  useEffect(() => {
    if (activePage === "beneficiaries") {
      loadBeneficiaries();
    }
  }, [activePage, loadBeneficiaries]);

  // Add or update beneficiary
  const handleBeneficiarySubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...beneficiaryForm,
      age: Number(beneficiaryForm.age)
    };

    const url = editingBeneficiary
      ? `${API}/api/beneficiaries/${editingBeneficiary.id}`
      : `${API}/api/beneficiaries`;

    try {
      const response = await fetch(url, {
        method: editingBeneficiary ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setShowBeneficiaryForm(false);
      setEditingBeneficiary(null);
      setBeneficiaryForm(emptyBeneficiary);

      await loadBeneficiaries();
      window.alert(data.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  // Open edit form
  const handleEditBeneficiary = (person) => {
    setEditingBeneficiary(person);
    setBeneficiaryForm({
      name: person.name,
      age: String(person.age),
      gender: person.gender,
      location: person.location,
      vulnerability: person.vulnerability,
      status: person.status
    });
    setShowBeneficiaryForm(true);
  };

  // Delete beneficiary
  const handleDeleteBeneficiary = async (id) => {
    if (!window.confirm("Are you sure you want to delete this beneficiary?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/beneficiaries/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      await loadBeneficiaries();
      window.alert(data.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const stats = [
    {
      title: t.people,
      value: dashboardData.totalBeneficiaries.toLocaleString(),
      change: "+12.8%",
      icon: "♙",
      color: "teal"
    },
    {
      title: t.pending,
      value: dashboardData.totalRequests.toLocaleString(),
      change: "24 new",
      icon: "◷",
      color: "orange"
    },
    {
      title: t.active,
      value: dashboardData.activeProjects.toLocaleString(),
      change: "Across 5 provinces",
      icon: "▤",
      color: "sand"
    },
    {
      title: t.distributed,
      value: dashboardData.totalDistributions.toLocaleString(),
      change: "This month",
      icon: "♡",
      color: "rose"
    }
  ];

  const requests = initialRequests.filter(item =>
    `${item.name} ${item.location} ${item.type} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const moduleData = {
    beneficiaries: {
      title: t.beneficiaries,
      columns: [t.id, t.name, t.location, t.assistance, t.status],
      rows: []
    },

    requests: {
      title: t.requests,
      columns: [t.id, t.name, t.type, t.location, t.status],
      rows: [
        ["R-001", "Family A-102", t.food, "Kabul", t.pendingStatus],
        ["R-002", "Family B-205", t.education, "Nangarhar", t.approved],
        ["R-003", "Family C-311", t.health, "Herat", t.review],
        ["R-004", "Family D-418", t.food, "Kandahar", t.approved]
      ]
    },

    projects: {
      title: t.projects,
      columns: [t.id, t.name, t.location, t.target, t.status],
      rows: [
        ["P-001", "Food Support", "Kabul", "100 Families", t.activeStatus],
        ["P-002", "Education Support", "Nangarhar", "60 Children", t.activeStatus],
        ["P-003", "Health Assistance", "Herat", "80 Families", t.planning]
      ]
    },

    distributions: {
      title: t.distributions,
      columns: [t.id, t.location, t.items, t.date],
      rows: [
        ["D-001", "Kabul", "Food Packages", "2026-10-20"],
        ["D-002", "Nangarhar", "School Kits", "2026-10-22"],
        ["D-003", "Herat", "Medical Kits", "2026-10-25"],
        ["D-004", "Kandahar", "Food Packages", "2026-10-28"]
      ]
    },

    reports: {
      title: t.reports,
      columns: [t.report, t.period, t.preparedBy, t.status],
      rows: [
        ["Monthly Activity", "October 2026", "Admin", t.completed],
        ["Distribution Summary", "October 2026", "Program Team", t.completed],
        ["Project Progress", "2026", "Admin", t.inProgress]
      ]
    }
  };

  const currentModule = moduleData[activePage];

  const filteredRows = currentModule?.rows.filter(row =>
    row.join(" ").toLowerCase().includes(search.toLowerCase())
  ) || [];

  const getStatusClass = (value) => {
    const status = String(value).toLowerCase();

    if (
      status.includes("pending") ||
      status.includes("انتظار") ||
      status.includes("کې انتظار")
    ) return "pending";

    if (
      status.includes("review") ||
      status.includes("بررسی") ||
      status.includes("ارزونې")
    ) return "review";

    if (
      status.includes("active") ||
      status.includes("approved") ||
      status.includes("تأیید") ||
      status.includes("فعال")
    ) return "approved";

    return "approved";
  };

  const renderBeneficiaryForm = () => (
    <div className="module-card" style={{ marginBottom: 24 }}>
      <h2>
        {editingBeneficiary ? "Edit Beneficiary" : "Register New Beneficiary"}
      </h2>

      <form onSubmit={handleBeneficiarySubmit}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 20
        }}>
          <label>
            Full Name *
            <input
              required
              value={beneficiaryForm.name}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                name: event.target.value
              })}
              placeholder="Enter full name"
            />
          </label>

          <label>
            Age *
            <input
              required
              type="number"
              min="0"
              value={beneficiaryForm.age}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                age: event.target.value
              })}
              placeholder="Enter age"
            />
          </label>

          <label>
            Gender *
            <select
              value={beneficiaryForm.gender}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                gender: event.target.value
              })}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Location *
            <input
              required
              value={beneficiaryForm.location}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                location: event.target.value
              })}
              placeholder="Enter city or province"
            />
          </label>

          <label>
            Vulnerability *
            <input
              required
              value={beneficiaryForm.vulnerability}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                vulnerability: event.target.value
              })}
              placeholder="e.g. Low Income"
            />
          </label>

          <label>
            Status *
            <select
              value={beneficiaryForm.status}
              onChange={event => setBeneficiaryForm({
                ...beneficiaryForm,
                status: event.target.value
              })}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
            </select>
          </label>
        </div>

        <div style={{
          display: "flex",
          gap: 12,
          marginTop: 22,
          flexWrap: "wrap"
        }}>
          <button className="btn-primary" type="submit">
            {editingBeneficiary ? "Save Changes" : "Register Beneficiary"}
          </button>

          <button
            className="btn-secondary"
            type="button"
            onClick={() => {
              setShowBeneficiaryForm(false);
              setEditingBeneficiary(null);
              setBeneficiaryForm(emptyBeneficiary);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const renderModulePage = () => (
    <section className="module-page">
      <div className="module-header">
        <div>
          <span className="eyebrow">HUMANAID CONNECT / MANAGEMENT</span>
          <h1>{currentModule.title}</h1>
          <p>{t.description}</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            if (activePage === "beneficiaries") {
              setEditingBeneficiary(null);
              setBeneficiaryForm(emptyBeneficiary);
              setShowBeneficiaryForm(true);
            } else {
              window.alert("This function will be connected in the next development stage.");
            }
          }}
        >
          + {activePage === "beneficiaries" ? t.add : t.addNew}
        </button>
      </div>

      {activePage === "beneficiaries" ? (
        <>
          {showBeneficiaryForm && renderBeneficiaryForm()}

          <div className="module-card">
            <div className="section-heading">
              <div>
                <h2>{t.beneficiaries}</h2>
                <p>Live records from the backend API</p>
              </div>

              <span className="period-label">
                {beneficiaries.length} {t.records}
              </span>
            </div>

            {beneficiaryLoading && <p>Loading beneficiaries...</p>}

            {beneficiaryError && (
              <p style={{ color: "red" }}>{beneficiaryError}</p>
            )}

            {!beneficiaryLoading && !beneficiaryError && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Location</th>
                      <th>Vulnerability</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {beneficiaries.map(person => (
                      <tr key={person.id}>
                        <td>{person.id.slice(0, 8)}</td>
                        <td><strong>{person.name}</strong></td>
                        <td>{person.age}</td>
                        <td>{person.gender}</td>
                        <td>{person.location}</td>
                        <td>{person.vulnerability}</td>
                        <td>
                          <span className={`status ${getStatusClass(person.status)}`}>
                            {person.status}
                          </span>
                        </td>
                        <td>
                          <div style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap"
                          }}>
                            <button
                              className="btn-secondary"
                              type="button"
                              onClick={() => handleEditBeneficiary(person)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteBeneficiary(person.id)}
                              style={{
                                border: "1px solid #d77b52",
                                color: "#b84f32",
                                background: "#fff",
                                borderRadius: 8,
                                padding: "8px 12px",
                                cursor: "pointer"
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {beneficiaries.length === 0 && (
                      <tr>
                        <td colSpan="8">{t.noResults}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="module-card">
          <div className="section-heading">
            <div>
              <h2>{currentModule.title}</h2>
              <p>{t.sample}</p>
            </div>

            <span className="period-label">
              {filteredRows.length} {t.records}
            </span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {currentModule.columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        {cellIndex === row.length - 1 &&
                         activePage !== "distributions" ? (
                          <span className={`status ${getStatusClass(cell)}`}>
                            {cell}
                          </span>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}

                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={currentModule.columns.length}>
                      {t.noResults}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );

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
              onClick={() => {
                setActivePage(key);
                setSearch("");
                setShowBeneficiaryForm(false);
                setEditingBeneficiary(null);
              }}
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
                <span className="nav-count">8</span>
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

          <div
  className="user-profile"
  onClick={() => setShowProfileMenu(!showProfileMenu)}
  style={{ cursor: "pointer", position: "relative" }}
>
  <div className="avatar">HA</div>

  <div>
    <strong>Admin User</strong>
    <span>Program Manager</span>
  </div>

  <span className="profile-more">···</span>

  {showProfileMenu && (
    <div
      style={{
        position: "absolute",
        bottom: "65px",
        left: "0",
        width: "220px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
        zIndex: 1000,
        color: "#333"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <strong>Admin User</strong>

      <div style={{ marginTop: "12px", fontSize: "13px", lineHeight: "2" }}>
       <div>Role: Program Manager</div>
       <div>System: HumanAid Connect</div>
       <div>Account Status: Active</div>
       </div>

      <button
        onClick={() => setShowProfileMenu(false)}
        style={{
          width: "100%",
          padding: "8px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  )}
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

            <button className="notification">♧</button>
          </div>
        </header>

        <section className="page-content">
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
                    onClick={() => setActivePage("projects")}
                  >
                    + {t.newProject}
                  </button>

                  <button
                    className="btn-primary"
                    onClick={() => setActivePage("requests")}
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
                    <small>
                      Showing sample figures because the server could not be reached.
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
                      onClick={() => {
                        setActivePage("requests");
                        setSearch("");
                      }}
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
                        {requests.map(item => (
                          <tr key={item.id}>
                            <td><strong>{item.name}</strong></td>
                            <td>{t[item.type]}</td>
                            <td>{item.location}</td>
                            <td>
                              <span className={`status ${item.status}`}>
                                {t[item.status]}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {requests.length === 0 && (
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
