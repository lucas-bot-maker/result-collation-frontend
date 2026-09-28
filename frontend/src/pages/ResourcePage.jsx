import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { Topbar } from "../components/Topbar.jsx";
import { DataTable } from "../components/DataTable.jsx";
import { Modal } from "../components/Modal.jsx";
import { ResourceForm } from "../components/ResourceForm.jsx";
import { api, getErrorMessage } from "../api/client.js";
import { resourceConfig } from "../config/resourceConfig.js";
import { useRole } from "../context/AuthContext.jsx";

export default function ResourcePage({ resourceKey }) {
  const config = resourceConfig[resourceKey];
  const { role } = useRole();
const canManage = (config.manageRoles ?? ["ADMIN", "LECTURER"]).includes(role);
  const [rows, setRows] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [error, setError] = useState("");


  

  const load = async () => {
    try {
      const res = await api.get(config.endpoint);
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setRows(list);
    } catch (err) {
      setError(getErrorMessage(err));
      setRows([]);
    }
  };

  useEffect(() => {
    setRows(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  const openCreate = () => {
    setEditingRow(null);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingRow(row);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (editingRow) {
      await api.patch(`${config.endpoint}/${editingRow.id}`, payload);
    } else {
      await api.post(config.endpoint, payload);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (row) => {
    // if (
    //   !window.confirm(
    //     `Delete this ${config.singular.toLowerCase()}? This cannot be undone.`,
    //   )
    // )
    //   return;
    try {
      await api.delete(`${config.endpoint}/${row.id}`);
      load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <Layout>
      {({ onMenuClick }) => (
        <>
          {/* <Topbar
            title={config.label}
            subtitle={`${rows?.length ?? "…"} record${rows?.length === 1 ? "" : "s"}`}
            onMenuClick={onMenuClick}
            action={
              <button
                onClick={openCreate}
                className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
              >
                New {config.singular}
              </button>
            }
          /> */}
          <Topbar
            title={config.label}
            subtitle={`${rows?.length ?? "…"} record${rows?.length === 1 ? "" : "s"}`}
            onMenuClick={onMenuClick}
            action={
              canManage ? (
                <button
                  onClick={openCreate}
                  className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light transition-colors"
                >
                  New {config.singular}
                </button>
              ) : null
            }
          />

          <main className="flex-1 px-5 py-6 md:px-8">
            {error && (
              <p className="mb-4 rounded-md bg-rejected-soft border border-rejected/30 px-3 py-2 text-sm text-rejected">
                {error}
              </p>
            )}
            {/* <DataTable
              columns={config.columns}
              rows={rows}
              onEdit={openEdit}
              onDelete={handleDelete}
            /> */}
            <DataTable
              columns={config.columns}
              rows={rows}
              onEdit={canManage ? openEdit : undefined}
              onDelete={canManage ? handleDelete : undefined}
            />
          </main>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={
              editingRow ? `Edit ${config.singular}` : `New ${config.singular}`
            }
          >
            <ResourceForm
              fields={config.fields}
              initialValues={editingRow}
              submitLabel={editingRow ? "Save changes" : "Create"}
              onSubmit={handleSubmit}
              onCancel={() => setModalOpen(false)}
            />
          </Modal>
        </>
      )}
    </Layout>
  );
}
