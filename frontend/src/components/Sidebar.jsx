// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// const NAV_SECTIONS = [
//   {
//     label: "Overview",
//     items: [{ to: "/", label: "Dashboard" }],
//   },
//   {
//     label: "Institution",
//     items: [
//       { to: "/faculties", label: "Faculties" },
//       { to: "/departments", label: "Departments" },
//     ],
//   },
//   {
//     label: "Academic calendar",
//     items: [
//       { to: "/sessions", label: "Sessions" },
//       { to: "/semesters", label: "Semesters" },
//     ],
//   },
//   {
//     label: "Curriculum",
//     items: [
//       { to: "/courses", label: "Courses" },
//       { to: "/offerings", label: "Course Offerings" },
//     ],
//   },
//   {
//     label: "People",
//     items: [
//       { to: "/lecturers", label: "Lecturers" },
//       { to: "/students", label: "Students" },
//     ],
//   },
//   {
//     label: "Records",
//     items: [
//       { to: "/enrollments", label: "Enrollments" },
//       { to: "/results", label: "Results" },
//     ],
//   },
// ];

// export const Sidebar = ({ open, onClose }) => {
//   const { user, logout } = useAuth();

//   return (
//     <>
//       {open && (
//         <button
//           aria-label="Close menu"
//           onClick={onClose}
//           className="fixed inset-0 z-30 bg-ink/40 md:hidden"
//         />
//       )}
//       <aside
//         className={`fixed z-40 inset-y-0 left-0 w-72 shrink-0 bg-ink text-paper flex flex-col transition-transform duration-200 md:static md:translate-x-0 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="px-6 py-6 border-b border-white/10">
//           <p className="font-display text-xl tracking-tight">Cortex</p>
//           <p className="text-xs text-slate-soft mt-0.5">Result Collation System</p>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
//           {NAV_SECTIONS.map((section) => (
//             <div key={section.label}>
//               <p className="px-3 text-[11px] text-slate-soft mb-1.5">{section.label}</p>
//               <div className="space-y-0.5">
//                 {section.items.map((item) => (
//                   <NavLink
//                     key={item.to}
//                     to={item.to}
//                     end={item.to === "/"}
//                     onClick={onClose}
//                     className={({ isActive }) =>
//                       `block rounded-md px-3 py-2 text-sm transition-colors ${
//                         isActive
//                           ? "bg-brass text-ink font-medium"
//                           : "text-paper/85 hover:bg-white/5"
//                       }`
//                     }
//                   >
//                     {item.label}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-white/10 px-4 py-4">
//         <p className="text-xs  truncate py-1.5 text-yellow-500">{user?.role || "admin"}</p> 
//           <div className="flex items-center gap-2">
//             <p className="text-sm truncate text-slate-200">{user?.name || "Signed in"}</p>
//             {user?.role && (
//               <span className="shrink-0 rounded-full bg-brass/20 text-brass px-2 py-0.5 text-[10px] font-medium tracking-wide">
//                 {user.role}
//               </span>
//             )}
//           </div>
//           <p className="text-xs text-slate-soft truncate">{user?.email || ""}</p>
          
//           <button
//             onClick={logout}
//             className="mt-3 w-full rounded-md border border-white/15 py-1.5 text-sm text-paper/90 hover:bg-white/5 transition-colors"
//           >
//             Sign out
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };


import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", roles: ["ADMIN", "LECTURER", "STUDENT"] }],
  },
  {
    label: "Institution",
    items: [
      { to: "/faculties", label: "Faculties", roles: ["ADMIN"] },
      { to: "/departments", label: "Departments", roles: ["ADMIN"] },
    ],
  },
  {
    label: "Academic calendar",
    items: [
      { to: "/sessions", label: "Sessions", roles: ["ADMIN"] },
      { to: "/semesters", label: "Semesters", roles: ["ADMIN"] },
    ],
  },
  {
    label: "Curriculum",
    items: [
      { to: "/courses", label: "Courses", roles: ["ADMIN", "LECTURER"] },
      { to: "/offerings", label: "Course Offerings", roles: ["ADMIN"] },
    ],
  },
  {
    label: "People",
    items: [
      { to: "/lecturers", label: "Lecturers", roles: ["ADMIN"] },
      { to: "/students", label: "Students", roles: ["ADMIN", "LECTURER"] },
    ],
  },
  {
    label: "Records",
    items: [
      { to: "/enrollments", label: "Enrollments", roles: ["ADMIN"] },
      { to: "/results", label: "Results", roles: ["ADMIN", "LECTURER", "STUDENT"] },
    ],
  },
];

export const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const role = user?.role;

  // Filter items by role first, then drop any section left with zero items
  const visibleSections = NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink/40 md:hidden"
        />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 shrink-0 bg-ink text-paper flex flex-col transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-display text-xl tracking-tight">Cortex</p>
          <p className="text-xs text-slate-soft mt-0.5">Result Collation System</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {visibleSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[11px] text-slate-soft mb-1.5">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-brass text-ink font-medium"
                          : "text-paper/85 hover:bg-white/5"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <p className="text-sm truncate text-slate-200">{user?.name || "Signed in"}</p>
            {role && (
              <span className="shrink-0 rounded-full bg-brass/20 text-brass px-2 py-0.5 text-[10px] font-medium tracking-wide">
                {role}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-soft truncate">{user?.email || ""}</p>

          <button
            onClick={logout}
            className="mt-3 w-full rounded-md border border-white/15 py-1.5 text-sm text-paper/90 hover:bg-white/5 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};