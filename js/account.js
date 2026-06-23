/* ========================================
   Account Page
   ======================================== */

function renderAccountPage() {
  const s = PORTAL_SESSION;
  const u = PORTAL_USERS.find(x => x.id === s?.id);
  if (!s) return;

  // Org
  document.getElementById('acct-org-name').textContent    = PORTAL_ORG.name;
  document.getElementById('acct-org-id').textContent      = PORTAL_ORG.id;
  document.getElementById('acct-org-country').textContent = PORTAL_ORG.country;
  document.getElementById('acct-org-email').textContent   = PORTAL_ORG.email;
  document.getElementById('acct-org-phone').textContent   = PORTAL_ORG.phone;

  // Profile
  const initials = s.initials || makeInitials(s.name);
  const avEl = document.getElementById('acct-profile-av');
  if (avEl) avEl.textContent = initials;

  document.getElementById('acct-user-name').textContent  = s.name;
  document.getElementById('acct-user-email').textContent = s.email;

  const roleWrap = document.getElementById('acct-user-role-wrap');
  if (roleWrap) {
    const badgeCls = s.role === 'admin' ? 'users-badge-admin'
                   : s.role === 'booking_full' ? 'users-badge-full'
                   : 'users-badge-readonly';
    roleWrap.innerHTML = `<span class="badge ${badgeCls}">${roleLabel(s.role)}</span>`;
  }

  const fmtDate = iso => iso ? iso.split('-').reverse().join('.') : '—';
  document.getElementById('acct-user-since').textContent = fmtDate(u?.created);
  document.getElementById('acct-user-last').textContent  = u?.lastLogin ? fmtDate(u.lastLogin) : (LANG === 'ru' ? 'Текущая сессия' : 'This session');

  // Access & permissions
  const sections = s.sections || [];
  const hasAll   = sections.includes('all');
  const sectionDisplay = hasAll
    ? ['bookings','support','finance','hotel dump','price check','users']
    : sections;

  document.getElementById('acct-sections-list').innerHTML = sectionDisplay.map(sec =>
    `<span class="acct-section-tag${hasAll ? ' all-sections' : ''}">${sec.charAt(0).toUpperCase() + sec.slice(1)}</span>`
  ).join('');

  const modEl = document.getElementById('acct-can-modify');
  if (modEl) {
    modEl.innerHTML = canModify()
      ? `<span style="color:#1a9e5c;font-weight:700;">${t('acct.can_modify_yes')}</span>`
      : `<span style="color:#d97706;font-weight:700;">${t('acct.can_modify_no')}</span>`;
  }

  // Admin token card
  const tokenCard = document.getElementById('acct-token-card');
  if (tokenCard) tokenCard.style.display = s.role === 'admin' ? '' : 'none';

  // Reset token display to masked on each visit
  const displayEl = document.getElementById('acct-token-display');
  const revealBtn  = document.getElementById('acct-token-reveal');
  if (displayEl) displayEl.textContent = '••••••••••••••••';
  if (revealBtn)  { revealBtn.textContent = t('acct.reveal'); revealBtn.dataset.revealed = 'false'; }
}

// Token reveal / hide
document.getElementById('acct-token-reveal')?.addEventListener('click', function() {
  const u       = PORTAL_USERS.find(x => x.id === PORTAL_SESSION?.id);
  const display = document.getElementById('acct-token-display');
  if (!u || !display) return;
  if (this.dataset.revealed === 'true') {
    display.textContent  = '••••••••••••••••';
    this.textContent     = t('acct.reveal');
    this.dataset.revealed = 'false';
  } else {
    display.textContent  = u.adminToken || '—';
    this.textContent     = t('acct.hide');
    this.dataset.revealed = 'true';
  }
});

// Token copy
document.getElementById('acct-token-copy')?.addEventListener('click', function() {
  const u = PORTAL_USERS.find(x => x.id === PORTAL_SESSION?.id);
  if (!u?.adminToken) return;
  navigator.clipboard.writeText(u.adminToken).then(() => {
    const orig = this.textContent;
    this.textContent = t('acct.copied');
    setTimeout(() => this.textContent = t('acct.copy'), 1500);
  });
});

// Nav init
document.querySelector('.nav-item[data-page="account"]').addEventListener('click', renderAccountPage);
