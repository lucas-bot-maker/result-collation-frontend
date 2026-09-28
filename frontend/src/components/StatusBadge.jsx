const STYLES = {
  PENDING: "bg-pending-soft text-pending border-pending/30",
  APPROVED: "bg-approved-soft text-approved border-approved/30",
  REJECTED: "bg-rejected-soft text-rejected border-rejected/30",
};

export const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      STYLES[status] || "bg-line text-slate border-line"
    }`}
  >
    {status}
  </span>
);
