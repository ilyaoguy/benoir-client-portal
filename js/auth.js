/* ========================================
   Authentication & Authorization
   ======================================== */

const PORTAL_ORG = {
  id:      'ORG-BENOIR-2024',
  name:    'Benoir Travel',
  country: 'UAE',
  email:   'admin@benoir.com',
  phone:   '+971 4 400 0000',
};

// In-memory user store — replaced by backend API calls when backend is ready
const PORTAL_USERS = [
  {
    id: 'usr-001', name: 'Ilya Oguy', initials: 'IO',
    email: 'oguyilya@gmail.com',
    role: 'admin', adminToken: 'BNR-ADMIN-2026',
    status: 'active', created: '2024-01-15', lastLogin: '2026-06-23',
    sections: ['all'],
  },
  {
    id: 'usr-002', name: 'Sarah Chen', initials: 'SC',
    email: 'sarah.chen@benoir.com', password: 'demo1234',
    role: 'booking_full',
    status: 'active', created: '2025-03-10', lastLogin: '2026-06-22',
    sections: ['bookings', 'support', 'finance'],
  },
  {
    id: 'usr-003', name: 'Ahmed Al-Rashid', initials: 'AA',
    email: 'ahmed.rashid@benoir.com', password: 'demo1234',
    role: 'read_only',
    status: 'active', created: '2025-06-01', lastLogin: '2026-06-20',
    sections: ['bookings'],
  },
  {
    id: 'usr-004', name: 'Maria Santos', initials: 'MS',
    email: 'maria.santos@benoir.com', password: null,
    role: 'read_only',
    status: 'invited', created: '2026-06-10', lastLogin: null,
    sections: ['bookings', 'support'],
  },
];

const SESSION_KEY = 'benoir_portal_session';
let PORTAL_SESSION = null;

// ---- Helpers ----
function isAdmin() { return PORTAL_SESSION?.role === 'admin'; }

function canAccess(section) {
  if (!PORTAL_SESSION) return false;
  if (PORTAL_SESSION.role === 'admin') return true;
  const s = PORTAL_SESSION.sections || [];
  return s.includes('all') || s.includes(section);
}

function canModify() { return PORTAL_SESSION?.role !== 'read_only'; }

function roleLabel(role) {
  return role === 'admin'        ? (typeof t !== 'undefined' ? t('usr.role_admin') : 'Admin')
       : role === 'booking_full' ? (typeof t !== 'undefined' ? t('usr.role_full')  : 'Full Access')
       : role === 'read_only'    ? (typeof t !== 'undefined' ? t('usr.role_ro')    : 'Read Only')
       : role;
}

function makeInitials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---- Session management ----
function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) PORTAL_SESSION = JSON.parse(raw);
  } catch(e) { PORTAL_SESSION = null; }
}

function saveSession(user) {
  PORTAL_SESSION = {
    id:       user.id,
    name:     user.name,
    initials: user.initials || makeInitials(user.name),
    email:    user.email,
    role:     user.role,
    sections: user.sections,
    orgId:    PORTAL_ORG.id,
    orgName:  PORTAL_ORG.name,
    loginTime: Date.now(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(PORTAL_SESSION));
}

function clearSession() {
  PORTAL_SESSION = null;
  sessionStorage.removeItem(SESSION_KEY);
}

// ---- Validation ----
function validateAdminToken(token) {
  return PORTAL_USERS.find(u => u.role === 'admin' && u.adminToken === token.trim()) || null;
}

function validateUserLogin(email, password) {
  return PORTAL_USERS.find(u =>
    u.email.toLowerCase() === email.trim().toLowerCase() &&
    u.password === password &&
    u.status === 'active'
  ) || null;
}

// ---- Apply role gating ----
function applyRoleGating() {
  const s = PORTAL_SESSION;
  if (!s) return;

  // Nav visibility
  const navRules = {
    'support':     canAccess('support'),
    'finance':     canAccess('finance'),
    'hotel-dump':  s.role !== 'read_only',
    'price-check': s.role !== 'read_only',
    'users':       s.role === 'admin',
  };
  Object.entries(navRules).forEach(([page, show]) => {
    const el = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (el) el.style.display = show ? '' : 'none';
  });

  // Avatar initials
  const avatarEl = document.getElementById('avatar-btn');
  if (avatarEl) avatarEl.textContent = s.initials;

  // Sidebar user block
  const avEl   = document.getElementById('sidebar-user-av');
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  if (avEl)   avEl.textContent   = s.initials;
  if (nameEl) nameEl.textContent = s.name;
  if (roleEl) roleEl.textContent = roleLabel(s.role);

  // Read-only badge in topbar
  if (s.role === 'read_only' && !document.getElementById('readonly-badge')) {
    const badge = document.createElement('div');
    badge.id = 'readonly-badge';
    badge.className = 'readonly-badge';
    badge.textContent = typeof t !== 'undefined' ? t('badge.readonly') : 'Read Only';
    const right = document.querySelector('.topbar-right');
    if (right) right.insertBefore(badge, right.firstChild);
  }
}

// ---- Login overlay logic ----
(function initAuthOverlay() {
  const overlay = document.getElementById('auth-overlay');
  if (!overlay) return;

  // Tab switching
  overlay.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const which = tab.dataset.authTab;
      document.getElementById('auth-panel-token').style.display = which === 'token' ? '' : 'none';
      document.getElementById('auth-panel-user').style.display  = which === 'user'  ? '' : 'none';
      document.getElementById('auth-error').style.display = 'none';
    });
  });

  // Eye toggle
  document.getElementById('auth-eye-btn').addEventListener('click', () => {
    const inp = document.getElementById('auth-token-input');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  function showError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg;
    el.style.display = '';
  }

  function onSuccess(user) {
    saveSession(user);
    overlay.style.display = 'none';
    applyRoleGating();
  }

  // Admin token
  const doTokenLogin = () => {
    const token = document.getElementById('auth-token-input').value;
    const user  = validateAdminToken(token);
    if (!user) { showError(t('auth.err_token')); return; }
    onSuccess(user);
  };
  document.getElementById('auth-token-submit').addEventListener('click', doTokenLogin);
  document.getElementById('auth-token-input').addEventListener('keydown', e => { if (e.key === 'Enter') doTokenLogin(); });

  // User login
  const doUserLogin = () => {
    const email    = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const user     = validateUserLogin(email, password);
    if (!user) { showError(t('auth.err_user')); return; }
    onSuccess(user);
  };
  document.getElementById('auth-user-submit').addEventListener('click', doUserLogin);
  document.getElementById('auth-password').addEventListener('keydown', e => { if (e.key === 'Enter') doUserLogin(); });
})();

// ---- Logout ----
document.getElementById('menu-signout').addEventListener('click', () => {
  clearSession();
  location.reload();
});

// ---- Bootstrap ----
loadSession();
if (PORTAL_SESSION) {
  document.getElementById('auth-overlay').style.display = 'none';
  applyRoleGating();
}
