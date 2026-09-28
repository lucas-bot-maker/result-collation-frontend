// Each entry describes one resource end-to-end: where it lives on the API,
// how its table renders, and what its create/edit form asks for.
//
// column.key supports dot-paths into nested include'd data
// (e.g. "department.faculty.name") since most of the backend's GET-all
// routes already include related records.
//
// field.type: "text" | "number" | "select"
// select fields fetch `optionsEndpoint`, then build a label with
// `optionLabel` (a dot-path string) or `optionLabelFn` (a function),
// and use `optionValue` (default "id") as the stored value.



export const resourceConfig = {
  faculty: {
    label: "Faculties",
    singular: "Faculty",
    endpoint: "/faculty",
    manageRoles: ["ADMIN"], 
    columns: [{ key: "name", label: "Name" }],
    fields: [{ name: "name", label: "Name", type: "text", required: true, placeholder: "Faculty of Science" }],
  },

  department: {
    label: "Departments",
    singular: "Department",
    endpoint: "/department",
    manageRoles: ["ADMIN"], 
    columns: [
      { key: "name", label: "Name" },
      { key: "faculty.name", label: "Faculty" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Computer Science" },
      {
        name: "facultyId",
        label: "Faculty",
        type: "select",
        required: true,
        optionsEndpoint: "/faculty",
        optionLabel: "name",
      },
    ],
  },

  session: {
    label: "Sessions",
    singular: "Session",
    endpoint: "/session",
    manageRoles: ["ADMIN"], 
    columns: [{ key: "name", label: "Session" }],
    fields: [{ name: "name", label: "Session", type: "text", required: true, placeholder: "2025/2026" }],
  },

  semester: {
    label: "Semesters",
    singular: "Semester",
    endpoint: "/semester",
    manageRoles: ["ADMIN"], 
    columns: [
      { key: "name", label: "Semester" },
      { key: "session.name", label: "Session" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "First" },
      {
        name: "sessionId",
        label: "Session",
        type: "select",
        required: true,
        optionsEndpoint: "/session",
        optionLabel: "name",
      },
    ],
  },

  course: {
    label: "Courses",
    singular: "Course",
    endpoint: "/course",
     manageRoles: ["ADMIN"],
    columns: [
      { key: "code", label: "Code" },
      { key: "title", label: "Title" },
      { key: "unit", label: "Unit" },
      { key: "department.name", label: "Department" },
    ],
    fields: [
      { name: "code", label: "Code", type: "text", required: true, placeholder: "CSC301" },
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Data Structures and Algorithms" },
      { name: "unit", label: "Unit", type: "number", required: true, placeholder: "3" },
      {
        name: "departmentId",
        label: "Department",
        type: "select",
        required: true,
        optionsEndpoint: "/department",
        optionLabel: "name",
      },
    ],
  },

  lecturer: {
    label: "Lecturers",
    singular: "Lecturer",
    endpoint: "/lecturer",
    columns: [
      { key: "user.name", label: "Name" },
      { key: "user.email", label: "Email" },
      { key: "department.name", label: "Department" },
    ],
    fields: [
      {
        name: "userId",
        label: "User ID",
        type: "text",
        required: true,
        helpText: "The id of a registered account with role LECTURER.",
      },
      {
        name: "departmentId",
        label: "Department",
        type: "select",
        required: true,
        optionsEndpoint: "/department",
        optionLabel: "name",
      },
    ],
  },

  student: {
    label: "Students",
    singular: "Student",
    endpoint: "/student",
    manageRoles: ["ADMIN"], 
    columns: [
      { key: "user.name", label: "Name" },
      { key: "matricNo", label: "Matric No" },
      { key: "department.name", label: "Department" },
      { key: "level", label: "Level" },
    ],
    fields: [
      {
        name: "userId",
        label: "User ID",
        type: "text",
        required: true,
        helpText: "The id of a registered account with role STUDENT.",
      },
      { name: "matricNo", label: "Matric No", type: "text", required: true, placeholder: "CSC/2021/045" },
      {
        name: "departmentId",
        label: "Department",
        type: "select",
        required: true,
        optionsEndpoint: "/department",
        optionLabel: "name",
      },
      { name: "level", label: "Level", type: "number", required: true, placeholder: "300" },
    ],
  },

  offering: {
    label: "Course Offerings",
    singular: "Offering",
    endpoint: "/offering",
    columns: [
      { key: "course.code", label: "Course" },
      { key: "lecturer.user.name", label: "Lecturer" },
      { key: "semester.name", label: "Semester" },
      { key: "semester.session.name", label: "Session" },
    ],
    fields: [
      {
        name: "courseId",
        label: "Course",
        type: "select",
        required: true,
        optionsEndpoint: "/course",
        optionLabelFn: (o) => `${o.code} — ${o.title}`,
      },
      {
        name: "lecturerId",
        label: "Lecturer",
        type: "select",
        required: true,
        optionsEndpoint: "/lecturer",
        optionLabelFn: (o) => o.user?.name || o.id,
      },
      {
        name: "semesterId",
        label: "Semester",
        type: "select",
        required: true,
        optionsEndpoint: "/semester",
        optionLabelFn: (o) => `${o.name} — ${o.session?.name || ""}`,
      },
    ],
  },

  enrollment: {
    label: "Enrollments",
    singular: "Enrollment",
    endpoint: "/enrollment",
    manageRoles: ["ADMIN"], 
    columns: [
      { key: "student.matricNo", label: "Matric No" },
      { key: "offering.course.code", label: "Course" },
      { key: "offering.semester.name", label: "Semester" },
    ],
    fields: [
      {
        name: "studentId",
        label: "Student",
        type: "select",
        required: true,
        optionsEndpoint: "/student",
        optionLabelFn: (o) => `${o.matricNo} — ${o.user?.name || ""}`,
      },
      {
        name: "offeringId",
        label: "Course Offering",
        type: "select",
        required: true,
        optionsEndpoint: "/offering",
        optionLabelFn: (o) => `${o.course?.code || ""} — ${o.semester?.name || ""}`,
      },
    ],
  },
};

// Nested path reader used by DataTable and the form's select labels.
export const getPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
