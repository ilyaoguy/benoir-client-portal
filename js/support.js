/* ========================================
   Support Page
   ======================================== */

const MEAL_PLAN_OPTIONS = ['Room Only', 'Breakfast Included', 'Half Board', 'Full Board', 'All Inclusive'];

const HOTEL_SUPPORT_DATA = {
  'Burj Al Arab': {
    address: 'Jumeirah Beach Road, Dubai, UAE',
    phone: '+971 4 301 7777', email: 'reservations@burjalarab.com',
    checkIn: '15:00', checkOut: '12:00', receptionHours: '24 hours',
    earlyArrival: 'Available from 09:00, subject to availability (+$150)',
    lateCheckout: 'Available until 18:00, subject to availability (+$200)',
    amenities: ['Private Beach','Infinity Pool','Spa','Butler Service','Helipad','Michelin Restaurant','Concierge','Valet Parking'],
    cityTax: 15, touristTax: 10,
    photos: ['Lobby','Sea View','Suite','Pool'],
    emergency: '+971 4 301 7788',
    roomTypes: ['Deluxe Suite','One-Bedroom Suite','Two-Bedroom Suite','Club Suite','Presidential Suite'],
  },
  'Four Seasons Doha': {
    address: 'West Bay, Doha, Qatar',
    phone: '+974 4494 8888', email: 'reservations.doha@fourseasons.com',
    checkIn: '15:00', checkOut: '12:00', receptionHours: '24 hours',
    earlyArrival: 'Available from 10:00, subject to availability',
    lateCheckout: 'Available until 16:00 (+$100)',
    amenities: ['Private Beach','3 Pools','Spa','Fitness Centre','Kids Club','4 Restaurants','Valet Parking'],
    cityTax: 10, touristTax: 0,
    photos: ['Lobby','Pool','Room','Restaurant'],
    emergency: '+974 4494 8900',
    roomTypes: ['Deluxe Room','Superior Room','One-Bedroom Suite','Royal Suite'],
  },
  'Emirates Palace': {
    address: 'West Corniche Road, Abu Dhabi, UAE',
    phone: '+971 2 690 9000', email: 'reservations@emiratespalace.ae',
    checkIn: '15:00', checkOut: '12:00', receptionHours: '24 hours',
    earlyArrival: 'Available from 09:00, butler will arrange storage (+$180)',
    lateCheckout: 'Available until 18:00 (+$250)',
    amenities: ['Private Beach','Pool','Spa','Gold ATM','Helipad','6 Restaurants','Butler Service','Concierge'],
    cityTax: 15, touristTax: 10,
    photos: ['Palace Entrance','Suite','Pool','Beach'],
    emergency: '+971 2 690 9100',
    roomTypes: ['Coral Room','Pearl Room','Diamond Room','Palace Suite','Ruler Suite'],
  },
  'default': {
    address: 'Contact hotel for address',
    phone: 'See hotel confirmation', email: 'reservations@hotel.com',
    checkIn: '14:00', checkOut: '12:00', receptionHours: '24 hours',
    earlyArrival: 'Subject to availability, contact hotel',
    lateCheckout: 'Subject to availability, contact hotel',
    amenities: ['Restaurant','Bar','Fitness Centre','Wi-Fi','Concierge'],
    cityTax: 10, touristTax: 5,
    photos: ['Lobby','Room','Pool','Exterior'],
    emergency: 'See booking voucher',
    roomTypes: ['Standard Room','Superior Room','Deluxe Room','Junior Suite','Suite'],
  },
};

function getHotelData(hotelName) {
  return HOTEL_SUPPORT_DATA[hotelName] || HOTEL_SUPPORT_DATA['default'];
}

// ---- Helpers ----
function supFmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function supNights(from, to) {
  return Math.round((new Date(to) - new Date(from)) / 86400000);
}

function supPayKey(b) {
  if (b.paid) return 'paid';
  const due = new Date(b.payDue); due.setHours(0,0,0,0);
  const diff = Math.round((due - TODAY) / 86400000);
  if (diff > 0)   return 'due_future';
  if (diff === 0) return 'due_today';
  return 'overdue';
}

function supFinalCost(b) {
  return (b.status === 'cancelled' || b.status === 'noshow') ? b.cancelFee : b.cost;
}

function supTodayPct(policyKey, checkIn) {
  const policy = CANCEL_POLICIES[policyKey];
  if (!policy) return 0;
  const ci = new Date(checkIn); ci.setHours(0,0,0,0);
  const today = new Date(); today.setHours(0,0,0,0);
  const days = Math.round((ci - today) / 86400000);
  for (const rule of policy.rules) {
    if (days > rule.daysThreshold) return rule.pct;
  }
  return policy.rules[policy.rules.length - 1].pct;
}

function supFreeCancelDeadline(policyKey, checkIn) {
  const policy = CANCEL_POLICIES[policyKey];
  if (!policy) return 'Non-refundable';
  const freeRule = policy.rules.find(r => r.pct === 0);
  if (!freeRule || freeRule.daysThreshold < 0) return 'Non-refundable';
  const ci = new Date(checkIn);
  ci.setDate(ci.getDate() - freeRule.daysThreshold);
  return supFmtDate(ci.toISOString().slice(0, 10));
}

// ---- Render table ----
let supExpandedId = null;

function renderSupport(list) {
  const tbody = document.getElementById('sup-tbody');
  const noRes = document.getElementById('sup-no-results');
  const meta  = document.getElementById('sup-table-meta');
  tbody.innerHTML = '';
  supExpandedId = null;

  meta.textContent = list.length === 1 ? t('sup_meta.results').replace('{n}', 1) : t('sup_meta.results_pl').replace('{n}', list.length);
  if (list.length === 0) { noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  list.forEach(b => {
    const statusLbl = t(`status.${b.status}`) || (b.status.charAt(0).toUpperCase() + b.status.slice(1));
    const tr = document.createElement('tr');
    tr.dataset.id = b.id;
    tr.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${supFmtDate(b.bookingDate)}</td>
      <td>${supFmtDate(b.checkIn)}</td>
      <td class="bk-wrap">${b.hotel}</td>
      <td>${b.guest}</td>
      <td><span class="badge status-${b.status}">${statusLbl}</span></td>
      <td>
        <button class="bk-show-more-btn sup-expand-btn" data-id="${b.id}" title="Open support panel">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Build panel sections ----

function buildSection1(b) {
  const primaryPolicy = b.rooms[0]?.cancelPolicy || 'free';
  const nights    = supNights(b.checkIn, b.checkOut);
  const hd        = getHotelData(b.hotel);
  const payKey    = supPayKey(b);
  const fc        = supFinalCost(b);
  const todayPct  = supTodayPct(primaryPolicy, b.checkIn);
  const todayFee  = Math.round(b.cost * todayPct / 100);
  const freeDL    = supFreeCancelDeadline(primaryPolicy, b.checkIn);
  const cityTax   = hd.cityTax * nights * b.rooms.reduce((s, r) => s + r.guestCount, 0);
  const touristTax = hd.touristTax * nights;
  const isActive  = b.status === 'confirmed' || b.status === 'pending';

  const payDueStr = payKey === 'paid'
    ? `<span style="color:#1a9e5c;font-weight:700;">${t('sup1.paid')}</span>`
    : payKey === 'due_future' ? `${t('sup1.due_pfx')} ${supFmtDate(b.payDue)}`
    : payKey === 'due_today'  ? `<span style="color:#d97706;font-weight:700;">${t('sup1.due_today')}</span>`
    : `<span style="color:#d93025;font-weight:700;">${t('sup1.overdue')}</span>`;

  const cancelBtns = isActive ? `
    <div class="sup-btn-row" id="sup-cancel-row-${b.id}">
      <button class="sup-btn sup-btn-danger" onclick="supInitCancel('${b.id}')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        ${t('sup.cancel_btn')}
      </button>
      <button class="sup-btn sup-btn-outline" onclick="supCalcRefund('${b.id}', this)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
        ${t('sup.refund_btn')}
      </button>
    </div>
    <div id="sup-refund-result-${b.id}"></div>`
    : `<div style="font-size:12px;color:var(--text-sec);margin-top:10px;">${t('sup1.already')} ${b.status}.</div>`;

  return `
    <table class="sup-pay-table">
      <tr><td>${t('sup1.bk_cost')}</td><td>$${b.cost.toLocaleString()}</td></tr>
      <tr><td>${t('sup1.pay_status')}</td><td>${payDueStr}</td></tr>
      <tr><td>${t('sup1.free_dl')}</td><td>${freeDL}</td></tr>
      <tr><td>${t('sup1.cancel_fee')}</td><td>${todayPct === 0 ? `<span style="color:#1a9e5c;font-weight:600;">${t('sup1.free')}</span>` : `$${todayFee.toLocaleString()} (${todayPct}%)`}</td></tr>
      <tr><td>${t('sup1.noshow_fee')}</td><td>$${b.cost.toLocaleString()} (100%)</td></tr>
      <tr><td>${t('sup1.city_tax')}</td><td>~$${(cityTax + touristTax).toLocaleString()}</td></tr>
      <tr class="sup-pay-total"><td>${t('sup1.final')}</td><td>$${fc.toLocaleString()}</td></tr>
    </table>
    ${cancelBtns}`;
}

function buildSection2(b) {
  const cards = [
    { key:'dates',   icon:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`, label:t('sup2.dates'),   sub:t('sup2.dates_sub') },
    { key:'guest',   icon:`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,                                                                                label:t('sup2.guest'),   sub:t('sup2.guest_sub') },
    { key:'room',    icon:`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,                                                                                                         label:t('sup2.room'),    sub:t('sup2.room_sub') },
    { key:'meal',    icon:`<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>`, label:t('sup2.meal'), sub:t('sup2.meal_sub') },
    { key:'upgrade', icon:`<polyline points="17 11 21 7 17 3"/><line x1="21" y1="7" x2="9" y2="7"/><path d="M7 21v-4a2 2 0 0 0-2-2H3"/>`,                                                       label:t('sup2.upgrade'), sub:t('sup2.upgrade_sub') },
    { key:'extend',  icon:`<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>`,                                                                                                      label:t('sup2.extend'),  sub:t('sup2.extend_sub') },
  ];

  const cardHTML = cards.map(c => `
    <div class="sup-mod-card" data-mod="${c.key}" data-bid="${b.id}" onclick="supToggleModForm('${b.id}','${c.key}',this)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${c.icon}</svg>
      <div class="sup-mod-card-label">${c.label}</div>
      <div class="sup-mod-card-sub">${c.sub}</div>
    </div>`).join('');

  return `
    <div class="sup-mod-grid">${cardHTML}</div>
    <div id="sup-mod-form-${b.id}"></div>`;
}

function buildSection3(b) {
  return `
    <div class="sup-claim-form" id="sup-claim-${b.id}">
      <select class="sup-select" id="sup-claim-cat-${b.id}">
        <option value="">${t('sup3.select_ph')}</option>
        <optgroup label="${t('sup3.grp_arrival')}">
          <option>${t('sup3.no_res')}</option>
          <option>${t('sup3.unpaid')}</option>
          <option>${t('sup3.unavail')}</option>
          <option>${t('sup3.extra_pay')}</option>
        </optgroup>
        <optgroup label="${t('sup3.grp_instay')}">
          <option>${t('sup3.wrong_room')}</option>
          <option>${t('sup3.quality')}</option>
          <option>${t('sup3.clean')}</option>
          <option>${t('sup3.amenity')}</option>
          <option>${t('sup3.other')}</option>
        </optgroup>
      </select>
      <textarea class="sup-textarea" id="sup-claim-txt-${b.id}" placeholder="${t('sup3.ph_issue')}"></textarea>
      <div class="sup-btn-row">
        <button class="sup-btn sup-btn-warning" onclick="supSubmitClaim('${b.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          ${t('sup.submit_claim')}
        </button>
      </div>
      <div id="sup-claim-feedback-${b.id}"></div>
    </div>`;
}

function buildSection4(b) {
  const hd        = getHotelData(b.hotel);
  const nights    = supNights(b.checkIn, b.checkOut);
  const allGuests = b.rooms.flatMap((r, i) =>
    r.guests.map(g => `${b.rooms.length > 1 ? `Room ${i+1}: ` : ''}${g}`)
  );
  const specialReqs = b.rooms.flatMap(r => r.notes ? [r.notes] : []).join(' / ') || 'None';
  const extras      = b.rooms.some(r => r.notes && /transfer|seaplane/i.test(r.notes))
    ? b.rooms.flatMap(r => r.notes || []).filter(n => /transfer|seaplane/i.test(n)).join(', ')
    : 'None included';

  const amenityTags = hd.amenities.map(a => `<span class="sup-amenity-tag">${a}</span>`).join('');
  const photos      = hd.photos.map(p => `<div class="sup-photo"><span>${p}</span></div>`).join('');
  const roomPhotos  = ['Room View','Bathroom','Balcony'].map(p => `<div class="sup-photo"><span>${p}</span></div>`).join('');

  const roomsList = b.rooms.map((r, i) => `
    <div style="margin-bottom:${i < b.rooms.length - 1 ? '8px' : '0'};">
      <div style="font-size:12px;font-weight:700;color:var(--navy);">${b.rooms.length > 1 ? `Room ${i+1}: ` : ''}${r.name}</div>
      <div style="font-size:12px;color:var(--text-sec);">Meal: ${r.meal} · Bed: ${r.bedType} · ${r.guestCount} guest${r.guestCount !== 1 ? 's' : ''}</div>
    </div>`).join('');

  return `
    <div class="sup-btn-row" style="margin-top:0;">
      <button class="sup-btn sup-btn-primary" onclick="supSimpleAction(this, t('sup4.voucher_sent'))">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ${t('sup.voucher')}
      </button>
      <button class="sup-btn sup-btn-outline" onclick="supSimpleAction(this, t('sup4.hcn_sent'))">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
        ${t('sup.hcn')}
      </button>
    </div>
    <div class="sup-info-section" style="margin-top:16px;">
      <div class="sup-info-label">${t('sup4.hotel')}</div>
      <div class="sup-info-grid">
        <div class="sup-info-item"><div class="sup-info-key">${t('acct.key_name')}</div><div class="sup-info-val">${b.hotel}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.addr')}</div><div class="sup-info-val">${hd.address}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.phone')}</div><div class="sup-info-val"><a href="tel:${hd.phone}">${hd.phone}</a></div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.email')}</div><div class="sup-info-val"><a href="mailto:${hd.email}">${hd.email}</a></div></div>
      </div>
      <div class="sup-amenity-tags" style="margin-top:8px;">${amenityTags}</div>
      <div class="sup-photo-strip">${photos}</div>
    </div>
    <div class="sup-info-section">
      <div class="sup-info-label">${t('sup4.ci_co')}</div>
      <div class="sup-info-grid">
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.checkin')}</div><div class="sup-info-val">${supFmtDate(b.checkIn)} ${t('sup4.from')} ${hd.checkIn}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.checkout')}</div><div class="sup-info-val">${supFmtDate(b.checkOut)} ${t('sup4.by')} ${hd.checkOut}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.los')}</div><div class="sup-info-val">${nights} ${t(nights !== 1 ? 'det.nights' : 'det.night')}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.reception')}</div><div class="sup-info-val">${hd.receptionHours}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.early')}</div><div class="sup-info-val">${hd.earlyArrival}</div></div>
        <div class="sup-info-item"><div class="sup-info-key">${t('sup4.late')}</div><div class="sup-info-val">${hd.lateCheckout}</div></div>
      </div>
    </div>
    <div class="sup-info-section">
      <div class="sup-info-label">${t('sup4.guests')}</div>
      <div style="font-size:13px;color:var(--navy);">${allGuests.join('<br>')}</div>
    </div>
    <div class="sup-info-section">
      <div class="sup-info-label">${t('sup4.room_meal')}</div>
      ${roomsList}
      <div class="sup-photo-strip" style="margin-top:10px;">${roomPhotos}</div>
    </div>
    <div class="sup-info-section">
      <div class="sup-info-label">${t('sup4.extras')}</div>
      <div style="font-size:13px;color:var(--navy);">${extras}</div>
    </div>
    <div class="sup-info-section">
      <div class="sup-info-label">${t('sup4.special')}</div>
      <div style="font-size:13px;color:var(--navy);font-style:${specialReqs !== t('sup4.none') && specialReqs !== 'None' ? 'italic' : 'normal'}">${specialReqs}</div>
    </div>`;
}

function buildSection5(b) {
  const hd = getHotelData(b.hotel);
  return `
    <div class="sup-emergency-grid">
      <div class="sup-emergency-card urgent">
        <div class="sup-emergency-title">🚨 ${t('sup5.benoir')}</div>
        <div class="sup-contact-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <a href="tel:+97144000000">+971 4 400 0000</a>
        </div>
        <div class="sup-contact-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <a href="https://wa.me/97144000000">WhatsApp 24/7</a>
        </div>
        <div class="sup-contact-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:emergency@benoir.com">emergency@benoir.com</a>
        </div>
      </div>
      <div class="sup-emergency-card">
        <div class="sup-emergency-title">${t('sup5.hotel')}</div>
        <div class="sup-contact-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <a href="tel:${hd.emergency}">${hd.emergency}</a>
        </div>
        <div class="sup-contact-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:${hd.email}">${hd.email}</a>
        </div>
      </div>
    </div>`;
}

function buildSupportPanel(b) {
  const sections = [
    { id:'cancel',  iconBg:'#fde8e8', iconColor:'#d93025',
      icon:`<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>`,
      title:t('sup.cancel'), body: buildSection1(b) },
    { id:'modify',  iconBg:'#dbeafe', iconColor:'#2563eb',
      icon:`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
      title:t('sup.modify'), body: buildSection2(b) },
    { id:'arrival', iconBg:'#fef3c7', iconColor:'#d97706',
      icon:`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
      title:t('sup.arrival'), body: buildSection3(b) },
    { id:'info',    iconBg:'#dcfce7', iconColor:'#1a9e5c',
      icon:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
      title:t('sup.info'), body: buildSection4(b) },
    { id:'emerg',   iconBg:'#ffe4e6', iconColor:'#e11d48',
      icon:`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
      title:t('sup.emergency'), body: buildSection5(b) },
  ];

  const html = sections.map(s => `
    <div class="sup-section">
      <div class="sup-section-hdr" data-section="${b.id}-${s.id}">
        <div class="sup-section-icon" style="background:${s.iconBg};">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${s.iconColor}" stroke-width="2">${s.icon}</svg>
        </div>
        <span class="sup-section-title">${s.title}</span>
        <svg class="sup-section-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="sup-section-body" id="sup-body-${b.id}-${s.id}">${s.body}</div>
    </div>`).join('');

  return `<div class="sup-accordion">${html}</div>`;
}

// ---- Expand/collapse rows ----
document.getElementById('sup-tbody').addEventListener('click', e => {
  const btn = e.target.closest('.sup-expand-btn');
  if (btn) {
    const id = btn.dataset.id;
    const b  = BOOKINGS.find(x => x.id === id);
    if (!b) return;

    const existing = document.getElementById(`sup-detail-${id}`);
    if (existing) {
      existing.remove();
      btn.classList.remove('open');
      supExpandedId = null;
      return;
    }

    if (supExpandedId) {
      document.getElementById(`sup-detail-${supExpandedId}`)?.remove();
      document.querySelector(`.sup-expand-btn[data-id="${supExpandedId}"]`)?.classList.remove('open');
    }

    btn.classList.add('open');
    supExpandedId = id;

    const detailTr = document.createElement('tr');
    detailTr.id = `sup-detail-${id}`;
    detailTr.className = 'sup-detail-row';
    detailTr.innerHTML = `<td colspan="7">${buildSupportPanel(b)}</td>`;
    document.querySelector(`tr[data-id="${id}"]`).insertAdjacentElement('afterend', detailTr);
    return;
  }

  const hdr = e.target.closest('.sup-section-hdr');
  if (hdr) {
    const key  = hdr.dataset.section;
    const body = document.getElementById(`sup-body-${key}`);
    const open = body.classList.toggle('open');
    hdr.classList.toggle('open', open);
  }
});

// ---- Modification forms ----
let supActiveModKey = null;

function supToggleModForm(bid, modKey, cardEl) {
  const container    = document.getElementById(`sup-mod-form-${bid}`);
  const compositeKey = `${bid}:${modKey}`;

  container.closest('.sup-section-body')?.querySelectorAll('.sup-mod-card.active')
    .forEach(c => c.classList.remove('active'));

  if (supActiveModKey === compositeKey) {
    container.innerHTML = '';
    supActiveModKey = null;
    return;
  }

  supActiveModKey = compositeKey;
  cardEl.classList.add('active');

  const b     = BOOKINGS.find(x => x.id === bid);
  const hd    = getHotelData(b.hotel);
  const today = new Date().toISOString().slice(0, 10);
  let formHTML = '';

  if (modKey === 'dates') {
    formHTML = `
      <div class="sup-mod-form-title">${t('sup2.dates')}</div>
      <div style="font-size:12px;color:var(--text-sec);margin-bottom:4px;">${t('sup_form.current')}: ${supFmtDate(b.checkIn)} → ${supFmtDate(b.checkOut)} (${supNights(b.checkIn, b.checkOut)} ${t('home.nts')})</div>
      <div class="sup-form-row">
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.checkin')}</label>
          <input type="date" class="sup-form-input" id="sup-nd-ci-${bid}" min="${today}" value="${b.checkIn}">
        </div>
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.checkout')}</label>
          <input type="date" class="sup-form-input" id="sup-nd-co-${bid}" min="${today}" value="${b.checkOut}">
        </div>
      </div>
      <div id="sup-nd-nights-${bid}" style="font-size:12px;color:var(--text-sec);margin-top:2px;"></div>`;
  }
  else if (modKey === 'guest') {
    const roomBlocks = b.rooms.map((r, i) => {
      const label = b.rooms.length > 1 ? `Room ${i+1}: ${r.name}` : r.name;
      const guestInputs = r.guests.map((g, gi) => `
        <div class="sup-form-field">
          <label class="sup-form-label">Guest ${gi+1}</label>
          <input type="text" class="sup-form-input" value="${g}" placeholder="Full name">
        </div>`).join('');
      return `
        <div class="sup-guest-block">
          <div class="sup-guest-block-title">${label}</div>
          <div class="sup-form-row cols-3">
            <div class="sup-form-field">
              <label class="sup-form-label">${t('sup_form.adults')}</label>
              <input type="number" class="sup-form-input" id="sup-adults-${bid}-${i}" min="1" max="6" value="${r.guestCount}" onchange="supUpdateChildAges('${bid}',${i})">
            </div>
            <div class="sup-form-field">
              <label class="sup-form-label">${t('sup_form.children')}</label>
              <input type="number" class="sup-form-input" id="sup-children-${bid}-${i}" min="0" max="4" value="0" onchange="supUpdateChildAges('${bid}',${i})">
            </div>
          </div>
          <div id="sup-child-ages-wrap-${bid}-${i}"></div>
          <div class="sup-form-row">${guestInputs}</div>
        </div>`;
    }).join('');
    formHTML = `<div class="sup-mod-form-title">${t('sup2.guest')}</div>${roomBlocks}`;
  }
  else if (modKey === 'room') {
    const roomOptions = hd.roomTypes.map(rt =>
      `<option value="${rt}" ${b.rooms[0]?.name === rt ? 'selected' : ''}>${rt}</option>`
    ).join('');
    const currentRooms = b.rooms.map((r, i) =>
      `${b.rooms.length > 1 ? `Room ${i+1}: ` : ''}${r.name}`).join(', ');
    formHTML = `
      <div class="sup-mod-form-title">${t('sup2.room')}</div>
      <div style="font-size:12px;color:var(--text-sec);margin-bottom:8px;">${t('sup_form.current')}: ${currentRooms}</div>
      <div class="sup-form-row cols-1">
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.room_type')}</label>
          <select class="sup-form-input" id="sup-room-type-${bid}">${roomOptions}</select>
        </div>
      </div>
      <div class="sup-form-info">${t('sup_form.room_info')}</div>`;
  }
  else if (modKey === 'meal') {
    const mealOptions = MEAL_PLAN_OPTIONS.map(mp => `<option>${mp}</option>`).join('');
    const applyOptions = b.rooms.length > 1
      ? [t('sup_form.all_rooms'), ...b.rooms.map((r, i) => `Room ${i+1}: ${r.name}`)].map(o => `<option>${o}</option>`).join('')
      : `<option>${t('sup_form.all_rooms')}</option>`;
    const currentMeals = b.rooms.map((r, i) =>
      `${b.rooms.length > 1 ? `Room ${i+1}: ` : ''}${r.meal}`).join(', ');
    formHTML = `
      <div class="sup-mod-form-title">${t('sup2.meal')}</div>
      <div style="font-size:12px;color:var(--text-sec);margin-bottom:8px;">${t('sup_form.current')}: ${currentMeals}</div>
      <div class="sup-form-row">
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.meal_plan')}</label>
          <select class="sup-form-input" id="sup-meal-plan-${bid}">${mealOptions}</select>
        </div>
        ${b.rooms.length > 1 ? `
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.apply_to')}</label>
          <select class="sup-form-input" id="sup-meal-apply-${bid}">${applyOptions}</select>
        </div>` : ''}
      </div>`;
  }
  else if (modKey === 'upgrade') {
    const upgradeOptions = hd.roomTypes.slice(1).map(rt => `<option>${rt}</option>`).join('');
    formHTML = `
      <div class="sup-mod-form-title">${t('sup2.upgrade')}</div>
      <div class="sup-form-row cols-1">
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.upgrade_to')}</label>
          <select class="sup-form-input" id="sup-upgrade-type-${bid}">${upgradeOptions}</select>
        </div>
      </div>
      <div class="sup-form-info">${t('sup_form.upgrade_info')}</div>`;
  }
  else if (modKey === 'extend') {
    const minCo = new Date(b.checkOut);
    minCo.setDate(minCo.getDate() + 1);
    formHTML = `
      <div class="sup-mod-form-title">${t('sup2.extend')}</div>
      <div style="font-size:12px;color:var(--text-sec);margin-bottom:8px;">${t('sup_form.cur_co')}: ${supFmtDate(b.checkOut)}</div>
      <div class="sup-form-row">
        <div class="sup-form-field">
          <label class="sup-form-label">${t('sup_form.new_co')}</label>
          <input type="date" class="sup-form-input" id="sup-ext-co-${bid}" min="${minCo.toISOString().slice(0,10)}">
        </div>
        <div class="sup-form-field" style="justify-content:flex-end;padding-top:18px;">
          <div id="sup-ext-nights-${bid}" style="font-size:13px;color:var(--navy);font-weight:600;"></div>
        </div>
      </div>`;
  }

  container.innerHTML = `
    <div class="sup-mod-form">
      ${formHTML}
      <div class="sup-btn-row" style="margin-top:4px;">
        <button class="sup-btn sup-btn-primary" onclick="supSubmitMod('${bid}','${modKey}')">${t('sup_form.submit')}</button>
        <button class="sup-btn sup-btn-outline" onclick="supCloseModForm('${bid}')">${t('sup_form.cancel')}</button>
      </div>
      <div id="sup-mod-feedback-${bid}"></div>
    </div>`;

  if (modKey === 'dates') {
    const ciEl     = document.getElementById(`sup-nd-ci-${bid}`);
    const coEl     = document.getElementById(`sup-nd-co-${bid}`);
    const nightsEl = document.getElementById(`sup-nd-nights-${bid}`);
    const update   = () => {
      if (ciEl.value && coEl.value && coEl.value > ciEl.value)
        nightsEl.textContent = t('sup_form.nights_arrow').replace('{n}', supNights(ciEl.value, coEl.value));
      else nightsEl.textContent = '';
    };
    ciEl.addEventListener('change', update);
    coEl.addEventListener('change', update);
    update();
  }
  if (modKey === 'extend') {
    document.getElementById(`sup-ext-co-${bid}`).addEventListener('change', function() {
      const el = document.getElementById(`sup-ext-nights-${bid}`);
      if (this.value > b.checkOut) {
        const n = supNights(b.checkOut, this.value);
        el.textContent = t(n !== 1 ? 'sup_form.extra_nights_pl' : 'sup_form.extra_nights').replace('{n}', n);
      } else el.textContent = '';
    });
  }
}

function supUpdateChildAges(bid, roomIdx) {
  const count = parseInt(document.getElementById(`sup-children-${bid}-${roomIdx}`)?.value) || 0;
  const wrap  = document.getElementById(`sup-child-ages-wrap-${bid}-${roomIdx}`);
  if (!wrap) return;
  if (count === 0) { wrap.innerHTML = ''; return; }
  const inputs = Array.from({length: count}, (_, i) => `
    <div class="sup-form-field">
      <label class="sup-form-label">${t('sup_form.child_age').replace('{n}', i + 1)}</label>
      <input type="number" class="sup-form-input sup-child-age-input" min="0" max="17" placeholder="${t('pc.adults')}">
    </div>`).join('');
  wrap.innerHTML = `<div class="sup-form-row" style="flex-wrap:wrap;">${inputs}</div>`;
}

function supCloseModForm(bid) {
  const container = document.getElementById(`sup-mod-form-${bid}`);
  if (container) container.innerHTML = '';
  document.querySelectorAll(`.sup-mod-card[data-bid="${bid}"]`).forEach(c => c.classList.remove('active'));
  supActiveModKey = null;
}

function supSubmitMod(bid, modKey) {
  const fb = document.getElementById(`sup-mod-feedback-${bid}`);
  const okKey = { dates:'sup_form.ok_dates', guest:'sup_form.ok_guest', room:'sup_form.ok_room',
                  meal:'sup_form.ok_meal', upgrade:'sup_form.ok_upgrade', extend:'sup_form.ok_extend' };

  if (modKey === 'dates') {
    const ci = document.getElementById(`sup-nd-ci-${bid}`)?.value;
    const co = document.getElementById(`sup-nd-co-${bid}`)?.value;
    if (!ci || !co || co <= ci) {
      if (fb) fb.innerHTML = `<div style="font-size:12px;color:#d93025;">${t('sup_form.err_dates')}</div>`;
      return;
    }
  }
  if (modKey === 'extend') {
    const co = document.getElementById(`sup-ext-co-${bid}`)?.value;
    const b  = BOOKINGS.find(x => x.id === bid);
    if (!co || co <= b.checkOut) {
      if (fb) fb.innerHTML = `<div style="font-size:12px;color:#d93025;">${t('sup_form.err_ext')}</div>`;
      return;
    }
  }

  if (fb) fb.innerHTML = `<div style="font-size:12px;color:#1a9e5c;font-weight:600;">✓ ${t(okKey[modKey] || 'sup_form.ok_dates')}${t('sup_form.submitted')}</div>`;
  document.querySelector(`#sup-mod-form-${bid} .sup-btn-primary`).disabled = true;
}

// ---- Refund calculation ----
function supCalcRefund(bid, btn) {
  const resultEl = document.getElementById(`sup-refund-result-${bid}`);
  if (!resultEl) return;

  btn.disabled = true;
  resultEl.innerHTML = `
    <div class="sup-refund-loading">
      <div class="sup-refund-spinner"></div>
      ${t('sup_refund.loading')}
    </div>`;

  const b             = BOOKINGS.find(x => x.id === bid);
  const primaryPolicy = b.rooms[0]?.cancelPolicy || 'free';
  const todayPct      = supTodayPct(primaryPolicy, b.checkIn);
  const cancelFee     = Math.round(b.cost * todayPct / 100);
  const amountPaid    = b.paid ? b.cost : 0;
  const netRefund     = amountPaid - cancelFee;

  setTimeout(() => {
    const refundColor = netRefund > 0 ? 'sup-refund-positive' : netRefund < 0 ? 'sup-refund-negative' : '';
    const refundLabel = netRefund > 0 ? `$${netRefund.toLocaleString()}${t('sup_refund.refunded')}`
                      : netRefund < 0 ? `$${Math.abs(netRefund).toLocaleString()}${t('sup_refund.owed')}`
                      : t('sup_refund.even');

    resultEl.innerHTML = `
      <div class="sup-refund-result">
        <div class="sup-refund-row"><span>${t('sup1.bk_cost')}</span><span>$${b.cost.toLocaleString()}</span></div>
        <div class="sup-refund-row"><span>${t('sup_refund.paid')}</span><span>${amountPaid > 0 ? `$${amountPaid.toLocaleString()}` : t('sup_refund.not_paid')}</span></div>
        <div class="sup-refund-row"><span>${t('sup_refund.fee').replace('{pct}', todayPct)}</span><span>${cancelFee > 0 ? `−$${cancelFee.toLocaleString()}` : t('sup1.free')}</span></div>
        <div class="sup-refund-row"><span>${t('sup_refund.net')}</span><span class="${refundColor}">${refundLabel}</span></div>
      </div>`;

    btn.disabled = false;
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
      ${t('sup_refund.recalc')}`;
  }, 1200);
}

// ---- Cancel flow ----
function supInitCancel(id) {
  const row = document.getElementById(`sup-cancel-row-${id}`);
  if (!row) return;
  const b      = BOOKINGS.find(x => x.id === id);
  const pct    = supTodayPct(b.rooms[0]?.cancelPolicy || 'free', b.checkIn);
  const fee    = Math.round(b.cost * pct / 100);
  const feeStr = fee > 0 ? `$${fee.toLocaleString()}${t('sup_cancel.fee')}` : t('sup_cancel.free');
  row.innerHTML = `
    <div class="sup-confirm-wrap">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span><strong>${t('sup_cancel.confirm')}</strong> ${feeStr}</span>
      <button class="sup-btn sup-btn-danger"  onclick="supConfirmCancel('${id}')">${t('sup_cancel.yes')}</button>
      <button class="sup-btn sup-btn-outline" onclick="supCancelAbort('${id}')">${t('sup_cancel.no')}</button>
    </div>`;
}

function supConfirmCancel(id) {
  const row = document.getElementById(`sup-cancel-row-${id}`);
  if (row) row.innerHTML = `<div style="font-size:12px;color:#1a9e5c;font-weight:600;">✓ ${t('sup_cancel.done')}</div>`;
}

function supCancelAbort(id) {
  const row = document.getElementById(`sup-cancel-row-${id}`);
  if (!row) return;
  row.innerHTML = `
    <button class="sup-btn sup-btn-danger" onclick="supInitCancel('${id}')">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      ${t('sup.cancel_btn')}
    </button>
    <button class="sup-btn sup-btn-outline" onclick="supCalcRefund('${id}', this)">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
      ${t('sup.refund_btn')}
    </button>
    <div id="sup-refund-result-${id}"></div>`;
}

// ---- Claim ----
function supSubmitClaim(id) {
  const cat = document.getElementById(`sup-claim-cat-${id}`)?.value;
  const txt = document.getElementById(`sup-claim-txt-${id}`)?.value?.trim();
  const fb  = document.getElementById(`sup-claim-feedback-${id}`);
  if (!cat) { if (fb) fb.innerHTML = `<div style="font-size:12px;color:#d93025;">${t('sup_claim.no_cat')}</div>`; return; }
  if (!txt) { if (fb) fb.innerHTML = `<div style="font-size:12px;color:#d93025;">${t('sup_claim.no_txt')}</div>`; return; }
  const ref = 'CLM-' + Math.random().toString(36).slice(2,7).toUpperCase();
  if (fb) fb.innerHTML = `<div style="font-size:12px;color:#1a9e5c;font-weight:600;">${t('sup_claim.ok_pfx')}${cat}${t('sup_claim.ok_sfx')}</div>`;
}

// ---- Generic action ----
function supSimpleAction(btn, msg) {
  btn.disabled = true;
  btn.textContent = '✓ ' + msg;
  btn.style.background = '#1a9e5c';
  btn.style.borderColor = '#1a9e5c';
  btn.style.color = '#fff';
}

// ---- Filters ----
function supGetFilters() {
  return {
    id:        document.getElementById('sup-f-id').value.trim().toLowerCase(),
    hotel:     document.getElementById('sup-f-hotel').value.trim().toLowerCase(),
    guest:     document.getElementById('sup-f-guest').value.trim().toLowerCase(),
    bdateFrom: document.getElementById('sup-f-bdate-from').value,
    bdateTo:   document.getElementById('sup-f-bdate-to').value,
    ciFrom:    document.getElementById('sup-f-ci-from').value,
    ciTo:      document.getElementById('sup-f-ci-to').value,
    coFrom:    document.getElementById('sup-f-co-from').value,
    coTo:      document.getElementById('sup-f-co-to').value,
    statuses:  [...document.querySelectorAll('.sup-f-status:checked')].map(x => x.value),
  };
}

function supApplyFilters() {
  const f = supGetFilters();
  const results = BOOKINGS.filter(b => {
    if (f.id    && !b.id.toLowerCase().includes(f.id))       return false;
    if (f.hotel && !b.hotel.toLowerCase().includes(f.hotel)) return false;
    if (f.guest && !b.guest.toLowerCase().includes(f.guest)) return false;
    if (f.bdateFrom && b.bookingDate < f.bdateFrom) return false;
    if (f.bdateTo   && b.bookingDate > f.bdateTo)   return false;
    if (f.ciFrom && b.checkIn < f.ciFrom)   return false;
    if (f.ciTo   && b.checkIn > f.ciTo)     return false;
    if (f.coFrom && b.checkOut < f.coFrom)  return false;
    if (f.coTo   && b.checkOut > f.coTo)    return false;
    if (f.statuses.length && !f.statuses.includes(b.status)) return false;
    return true;
  });
  renderSupport(results);
}

document.getElementById('sup-adv-toggle').addEventListener('click', () => {
  const panel = document.getElementById('sup-adv-panel');
  const open  = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  document.getElementById('sup-adv-toggle').classList.toggle('open', open);
});

document.getElementById('sup-search-btn').addEventListener('click', supApplyFilters);

['sup-f-id','sup-f-hotel','sup-f-guest'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') supApplyFilters(); });
});

document.getElementById('sup-reset-btn').addEventListener('click', () => {
  ['sup-f-id','sup-f-hotel','sup-f-guest',
   'sup-f-bdate-from','sup-f-bdate-to',
   'sup-f-ci-from','sup-f-ci-to',
   'sup-f-co-from','sup-f-co-to'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.querySelectorAll('.sup-f-status').forEach(cb => cb.checked = true);
  renderSupport(BOOKINGS);
});

document.querySelector('[data-page="support"]').addEventListener('click', () => {
  if (!document.getElementById('sup-tbody').children.length) renderSupport(BOOKINGS);
});
