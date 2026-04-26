"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Copy, Check, Upload, X, MessageCircle, AlertCircle, LogOut,
  Home, Send, Calendar, FolderKanban, BookOpen, ChevronRight,
  Play, FileText, HelpCircle, Sparkles, Clock,
  CheckCircle2, Camera, ArrowRight, Eye, EyeOff
} from "lucide-react";

// ─── BRAND ───────────────────────────────────────────────────────────────
const BRAND = {
  purple: "#7C3AED",
  purpleSoft: "#F3EEFF",
  purpleDark: "#5B21B6",
  orange: "#FF5722",
  orangeSoft: "#FFF3EE",
  ink: "#0F0F12",
  text: "#212121",
  muted: "#6B7280",
  border: "#E5E7EB",
  bg: "#FAFAF7",
  surface: "#FFFFFF",
  success: "#16A34A",
  whatsapp: "#25D366",
};

const FONT_STACK = `'Inter', system-ui, -apple-system, sans-serif`;
const SERIF_STACK = `'Instrument Serif', 'Times New Roman', serif`;
const FOUNDER_PHOTO = `data:image/jpeg;base64,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`;

// ─── DEMO DATA ───────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "villa-seminyak", name: "Villa Seminyak", client: "Mr. James", progress: 72, week: 14, phase: "Interior finishes", color: "#FF5722", nextSend: "Friday, May 1 · 5:00 PM", lastSent: "Friday, Apr 24", photoCount: 142 },
  { id: "house-canggu", name: "House Canggu", client: "Ibu Sarah", progress: 45, week: 9, phase: "Roof structure", color: "#7C3AED", nextSend: "Friday, May 1 · 5:00 PM", lastSent: "Friday, Apr 24", photoCount: 87 },
  { id: "office-denpasar", name: "Office Denpasar", client: "Pak Anton", progress: 28, week: 5, phase: "Foundation & framing", color: "#0EA5E9", nextSend: "Friday, May 1 · 5:00 PM", lastSent: "Friday, Apr 24", photoCount: 34 },
];

const ACTIVITY = [
  { id: 1, type: "sent", project: "Villa Seminyak", client: "Mr. James", time: "2 days ago", week: 13 },
  { id: 2, type: "sent", project: "House Canggu", client: "Ibu Sarah", time: "2 days ago", week: 8 },
  { id: 3, type: "sent", project: "Office Denpasar", client: "Pak Anton", time: "2 days ago", week: 4 },
  { id: 4, type: "photos", project: "Villa Seminyak", count: 5, time: "3 days ago" },
  { id: 5, type: "sent", project: "Villa Seminyak", client: "Mr. James", time: "9 days ago", week: 12 },
];

// ─── ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("home");

  useEffect(() => { document.body.style.backgroundColor = BRAND.bg; }, []);

  return (
    <div style={{ fontFamily: FONT_STACK, color: BRAND.text, backgroundColor: BRAND.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        .fade-up { animation: fadeUp 0.5s ease-out both; }
        .fade-in { animation: fadeIn 0.4s ease-out both; }
        .live-dot { animation: pulseSoft 2s ease-in-out infinite; }
      `}</style>

      {!authed
        ? <Login onSuccess={() => setAuthed(true)} />
        : <Shell view={view} setView={setView} onLogout={() => { setAuthed(false); setView("home"); }} />}
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────
function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");

  function submit(e) {
    e?.preventDefault();
    if (!email.trim() || !pw.trim()) {
      setErr("Please enter your email and password");
      return;
    }
    onSuccess();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: BRAND.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(900px 500px at 80% -10%, ${BRAND.purpleSoft} 0%, transparent 60%), radial-gradient(700px 400px at 0% 110%, ${BRAND.orangeSoft} 0%, transparent 60%)`,
      }} />

      <div className="w-full max-w-md relative fade-up">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <PandaMark size={44} />
          <div>
            <div className="font-bold tracking-tight text-xl leading-none" style={{ color: BRAND.ink }}>Lazy Genius</div>
            <div className="text-xs mt-1" style={{ color: BRAND.muted }}>Business Automation</div>
          </div>
        </div>

        <div className="rounded-2xl p-7 sm:p-8 border"
          style={{ backgroundColor: BRAND.surface, borderColor: BRAND.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 20px 40px -10px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontFamily: SERIF_STACK }} className="text-3xl sm:text-[34px] leading-[1.1] mb-1.5">
            Selamat datang, <span style={{ fontStyle: "italic", color: BRAND.purple }}>Pak Budi</span>
          </h1>
          <p className="text-sm mb-6" style={{ color: BRAND.muted }}>
            Sign in to your client communication system.
          </p>

          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoFocus
              className="w-full h-11 px-3.5 rounded-lg border text-[15px] focus:outline-none transition"
              style={{ borderColor: err ? "#EF4444" : BRAND.border, backgroundColor: BRAND.surface }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.purple)}
              onBlur={(e) => (e.target.style.borderColor = err ? "#EF4444" : BRAND.border)} />
          </Field>

          <Field label="Password">
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••"
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="w-full h-11 px-3.5 pr-11 rounded-lg border text-[15px] focus:outline-none transition"
                style={{ borderColor: err ? "#EF4444" : BRAND.border, backgroundColor: BRAND.surface }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.purple)}
                onBlur={(e) => (e.target.style.borderColor = err ? "#EF4444" : BRAND.border)} />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: BRAND.muted }} aria-label="Toggle password">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          {err && (
            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "#DC2626" }}>
              <AlertCircle size={15} /> {err}
            </div>
          )}

          <button type="button" onClick={submit}
            className="w-full h-11 rounded-lg font-semibold text-[15px] text-white transition flex items-center justify-center gap-2"
            style={{ backgroundColor: BRAND.purple }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.purpleDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.purple)}>
            Sign in <ArrowRight size={16} />
          </button>

        </div>

        <p className="text-center text-xs mt-6" style={{ color: BRAND.muted }}>
          Built for <span className="font-medium" style={{ color: BRAND.text }}>PT. Karya Cipta Mandiri</span>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-medium mb-1.5" style={{ color: BRAND.text }}>{label}</label>
      {children}
    </div>
  );
}

// ─── SHELL ───────────────────────────────────────────────────────────────
function Shell({ view, setView, onLogout }) {
  const [mobileNav, setMobileNav] = useState(false);

  const nav = [
    { id: "home", label: "Home", icon: Home },
    { id: "generate", label: "Generate update", icon: Send },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "resources", label: "Resources", icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col w-[240px] border-r flex-shrink-0" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
        <div className="px-5 py-5 flex items-center gap-2.5 border-b" style={{ borderColor: BRAND.border }}>
          <PandaMark size={32} />
          <div>
            <div className="font-bold tracking-tight text-[15px] leading-none" style={{ color: BRAND.ink }}>Lazy Genius</div>
            <div className="text-[10px] mt-1 uppercase tracking-wider" style={{ color: BRAND.muted }}>PT. KCM</div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition mb-0.5"
                style={{ backgroundColor: active ? BRAND.purpleSoft : "transparent", color: active ? BRAND.purple : BRAND.text }}
                onMouseEnter={(e) => !active && (e.currentTarget.style.backgroundColor = "#F5F5F4")}
                onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}>
                <Icon size={17} /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: BRAND.border }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: BRAND.orange }}>PB</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Pak Budi</div>
              <div className="text-xs truncate" style={{ color: BRAND.muted }}>pak@budi.com</div>
            </div>
            <button onClick={onLogout} title="Sign out" style={{ color: BRAND.muted }}><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-30 border-b flex items-center justify-between px-4 h-14" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
        <div className="flex items-center gap-2"><PandaMark size={28} /><span className="font-bold tracking-tight">Lazy Genius</span></div>
        <button onClick={() => setMobileNav((v) => !v)} className="text-sm font-medium" style={{ color: BRAND.purple }}>
          {nav.find((n) => n.id === view)?.label} ▾
        </button>
      </div>
      {mobileNav && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-30 border-b p-3" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
          {nav.map((item) => (
            <button key={item.id} onClick={() => { setView(item.id); setMobileNav(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: view === item.id ? BRAND.purple : BRAND.text, backgroundColor: view === item.id ? BRAND.purpleSoft : "transparent" }}>
              <item.icon size={17} /> {item.label}
            </button>
          ))}
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mt-2 border-t pt-3" style={{ borderColor: BRAND.border, color: BRAND.muted }}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-5 md:py-10 fade-in" key={view}>
          {view === "home" && <HomeView setView={setView} />}
          {view === "generate" && <GenerateView />}
          {view === "schedule" && <ScheduleView />}
          {view === "projects" && <ProjectsView />}
          {view === "resources" && <ResourcesView />}
        </div>
      </main>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────
function HomeView({ setView }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const countdown = useMemo(() => nextFridayCountdown(now), [now]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm mb-2" style={{ color: BRAND.muted }}>{formatDateHeader(now)}</p>
        <h1 style={{ fontFamily: SERIF_STACK }} className="text-[32px] sm:text-[52px] leading-[1.05] tracking-tight">
          Hi <span style={{ fontStyle: "italic", color: BRAND.purple }}>Pak Budi</span> 🌅
        </h1>
        <p className="text-base mt-2" style={{ color: BRAND.muted }}>
          Three projects running. All updates scheduled. Nothing on your plate.
        </p>
      </div>

      <div className="rounded-2xl p-5 sm:p-8 relative overflow-hidden border"
        style={{ background: `linear-gradient(135deg, ${BRAND.purple} 0%, ${BRAND.purpleDark} 100%)`, borderColor: "transparent", color: "#fff" }}>
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
        <div className="relative z-10 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" /> Next auto-send
            </div>
            <div style={{ fontFamily: SERIF_STACK }} className="text-[32px] sm:text-[56px] leading-[1.05] mb-2">Friday 5:00 PM</div>
            <p className="text-sm sm:text-base opacity-90">All 3 client updates will be sent automatically. Just send your photos this week.</p>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[{ label: "days", v: countdown.d }, { label: "hrs", v: countdown.h }, { label: "min", v: countdown.m }, { label: "sec", v: countdown.s }].map((b) => (
              <div key={b.label} className="text-center">
                <div className="rounded-md px-1.5 py-1.5 sm:px-3 sm:py-3 font-mono text-base sm:text-3xl tabular-nums" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                  {String(b.v).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-wider mt-1.5 opacity-80">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-6 pt-5 border-t flex flex-wrap gap-3" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          <button onClick={() => setView("generate")} className="px-4 h-10 rounded-lg font-medium text-sm bg-white inline-flex items-center gap-2" style={{ color: BRAND.purple }}>
            <Send size={15} /> Generate update now
          </button>
          <button onClick={() => setView("schedule")} className="px-4 h-10 rounded-lg font-medium text-sm inline-flex items-center gap-2"
            style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }}>
            View schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Active projects" value="3" icon={FolderKanban} />
        <Stat label="Updates this month" value="12" icon={Send} accent={BRAND.purple} />
        <Stat label="On-time rate" value="100%" icon={CheckCircle2} accent={BRAND.success} />
        <Stat label="Photos archived" value="263" icon={Camera} accent={BRAND.orange} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionHeader title="Active projects" action={{ label: "All projects", onClick: () => setView("projects") }} />
          <div className="space-y-3">{PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
        </div>

        <div>
          <SectionHeader title="Recent activity" />
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
            {ACTIVITY.map((a, i) => (
              <div key={a.id} className={`p-4 flex gap-3 items-start ${i !== ACTIVITY.length - 1 ? "border-b" : ""}`} style={{ borderColor: BRAND.border }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: a.type === "sent" ? BRAND.purpleSoft : BRAND.orangeSoft }}>
                  {a.type === "sent" ? <Send size={14} style={{ color: BRAND.purple }} /> : <Camera size={14} style={{ color: BRAND.orange }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    {a.type === "sent"
                      ? <>Week {a.week} update sent to <span className="font-medium">{a.client}</span></>
                      : <><span className="font-medium">{a.count} photos</span> uploaded</>}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: BRAND.muted }}>{a.project} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, accent = BRAND.text }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
      <Icon size={16} style={{ color: accent }} />
      <div className="mt-3 text-xl sm:text-[28px] font-semibold tracking-tight" style={{ color: BRAND.ink }}>{value}</div>
      <div className="text-xs sm:text-sm mt-0.5" style={{ color: BRAND.muted }}>{label}</div>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <h2 className="font-semibold tracking-tight text-[17px]">{title}</h2>
      {action && (
        <button onClick={action.onClick} className="text-sm font-medium inline-flex items-center gap-1" style={{ color: BRAND.purple }}>
          {action.label} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function ProjectCard({ project: p }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5 hover:shadow-sm transition" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: p.color }}>{p.name[0]}</div>
          <div className="min-w-0">
            <div className="font-semibold truncate">{p.name}</div>
            <div className="text-xs truncate" style={{ color: BRAND.muted }}>{p.client} · Week {p.week} · {p.phase}</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-semibold tabular-nums">{p.progress}%</div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: BRAND.muted }}>complete</div>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F1EE" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${p.progress}%`, backgroundColor: p.color }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs" style={{ color: BRAND.muted }}>
        <span className="inline-flex items-center gap-1.5"><Clock size={12} /> Next: {p.nextSend}</span>
        <span>{p.photoCount} photos</span>
      </div>
    </div>
  );
}

// ─── GENERATE ────────────────────────────────────────────────────────────
function GenerateView() {
  const [projectId, setProjectId] = useState("");
  const [week, setWeek] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [note, setNote] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const project = useMemo(() => PROJECTS.find((p) => p.id === projectId) || null, [projectId]);
  useEffect(() => { if (project) setWeek(project.week); }, [project]);

  const message = useMemo(() => {
    const clientName = project?.client || "[Client Name]";
    const projectName = project?.name || "[Project Name]";
    return `Hi ${clientName} 👋

*Project Update — Week ${week}*
📍 ${projectName}

✅ This week:
${note || "[Add your weekly progress note]"}

📅 Next week:
${nextSteps || "[Add next week's plan]"}

📸 ${photos.length} ${photos.length === 1 ? "photo" : "photos"} attached

Questions? Reply here anytime.
— PT. Karya Cipta Mandiri`;
  }, [project, week, note, nextSteps, photos.length]);

  function showToast(text, kind = "success") {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 2200);
  }
  function handleFiles(files) {
    const incoming = Array.from(files);
    const remaining = 3 - photos.length;
    if (remaining <= 0) return showToast("Maximum 3 photos", "error");
    const accepted = incoming.slice(0, remaining).map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(f), name: f.name,
    }));
    setPhotos((prev) => [...prev, ...accepted]);
    if (incoming.length > remaining) showToast(`Added ${remaining}, skipped ${incoming.length - remaining}`, "error");
  }
  function removePhoto(id) {
    setPhotos((prev) => {
      const t = prev.find((p) => p.id === id);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((p) => p.id !== id);
    });
  }
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), []); // eslint-disable-line

  const canCopy = projectId && note.trim().length > 0;
  function handleCopy() {
    if (!projectId) return showToast("Please select a project first", "error");
    if (!note.trim()) return showToast("Please write a weekly note", "error");
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      showToast("Copied to clipboard — open WhatsApp and paste");
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm mb-1.5" style={{ color: BRAND.muted }}>Generator</p>
        <h1 style={{ fontFamily: SERIF_STACK }} className="text-[28px] sm:text-[44px] leading-[1.05] tracking-tight">
          Build a <span style={{ fontStyle: "italic", color: BRAND.purple }}>weekly update</span>
        </h1>
        <p className="text-base mt-2 max-w-xl" style={{ color: BRAND.muted }}>
          Pick a project, drop in photos, write a quick note. The message formats itself.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card title="1. Select project">
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border text-[15px] focus:outline-none transition appearance-none bg-white"
              style={{ borderColor: BRAND.border }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.purple)}
              onBlur={(e) => (e.target.style.borderColor = BRAND.border)}>
              <option value="">— Choose a project —</option>
              {PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.client}</option>)}
            </select>

            <div className="mt-4">
              <label className="block text-[13px] font-medium mb-2">Week number</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setWeek((w) => Math.max(1, w - 1))} className="w-10 h-10 rounded-lg border bg-white" style={{ borderColor: BRAND.border }}>−</button>
                <input type="number" min={1} value={week}
                  onChange={(e) => setWeek(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center rounded-lg border focus:outline-none" style={{ borderColor: BRAND.border }} />
                <button onClick={() => setWeek((w) => w + 1)} className="w-10 h-10 rounded-lg border bg-white" style={{ borderColor: BRAND.border }}>+</button>
                {project && week !== project.week && (
                  <button onClick={() => setWeek(project.week)} className="text-xs underline ml-1" style={{ color: BRAND.purple }}>Reset to week {project.week}</button>
                )}
              </div>
            </div>
          </Card>

          <Card title="2. Upload photos" subtitle={`${photos.length} / 3`}>
            <div onClick={() => photos.length < 3 && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              className="rounded-lg p-5 text-center transition"
              style={{
                border: `2px dashed ${photos.length >= 3 ? BRAND.border : BRAND.purple + "55"}`,
                backgroundColor: photos.length >= 3 ? "#F5F5F4" : BRAND.purpleSoft,
                opacity: photos.length >= 3 ? 0.5 : 1,
                cursor: photos.length >= 3 ? "not-allowed" : "pointer",
              }}>
              <Upload size={24} style={{ color: BRAND.purple, margin: "0 auto 8px" }} />
              <p className="text-sm font-medium">{photos.length >= 3 ? "Maximum reached" : "Click or drop images"}</p>
              <p className="text-xs mt-1" style={{ color: BRAND.muted }}>JPG, PNG · up to 3 photos</p>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {photos.map((p) => (
                  <div key={p.id} className="relative group aspect-square rounded-lg overflow-hidden border" style={{ borderColor: BRAND.border }}>
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    <button onClick={() => removePhoto(p.id)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center transition">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="3. What happened this week">
            <textarea value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Foundation pour completed Monday. Wall framing finished Thursday. Plumbing rough-in started Friday."
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-lg border text-[15px] leading-relaxed resize-none focus:outline-none"
              style={{ borderColor: BRAND.border }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.purple)}
              onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
            <div className="text-xs mt-1.5" style={{ color: BRAND.muted }}>{note.length} characters</div>
          </Card>

          <Card title="4. What's coming next week">
            <textarea value={nextSteps} onChange={(e) => setNextSteps(e.target.value)}
              placeholder="Electrical rough-in. Begin tile installation in master bath."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border text-[15px] leading-relaxed resize-none focus:outline-none"
              style={{ borderColor: BRAND.border }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.purple)}
              onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
          </Card>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start space-y-3">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} style={{ color: BRAND.whatsapp }} />
                <h2 className="font-semibold tracking-tight">WhatsApp preview</h2>
              </div>
              <button onClick={handleCopy} disabled={!canCopy}
                className="flex items-center gap-2 px-4 h-10 rounded-lg font-medium text-sm transition"
                style={{
                  backgroundColor: canCopy ? BRAND.purple : "#E7E5E4",
                  color: canCopy ? "#fff" : BRAND.muted,
                  cursor: canCopy ? "pointer" : "not-allowed",
                }}
                onMouseEnter={(e) => canCopy && (e.currentTarget.style.backgroundColor = BRAND.purpleDark)}
                onMouseLeave={(e) => canCopy && (e.currentTarget.style.backgroundColor = BRAND.purple)}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy message"}
              </button>
            </div>

            <div className="p-4 sm:p-5 min-h-[320px] sm:min-h-[440px]" style={{
              backgroundColor: "#E5DDD5",
              backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px, 30px 30px",
            }}>
              <div className="max-w-[92%] ml-auto">
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-3 py-2 shadow-sm">
                  {photos.length > 0 && (
                    <div className={`grid gap-1 mb-2 rounded overflow-hidden ${
                      photos.length === 1 ? "grid-cols-1" : photos.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    }`}>
                      {photos.map((p) => <img key={p.id} src={p.url} alt="" className="w-full aspect-square object-cover" />)}
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap text-[15px] leading-relaxed" style={{ fontFamily: FONT_STACK, color: BRAND.text }}>
                    {renderWhatsAppFormatting(message)}
                  </pre>
                  <div className="text-[10px] text-right mt-1" style={{ color: BRAND.muted }}>
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!canCopy && (
            <div className="flex items-start gap-2 text-sm rounded-lg px-3.5 py-2.5 border" style={{ backgroundColor: BRAND.orangeSoft, borderColor: "#FFCCBC", color: BRAND.text }}>
              <AlertCircle size={15} style={{ color: BRAND.orange, marginTop: 2, flexShrink: 0 }} />
              <span>
                {!projectId && !note.trim() ? "Select a project and write a note to enable copying."
                  : !projectId ? "Select a project to continue."
                  : "Write a weekly note to continue."}
              </span>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg shadow-xl text-white text-sm font-medium fade-up z-50"
          style={{ backgroundColor: toast.kind === "error" ? "#DC2626" : BRAND.success }}>
          {toast.text}
        </div>
      )}
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        {subtitle && <span className="text-xs" style={{ color: BRAND.muted }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function renderWhatsAppFormatting(text) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <strong key={i} className="font-bold">{part.slice(1, -1)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ─── SCHEDULE ────────────────────────────────────────────────────────────
function ScheduleView() {
  const upcoming = [
    { date: "Friday, May 1", relative: "in 5 days", projects: PROJECTS, status: "scheduled" },
    { date: "Friday, May 8", relative: "in 12 days", projects: PROJECTS, status: "scheduled" },
    { date: "Friday, May 15", relative: "in 19 days", projects: PROJECTS, status: "scheduled" },
  ];
  const past = [
    { date: "Friday, Apr 24", relative: "2 days ago", projects: PROJECTS, status: "sent" },
    { date: "Friday, Apr 17", relative: "9 days ago", projects: PROJECTS, status: "sent" },
  ];

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm mb-1.5" style={{ color: BRAND.muted }}>Schedule</p>
        <h1 style={{ fontFamily: SERIF_STACK }} className="text-[28px] sm:text-[44px] leading-[1.05] tracking-tight">
          Every Friday at <span style={{ fontStyle: "italic", color: BRAND.purple }}>5:00 PM</span>
        </h1>
        <p className="text-base mt-2 max-w-xl" style={{ color: BRAND.muted }}>
          All client updates go out automatically. You only send the photos.
        </p>
      </header>

      <div>
        <SectionHeader title="Upcoming" />
        <div className="space-y-3">{upcoming.map((s) => <ScheduleRow key={s.date} slot={s} />)}</div>
      </div>

      <div>
        <SectionHeader title="Sent" />
        <div className="space-y-3">{past.map((s) => <ScheduleRow key={s.date} slot={s} />)}</div>
      </div>
    </div>
  );
}

function ScheduleRow({ slot }) {
  const isSent = slot.status === "sent";
  return (
    <div className="rounded-xl border p-4 sm:p-5" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="font-semibold">{slot.date}</div>
          <div className="text-xs" style={{ color: BRAND.muted }}>{slot.relative} · 5:00 PM</div>
        </div>
        <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold"
          style={{ backgroundColor: isSent ? "#DCFCE7" : BRAND.purpleSoft, color: isSent ? BRAND.success : BRAND.purple }}>
          {isSent ? "✓ Sent" : "Scheduled"}
        </span>
      </div>
      <div className="grid sm:grid-cols-3 gap-2.5">
        {slot.projects.map((p) => (
          <div key={p.id} className="flex items-center gap-2.5 rounded-lg p-2.5" style={{ backgroundColor: BRAND.bg }}>
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: p.color }}>{p.name[0]}</div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{p.client}</div>
              <div className="text-xs truncate" style={{ color: BRAND.muted }}>{p.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────
function ProjectsView() {
  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm mb-1.5" style={{ color: BRAND.muted }}>Projects</p>
        <h1 style={{ fontFamily: SERIF_STACK }} className="text-[28px] sm:text-[44px] leading-[1.05] tracking-tight">
          Three <span style={{ fontStyle: "italic", color: BRAND.purple }}>active sites</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <div key={p.id} className="rounded-xl border overflow-hidden" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
            <div className="h-2" style={{ backgroundColor: p.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-bold text-lg tracking-tight">{p.name}</h3>
                  <p className="text-sm" style={{ color: BRAND.muted }}>Client: {p.client}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold tabular-nums">{p.progress}%</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: BRAND.muted }}>complete</div>
                </div>
              </div>

              <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ backgroundColor: "#F1F1EE" }}>
                <div className="h-full transition-all" style={{ width: `${p.progress}%`, backgroundColor: p.color }} />
              </div>

              <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
                <dt style={{ color: BRAND.muted }}>Current week</dt><dd className="font-medium">Week {p.week}</dd>
                <dt style={{ color: BRAND.muted }}>Phase</dt><dd className="font-medium">{p.phase}</dd>
                <dt style={{ color: BRAND.muted }}>Last update</dt><dd className="font-medium">{p.lastSent}</dd>
                <dt style={{ color: BRAND.muted }}>Next send</dt><dd className="font-medium" style={{ color: BRAND.purple }}>{p.nextSend}</dd>
                <dt style={{ color: BRAND.muted }}>Photo archive</dt><dd className="font-medium">{p.photoCount} photos</dd>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESOURCES ───────────────────────────────────────────────────────────
function ResourcesView() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm mb-1.5" style={{ color: BRAND.muted }}>Resources</p>
        <h1 style={{ fontFamily: SERIF_STACK }} className="text-[28px] sm:text-[44px] leading-[1.05] tracking-tight">
          Everything <span style={{ fontStyle: "italic", color: BRAND.purple }}>you get</span>
        </h1>
        <p className="text-base mt-2 max-w-2xl" style={{ color: BRAND.muted }}>
          Part of your pilot. Yours to keep — full ownership, no lock-in.
        </p>
      </header>

      <div className="rounded-2xl p-5 sm:p-8 border relative overflow-hidden" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: BRAND.purpleSoft, color: BRAND.purple }}>The pilot</div>
        <h2 style={{ fontFamily: SERIF_STACK }} className="text-[24px] sm:text-[36px] leading-[1.1] tracking-tight max-w-2xl">
          Automatic weekly project update
          <span className="block text-base mt-2 not-italic" style={{ fontFamily: FONT_STACK, color: BRAND.muted, fontWeight: 400 }}>
            for your construction clients — sent on WhatsApp
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 mt-6 max-w-3xl">
          {[
            "Every Friday, your client gets a clean update on their project.",
            "Photos from the site, what work was done, what comes next week.",
            "You only send me a few photos on WhatsApp. The rest is automatic.",
            "Your client feels informed. You look professional. No more questions.",
          ].map((line, i) => (
            <div key={i} className="flex gap-3 items-start">
              <ArrowRight size={16} style={{ color: BRAND.purple, marginTop: 4, flexShrink: 0 }} />
              <p className="text-[15px] leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="What you get" />
        <div className="grid md:grid-cols-2 gap-4">
          <ResourceCard tag="System" icon={Sparkles} title="A working system"
            description="Sends weekly updates to all your clients — automatically, every Friday."
            footer="Live · running now" footerIcon="dot" />
          <ResourceCard tag="Guide" icon={FileText} title="A simple guide"
            description="Step-by-step instructions so you and your team can use the system without me."
            footer="Open guide" cta />
          <ResourceCard tag="Video" icon={Play} title="Walkthrough video"
            description="A short video walkthrough in easy English. Watch on your phone whenever you need."
            footer="Watch · 4:32" cta video />
          <ResourceCard tag="Support" icon={HelpCircle} title="My time and support"
            description="Reach me directly on WhatsApp during the pilot. Questions, fixes, adjustments — all included."
            footer="Message Fredrik on WhatsApp" cta accent={BRAND.whatsapp} />
        </div>
      </div>

      <div className="rounded-2xl p-5 sm:p-8 border flex flex-col sm:flex-row gap-5 sm:items-center" style={{ borderColor: BRAND.border, backgroundColor: BRAND.purpleSoft }}>
        <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white text-xl" style={{ backgroundColor: BRAND.purple }}>FL</div>
        <div className="flex-1">
          <p style={{ fontFamily: SERIF_STACK }} className="text-[18px] sm:text-[22px] leading-snug">
            "Pak Budi, this is yours. Full ownership, no lock-in. If it works, we keep going. If not, we stop. That is fair for both of us."
          </p>
          <p className="text-sm mt-3" style={{ color: BRAND.muted }}>
            — <span className="font-medium" style={{ color: BRAND.text }}>Fredrik Lindström</span>, Founder · Lazy Genius · WhatsApp +46 70 069 21 10
          </p>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ tag, icon: Icon, title, description, footer, cta, video, accent = BRAND.purple, footerIcon }) {
  return (
    <div className="rounded-xl border p-5 sm:p-6 flex flex-col" style={{ borderColor: BRAND.border, backgroundColor: BRAND.surface }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent + "15" }}>
          <Icon size={17} style={{ color: accent }} />
        </div>
        <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: BRAND.muted }}>{tag}</span>
      </div>
      <h3 style={{ fontFamily: SERIF_STACK }} className="text-[22px] sm:text-[24px] leading-tight mb-2">{title}</h3>
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: BRAND.muted }}>{description}</p>

      {video && (
        <div className="rounded-lg aspect-video mb-4 relative overflow-hidden flex items-center justify-center cursor-pointer group" style={{ backgroundColor: "#1F1F23" }}>
          <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 50% 50%, ${accent} 0%, transparent 70%)` }} />
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition shadow-lg z-10">
            <Play size={22} style={{ color: accent, marginLeft: 3 }} fill={accent} />
          </div>
          <div className="absolute bottom-3 right-3 text-xs font-mono text-white/80">4:32</div>
        </div>
      )}

      <button className="text-sm font-medium inline-flex items-center gap-1.5 self-start"
        style={{ color: footerIcon === "dot" ? BRAND.success : accent }} disabled={!cta}>
        {footerIcon === "dot" && <span className="w-1.5 h-1.5 rounded-full bg-current live-dot" />}
        {footer}
        {cta && <ChevronRight size={14} />}
      </button>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────
function PandaMark({ size = 36 }) {
  return (
    <img
      src={FOUNDER_PHOTO}
      alt="Lazy Genius"
      className="rounded-full object-cover"
      style={{ width: size, height: size, border: `2px solid ${BRAND.surface}`, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}
    />
  );
}

function nextFridayCountdown(now) {
  const target = new Date(now);
  const day = target.getDay();
  let daysToFri = (5 - day + 7) % 7;
  target.setHours(17, 0, 0, 0);
  if (daysToFri === 0 && now > target) daysToFri = 7;
  target.setDate(target.getDate() + daysToFri);
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}

function formatDateHeader(d) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
