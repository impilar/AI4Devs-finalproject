import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain, Search, Star, Archive, Hash, Settings,
  Home, FileText, Plus, Clock, Heart, Trash2,
  Share2, Edit3, Link, Image, Lightbulb, ChevronRight,
  Sparkles, Command, ArrowRight, X,
  LayoutGrid, MoreHorizontal, Filter, Bell, Zap,
  BookOpen, TrendingUp,
} from "lucide-react";

type View = "dashboard" | "notes" | "detail" | "create";

interface Note {
  id: number;
  emoji: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  isFavorite: boolean;
  importance: "high" | "medium" | "low";
  accentColor: string;
  readTime: string;
}

const NOTES: Note[] = [
  {
    id: 1, emoji: "🍝", title: "Recetas familiares",
    excerpt: "La receta de la abuela para la paella valenciana perfecta con azafrán de La Mancha y arroz bomba.",
    content: "La paella valenciana es uno de los platos más emblemáticos de nuestra familia. La abuela siempre insistía en usar azafrán de La Mancha y arroz bomba de Valencia. El secreto está en el sofrito y en no remover el arroz una vez que se ha añadido el caldo. También tenemos la receta del cocido madrileño de los domingos y los churros con chocolate de Navidad.",
    tags: ["Cocina", "Familia"], date: "Hace 2 días", isFavorite: true,
    importance: "high", accentColor: "#FF6B6B", readTime: "3 min",
  },
  {
    id: 2, emoji: "🧠", title: "Ideas de negocio",
    excerpt: "Modelo SaaS para automatización de flujos de trabajo con IA generativa y agentes autónomos.",
    content: "El mercado de automatización está creciendo exponencialmente. Oportunidades en: 1) Automatización de onboarding de clientes, 2) Generación de contratos inteligentes, 3) Análisis predictivo de churn. El modelo freemium con upsell a enterprise puede alcanzar 1M ARR en 18 meses si se ejecuta correctamente.",
    tags: ["Negocios", "IA"], date: "Hace 3 días", isFavorite: true,
    importance: "high", accentColor: "#4F7CFF", readTime: "8 min",
  },
  {
    id: 3, emoji: "📚", title: "Referencias IA",
    excerpt: "Papers fundamentales: Attention is All You Need, BERT, GPT-4 Technical Report y notas propias.",
    content: "Colección curada de los papers más importantes en IA/ML. Incluye anotaciones personales y síntesis de conceptos clave. Organizado por año y área temática. Próximos a revisar: Mamba, RWKV, Flash Attention 3, Constitutional AI de Anthropic.",
    tags: ["IA", "Research"], date: "Hace 1 semana", isFavorite: false,
    importance: "medium", accentColor: "#8B5CFF", readTime: "15 min",
  },
  {
    id: 4, emoji: "✈️", title: "Viaje Japón",
    excerpt: "Itinerario 14 días: Tokyo → Nikko → Kyoto → Nara → Osaka con presupuesto detallado y reservas.",
    content: "Planificación completa del viaje a Japón en primavera 2025. Cherry blossom season en Shinjuku Gyoen. Reservas: Hotel Andaz Tokyo, Ryokan Tawaraya en Kyoto, Osaka Marriott Miyako. Presupuesto estimado: 4.200€ por persona incluyendo vuelos.",
    tags: ["Viajes", "Personal"], date: "Hace 5 días", isFavorite: true,
    importance: "high", accentColor: "#7DE2D1", readTime: "10 min",
  },
  {
    id: 5, emoji: "💡", title: "Filosofía estoica",
    excerpt: "Marco Aurelio: «Tienes poder sobre tu mente, no sobre los eventos externos. Recuerda esto y encontrarás fuerza».",
    content: "Notas de lectura sobre las Meditaciones de Marco Aurelio, Epicteto y Séneca. Principios fundamentales: dicotomía del control, virtud como único bien verdadero, el presente como único momento real. Aplicaciones prácticas en el trabajo y relaciones personales.",
    tags: ["Filosofía", "Hábitos"], date: "Hace 2 semanas", isFavorite: false,
    importance: "medium", accentColor: "#FFB347", readTime: "5 min",
  },
  {
    id: 6, emoji: "🎵", title: "Teoría musical",
    excerpt: "Escalas modales: Dórico, Frigio, Lidio, Mixolidio y su aplicación en el jazz moderno de Miles Davis.",
    content: "Análisis de los modos gregorianos y su aplicación en la música contemporánea. Miles Davis y el modal jazz en Kind of Blue. John Coltrane y las estructuras armónicas avanzadas en A Love Supreme. Guía práctica de modos para guitarra eléctrica.",
    tags: ["Música", "Arte"], date: "Hace 10 días", isFavorite: false,
    importance: "low", accentColor: "#FF6B9D", readTime: "6 min",
  },
  {
    id: 7, emoji: "🌿", title: "Hábitos saludables",
    excerpt: "Protocolo matutino: meditación 10min, ejercicio 30min, journaling y lectura de calidad.",
    content: "Sistema de hábitos basado en Atomic Habits de James Clear. Stack de hábitos matutinos: 5:30 despertar, 5:35 agua fría, 5:40 meditación Wim Hof, 6:00 ejercicio funcional, 6:30 ducha fría, 7:00 journaling, 7:20 lectura. Seguimiento semanal con métricas.",
    tags: ["Salud", "Hábitos"], date: "Ayer", isFavorite: false,
    importance: "high", accentColor: "#4ECB8D", readTime: "4 min",
  },
  {
    id: 8, emoji: "🔬", title: "Física cuántica",
    excerpt: "Principio de incertidumbre de Heisenberg, entrelazamiento cuántico y la carrera por la computación cuántica.",
    content: "Notas del curso de mecánica cuántica. El principio de superposición explica cómo las partículas pueden existir en múltiples estados simultáneamente. Aplicaciones en criptografía cuántica y computación. IBM Q System One y Google Sycamore — resumen de avances.",
    tags: ["Ciencia", "Research"], date: "Hace 3 semanas", isFavorite: false,
    importance: "low", accentColor: "#4F7CFF", readTime: "12 min",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Cocina": "#FF6B6B", "Familia": "#FFB347", "Negocios": "#4F7CFF",
  "IA": "#8B5CFF", "Research": "#7DE2D1", "Viajes": "#7DE2D1",
  "Personal": "#AAB4C5", "Filosofía": "#FFB347", "Hábitos": "#7DE2D1",
  "Música": "#FF6B9D", "Arte": "#FF6B9D", "Salud": "#4ECB8D",
  "Ciencia": "#4F7CFF",
};

const RECENT_ACTIVITY = [
  { action: "Editaste", note: "Ideas de negocio", time: "Hace 2h", emoji: "🧠" },
  { action: "Creaste", note: "Hábitos saludables", time: "Ayer", emoji: "🌿" },
  { action: "Marcaste favorita", note: "Viaje Japón", time: "Hace 5 días", emoji: "✈️" },
  { action: "Archivaste", note: "Draft proyecto X", time: "Hace 1 semana", emoji: "📄" },
];

const TOP_TAGS = [
  { name: "IA", count: 42, color: "#8B5CFF" },
  { name: "Research", count: 31, color: "#7DE2D1" },
  { name: "Hábitos", count: 28, color: "#4ECB8D" },
  { name: "Negocios", count: 19, color: "#4F7CFF" },
  { name: "Personal", count: 15, color: "#AAB4C5" },
];

const GLASS: React.CSSProperties = {
  background: "rgba(18, 24, 41, 0.75)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  borderRight: "1px solid rgba(255,255,255,0.05)",
};

const GLASS_RIGHT: React.CSSProperties = {
  background: "rgba(18, 24, 41, 0.75)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  borderLeft: "1px solid rgba(255,255,255,0.05)",
};

const CARD: React.CSSProperties = {
  background: "#182134",
  border: "1px solid rgba(255,255,255,0.06)",
};

const GRAD = "linear-gradient(135deg, #4F7CFF 0%, #8B5CFF 100%)";
const GRAD_TEAL = "linear-gradient(135deg, #4F7CFF 0%, #7DE2D1 100%)";

const scrollHide: React.CSSProperties = { scrollbarWidth: "none" };

// ─── Tag Pill ─────────────────────────────────────────────────────────────────

function TagPill({ name }: { name: string }) {
  const color = TAG_COLORS[name] ?? "#AAB4C5";
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
    >
      {name}
    </span>
  );
}

// ─── Importance Bar ───────────────────────────────────────────────────────────

function ImportanceBar({ level }: { level: "high" | "medium" | "low" }) {
  const map = { high: { w: "100%", c: "#4F7CFF" }, medium: { w: "60%", c: "#FFB347" }, low: { w: "28%", c: "#AAB4C5" } };
  const { w, c } = map[level];
  return (
    <div className="w-10 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full" style={{ width: w, background: c }} />
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({ value, onChange, placeholder = "Buscar notas, ideas, etiquetas..." }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative group">
      <Search
        size={15}
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
        style={{ color: "#AAB4C5" }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-14 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200"
        style={{
          background: "#182134",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "white",
          caretColor: "#4F7CFF",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(79,124,255,0.45)";
          e.target.style.boxShadow = "0 0 0 3px rgba(79,124,255,0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.06)";
          e.target.style.boxShadow = "none";
        }}
      />
      <div
        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <Command size={10} style={{ color: "#AAB4C5" }} />
        <span className="text-xs" style={{ color: "#AAB4C5", fontSize: "10px" }}>K</span>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ activeNav, setActiveNav, setView, onNewNote }: {
  activeNav: string;
  setActiveNav: (n: string) => void;
  setView: (v: View) => void;
  onNewNote: () => void;
}) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: Home, view: "dashboard" as View },
    { id: "notes", label: "Todas las notas", icon: FileText, view: "notes" as View },
    { id: "tags", label: "Etiquetas", icon: Hash, view: "notes" as View },
    { id: "favorites", label: "Favoritas", icon: Heart, view: "notes" as View },
    { id: "archived", label: "Archivadas", icon: Archive, view: "notes" as View },
  ];

  return (
    <motion.aside
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-52 flex-shrink-0 flex flex-col h-full z-10"
      style={GLASS}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: GRAD }}
          >
            <Brain size={15} color="white" />
          </div>
          <div>
            <span
              className="text-sm font-bold tracking-tight block"
              style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              MindVault
            </span>
            <span className="text-xs block" style={{ color: "#AAB4C5", fontSize: "10px" }}>Tu segundo cerebro</span>
          </div>
        </div>
      </div>

      {/* New note CTA */}
      <div className="px-4 mb-5">
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: GRAD }}
        >
          <Plus size={14} /> Nueva nota
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto" style={scrollHide}>
        {nav.map(({ id, label, icon: Icon, view }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => { setActiveNav(id); setView(view); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
              style={
                active
                  ? { background: "rgba(79,124,255,0.12)", color: "#4F7CFF", border: "1px solid rgba(79,124,255,0.18)" }
                  : { color: "#AAB4C5", border: "1px solid transparent" }
              }
            >
              <Icon size={15} style={active ? { color: "#4F7CFF" } : { color: "#AAB4C5" }} />
              <span className="flex-1">{label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4F7CFF" }} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors mb-3"
          style={{ color: "#AAB4C5" }}
        >
          <Settings size={15} style={{ color: "#AAB4C5" }} /> Ajustes
        </button>
        <div className="flex items-center gap-2.5 px-1">
          <div
            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
            style={{ background: GRAD }}
          >
            P
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">Pilar García</p>
            <p className="text-xs" style={{ color: "#8B5CFF", fontSize: "10px", fontWeight: 600 }}>✦ Pro</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({ label, value, icon: Icon, color, sub }: {
  label: string; value: string; icon: React.ElementType; color: string; sub?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.18 }}
      className="rounded-2xl p-5 flex flex-col gap-3.5 cursor-default"
      style={CARD}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={17} style={{ color }} />
        </div>
        {sub && (
          <span className="text-xs font-semibold" style={{ color: "#4ECB8D" }}>{sub}</span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none mb-1">{value}</p>
        <p className="text-xs" style={{ color: "#AAB4C5" }}>{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Note Card ────────────────────────────────────────────────────────────────

function NoteCard({ note, onClick }: { note: Note; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="rounded-2xl p-5 cursor-pointer relative overflow-hidden"
      style={{
        ...CARD,
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px ${note.accentColor}22`
          : "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${note.accentColor}90, transparent 80%)` }}
      />
      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${note.accentColor}12, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl select-none">{note.emoji}</span>
          <div className="flex items-center gap-2">
            <ImportanceBar level={note.importance} />
            {note.isFavorite && (
              <Heart size={12} fill="#FFB347" style={{ color: "#FFB347" }} />
            )}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">{note.title}</h3>
        <p className="text-xs leading-relaxed mb-3.5 line-clamp-2" style={{ color: "#AAB4C5" }}>{note.excerpt}</p>

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {note.tags.map((t) => <TagPill key={t} name={t} />)}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#AAB4C5" }}>{note.date}</span>
          <div
            className="flex items-center gap-1 transition-all duration-200"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            {[Star, Share2, MoreHorizontal].map((Icon, i) => (
              <button
                key={i}
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon size={11} style={{ color: "#AAB4C5" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────

function DashboardView({ setView, setSelectedNote, search, setSearch }: {
  setView: (v: View) => void;
  setSelectedNote: (n: Note) => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8" style={scrollHide}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-xs mb-1 font-medium" style={{ color: "#AAB4C5" }}>Domingo, 6 de julio de 2025</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Buenas tardes, Pilar{"  "}
            <span className="inline-block">✨</span>
          </h1>
          <p className="mt-1.5 text-base" style={{ color: "#AAB4C5" }}>
            Tu conocimiento organizado y siempre accesible.
          </p>
        </div>
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center mt-1"
          style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Bell size={15} style={{ color: "#AAB4C5" }} />
        </button>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <SearchBar value={search} onChange={setSearch} />
      </motion.div>

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        <KPICard label="Total notas" value="247" icon={FileText} color="#4F7CFF" sub="+12%" />
        <KPICard label="Etiquetas" value="38" icon={Hash} color="#8B5CFF" />
        <KPICard label="Favoritas" value="12" icon={Heart} color="#FFB347" />
        <KPICard label="Actualizado" value="Hoy" icon={Clock} color="#7DE2D1" />
      </motion.div>

      {/* Recent notes */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Notas recientes</h2>
          <button
            onClick={() => setView("notes")}
            className="text-xs flex items-center gap-1 font-medium transition-opacity hover:opacity-70"
            style={{ color: "#4F7CFF" }}
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {NOTES.slice(0, 4).map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => { setSelectedNote(note); setView("detail"); }}
            />
          ))}
        </div>
      </motion.div>

      {/* AI insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(79,124,255,0.09), rgba(139,92,255,0.07))",
          border: "1px solid rgba(79,124,255,0.16)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(79,124,255,0.12), transparent 65%)" }}
        />
        {/* Abstract shape */}
        <div
          className="absolute bottom-0 right-12 w-32 h-32 pointer-events-none opacity-10"
          style={{ background: GRAD, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", filter: "blur(20px)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} style={{ color: "#7DE2D1" }} />
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#7DE2D1" }}>
                IA Insights
              </span>
            </div>
            <p className="text-base font-semibold text-white mb-1">Tienes 3 notas sin conectar sobre IA</p>
            <p className="text-sm" style={{ color: "#AAB4C5" }}>
              Sugerencia: crea un mapa de ideas para visualizar sus conexiones
            </p>
          </div>
          <button
            className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 ml-6 hover:opacity-90 transition-opacity"
            style={{ background: GRAD_TEAL }}
          >
            Explorar <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Notes Grid View ──────────────────────────────────────────────────────────

function NotesView({ setView, setSelectedNote, search, setSearch }: {
  setView: (v: View) => void;
  setSelectedNote: (n: Note) => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  const filtered = search
    ? NOTES.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : NOTES;

  return (
    <div className="flex-1 overflow-y-auto p-8" style={scrollHide}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Todas las notas</h1>
          <p className="text-sm mt-0.5" style={{ color: "#AAB4C5" }}>{filtered.length} notas</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors"
            style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)", color: "#AAB4C5" }}
          >
            <Filter size={13} /> Filtrar
          </button>
          <button
            className="px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors"
            style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)", color: "#AAB4C5" }}
          >
            <LayoutGrid size={13} /> Vista
          </button>
          <button
            onClick={() => setView("create")}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: GRAD }}
          >
            <Plus size={13} /> Nueva nota
          </button>
        </div>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Masonry grid */}
      <div style={{ columns: "2", columnGap: "1rem" }}>
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.045, duration: 0.25 }}
            style={{ breakInside: "avoid", marginBottom: "1rem", display: "block" }}
          >
            <NoteCard note={note} onClick={() => { setSelectedNote(note); setView("detail"); }} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="text-4xl mb-4">🔍</div>
          <p className="font-medium text-white mb-1">Sin resultados</p>
          <p className="text-sm" style={{ color: "#AAB4C5" }}>Prueba con otra búsqueda</p>
        </div>
      )}
    </div>
  );
}

// ─── Detail View ──────────────────────────────────────────────────────────────

function DetailView({ note, onBack }: { note: Note; onBack: () => void }) {
  const [isFav, setIsFav] = useState(note.isFavorite);
  const related = NOTES.filter((n) => n.id !== note.id && n.tags.some((t) => note.tags.includes(t))).slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto p-8" style={scrollHide}>
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium mb-7 transition-opacity hover:opacity-70"
        style={{ color: "#AAB4C5" }}
      >
        <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Volver a las notas
      </motion.button>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-5xl mb-4 select-none">{note.emoji}</div>
        <h1 className="text-4xl font-bold text-white leading-tight mb-3">{note.title}</h1>
        <div className="flex items-center flex-wrap gap-3 mb-5">
          <span className="text-sm" style={{ color: "#AAB4C5" }}>
            {note.date} · {note.readTime} de lectura
          </span>
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map((t) => <TagPill key={t} name={t} />)}
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-2 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { icon: Edit3, label: "Editar" },
            { icon: Share2, label: "Compartir" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#AAB4C5" }}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
          <button
            onClick={() => setIsFav(!isFav)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
            style={
              isFav
                ? { background: "rgba(255,179,71,0.1)", border: "1px solid rgba(255,179,71,0.2)", color: "#FFB347" }
                : { border: "1px solid rgba(255,255,255,0.07)", color: "#AAB4C5" }
            }
          >
            <Heart size={13} fill={isFav ? "#FFB347" : "none"} />
            {isFav ? "Favorita" : "Favoritar"}
          </button>
          <button
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium ml-auto transition-colors"
            style={{ background: "rgba(212,24,61,0.08)", border: "1px solid rgba(212,24,61,0.14)", color: "#e05577" }}
          >
            <Trash2 size={13} /> Eliminar
          </button>
        </div>
      </motion.div>

      {/* Document body */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-8 mb-6 relative overflow-hidden"
        style={CARD}
      >
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle, ${note.accentColor}20, transparent 70%)` }}
        />
        <p className="text-base leading-8 mb-5" style={{ color: "rgba(255,255,255,0.82)" }}>{note.content}</p>
        <p className="text-base leading-8 mb-6" style={{ color: "rgba(255,255,255,0.82)" }}>
          El conocimiento se consolida cuando conectas ideas aparentemente dispares. Esta nota es parte de un sistema mayor de aprendizaje activo — cada entrada alimenta las demás, creando una red de comprensión que crece contigo.
        </p>
        <div
          className="p-4 rounded-xl flex gap-3"
          style={{ background: "rgba(79,124,255,0.08)", border: "1px solid rgba(79,124,255,0.16)" }}
        >
          <Lightbulb size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#4F7CFF" }} />
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "#4F7CFF" }}>Idea clave</p>
            <p className="text-sm leading-relaxed" style={{ color: "#AAB4C5" }}>
              El conocimiento se consolida cuando lo conectas con otras ideas que ya posees. La toma de notas activa es 3× más efectiva que la pasiva.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Related notes */}
      {related.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-white mb-3">Notas relacionadas</h3>
          <div className="space-y-2">
            {related.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer hover:bg-white/4 transition-colors group"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-lg">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{r.title}</p>
                  <p className="text-xs" style={{ color: "#AAB4C5" }}>{r.date}</p>
                </div>
                <ChevronRight size={14} className="flex-shrink-0" style={{ color: "#AAB4C5" }} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Create View ──────────────────────────────────────────────────────────────

function CreateView({ setView }: { setView: (v: View) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("✍️");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const emojis = ["✍️", "💡", "🧠", "📚", "🎯", "🔬", "🌿", "🎵", "✈️", "💻", "🎨", "🏆", "🔑", "🌍"];
  const recentTags = ["IA", "Research", "Hábitos", "Personal", "Negocios", "Filosofía"];

  const blocks = [
    { icon: Link, label: "Añadir enlace", color: "#4F7CFF" },
    { icon: Hash, label: "Añadir etiqueta", color: "#8B5CFF" },
    { icon: Image, label: "Añadir imagen", color: "#7DE2D1" },
    { icon: Lightbulb, label: "Idea relacionada", color: "#FFB347" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8" style={scrollHide}>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setView("notes")}
          className="flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: "#AAB4C5" }}
        >
          <X size={14} /> Cancelar
        </button>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2.5 rounded-xl text-xs font-medium transition-colors"
            style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)", color: "#AAB4C5" }}
          >
            Vista previa
          </button>
          <button
            onClick={() => setView("notes")}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: GRAD }}
          >
            Guardar nota
          </button>
        </div>
      </div>

      {/* Emoji picker */}
      <div className="mb-6">
        <p className="text-xs font-medium mb-3" style={{ color: "#AAB4C5" }}>Elige un icono</p>
        <div className="flex flex-wrap gap-2">
          {emojis.map((e) => (
            <motion.button
              key={e}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEmoji(e)}
              className="w-10 h-10 text-xl rounded-xl flex items-center justify-center transition-all"
              style={
                selectedEmoji === e
                  ? { background: "rgba(79,124,255,0.18)", border: "2px solid rgba(79,124,255,0.5)" }
                  : { background: "#182134", border: "1px solid rgba(255,255,255,0.06)" }
              }
            >
              {e}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected emoji preview + title */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="text-4xl w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {selectedEmoji}
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué quieres recordar?"
          className="flex-1 text-3xl font-bold bg-transparent outline-none text-white placeholder:text-white/15 leading-tight pt-2"
        />
      </div>

      {/* Editor */}
      <div className="rounded-2xl p-7 mb-6 relative" style={CARD}>
        <div
          className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
          style={{ background: GRAD, opacity: 0.4 }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Empieza a escribir... Añade ideas, referencias, citas o simplemente piensa en voz alta. Tu segundo cerebro está listo."
          className="w-full bg-transparent outline-none text-sm resize-none min-h-52 placeholder:text-white/20"
          style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.9" }}
        />
        <div
          className="pt-4 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs" style={{ color: "#AAB4C5" }}>
            {content.length} caracteres
          </span>
          <span className="mx-1" style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
          <span className="text-xs" style={{ color: "#AAB4C5" }}>
            ~{Math.max(1, Math.round(content.split(" ").filter(Boolean).length / 200))} min lectura
          </span>
        </div>
      </div>

      {/* Block actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {blocks.map(({ icon: Icon, label, color }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl text-xs font-medium transition-all"
            style={{ background: `${color}0e`, border: `1px solid ${color}1e`, color }}
          >
            <Icon size={18} />
            <span className="text-center leading-tight">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tag selection */}
      <div className="rounded-2xl p-5" style={CARD}>
        <p className="text-xs font-semibold text-white mb-3">Etiquetas</p>
        <div className="flex flex-wrap gap-2">
          {recentTags.map((tag) => {
            const active = selectedTags.includes(tag);
            const color = TAG_COLORS[tag] ?? "#AAB4C5";
            return (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTags(active ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
                }
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={
                  active
                    ? { background: `${color}22`, border: `1px solid ${color}50`, color }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#AAB4C5" }
                }
              >
                {active && "✓ "}{tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

function RightPanel({ setView, setSelectedNote }: {
  setView: (v: View) => void;
  setSelectedNote: (n: Note) => void;
}) {
  const favNotes = NOTES.filter((n) => n.isFavorite);

  return (
    <motion.aside
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-68 flex-shrink-0 flex flex-col h-full overflow-y-auto p-5 gap-6 z-10"
      style={{ ...GLASS_RIGHT, width: "17rem", scrollbarWidth: "none" }}
    >
      {/* Recent activity */}
      <div>
        <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2 uppercase tracking-wide">
          <Clock size={12} style={{ color: "#4F7CFF" }} /> Actividad reciente
        </h3>
        <div className="space-y-2">
          {RECENT_ACTIVITY.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "rgba(24,33,52,0.7)" }}
            >
              <span className="text-base flex-shrink-0 mt-0.5">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white leading-tight">
                  <span style={{ color: "#AAB4C5" }}>{a.action} </span>
                  {a.note}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#AAB4C5", fontSize: "10px" }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top tags */}
      <div>
        <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2 uppercase tracking-wide">
          <TrendingUp size={12} style={{ color: "#8B5CFF" }} /> Etiquetas frecuentes
        </h3>
        <div className="space-y-2.5">
          {TOP_TAGS.map(({ name, count, color }) => (
            <div key={name} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-xs flex-shrink-0 w-16" style={{ color: "#AAB4C5" }}>{name}</span>
              <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(count / 42) * 100}%`, background: color, opacity: 0.65 }}
                />
              </div>
              <span className="text-xs w-5 text-right" style={{ color: "#AAB4C5", fontSize: "10px" }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2 uppercase tracking-wide">
          <Zap size={12} style={{ color: "#7DE2D1" }} /> Accesos rápidos
        </h3>
        <div className="space-y-1">
          {favNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => { setSelectedNote(note); setView("detail"); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left hover:bg-white/5 transition-colors group"
            >
              <span className="text-sm">{note.emoji}</span>
              <span className="text-xs flex-1 truncate" style={{ color: "#AAB4C5" }}>{note.title}</span>
              <ChevronRight size={11} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#AAB4C5" }} />
            </button>
          ))}
        </div>
      </div>

      {/* Study streak widget */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(79,124,255,0.09), rgba(139,92,255,0.09))",
          border: "1px solid rgba(79,124,255,0.16)",
        }}
      >
        <div
          className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-20"
          style={{ background: GRAD, borderRadius: "50%", filter: "blur(12px)" }}
        />
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={13} style={{ color: "#4F7CFF" }} />
          <span className="text-xs font-semibold" style={{ color: "#4F7CFF" }}>Racha de estudio</span>
        </div>
        <div className="flex gap-1 mb-2.5">
          {[1, 1, 1, 1, 0, 1, 1].map((active, i) => (
            <div
              key={i}
              className="flex-1 h-5 rounded"
              style={{ background: active ? GRAD : "rgba(255,255,255,0.06)" }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: "#AAB4C5" }}>6 de 7 días esta semana · 🔥 Racha de 14</p>
      </div>

      {/* Abstract knowledge graph teaser */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: "#182134", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Minimal node graph SVG */}
        <svg width="100%" height="80" viewBox="0 0 220 80" fill="none" className="mb-3">
          <circle cx="40" cy="40" r="6" fill="#4F7CFF" fillOpacity="0.8" />
          <circle cx="110" cy="20" r="4" fill="#8B5CFF" fillOpacity="0.7" />
          <circle cx="110" cy="60" r="5" fill="#7DE2D1" fillOpacity="0.7" />
          <circle cx="180" cy="40" r="5" fill="#FFB347" fillOpacity="0.7" />
          <circle cx="75" cy="30" r="3" fill="#FF6B9D" fillOpacity="0.5" />
          <circle cx="150" cy="25" r="3" fill="#4F7CFF" fillOpacity="0.4" />
          <circle cx="145" cy="60" r="3" fill="#8B5CFF" fillOpacity="0.4" />
          <line x1="40" y1="40" x2="110" y2="20" stroke="rgba(79,124,255,0.25)" strokeWidth="1" />
          <line x1="40" y1="40" x2="110" y2="60" stroke="rgba(79,124,255,0.25)" strokeWidth="1" />
          <line x1="40" y1="40" x2="75" y2="30" stroke="rgba(79,124,255,0.2)" strokeWidth="1" />
          <line x1="110" y1="20" x2="180" y2="40" stroke="rgba(139,92,255,0.25)" strokeWidth="1" />
          <line x1="110" y1="60" x2="180" y2="40" stroke="rgba(125,226,209,0.25)" strokeWidth="1" />
          <line x1="110" y1="20" x2="150" y2="25" stroke="rgba(139,92,255,0.2)" strokeWidth="1" />
          <line x1="110" y1="60" x2="145" y2="60" stroke="rgba(125,226,209,0.2)" strokeWidth="1" />
        </svg>
        <p className="text-xs font-semibold text-white mb-0.5">Mapa de conocimiento</p>
        <p className="text-xs" style={{ color: "#AAB4C5" }}>247 notas · 38 conexiones</p>
      </div>
    </motion.aside>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedNote, setSelectedNote] = useState<Note>(NOTES[0]);
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");

  const navigate = (v: View) => {
    setView(v);
    if (v === "dashboard") setActiveNav("dashboard");
    if (v === "notes") setActiveNav("notes");
  };

  const showRightPanel = view !== "create";

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{
        background: "#0B1020",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute", top: "-15%", right: "20%",
            width: "560px", height: "560px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,124,255,0.055) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-20%", left: "15%",
            width: "640px", height: "640px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,255,0.045) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "45%", left: "45%",
            width: "320px", height: "320px", borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(125,226,209,0.025) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setView={navigate}
        onNewNote={() => navigate("create")}
      />

      {/* Main content */}
      <main className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex-1 flex"
          >
            {view === "dashboard" && (
              <DashboardView
                setView={navigate}
                setSelectedNote={setSelectedNote}
                search={search}
                setSearch={setSearch}
              />
            )}
            {view === "notes" && (
              <NotesView
                setView={navigate}
                setSelectedNote={setSelectedNote}
                search={search}
                setSearch={setSearch}
              />
            )}
            {view === "detail" && (
              <DetailView note={selectedNote} onBack={() => navigate("notes")} />
            )}
            {view === "create" && <CreateView setView={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Right panel */}
      {showRightPanel && (
        <RightPanel setView={navigate} setSelectedNote={setSelectedNote} />
      )}
    </div>
  );
}
