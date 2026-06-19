/**
 * adminStore.js — Centralised localStorage CRUD service.
 *
 * Storage keys (shared with public pages):
 *   beta_admin_session  → Admin session { email, role, loggedAt }
 *   jobs                → Job[]
 *   internships         → Internship[]
 *   products            → Product[] (admin-managed)
 *   partners            → Partner[]
 *
 * PUBLIC PAGES import getJobs(), getInternships(), etc. and
 * read the SAME keys, so admin changes appear immediately.
 *
 * Logout only removes beta_admin_session — never touches data keys.
 * Easy MongoDB migration: replace readList/writeList with fetch() calls.
 */

/* ─── Admin credentials ─── */
export const ADMIN_CREDS = {
  email:    'admin@betasoftnet.com',
  password: 'Admin@123',
};

/* ─── Auth ─── */
export function adminLogin(email, password) {
  if (email === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
    const session = { email, role: 'Super Admin', loggedAt: Date.now() };
    localStorage.setItem('beta_admin_session', JSON.stringify(session));
    return { success: true, session };
  }
  return { success: false, error: 'Invalid email or password.' };
}

/**
 * Logout — ONLY removes the admin session.
 * Data keys (jobs, internships, products, partners) are preserved.
 */
export function adminLogout() {
  localStorage.removeItem('beta_admin_session');
}

export function getAdminSession() {
  try {
    const raw = localStorage.getItem('beta_admin_session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* ─── Generic helpers ─── */
function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}
function makeId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/* ══════════════════════════════════════════
   JOBS  —  shared key: "jobs"
   Public Careers page reads from this key.
══════════════════════════════════════════ */
const JOBS_KEY = 'jobs';

export function getJobs()             { return readList(JOBS_KEY); }
export function createJob(data)       {
  const list = [...getJobs(), { ...data, id: makeId(), createdAt: Date.now() }];
  writeList(JOBS_KEY, list); return list;
}
export function updateJob(id, data)   {
  const list = getJobs().map(j => j.id === id ? { ...j, ...data } : j);
  writeList(JOBS_KEY, list); return list;
}
export function deleteJob(id)         {
  const list = getJobs().filter(j => j.id !== id);
  writeList(JOBS_KEY, list); return list;
}

/* ══════════════════════════════════════════
   INTERNSHIPS  —  shared key: "internships"
   Public Internships section reads this key.
══════════════════════════════════════════ */
const INTERN_KEY = 'internships';

export function getInternships()           { return readList(INTERN_KEY); }
export function createInternship(data)     {
  const list = [...getInternships(), { ...data, id: makeId(), createdAt: Date.now() }];
  writeList(INTERN_KEY, list); return list;
}
export function updateInternship(id, data) {
  const list = getInternships().map(i => i.id === id ? { ...i, ...data } : i);
  writeList(INTERN_KEY, list); return list;
}
export function deleteInternship(id)       {
  const list = getInternships().filter(i => i.id !== id);
  writeList(INTERN_KEY, list); return list;
}

/* ══════════════════════════════════════════
   ADMIN PRODUCTS  —  shared key: "products"
   Products page merges static + admin items.
══════════════════════════════════════════ */
const PROD_KEY = 'products';

export function getAdminProducts()          { return readList(PROD_KEY); }
export function createAdminProduct(data)    {
  const list = [...getAdminProducts(), { ...data, id: makeId(), createdAt: Date.now() }];
  writeList(PROD_KEY, list); return list;
}
export function updateAdminProduct(id, data) {
  const list = getAdminProducts().map(p => p.id === id ? { ...p, ...data } : p);
  writeList(PROD_KEY, list); return list;
}
export function deleteAdminProduct(id)      {
  const list = getAdminProducts().filter(p => p.id !== id);
  writeList(PROD_KEY, list); return list;
}

/* ══════════════════════════════════════════
   PARTNERS  —  shared key: "partners"
   Public Partners page reads this key.
══════════════════════════════════════════ */
const PARTNER_KEY = 'partners';

export function getPartners()         { return readList(PARTNER_KEY); }
export function createPartner(data)   {
  const list = [...getPartners(), { ...data, id: makeId(), createdAt: Date.now() }];
  writeList(PARTNER_KEY, list); return list;
}
export function updatePartner(id, data) {
  const list = getPartners().map(p => p.id === id ? { ...p, ...data } : p);
  writeList(PARTNER_KEY, list); return list;
}
export function deletePartner(id)     {
  const list = getPartners().filter(p => p.id !== id);
  writeList(PARTNER_KEY, list); return list;
}

/* ══════════════════════════════════════════
   APPLICATIONS  —  API Backend
══════════════════════════════════════════ */
const API_URL = 'http://localhost:3001/api/applications';

export async function getApplications() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch applications', err);
    return [];
  }
}
export async function createApplication(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id: makeId(), applicationDate: Date.now(), status: 'Pending' })
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to create application', err);
    return null;
  }
}
export async function updateApplication(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to update application', err);
    return null;
  }
}
export async function deleteApplication(id) {
  // Not implemented on the server, returning dummy
  return [];
}
