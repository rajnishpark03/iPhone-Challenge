"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  GraduationCap,
  UserX,
  Send,
  MousePointerClick,
  LogOut,
  Loader2,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Filter,
  PartyPopper,
} from "lucide-react";
import {
  AdminInfo,
  adminApi,
  clearAdminSession,
  verifyAdmin,
} from "@/lib/adminAuth";

interface Visitor {
  _id: string;
  userId: string;
  email?: string;
  name?: string;
  phone?: string;
  hasCourses?: boolean;
  visitCount?: number;
  firstSeenAt?: string;
  lastSeenAt?: string;
  visitedDashboard?: boolean;
  visitedSubmit?: boolean;
  visitedNotEnrolled?: boolean;
  clickedExploreCourses?: boolean;
  exploreCoursesClicks?: number;
  hasSubmitted?: boolean;
  submittedAt?: string;
  reelLink?: string;
  source?: string;
  registered?: boolean;
  registeredAt?: string;
}

interface Stats {
  total: number;
  enrolled: number;
  notEnrolled: number;
  registered: number;
  submitted: number;
  notEnrolledClickedExplore: number;
  bySource: { _id: string; count: number }[];
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

type FilterKey =
  | "all"
  | "enrolled"
  | "notEnrolled"
  | "notEnrolledClicked"
  | "registered"
  | "submitted";

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "All",
  enrolled: "Enrolled",
  notEnrolled: "Not enrolled",
  notEnrolledClicked: "Non-enrolled + clicked",
  registered: "Registered (participating)",
  submitted: "Submitted",
};

const filterToQuery = (f: FilterKey) => {
  switch (f) {
    case "enrolled":
      return { hasCourses: "true" };
    case "notEnrolled":
      return { hasCourses: "false" };
    case "notEnrolledClicked":
      return { hasCourses: "false", clickedExploreCourses: "true" };
    case "registered":
      return { registered: "true" };
    case "submitted":
      return { hasSubmitted: "true" };
    default:
      return {};
  }
};

const PAGE_SIZES = [10, 25, 50, 100];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [stats, setStats] = useState<Stats | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Auth guard
  useEffect(() => {
    verifyAdmin().then((a) => {
      if (!a) {
        router.replace("/admin/login");
        return;
      }
      setAdmin(a);
      setAuthChecking(false);
    });
  }, [router]);

  // Debounce search input → search
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchInput]);

  // Reset page when filter/pageSize changes
  useEffect(() => {
    setPage(1);
  }, [filter, pageSize]);

  const loadStats = useCallback(async () => {
    try {
      const res = await adminApi.get("/lms/iphone-challenge/visitors/stats");
      if (res.data?.success) setStats(res.data.data);
    } catch {
      /* silently */
    }
  }, []);

  const loadVisitors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/lms/iphone-challenge/visitors", {
        params: {
          ...filterToQuery(filter),
          search: search || undefined,
          page,
          pageSize,
        },
      });
      if (res.data?.success) {
        setVisitors(res.data.data || []);
        setPagination(res.data.pagination || null);
      }
    } catch {
      /* silently */
    } finally {
      setLoading(false);
    }
  }, [filter, search, page, pageSize]);

  useEffect(() => {
    if (!admin) return;
    loadStats();
  }, [admin, loadStats]);

  useEffect(() => {
    if (!admin) return;
    loadVisitors();
  }, [admin, loadVisitors]);

  const refresh = () => {
    loadStats();
    loadVisitors();
  };

  const handleLogout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  if (authChecking || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#edc168]" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,#3a1042_0%,#170a1c_55%,#0b060f_100%)]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#edc168]/5 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-[#7c3aed]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edc168]/20 bg-[#edc168]/10">
              <Sparkles className="h-6 w-6 text-[#edc168]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold bg-gradient-to-r from-[#f8e3a6] via-[#edc168] to-[#d99a2b] bg-clip-text text-transparent sm:text-3xl">
                iPhone Challenge Analytics
              </h1>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">
                Signed in as{" "}
                <span className="font-semibold text-white/70">{admin.email}</span>
                {admin.dataRole ? (
                  <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/60">
                    {admin.dataRole}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard
            icon={Users}
            label="Total visitors"
            value={stats?.total}
            tint="#edc168"
          />
          <StatCard
            icon={PartyPopper}
            label="Registered"
            value={stats?.registered}
            tint="#f472b6"
            sub={
              stats && stats.enrolled
                ? `${Math.round((stats.registered / stats.enrolled) * 100)}% of enrolled`
                : undefined
            }
          />
          <StatCard
            icon={GraduationCap}
            label="Enrolled"
            value={stats?.enrolled}
            tint="#3cb87a"
            sub={
              stats && stats.total
                ? `${Math.round((stats.enrolled / stats.total) * 100)}%`
                : undefined
            }
          />
          <StatCard
            icon={UserX}
            label="Not enrolled"
            value={stats?.notEnrolled}
            tint="#e05c3c"
            sub={
              stats && stats.total
                ? `${Math.round((stats.notEnrolled / stats.total) * 100)}%`
                : undefined
            }
          />
          <StatCard
            icon={MousePointerClick}
            label="Clicked Explore"
            value={stats?.notEnrolledClickedExplore}
            tint="#7c3aed"
            sub={
              stats && stats.notEnrolled
                ? `${Math.round(
                    (stats.notEnrolledClickedExplore / stats.notEnrolled) * 100
                  )}% of non-enrolled`
                : undefined
            }
          />
          <StatCard
            icon={Send}
            label="Submitted reel"
            value={stats?.submitted}
            tint="#3c8fe0"
            sub={
              stats && stats.enrolled
                ? `${Math.round((stats.submitted / stats.enrolled) * 100)}% of enrolled`
                : undefined
            }
          />
        </div>

        {/* Sources */}
        {stats?.bySource && stats.bySource.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#edc168]">
              <Filter className="h-3.5 w-3.5" />
              Traffic Sources
            </h2>
            <div className="flex flex-wrap gap-2">
              {stats.bySource.map((s) => (
                <SourcePill key={s._id || "unknown"} name={s._id} count={s.count} />
              ))}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(FILTER_LABELS) as FilterKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === k
                    ? "bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33] shadow-[0_4px_16px_-4px_rgba(231,170,58,0.55)]"
                    : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/90"
                }`}
              >
                {FILTER_LABELS[k]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search email, name, phone…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-72 rounded-lg border border-white/10 bg-white/[0.04] py-2 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#edc168]/60"
              />
            </div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 outline-none focus:border-[#edc168]/60"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n} className="bg-[#2b0a30]">
                  {n} / page
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Enrolled</th>
                  <th className="px-4 py-3 font-semibold">Participating</th>
                  <th className="px-4 py-3 text-center font-semibold">Visits</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Explore
                  </th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">First Seen</th>
                  <th className="px-4 py-3 font-semibold">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-white/50">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#edc168]" />
                    </td>
                  </tr>
                )}
                {!loading && visitors.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center gap-2 text-white/50">
                        <Search className="h-8 w-8 text-white/20" />
                        <p className="font-semibold">No visitors found</p>
                        <p className="text-xs">
                          Try adjusting the filter or search query.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading &&
                  visitors.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={v.name || v.email || "?"} />
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-white/90">
                              {v.name || "—"}
                            </div>
                            <div className="truncate text-xs text-white/50">
                              {v.email || "—"}
                            </div>
                            {v.phone && (
                              <div className="truncate text-xs text-white/40">
                                {v.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {v.hasCourses ? (
                          <Badge color="green">Yes</Badge>
                        ) : (
                          <Badge color="red">No</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {v.registered ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-pink-500/40 bg-pink-500/10 px-2 py-0.5 text-xs font-semibold text-pink-300">
                            <PartyPopper className="h-3 w-3" />
                            Yes
                          </span>
                        ) : (
                          <Badge color="gray">No</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-sm text-white/80">
                        {v.visitCount ?? 0}
                      </td>
                      <td className="px-4 py-3">
                        <SourcePill name={v.source} compact />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {v.exploreCoursesClicks && v.exploreCoursesClicks > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-300">
                            <MousePointerClick className="h-3 w-3" />
                            {v.exploreCoursesClicks}
                          </span>
                        ) : (
                          <span className="text-xs text-white/30">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {v.hasSubmitted ? (
                          <div className="flex flex-col items-start gap-1">
                            <Badge color="blue">Yes</Badge>
                            {v.reelLink && (
                              <a
                                href={v.reelLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#edc168] hover:underline"
                              >
                                Reel <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <Badge color="gray">No</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-white/60">
                        {formatDate(v.firstSeenAt)}
                      </td>
                      <td className="px-4 py-3 text-xs text-white/60">
                        {formatDate(v.lastSeenAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-3 text-xs sm:flex-row">
            <div className="text-white/50">
              {pagination ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-white/80">
                    {(pagination.page - 1) * pagination.pageSize + 1}–
                    {Math.min(
                      pagination.page * pagination.pageSize,
                      pagination.total
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-white/80">
                    {pagination.total.toLocaleString()}
                  </span>
                </>
              ) : (
                "—"
              )}
            </div>
            <Pager pagination={pagination} onChange={setPage} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── UI subcomponents ───────────────

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | undefined;
  tint: string;
  sub?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all hover:border-white/[0.15]">
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: tint }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${tint}22`, color: tint }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[10px] font-semibold uppercase tracking-widest text-white/50">
            {label}
          </div>
          <div className="mt-0.5 text-2xl font-extrabold text-white">
            {value === undefined ? "—" : value.toLocaleString()}
          </div>
          {sub && <div className="text-[11px] text-white/40">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function Badge({
  color,
  children,
}: {
  color: "green" | "red" | "blue" | "gray";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    green: "bg-green-500/10 text-green-300 border-green-500/30",
    red: "bg-red-500/10 text-red-300 border-red-500/30",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    gray: "bg-white/5 text-white/40 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${map[color]}`}
    >
      {children}
    </span>
  );
}

function SourcePill({
  name,
  count,
  compact,
}: {
  name?: string | null;
  count?: number;
  compact?: boolean;
}) {
  const key = (name || "unknown").toLowerCase();
  const color = hashColor(key);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        compact ? "" : ""
      }`}
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}18`,
        color: color,
      }}
    >
      <span className="truncate">{name || "unknown"}</span>
      {count !== undefined && (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white/90"
          style={{ backgroundColor: `${color}55` }}
        >
          {count}
        </span>
      )}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const letter = (name.match(/[a-zA-Z]/)?.[0] || "?").toUpperCase();
  const bg = hashColor(name);
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: bg }}
    >
      {letter}
    </div>
  );
}

function Pager({
  pagination,
  onChange,
  disabled,
}: {
  pagination: Pagination | null;
  onChange: (page: number) => void;
  disabled?: boolean;
}) {
  if (!pagination) return null;
  const { page, totalPages, hasPrev, hasNext } = pagination;

  const pages = getPageWindow(page, totalPages);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={!hasPrev || disabled}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-white/40">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            disabled={disabled}
            className={`flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors ${
              p === page
                ? "bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33]"
                : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={!hasNext || disabled}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─────────────── Helpers ───────────────

function getPageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

const COLOR_PALETTE = [
  "#edc168",
  "#3cb87a",
  "#e05c3c",
  "#7c3aed",
  "#3c8fe0",
  "#e03cb8",
  "#3cbce0",
  "#e07c3c",
  "#f472b6",
  "#a78bfa",
];
function hashColor(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return COLOR_PALETTE[Math.abs(h) % COLOR_PALETTE.length];
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}
