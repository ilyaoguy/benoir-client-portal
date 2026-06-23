/* ========================================
   Users Page
   ======================================== */

function renderUsersPage() {
  const adminContent  = document.getElementById('users-admin-content');
  const restrictedDiv = document.getElementById('users-restricted');
  if (!PORTAL_SESSION || PORTAL_SESSION.role !== 'admin') {
    adminContent.style.display  = 'none';
    restrictedDiv.style.display = '';
    return;
  }
  adminContent.style.display  = '';
  restrictedDiv.style.display = 'none';
  renderUsersTable();
  updateUsersCount();
}

function updateUsersCount() {
  const el = document.getElementById('users-sub');
  if (el) el.textContent = `${PORTAL_USERS.length} user${PORTAL_USERS.length !== 1 ? 's' : ''} · ${PORTAL_ORG.name}`;
}

function renderUsersTable() {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  PORTAL_USERS.forEach(u => {
    const isMe = u.id === PORTAL_SESSION?.id;

    const statusBadge = u.status === 'active'   ? `<span class="badge users-badge-active">${t('usr.status_active')}</span>`
                      : u.status === 'invited'  ? `<span class="badge users-badge-invited">${t('usr.status_invited')}</span>`
                      : `<span class="badge users-badge-inactive">${t('usr.status_inactive')}</span>`;

    const roleBadge = u.role === 'admin'        ? `<span class="badge users-badge-admin">${t('usr.role_admin')}</span>`
                    : u.role === 'booking_full' ? `<span class="badge users-badge-full">${t('usr.role_full')}</span>`
                    : `<span class="badge users-badge-readonly">${t('usr.role_ro')}</span>`;

    const sectionTags = (u.sections || []).includes('all')
      ? `<span class="users-section-tag" style="background:#ede9fe;color:#6d28d9;">All sections</span>`
      : (u.sections || []).map(s =>
          `<span class="users-section-tag">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`
        ).join('');

    const lastLogin = u.lastLogin
      ? u.lastLogin.split('-').reverse().join('.')
      : `<span style="color:var(--text-muted);">${t('usr.never')}</span>`;

    const actions = isMe
      ? `<span class="users-you-tag">${t('usr.you')}</span>`
      : `<button class="users-action-btn" onclick="usersEditUser('${u.id}')" title="Edit role">
           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
         </button>
         ${u.status === 'invited' ? `
         <button class="users-action-btn" onclick="usersResendInvite('${u.id}')" title="Resend invite">
           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
         </button>` : ''}
         <button class="users-action-btn danger" onclick="usersRemoveUser('${u.id}')" title="Remove user">
           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
         </button>`;

    const tr = document.createElement('tr');
    tr.dataset.uid = u.id;
    tr.innerHTML = `
      <td>
        <div class="users-name-cell">
          <div class="users-avatar">${u.initials || makeInitials(u.name)}</div>
          <span>${u.name}</span>
        </div>
      </td>
      <td>${u.email}</td>
      <td>${roleBadge}</td>
      <td>${sectionTags}</td>
      <td>${statusBadge}</td>
      <td>${lastLogin}</td>
      <td class="users-actions-cell">${actions}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Add user panel ----
document.getElementById('users-add-btn').addEventListener('click', () => {
  const panel = document.getElementById('users-add-panel');
  const open  = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : '';
  const btn   = document.getElementById('users-add-btn');
  btn.innerHTML = open
    ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ${t('usr.add')}`
    : `✕  ${t('usr.cancel')}`;
  if (!open) {
    ['users-add-name','users-add-email'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
    document.getElementById('users-add-role').value = 'read_only';
    document.querySelectorAll('.users-add-section').forEach(cb => { if(!cb.disabled) cb.checked = false; });
    document.getElementById('users-add-feedback').textContent = '';
  }
});

document.getElementById('users-add-cancel').addEventListener('click', () => {
  document.getElementById('users-add-btn').click();
});

document.getElementById('users-add-submit').addEventListener('click', () => {
  const name  = document.getElementById('users-add-name').value.trim();
  const email = document.getElementById('users-add-email').value.trim();
  const role  = document.getElementById('users-add-role').value;
  const fb    = document.getElementById('users-add-feedback');

  if (!name)  { fb.textContent = LANG === 'ru' ? 'Введите полное имя.' : 'Full name is required.'; fb.className = 'users-fb-error'; return; }
  if (!email || !email.includes('@')) { fb.textContent = LANG === 'ru' ? 'Укажите корректный email.' : 'Valid email is required.'; fb.className = 'users-fb-error'; return; }
  if (PORTAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    fb.textContent = LANG === 'ru' ? 'Пользователь с таким email уже существует.' : 'A user with this email already exists.'; fb.className = 'users-fb-error'; return;
  }

  const sections = ['bookings', ...Array.from(document.querySelectorAll('.users-add-section:checked:not([disabled])'), cb => cb.value)];
  const initials = makeInitials(name);

  PORTAL_USERS.push({
    id:        'usr-' + String(PORTAL_USERS.length + 1).padStart(3, '0'),
    name, initials, email, role,
    password:  null,
    status:    'invited',
    created:   new Date().toISOString().slice(0, 10),
    lastLogin: null,
    sections:  role === 'admin' ? ['all'] : [...new Set(sections)],
  });

  fb.textContent = `✓ Invitation sent to ${email}.`;
  fb.className   = 'users-fb-success';
  renderUsersTable();
  updateUsersCount();

  setTimeout(() => document.getElementById('users-add-btn').click(), 1800);
});

// ---- Actions ----
function usersEditUser(id) {
  const u = PORTAL_USERS.find(x => x.id === id);
  if (!u) return;
  const newRole = prompt(
    `Edit role for ${u.name}\n\nOptions: read_only · booking_full · admin`,
    u.role
  );
  if (!newRole || !['admin','booking_full','read_only'].includes(newRole.trim())) return;
  u.role     = newRole.trim();
  u.sections = u.role === 'admin' ? ['all'] : u.sections;
  renderUsersTable();
}

function usersRemoveUser(id) {
  const u = PORTAL_USERS.find(x => x.id === id);
  if (!u || !confirm(`Remove ${u.name} from the organisation?`)) return;
  PORTAL_USERS.splice(PORTAL_USERS.indexOf(u), 1);
  renderUsersTable();
  updateUsersCount();
}

function usersResendInvite(id) {
  const u = PORTAL_USERS.find(x => x.id === id);
  if (u) alert(`Invitation resent to ${u.email}`);
}

// ---- Nav init ----
document.querySelector('.nav-item[data-page="users"]').addEventListener('click', renderUsersPage);
