# LMS Platform

A learning management system where instructors create courses with rich-text
chapters and students enroll to read the ones marked public.


## What it does

Instructors log in, create courses, and write chapters in a rich-text editor
(Plate.js). Each chapter can be toggled public or private — students only ever
see public chapters. Students browse all available courses, enroll in any of
them, and read the public chapters of courses they've joined.

Two user roles with different permissions: instructors author and own their
own courses; students enroll and read. A Django superuser account is used for
admin/user management.

## Tech stack

**Backend**
- Django + Django REST Framework
- SQLite (database-agnostic via the ORM; only settings change to swap to Postgres)
- Token-based authentication with role-based permissions

**Frontend**
- React + TypeScript (Vite)
- Material UI for components
- Plate.js for the chapter editor

## Architecture notes

- Chapter content is stored as Plate.js JSON rather than HTML, preserving the
  document's structure for future features like export or partial rendering.
- Authorization is enforced at the DRF viewset level (via `get_queryset` and
  `perform_create`), so a student can't retrieve private chapters even by
  calling the API directly — the restriction isn't just hidden in the UI.
- Course ownership and enrollment are set server-side from the authenticated
  user, not trusted from the client.
- Auth state is a token stored in localStorage and attached to every request
  via an Axios interceptor; the user's role is fetched from a `/me/` endpoint
  after login to drive routing.

## Running locally

Requires Python 3.11+ and Node 18+.

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # create your first user (set role in admin)
python manage.py runserver
```
Backend runs on `http://localhost:8000`.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Notes

- Users are created via the Django admin (`/admin`), where each user's role
  (instructor or student) is set.
- The backend uses a development `SECRET_KEY` and `DEBUG=True`; these would be
  moved to environment variables before any non-local deployment.
