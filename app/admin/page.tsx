"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import {
  AdminInfo,
  adminApi,
  clearAdminSession,
  verifyAdmin,
} from "@/lib/adminAuth";
import { GOLD, CARD } from "@/lib/tokens";

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
}

interface Stats {
  total: number;
  enrolled: number;
  notEnrolled: number;
  submitted: number;
  notEnrolledClickedExplore: number;
  bySource: { _id: string; count: number }[];
}

type FilterKey =
  | "all"
  | "enrolled"
  | "notEnrolled"
  | "notEnrolledClicked"
  | "submitted";

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "All visitors",
  enrolled: "Enrolled",
  notEnrolled: "Not enrolled",
  notEnrolledClicked: "Not enrolled + clicked Explore",
  submitted: "Submitted reel",
};

const filterToQuery = (f: FilterKey) => {
  switch (f) {
    case "enrolled":
      return { hasCourses: "true" };
    case "notEnrolled":
      return { hasCourses: "false" };
    case "notEnrolledClicked":
      return { hasCourses: "false", clickedExploreCourses: "true" };
    case "submitted":
      return { hasSubmitted: "true" };
    default:
      return {};
  }
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [stats, setStats] = useState<Stats | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, visitorsRes] = await Promise.all([
        adminApi.get("/lms/iphone-challenge/visitors/stats"),
        adminApi.get("/lms/iphone-challenge/visitors", {
          params: { ...filterToQuery(filter), limit: 500 },
        }),
      ]);
      if (statsRes.data?.success) setStats(statsRes.data.data);
      if (visitorsRes.data?.success) setVisitors(visitorsRes.data.data || []);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (!admin) return;
    loadData();
  }, [admin, loadData]);

  const filteredVisitors = useMemo(() => {
    if (!search.trim()) return visitors;
    const q = search.trim().toLowerCase();
    return visitors.filter(
      (v) =>
        (v.email || "").toLowerCase().includes(q) ||
        (v.name || "").toLowerCase().includes(q) ||
        (v.phone || "").includes(q)
    );
  }, [visitors, search]);

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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={`font-display text-2xl font-extrabold sm:text-3xl ${GOLD}`}>
            iPhone Challenge Analytics
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Signed in as <span className="font-semibold text-white/80">{admin.email}</span>
            {admin.dataRole ? ` · ${admin.dataRole}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/[0.08] disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Users} label="Total visitors" value={stats?.total} tint="#edc168" />
        <StatCard icon={GraduationCap} label="Enrolled" value={stats?.enrolled} tint="#3cb87a" />
        <StatCard icon={UserX} label="Not enrolled" value={stats?.notEnrolled} tint="#e05c3c" />
        <StatCard
          icon={MousePointerClick}
          label="Non-enrolled clicked Explore"
          value={stats?.notEnrolledClickedExplore}
          tint="#7c3aed"
        />
        <StatCard icon={Send} label="Submitted reel" value={stats?.submitted} tint="#3c8fe0" />
      </div>

      {/* Sources */}
      {stats?.bySource && stats.bySource.length > 0 && (
        <div className={`${CARD} mb-8 p-5`}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#edc168]">
            Traffic Sources
          </h2>
          <div className="flex flex-wrap gap-2">
            {stats.bySource.map((s) => (
              <div
                key={s._id || "unknown"}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs"
              >
                <span className="font-semibold text-white/80">
                  {s._id || "unknown"}
                </span>
                <span className="rounded-full bg-[#edc168]/20 px-2 py-0.5 font-bold text-[#edc168]">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters + search */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(Object.keys(FILTER_LABELS) as FilterKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === k
                ? "bg-[#edc168] text-[#2B0A30]"
                : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
            }`}
          >
            {FILTER_LABELS[k]}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search email / name / phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded-lg border border-white/10 bg-white/[0.04] py-2 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#edc168]/60"
          />
        </div>
      </div>

      {/* Table */}
      <div className={`${CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Enrolled</th>
                <th className="px-4 py-3 font-semibold">Visits</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Explore Clicks</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
                <th className="px-4 py-3 font-semibold">First Seen</th>
                <th className="px-4 py-3 font-semibold">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {loading && filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-white/50">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              )}
              {!loading && filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-white/50">
                    No visitors match this filter.
                  </td>
                </tr>
              )}
              {filteredVisitors.map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white/90">{v.name || "—"}</div>
                    <div className="text-xs text-white/50">{v.email || "—"}</div>
                    {v.phone && <div className="text-xs text-white/40">{v.phone}</div>}
                  </td>
                  <td className="px-4 py-3">
                    {v.hasCourses ? (
                      <Badge color="green">Yes</Badge>
                    ) : (
                      <Badge color="red">No</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-white/80">{v.visitCount ?? 0}</td>
                  <td className="px-4 py-3 text-xs text-white/70">{v.source || "—"}</td>
                  <td className="px-4 py-3 font-mono text-white/80">
                    {v.exploreCoursesClicks ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    {v.hasSubmitted ? (
                      <div className="flex flex-col gap-1">
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
        <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-white/50">
          Showing {filteredVisitors.length} of {visitors.length} loaded
          {stats ? ` (total in DB: ${stats.total})` : ""}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | undefined;
  tint: string;
}) {
  return (
    <div className={`${CARD} p-4`}>
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${tint}20` }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {label}
          </div>
          <div className="mt-0.5 text-2xl font-extrabold text-white">
            {value === undefined ? "—" : value.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ color, children }: { color: "green" | "red" | "blue" | "gray"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-500/15 text-green-300 border-green-500/30",
    red: "bg-red-500/15 text-red-300 border-red-500/30",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    gray: "bg-white/5 text-white/50 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${map[color]}`}
    >
      {children}
    </span>
  );
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
