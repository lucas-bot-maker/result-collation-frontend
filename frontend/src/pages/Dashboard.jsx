import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { Topbar } from "../components/Topbar.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

const SUMMARY_CARDS = [
  { key: "faculty", label: "Faculties", to: "/faculties" },
  { key: "department", label: "Departments", to: "/departments" },
  { key: "course", label: "Courses", to: "/courses" },
  { key: "student", label: "Students", to: "/students" },
  { key: "lecturer", label: "Lecturers", to: "/lecturers" },
  { key: "result", label: "Results", to: "/results" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});
  const [recentResults, setRecentResults] = useState(null);

  useEffect(() => {
    SUMMARY_CARDS.forEach((card) => {
      api
        .get(`/${card.key}`)
        .then((res) => {
          const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setCounts((prev) => ({ ...prev, [card.key]: list.length }));
          if (card.key === "result") setRecentResults(list.slice(0, 6));
        })
        .catch(() => {
          setCounts((prev) => ({ ...prev, [card.key]: null }));
          if (card.key === "result") setRecentResults([]);
        });
    });
  }, []);

  return (
    <Layout>
      {({ onMenuClick }) => (
        <>
          <Topbar
            title="Dashboard"
            subtitle={user?.name ? `Welcome back, ${user.name}` : "An overview of your institution's records"}
            onMenuClick={onMenuClick}
          />

          <main className="flex-1 px-5 py-6 md:px-8 space-y-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {SUMMARY_CARDS.map((card) => (
                <Link
                  key={card.key}
                  to={card.to}
                  className="rounded-lg border border-line bg-paper-raised px-4 py-4 hover:border-brass transition-colors"
                >
                  <p className="text-2xl font-display text-ink">
                    {counts[card.key] === undefined ? "…" : counts[card.key] ?? "—"}
                  </p>
                  <p className="text-xs text-slate mt-1">{card.label}</p>
                </Link>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg text-ink">Recent results</h2>
                <Link to="/results" className="text-sm text-brass-dark hover:underline">
                  View all
                </Link>
              </div>

              <div className="rounded-lg border border-line bg-paper-raised overflow-hidden">
                {recentResults === null ? (
                  <p className="p-6 text-sm text-slate">Loading…</p>
                ) : recentResults.length === 0 ? (
                  <p className="p-6 text-sm text-slate">No results submitted yet.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line bg-paper text-left text-slate">
                        <th className="px-4 py-3 font-medium">Matric No</th>
                        <th className="px-4 py-3 font-medium">Course</th>
                        <th className="px-4 py-3 font-medium">Total</th>
                        <th className="px-4 py-3 font-medium">Grade</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentResults.map((r) => (
                        <tr key={r.id} className="border-b border-line last:border-0">
                          <td className="px-4 py-3">{r.enrollment?.student?.matricNo || "—"}</td>
                          <td className="px-4 py-3">{r.enrollment?.offering?.course?.code || "—"}</td>
                          <td className="px-4 py-3">{r.totalScore}</td>
                          <td className="px-4 py-3">{r.grade}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={r.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </Layout>
  );
}
