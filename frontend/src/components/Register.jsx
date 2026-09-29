// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// import { getErrorMessage } from "../api/client.js";

// const ROLES = ["STUDENT", "LECTURER", "ADMIN"];

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "STUDENT" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await register(form);
//       setSuccess(true);
//       setTimeout(() => navigate("/login"), 1200);
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-ink px-4">
//       <div className="w-full max-w-sm">
//         <div className="text-center mb-8">
//           <p className="font-display text-3xl text-paper tracking-tight">Cortex</p>
//           <p className="text-sm text-slate-soft mt-1">Result Collation System</p>
//         </div>

//         <div className="rounded-lg bg-paper-raised border border-white/10 px-7 py-8 shadow-xl">
//           <h1 className="font-normal text-xl text-ink mb-1">Create an account</h1>
//           <p className="text-sm text-slate mb-6">Register, then an admin will set up your academic profile.</p>

//           {success ? (
//             <p className="rounded-md bg-approved-soft border border-approved/30 px-3 py-3 text-sm text-approved">
//               Account created. Redirecting to sign in…
//             </p>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
//                   Full name
//                 </label>
//                 <input
//                   id="name"
//                   required
//                   value={form.name}
//                   onChange={(e) => update("name", e.target.value)}
//                   placeholder="Chidinma Okafor"
//                   className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brass"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => update("email", e.target.value)}
//                   placeholder="you@university.edu"
//                   className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brass"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   required
//                   value={form.password}
//                   onChange={(e) => update("password", e.target.value)}
//                   placeholder="At least 8 characters"
//                   className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brass"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="role" className="block text-sm font-medium text-ink mb-1.5">
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   value={form.role}
//                   onChange={(e) => update("role", e.target.value)}
//                   className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brass"
//                 >
//                   {ROLES.map((r) => (
//                     <option key={r} value={r}>
//                       {r.charAt(0) + r.slice(1).toLowerCase()}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {error && (
//                 <p className="rounded-md bg-rejected-soft border border-rejected/30 px-3 py-2 text-sm text-rejected">
//                   {error}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-md bg-ink py-2.5 text-sm font-medium text-paper hover:bg-ink-light transition-colors disabled:opacity-60"
//               >
//                 {loading ? "Creating account…" : "Create account"}
//               </button>
//             </form>
//           )}

//           <p className="mt-6 text-center text-sm text-slate">
//             Already have an account?{" "}
//             <Link to="/login" className="text-brass-dark font-medium hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
