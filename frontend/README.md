# Result Collation — Frontend

React + Vite + Tailwind v4 UI for the result collation API.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` if your backend runs somewhere other than `http://localhost:5001`.

```bash
npm run dev
```

Opens at `http://localhost:5175`.

## What's here

- **Login / Register** — talks to `/auth/login` and `/auth/register`
- **Dashboard** — record counts + recent results
- **Faculties, Departments, Sessions, Semesters, Courses, Lecturers,
  Students, Offerings, Enrollments** — one reusable `ResourcePage`
  driven by `src/config/resourceConfig.js`. To add a field or change
  a table column, edit that file — no page component needs touching.
- **Results** — dedicated page with Approve / Reject actions on
  pending results, calling `PATCH /result/:id/approve` and
  `/reject`.

## Routes match your backend exactly

Singular, unprefixed, as defined in your `app.js`:
`/faculty`, `/department`, `/student`, `/lecturer`, `/session`,
`/semester`, `/course`, `/offering`, `/enrollment`, `/result`,
`/auth`.

If you change a mount point in `app.js`, update the matching
`endpoint` in `resourceConfig.js`.

## Notes

- The JWT is stored in `localStorage` and attached to every request
  via an axios interceptor (`src/api/client.js`). A `401` response
  clears it and redirects to `/login`.
- Foreign-key fields render as `<select>` dropdowns populated from
  the related resource's list endpoint (e.g. creating a Department
  fetches `/faculty` to populate the Faculty dropdown).
- Table columns read nested data via dot-paths (e.g.
  `"department.faculty.name"`), matching the `include` blocks your
  Prisma controllers already return.
