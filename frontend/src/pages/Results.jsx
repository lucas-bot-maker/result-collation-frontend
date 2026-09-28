import { useEffect, useState } from "react";
import { Layout } from "../components/Layout.jsx";
import { Topbar } from "../components/Topbar.jsx";
import { DataTable } from "../components/DataTable.jsx";
import { Modal } from "../components/Modal.jsx";
import { ResourceForm } from "../components/ResourceForm.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { api, getErrorMessage } from "../api/client.js";
import { useRole } from "../context/AuthContext.jsx";

const FIELDS = [
  {
    name: "enrollmentId",
    label: "Enrollment",
    type: "select",
    required: true,
    optionsEndpoint: "/enrollment",
    optionLabelFn: (o) => `${o.student?.matricNo || o.studentId} — ${o.offering?.course?.code || ""}`,
  },
  { name: "caScore", label: "CA Score", type: "number", required: true, placeholder: "20" },
  { name: "examScore", label: "Exam Score", type: "number", required: true, placeholder: "55" },
];

const COLUMNS = [
  { key: "enrollment.student.matricNo", label: "Matric No" },
  { key: "enrollment.offering.course.code", label: "Course" },
  { key: "caScore", label: "CA" },
  { key: "examScore", label: "Exam" },
  { key: "totalScore", label: "Total" },
  { key: "grade", label: "Grade" },
  { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
];

export default function Results() {
  const { canManage } = useRole();
  const [rows, setRows] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/result");
      setRows(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
      setRows([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (payload) => {
    await api.post("/result", payload);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (row) => {
    // if (!window.confirm("Delete this result? This cannot be undone.")) return;
    try {
      await api.delete(`/result/${row.id}`);
      load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const setStatus = async (row, action) => {
    setBusyId(row.id);
    try {
      await api.patch(`/result/${row.id}/${action}`);
      load();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Layout>
      {({ onMenuClick }) => (
        <>
          <Topbar
            title="Results"
            subtitle={`${rows?.length ?? "…"} record${rows?.length === 1 ? "" : "s"} · pending results need approval`}
            onMenuClick={onMenuClick}
            action={
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
              >
                New Result
              </button>
            }
          />

          <main className="flex-1 px-5 py-6 md:px-8">
            {error && (
              <p className="mb-4 rounded-md bg-rejected-soft border border-rejected/30 px-3 py-2 text-sm text-rejected">
                {error}
              </p>
            )}

            <DataTable
              columns={COLUMNS}
              rows={rows}
              onDelete={handleDelete}
              extraActions={(row) =>
                row.status === "PENDING" ? (
                  <div className="flex items-center gap-3">
                    <button
                      disabled={busyId === row.id}
                      onClick={() => setStatus(row, "approve")}
                      className="text-approved hover:underline text-sm disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      disabled={busyId === row.id}
                      onClick={() => setStatus(row, "reject")}
                      className="text-rejected hover:underline text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                ) : null
              }
            />
          </main>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Result">
            <ResourceForm
              fields={FIELDS}
              submitLabel="Submit result"
              onSubmit={handleCreate}
              onCancel={() => setModalOpen(false)}
            />
          </Modal>
        </>
      )}
    </Layout>
  );
}

