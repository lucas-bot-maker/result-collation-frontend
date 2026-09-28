import { useEffect, useState } from "react";
import { api, getErrorMessage } from "../api/client.js";
import { getPath } from "../config/resourceConfig.js";

const buildInitialState = (fields, initialValues) => {
  const state = {};
  fields.forEach((f) => {
    state[f.name] = initialValues?.[f.name] ?? "";
  });
  return state;
};

export const ResourceForm = ({ fields, initialValues, submitLabel, onSubmit, onCancel }) => {
  const [values, setValues] = useState(() => buildInitialState(fields, initialValues));
  const [options, setOptions] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const selectFields = fields.filter((f) => f.type === "select" && f.optionsEndpoint);
    if (selectFields.length === 0) return;

    let cancelled = false;
    Promise.all(
      selectFields.map((f) =>
        api.get(f.optionsEndpoint).then((res) => ({
          name: f.name,
          list: Array.isArray(res.data) ? res.data : res.data?.data || [],
        })),
      ),
    ).then((results) => {
      if (cancelled) return;
      const next = {};
      results.forEach((r) => {
        next[r.name] = r.list;
      });
      setOptions(next);
    });

    return () => {
      cancelled = true;
    };
  }, [fields]);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = { ...values };
      fields.forEach((f) => {
        if (f.type === "number" && payload[f.name] !== "") {
          payload[f.name] = Number(payload[f.name]);
        }
      });
      await onSubmit(payload);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-ink mb-1.5" htmlFor={field.name}>
            {field.label}
          </label>

          {field.type === "select" ? (
            <select
              id={field.name}
              required={field.required}
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink focus:border-brass"
            >
              <option value="" disabled>
                Select {field.label.toLowerCase()}…
              </option>
              {(options[field.name] || []).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {field.optionLabelFn ? field.optionLabelFn(opt) : getPath(opt, field.optionLabel) ?? opt.id}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type === "number" ? "number" : "text"}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink placeholder:text-slate-soft focus:border-brass"
            />
          )}

          {field.helpText && <p className="mt-1 text-xs text-slate">{field.helpText}</p>}
        </div>
      ))}

      {error && (
        <p className="rounded-md bg-rejected-soft border border-rejected/30 px-3 py-2 text-sm text-rejected">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-line px-4 py-2 text-sm text-ink hover:bg-paper transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-ink px-4 py-2 text-sm text-paper hover:bg-ink-light transition-colors disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
};
