/* ========================================
   Bookings Page
   ======================================== */

const TODAY = new Date(); TODAY.setHours(0,0,0,0);

function daysFromToday(n) {
  const d = new Date(TODAY); d.setDate(d.getDate() + n);
  return d.toISOString().slice(0,10);
}

// ---- Cancellation policy templates ----
const CANCEL_POLICIES = {
  free: {
    label: 'Free Cancellation',
    rules: [
      { daysThreshold: 7,  fee: 'No charge',    pct: 0   },
      { daysThreshold: 3,  fee: '50% of stay',  pct: 50  },
      { daysThreshold: -1, fee: '100% of stay', pct: 100 },
    ],
  },
  partial: {
    label: 'Partial Cancellation Fee',
    rules: [
      { daysThreshold: 14, fee: 'No charge',    pct: 0   },
      { daysThreshold: 7,  fee: '25% of stay',  pct: 25  },
      { daysThreshold: 3,  fee: '50% of stay',  pct: 50  },
      { daysThreshold: -1, fee: '100% of stay', pct: 100 },
    ],
  },
  strict: {
    label: 'Non-Refundable',
    rules: [
      { daysThreshold: -1, fee: '100% of stay', pct: 100 },
    ],
  },
  moderate: {
    label: 'Moderate Policy',
    rules: [
      { daysThreshold: 5,  fee: 'No charge',    pct: 0   },
      { daysThreshold: 1,  fee: '50% of stay',  pct: 50  },
      { daysThreshold: -1, fee: '100% of stay', pct: 100 },
    ],
  },
};

const CANCEL_POLICY_RULE_LABELS = {
  free:     ['More than 7 days before check-in', '3–7 days before check-in', 'Less than 3 days before check-in'],
  partial:  ['More than 14 days before check-in', '7–14 days before check-in', '3–7 days before check-in', 'Less than 3 days before check-in'],
  strict:   ['Any time after booking'],
  moderate: ['More than 5 days before check-in', '1–5 days before check-in', 'Same day / no-show'],
};

function todayCancelPct(policyKey, checkIn) {
  const policy = CANCEL_POLICIES[policyKey];
  if (!policy) return 0;
  const ci = new Date(checkIn); ci.setHours(0,0,0,0);
  const daysUntil = Math.round((ci - TODAY) / 86400000);
  for (const rule of policy.rules) {
    if (daysUntil > rule.daysThreshold) return rule.pct;
  }
  return policy.rules[policy.rules.length - 1].pct;
}

// ---- Mock booking data ----
const BOOKINGS = [
  {
    id:'BNR-001', bookingDate:daysFromToday(-45), checkIn:daysFromToday(5),   checkOut:daysFromToday(10),
    hotel:'Burj Al Arab', guest:'Ahmed Al-Mansouri', cost:9940, status:'confirmed', cancelFee:0, payDue:daysFromToday(3), paid:false,
    rooms:[{ name:'Deluxe Suite', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'free', guests:['Ahmed Al-Mansouri','Fatima Al-Mansouri'], guestCount:2, arrivalTime:'14:00', notes:'Late check-in requested. Sea-view room preferred.' }],
  },
  {
    id:'BNR-002', bookingDate:daysFromToday(-30), checkIn:daysFromToday(2),   checkOut:daysFromToday(6),
    hotel:'Four Seasons Doha', guest:'Sofia Mendes', cost:1960, status:'confirmed', cancelFee:0, payDue:daysFromToday(0), paid:false,
    rooms:[{ name:'Deluxe Room', meal:'Room Only', cancelFee:0, bedType:'Twin', cancelPolicy:'moderate', guests:['Sofia Mendes','Carlos Mendes'], guestCount:2, arrivalTime:'15:30', notes:'' }],
  },
  {
    id:'BNR-003', bookingDate:daysFromToday(-60), checkIn:daysFromToday(-5),  checkOut:daysFromToday(-2),
    hotel:'Ritz-Carlton Riyadh', guest:'Ivan Petrov', cost:1560, status:'confirmed', cancelFee:0, payDue:daysFromToday(-10), paid:true,
    rooms:[{ name:'Classic Room', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'free', guests:['Ivan Petrov'], guestCount:1, arrivalTime:'12:00', notes:'Ground floor preferred.' }],
  },
  {
    id:'BNR-004', bookingDate:daysFromToday(-20), checkIn:daysFromToday(15),  checkOut:daysFromToday(19),
    hotel:'La Mamounia Marrakech', guest:'Marie Dupont', cost:2560, status:'confirmed', cancelFee:0, payDue:daysFromToday(8), paid:false,
    rooms:[{ name:'Classic Room Garden', meal:'Half Board', cancelFee:0, bedType:'Queen', cancelPolicy:'partial', guests:['Marie Dupont','Pierre Dupont'], guestCount:2, arrivalTime:'16:00', notes:'Anniversary trip. Rose petals and champagne on arrival.' }],
  },
  {
    id:'BNR-005', bookingDate:daysFromToday(-10), checkIn:daysFromToday(30),  checkOut:daysFromToday(35),
    hotel:'Atlantis The Palm', guest:'James Robinson', cost:2450, status:'pending', cancelFee:0, payDue:daysFromToday(20), paid:false,
    rooms:[{ name:'Ocean Premier Room', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'free', guests:['James Robinson','Emma Robinson'], guestCount:2, arrivalTime:'13:00', notes:'' }],
  },
  {
    id:'BNR-006', bookingDate:daysFromToday(-90), checkIn:daysFromToday(-20), checkOut:daysFromToday(-15),
    hotel:'Grand Hyatt Amman', guest:'Layla Hassan', cost:1200, status:'cancelled', cancelFee:300, payDue:daysFromToday(-5), paid:false,
    rooms:[{ name:'Standard Room', meal:'Room Only', cancelFee:300, bedType:'Twin', cancelPolicy:'moderate', guests:['Layla Hassan'], guestCount:1, arrivalTime:'14:00', notes:'Cancelled due to travel change.' }],
  },
  {
    id:'BNR-007', bookingDate:daysFromToday(-15), checkIn:daysFromToday(7),   checkOut:daysFromToday(12),
    hotel:'Four Seasons Bosphorus', guest:'Yuki Tanaka', cost:2900, status:'confirmed', cancelFee:0, payDue:daysFromToday(-2), paid:false,
    rooms:[{ name:'Bosphorus View Room', meal:'Room Only', cancelFee:0, bedType:'King', cancelPolicy:'partial', guests:['Yuki Tanaka','Kenji Tanaka'], guestCount:2, arrivalTime:'15:00', notes:'' }],
  },
  {
    id:'BNR-008', bookingDate:daysFromToday(-5),  checkIn:daysFromToday(45),  checkOut:daysFromToday(50),
    hotel:'Emirates Palace', guest:'Carlos Ramirez', cost:14500, status:'confirmed', cancelFee:0, payDue:daysFromToday(30), paid:false,
    rooms:[
      { name:'Palace Suite', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'partial', guests:['Carlos Ramirez','Isabella Ramirez'], guestCount:2, arrivalTime:'17:00', notes:'VIP guest. Butler service required.' },
      { name:'Deluxe Room',  meal:'Room Only',           cancelFee:0, bedType:'Twin', cancelPolicy:'partial', guests:['Marco Ramirez','Sofia Ramirez'],    guestCount:2, arrivalTime:'17:00', notes:'Children – extra bed required.' },
    ],
  },
  {
    id:'BNR-009', bookingDate:daysFromToday(-40), checkIn:daysFromToday(-3),  checkOut:daysFromToday(1),
    hotel:'Shangri-La Muscat', guest:'Priya Sharma', cost:1360, status:'confirmed', cancelFee:0, payDue:daysFromToday(-15), paid:true,
    rooms:[{ name:'Deluxe Room', meal:'Breakfast Included', cancelFee:0, bedType:'Queen', cancelPolicy:'free', guests:['Priya Sharma','Raj Sharma'], guestCount:2, arrivalTime:'12:00', notes:'' }],
  },
  {
    id:'BNR-010', bookingDate:daysFromToday(-25), checkIn:daysFromToday(20),  checkOut:daysFromToday(25),
    hotel:'St. Regis Doha', guest:'Mohammed Al-Farsi', cost:4800, status:'confirmed', cancelFee:0, payDue:daysFromToday(12), paid:false,
    rooms:[{ name:'Deluxe Suite', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'strict', guests:['Mohammed Al-Farsi','Aisha Al-Farsi','Khalid Al-Farsi'], guestCount:3, arrivalTime:'14:00', notes:'' }],
  },
  {
    id:'BNR-011', bookingDate:daysFromToday(-70), checkIn:daysFromToday(-30), checkOut:daysFromToday(-26),
    hotel:'Nile Ritz-Carlton Cairo', guest:'Anna Kowalski', cost:2080, status:'cancelled', cancelFee:520, payDue:daysFromToday(-20), paid:true,
    rooms:[{ name:'Deluxe Room', meal:'Half Board', cancelFee:520, bedType:'King', cancelPolicy:'moderate', guests:['Anna Kowalski'], guestCount:1, arrivalTime:'15:00', notes:'Cancelled – visa issue.' }],
  },
  {
    id:'BNR-012', bookingDate:daysFromToday(-8),  checkIn:daysFromToday(60),  checkOut:daysFromToday(66),
    hotel:'Four Seasons Paris George V', guest:'Elisa Rossi', cost:6600, status:'pending', cancelFee:0, payDue:daysFromToday(45), paid:false,
    rooms:[{ name:'Deluxe Room', meal:'Room Only', cancelFee:0, bedType:'Twin', cancelPolicy:'partial', guests:['Elisa Rossi','Giulia Rossi'], guestCount:2, arrivalTime:'16:00', notes:'' }],
  },
  {
    id:'BNR-013', bookingDate:daysFromToday(-50), checkIn:daysFromToday(-10), checkOut:daysFromToday(-6),
    hotel:'Hilton Abu Dhabi', guest:'Omar Khalil', cost:760, status:'confirmed', cancelFee:0, payDue:daysFromToday(-25), paid:true,
    rooms:[{ name:'Standard Room', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'free', guests:['Omar Khalil'], guestCount:1, arrivalTime:'13:00', notes:'' }],
  },
  {
    id:'BNR-014', bookingDate:daysFromToday(-3),  checkIn:daysFromToday(90),  checkOut:daysFromToday(97),
    hotel:'Ritz Paris', guest:'Zhang Wei', cost:9100, status:'pending', cancelFee:0, payDue:daysFromToday(70), paid:false,
    rooms:[{ name:'Classic Room', meal:'Room Only', cancelFee:0, bedType:'King', cancelPolicy:'partial', guests:['Zhang Wei','Lin Wei'], guestCount:2, arrivalTime:'14:00', notes:'Champagne on arrival. High floor preferred.' }],
  },
  {
    id:'BNR-015', bookingDate:daysFromToday(-35), checkIn:daysFromToday(-8),  checkOut:daysFromToday(-4),
    hotel:'Four Seasons Marrakech', guest:'Lucas Schmidt', cost:1800, status:'cancelled', cancelFee:900, payDue:daysFromToday(-3), paid:false,
    rooms:[{ name:'Classic Room', meal:'Breakfast Included', cancelFee:900, bedType:'Queen', cancelPolicy:'strict', guests:['Lucas Schmidt','Mia Schmidt'], guestCount:2, arrivalTime:'15:00', notes:'' }],
  },
  {
    id:'BNR-016', bookingDate:daysFromToday(-12), checkIn:daysFromToday(10),  checkOut:daysFromToday(14),
    hotel:'Sofitel Marrakech', guest:'Fatima Al-Zahra', cost:1280, status:'confirmed', cancelFee:0, payDue:daysFromToday(1), paid:false,
    rooms:[{ name:'Suite', meal:'Half Board', cancelFee:0, bedType:'King', cancelPolicy:'moderate', guests:['Fatima Al-Zahra','Youssef Al-Zahra'], guestCount:2, arrivalTime:'16:00', notes:'' }],
  },
  {
    id:'BNR-017', bookingDate:daysFromToday(-80), checkIn:daysFromToday(-40), checkOut:daysFromToday(-35),
    hotel:'Four Seasons Kuwait', guest:'David Okafor', cost:3250, status:'confirmed', cancelFee:0, payDue:daysFromToday(-50), paid:true,
    rooms:[{ name:'Deluxe Room', meal:'Breakfast Included', cancelFee:0, bedType:'Queen', cancelPolicy:'free', guests:['David Okafor','Ngozi Okafor'], guestCount:2, arrivalTime:'12:00', notes:'' }],
  },
  {
    id:'BNR-018', bookingDate:daysFromToday(-18), checkIn:daysFromToday(25),  checkOut:daysFromToday(30),
    hotel:'Tbilisi Marriott Hotel', guest:'Anya Ivanova', cost:1250, status:'confirmed', cancelFee:0, payDue:daysFromToday(10), paid:false,
    rooms:[{ name:'Deluxe Room', meal:'Breakfast Included', cancelFee:0, bedType:'Twin', cancelPolicy:'free', guests:['Anya Ivanova','Misha Ivanov'], guestCount:2, arrivalTime:'14:00', notes:'Cot required for infant.' }],
  },
  {
    id:'BNR-019', bookingDate:daysFromToday(-55), checkIn:daysFromToday(-15), checkOut:daysFromToday(-10),
    hotel:'Hotel Grande Bretagne Athens', guest:'Marco Bianchi', cost:2500, status:'noshow', cancelFee:2500, payDue:daysFromToday(-30), paid:false,
    rooms:[{ name:'Classic Room', meal:'Room Only', cancelFee:2500, bedType:'King', cancelPolicy:'strict', guests:['Marco Bianchi'], guestCount:1, arrivalTime:'15:00', notes:'Guest did not check in. Full charge applied.' }],
  },
  {
    id:'BNR-020', bookingDate:daysFromToday(-6),  checkIn:daysFromToday(3),   checkOut:daysFromToday(5),
    hotel:'Premier Inn Dubai Airport', guest:'Rachel Green', cost:380, status:'confirmed', cancelFee:0, payDue:daysFromToday(-1), paid:false,
    rooms:[{ name:'Standard Room', meal:'Room Only', cancelFee:0, bedType:'Double', cancelPolicy:'moderate', guests:['Rachel Green'], guestCount:1, arrivalTime:'02:00', notes:'Early flight – 2am arrival. Keep front desk informed.' }],
  },
  {
    id:'BNR-021', bookingDate:daysFromToday(-22), checkIn:daysFromToday(40),  checkOut:daysFromToday(47),
    hotel:'Al Bustan Palace Ritz-Carlton', guest:'Hassan Al-Amri', cost:4550, status:'confirmed', cancelFee:0, payDue:daysFromToday(25), paid:false,
    rooms:[{ name:'Deluxe Suite', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'partial', guests:['Hassan Al-Amri','Mariam Al-Amri'], guestCount:2, arrivalTime:'15:00', notes:'' }],
  },
  {
    id:'BNR-022', bookingDate:daysFromToday(-100),checkIn:daysFromToday(-50), checkOut:daysFromToday(-45),
    hotel:'Hilton Cairo Zamalek', guest:'Sarah Johnson', cost:900, status:'cancelled', cancelFee:225, payDue:daysFromToday(-60), paid:true,
    rooms:[{ name:'Standard Room', meal:'Room Only', cancelFee:225, bedType:'Twin', cancelPolicy:'moderate', guests:['Sarah Johnson','Tom Johnson'], guestCount:2, arrivalTime:'14:00', notes:'' }],
  },
  {
    id:'BNR-023', bookingDate:daysFromToday(-2),  checkIn:daysFromToday(120), checkOut:daysFromToday(127),
    hotel:'Emirates Palace', guest:'Dmitri Volkov', cost:18200, status:'pending', cancelFee:0, payDue:daysFromToday(100), paid:false,
    rooms:[
      { name:'Diamond Suite', meal:'All Inclusive',      cancelFee:0, bedType:'King', cancelPolicy:'strict', guests:['Dmitri Volkov','Elena Volkova'],  guestCount:2, arrivalTime:'16:00', notes:'Corporate event. VIP treatment required.' },
      { name:'Deluxe Room',   meal:'Breakfast Included', cancelFee:0, bedType:'Twin', cancelPolicy:'strict', guests:['Alexei Smirnov','Igor Petrov'],   guestCount:2, arrivalTime:'16:00', notes:'Executive team members.' },
      { name:'Deluxe Room',   meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'strict', guests:['Natasha Sokolova'],               guestCount:1, arrivalTime:'17:00', notes:'PA to Mr Volkov.' },
    ],
  },
  {
    id:'BNR-024', bookingDate:daysFromToday(-28), checkIn:daysFromToday(1),   checkOut:daysFromToday(4),
    hotel:'Radisson Blu Pera Istanbul', guest:'Mei Lin', cost:570, status:'confirmed', cancelFee:0, payDue:daysFromToday(-5), paid:false,
    rooms:[{ name:'Standard Room', meal:'Breakfast Included', cancelFee:0, bedType:'Double', cancelPolicy:'free', guests:['Mei Lin'], guestCount:1, arrivalTime:'13:00', notes:'' }],
  },
  {
    id:'BNR-025', bookingDate:daysFromToday(-14), checkIn:daysFromToday(55),  checkOut:daysFromToday(60),
    hotel:'Gulf Hotel Bahrain', guest:'Khalid Al-Rashidi', cost:1750, status:'confirmed', cancelFee:0, payDue:daysFromToday(38), paid:false,
    rooms:[{ name:'Deluxe Room', meal:'Breakfast Included', cancelFee:0, bedType:'King', cancelPolicy:'partial', guests:['Khalid Al-Rashidi','Noura Al-Rashidi'], guestCount:2, arrivalTime:'15:00', notes:'' }],
  },
];

// ---- Helpers ----
function payStatusKey(b) {
  if (b.paid) return 'paid';
  const due = new Date(b.payDue); due.setHours(0,0,0,0);
  const diff = Math.round((due - TODAY) / 86400000);
  if (diff > 0)   return 'due_future';
  if (diff === 0) return 'due_today';
  return 'overdue';
}

function payStatusLabel(b) {
  const key = payStatusKey(b);
  if (key === 'paid')       return { label:'Paid', cls:'pay-paid' };
  if (key === 'due_future') {
    const diff = Math.round((new Date(b.payDue) - TODAY) / 86400000);
    return { label:`Due in ${diff} day${diff!==1?'s':''}`, cls:'pay-due-future' };
  }
  if (key === 'due_today')  return { label:'Payment Due', cls:'pay-due-today' };
  return { label:'Payment Overdue', cls:'pay-overdue' };
}

function fmtDate(iso) {
  if (!iso) return '—';
  const [y,m,d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function nightsBetween(from, to) {
  return Math.round((new Date(to) - new Date(from)) / 86400000);
}

// Final cost:
// - cancelled / noshow → cancelFee (what was actually charged)
// - confirmed / pending → full booking cost
function finalCost(b) {
  return (b.status === 'cancelled' || b.status === 'noshow') ? b.cancelFee : b.cost;
}

// ---- Render table ----
let expandedId = null;

function renderBookings(list) {
  const tbody = document.getElementById('bk-tbody');
  const noRes = document.getElementById('bk-no-results');
  const meta  = document.getElementById('bk-table-meta');
  tbody.innerHTML = '';
  expandedId = null;

  meta.textContent = `${list.length} booking${list.length!==1?'s':''}`;
  if (list.length === 0) { noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  list.forEach(b => {
    const pay       = payStatusLabel(b);
    const fc        = finalCost(b);
    const statusCls = `status-${b.status}`;
    const statusLbl = b.status === 'noshow' ? 'No Show'
                    : b.status.charAt(0).toUpperCase() + b.status.slice(1);

    const tr = document.createElement('tr');
    tr.dataset.id = b.id;
    tr.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${fmtDate(b.bookingDate)}</td>
      <td>${fmtDate(b.checkIn)}</td>
      <td class="bk-wrap">${b.hotel}</td>
      <td>${b.guest}</td>
      <td>$${b.cost.toLocaleString()}</td>
      <td><span class="badge ${statusCls}">${statusLbl}</span></td>
      <td>$${fc.toLocaleString()}</td>
      <td><span class="badge ${pay.cls}">${pay.label}</span></td>
      <td>
        <button class="bk-show-more-btn" data-id="${b.id}" title="Show details">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Build detail panel ----
function buildDetailHTML(b) {
  const nights = nightsBetween(b.checkIn, b.checkOut);

  const roomCards = b.rooms.map((r, idx) => {
    const policy     = CANCEL_POLICIES[r.cancelPolicy] || CANCEL_POLICIES.free;
    const ruleLabels = CANCEL_POLICY_RULE_LABELS[r.cancelPolicy] || CANCEL_POLICY_RULE_LABELS.free;
    const policyId   = `policy-${b.id}-${idx}`;

    const share    = b.rooms.length > 1 ? (1 / b.rooms.length) : 1;
    const roomCost = Math.round(b.cost * share);
    const todayPct = todayCancelPct(r.cancelPolicy, b.checkIn);
    const todayFee = Math.round(roomCost * todayPct / 100);
    const todayFeeStr = todayPct === 0
      ? '<span style="color:#1a9e5c;font-weight:600;">Free</span>'
      : `<span style="color:#d97706;font-weight:600;">$${todayFee.toLocaleString()} (${todayPct}%)</span>`;

    const rulesHTML = policy.rules.map((rule, ri) => `
      <div class="bk-policy-rule">
        <div class="bk-policy-deadline">${ruleLabels[ri] || ''}</div>
        <div class="bk-policy-fee ${rule.pct === 0 ? 'fee-free' : rule.pct === 100 ? 'fee-full' : 'fee-partial'}">${rule.fee}</div>
      </div>
    `).join('');

    return `
      <div class="bk-room-card">
        <div class="bk-room-card-title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          ${b.rooms.length > 1 ? `Room ${idx+1}: ` : ''}${r.name}
        </div>
        <div class="bk-room-detail-grid">
          <div class="bk-detail-item">
            <div class="bk-detail-label">Check-in</div>
            <div class="bk-detail-value">${fmtDate(b.checkIn)}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Check-out</div>
            <div class="bk-detail-value">${fmtDate(b.checkOut)}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Length of Stay</div>
            <div class="bk-detail-value">${nights} night${nights!==1?'s':''}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Meal Plan</div>
            <div class="bk-detail-value">${r.meal}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Bed Type</div>
            <div class="bk-detail-value">${r.bedType}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Guests</div>
            <div class="bk-detail-value">${r.guestCount} guest${r.guestCount!==1?'s':''}</div>
          </div>
          <div class="bk-detail-item">
            <div class="bk-detail-label">Today's Cancel Fee</div>
            <div class="bk-detail-value">${b.status === 'cancelled' || b.status === 'noshow' ? '—' : todayFeeStr}</div>
          </div>
          <div class="bk-detail-item" style="grid-column:1/-1;">
            <div class="bk-detail-label">Guest Names</div>
            <div class="bk-detail-value">${r.guests.join(' · ')}</div>
          </div>
          ${r.arrivalTime ? `
          <div class="bk-detail-item">
            <div class="bk-detail-label">Expected Arrival</div>
            <div class="bk-detail-value">${r.arrivalTime}</div>
          </div>` : ''}
          ${r.notes ? `
          <div class="bk-detail-item" style="grid-column:1/-1;">
            <div class="bk-detail-label">Notes</div>
            <div class="bk-detail-value bk-notes">${r.notes}</div>
          </div>` : ''}
        </div>

        <div class="bk-policy-toggle" data-policy="${policyId}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Cancellation Policy: <strong>${policy.label}</strong>
          <svg class="bk-policy-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="bk-policy-rules" id="${policyId}" style="display:none;">
          ${rulesHTML}
        </div>
      </div>
    `;
  }).join('');

  return `<div class="bk-rooms-wrap">${roomCards}</div>`;
}

// ---- Show more: event delegation ----
document.getElementById('bk-tbody').addEventListener('click', e => {
  const btn = e.target.closest('.bk-show-more-btn');
  if (btn) {
    const id = btn.dataset.id;
    const b  = BOOKINGS.find(x => x.id === id);
    if (!b) return;

    const existing = document.getElementById(`bk-detail-${id}`);
    if (existing) {
      existing.remove();
      btn.classList.remove('open');
      expandedId = null;
      return;
    }

    if (expandedId) {
      const prev    = document.getElementById(`bk-detail-${expandedId}`);
      const prevBtn = document.querySelector(`.bk-show-more-btn[data-id="${expandedId}"]`);
      if (prev)    prev.remove();
      if (prevBtn) prevBtn.classList.remove('open');
    }

    btn.classList.add('open');
    expandedId = id;

    const detailTr = document.createElement('tr');
    detailTr.id = `bk-detail-${id}`;
    detailTr.className = 'bk-detail-row';
    detailTr.innerHTML = `<td colspan="10">${buildDetailHTML(b)}</td>`;

    document.querySelector(`tr[data-id="${id}"]`).insertAdjacentElement('afterend', detailTr);
    return;
  }

  const policyToggle = e.target.closest('.bk-policy-toggle');
  if (policyToggle) {
    const policyId = policyToggle.dataset.policy;
    const panel    = document.getElementById(policyId);
    const arrow    = policyToggle.querySelector('.bk-policy-arrow');
    const open     = panel.style.display === 'none';
    panel.style.display = open ? 'block' : 'none';
    arrow.style.transform = open ? 'rotate(180deg)' : '';
  }
});

// ---- Filtering ----
function getFilters() {
  return {
    id:          document.getElementById('bk-f-id').value.trim().toLowerCase(),
    hotel:       document.getElementById('bk-f-hotel').value.trim().toLowerCase(),
    guest:       document.getElementById('bk-f-guest').value.trim().toLowerCase(),
    bdateFrom:   document.getElementById('bk-f-bdate-from').value,
    bdateTo:     document.getElementById('bk-f-bdate-to').value,
    ciFrom:      document.getElementById('bk-f-ci-from').value,
    ciTo:        document.getElementById('bk-f-ci-to').value,
    coFrom:      document.getElementById('bk-f-co-from').value,
    coTo:        document.getElementById('bk-f-co-to').value,
    costMin:     document.getElementById('bk-f-cost-min').value,
    costMax:     document.getElementById('bk-f-cost-max').value,
    cfeeMin:     document.getElementById('bk-f-cfee-min').value,
    cfeeMax:     document.getElementById('bk-f-cfee-max').value,
    netMin:      document.getElementById('bk-f-net-min').value,
    netMax:      document.getElementById('bk-f-net-max').value,
    statuses:    [...document.querySelectorAll('.bk-f-status:checked')].map(x => x.value),
    payStatuses: [...document.querySelectorAll('.bk-f-pay:checked')].map(x => x.value),
  };
}

function applyFilters() {
  const f = getFilters();
  const results = BOOKINGS.filter(b => {
    if (f.id    && !b.id.toLowerCase().includes(f.id))       return false;
    if (f.hotel && !b.hotel.toLowerCase().includes(f.hotel)) return false;
    if (f.guest && !b.guest.toLowerCase().includes(f.guest)) return false;
    if (f.bdateFrom && b.bookingDate < f.bdateFrom) return false;
    if (f.bdateTo   && b.bookingDate > f.bdateTo)   return false;
    if (f.ciFrom && b.checkIn  < f.ciFrom) return false;
    if (f.ciTo   && b.checkIn  > f.ciTo)   return false;
    if (f.coFrom && b.checkOut < f.coFrom) return false;
    if (f.coTo   && b.checkOut > f.coTo)   return false;
    if (f.costMin !== '' && b.cost < +f.costMin) return false;
    if (f.costMax !== '' && b.cost > +f.costMax) return false;
    if (f.cfeeMin !== '' && b.cancelFee < +f.cfeeMin) return false;
    if (f.cfeeMax !== '' && b.cancelFee > +f.cfeeMax) return false;
    const fc = finalCost(b);
    if (f.netMin !== '' && fc < +f.netMin) return false;
    if (f.netMax !== '' && fc > +f.netMax) return false;
    if (f.statuses.length    && !f.statuses.includes(b.status))     return false;
    if (f.payStatuses.length && !f.payStatuses.includes(payStatusKey(b))) return false;
    return true;
  });
  renderBookings(results);
}

document.getElementById('bk-adv-toggle').addEventListener('click', () => {
  const panel  = document.getElementById('bk-adv-panel');
  const toggle = document.getElementById('bk-adv-toggle');
  const open   = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  toggle.classList.toggle('open', open);
});

document.getElementById('bk-search-btn').addEventListener('click', applyFilters);

['bk-f-id','bk-f-hotel','bk-f-guest'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });
});

document.getElementById('bk-reset-btn').addEventListener('click', () => {
  ['bk-f-id','bk-f-hotel','bk-f-guest','bk-f-bdate-from','bk-f-bdate-to',
   'bk-f-ci-from','bk-f-ci-to','bk-f-co-from','bk-f-co-to',
   'bk-f-cost-min','bk-f-cost-max','bk-f-cfee-min','bk-f-cfee-max',
   'bk-f-net-min','bk-f-net-max'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.querySelectorAll('.bk-f-status, .bk-f-pay').forEach(cb => cb.checked = true);
  renderBookings(BOOKINGS);
});

document.querySelector('[data-page="bookings"]').addEventListener('click', () => {
  if (!document.getElementById('bk-tbody').children.length) renderBookings(BOOKINGS);
});
