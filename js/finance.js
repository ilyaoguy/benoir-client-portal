/* ========================================
   Finance Page
   ======================================== */

const ACCOUNT = {
  deposit:     75000,
  creditLimit: 250000,
};

// ---- Payment classification (mirrors bookings.js) ----
function finPayKey(b) {
  if (b.paid) return 'paid';
  const due  = new Date(b.payDue); due.setHours(0,0,0,0);
  const diff = Math.round((due - TODAY) / 86400000);
  if (diff > 0)   return 'due_future';
  if (diff === 0) return 'due_today';
  return 'overdue';
}

function finPayLabel(b) {
  const k = finPayKey(b);
  if (k === 'paid')       return { label: 'Paid',          cls: 'badge-pay-paid' };
  if (k === 'due_today')  return { label: 'Due Today',     cls: 'badge-pay-due' };
  if (k === 'overdue')    return { label: 'Overdue',       cls: 'badge-pay-overdue' };
  const diff = Math.round((new Date(b.payDue) - TODAY) / 86400000);
  return { label: `Due in ${diff}d`, cls: 'badge-pay-upcoming' };
}

function finFmt(n) {
  return '$' + n.toLocaleString('en-US');
}

// ---- Summary cards ----
function renderFinSummary() {
  const today30 = new Date(TODAY); today30.setDate(today30.getDate() + 30);

  let overdueAmt = 0, overdueCount = 0;
  let dueAmt     = 0, dueCount     = 0;
  let upcomingAmt = 0, upcomingCount = 0;
  let creditUsed  = 0;

  BOOKINGS.forEach(b => {
    if (b.status === 'cancelled' || b.status === 'noshow') return;
    const k = finPayKey(b);
    if (k === 'paid') return;
    const cost = b.cost;
    creditUsed += cost;
    if (k === 'overdue') {
      overdueAmt += cost; overdueCount++;
    } else if (k === 'due_today') {
      dueAmt += cost; dueCount++;
    } else {
      const due = new Date(b.payDue);
      if (due <= today30) { dueAmt += cost; dueCount++; }
      else                { upcomingAmt += cost; upcomingCount++; }
    }
  });

  document.getElementById('fin-overdue-amount').textContent = finFmt(overdueAmt);
  document.getElementById('fin-overdue-count').textContent  = `${overdueCount} booking${overdueCount !== 1 ? 's' : ''}`;
  document.getElementById('fin-due-amount').textContent     = finFmt(dueAmt);
  document.getElementById('fin-due-count').textContent      = `${dueCount} booking${dueCount !== 1 ? 's' : ''}`;
  document.getElementById('fin-upcoming-amount').textContent = finFmt(upcomingAmt);
  document.getElementById('fin-upcoming-count').textContent  = `${upcomingCount} booking${upcomingCount !== 1 ? 's' : ''}`;
  document.getElementById('fin-deposit-amount').textContent  = finFmt(ACCOUNT.deposit);

  const leverage   = (ACCOUNT.creditLimit / ACCOUNT.deposit).toFixed(2);
  document.getElementById('fin-leverage-amount').textContent = leverage + 'x';

  document.getElementById('fin-credit-amount').textContent  = finFmt(ACCOUNT.creditLimit);

  const usagePct = Math.min(100, Math.round(creditUsed / ACCOUNT.creditLimit * 100));
  const bar      = document.getElementById('fin-credit-bar');
  const lbl      = document.getElementById('fin-credit-usage-lbl');
  bar.style.width = usagePct + '%';
  bar.className   = 'fin-credit-bar-fill' + (usagePct >= 90 ? ' danger' : usagePct >= 70 ? ' warn' : '');
  lbl.textContent = `${usagePct}% used · ${finFmt(ACCOUNT.creditLimit - creditUsed)} available`;
}

// ---- Table ----
let finCurrentList = [...BOOKINGS];
let finExpandedId  = null;

function renderFinance(list) {
  finCurrentList = list;
  const tbody = document.getElementById('fin-tbody');
  const noRes = document.getElementById('fin-no-results');
  const meta  = document.getElementById('fin-table-meta');
  tbody.innerHTML = '';
  finExpandedId = null;

  meta.textContent = `${list.length} booking${list.length !== 1 ? 's' : ''}`;
  if (list.length === 0) { noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  list.forEach(b => {
    const payInfo   = finPayLabel(b);
    const isOverdue = finPayKey(b) === 'overdue';
    const statusLbl = t(`status.${b.status}`) || (b.status.charAt(0).toUpperCase() + b.status.slice(1));
    const tr = document.createElement('tr');
    tr.className = 'fin-tbody-row' + (isOverdue ? ' is-overdue' : '');
    tr.dataset.id = b.id;
    tr.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${fmtDate(b.bookingDate)}</td>
      <td>${fmtDate(b.checkIn)}</td>
      <td class="bk-wrap">${b.hotel}</td>
      <td>${b.guest}</td>
      <td>$${b.cost.toLocaleString()}</td>
      <td><span class="badge status-${b.status}">${statusLbl}</span></td>
      <td><span class="badge ${payInfo.cls}">${payInfo.label}</span></td>
      <td>
        <button class="bk-show-more-btn fin-expand-btn" data-id="${b.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// Expand / collapse — reuse buildDetailHTML from bookings.js
document.getElementById('fin-tbody').addEventListener('click', e => {
  const btn = e.target.closest('.fin-expand-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  const b  = BOOKINGS.find(x => x.id === id);
  if (!b) return;

  const existing = document.getElementById(`fin-detail-${id}`);
  if (existing) {
    existing.remove();
    btn.classList.remove('open');
    finExpandedId = null;
    return;
  }
  if (finExpandedId) {
    document.getElementById(`fin-detail-${finExpandedId}`)?.remove();
    document.querySelector(`.fin-expand-btn[data-id="${finExpandedId}"]`)?.classList.remove('open');
  }
  btn.classList.add('open');
  finExpandedId = id;

  const detailTr = document.createElement('tr');
  detailTr.id = `fin-detail-${id}`;
  detailTr.className = 'bk-detail-row';
  detailTr.innerHTML = `<td colspan="9">${buildDetailHTML(b)}</td>`;
  document.querySelector(`#fin-tbody tr[data-id="${id}"]`).insertAdjacentElement('afterend', detailTr);
});

// ---- Filters ----
function finGetFilters() {
  return {
    id:        document.getElementById('fin-f-id').value.trim().toLowerCase(),
    guest:     document.getElementById('fin-f-guest').value.trim().toLowerCase(),
    bdateFrom: document.getElementById('fin-f-bdate-from').value,
    bdateTo:   document.getElementById('fin-f-bdate-to').value,
    ciFrom:    document.getElementById('fin-f-ci-from').value,
    ciTo:      document.getElementById('fin-f-ci-to').value,
    costMin:   parseFloat(document.getElementById('fin-f-cost-min').value) || 0,
    costMax:   parseFloat(document.getElementById('fin-f-cost-max').value) || Infinity,
    statuses:  [...document.querySelectorAll('.fin-f-status:checked')].map(x => x.value),
    payKeys:   [...document.querySelectorAll('.fin-f-pay:checked')].map(x => x.value),
  };
}

function finApplyFilters() {
  const f = finGetFilters();
  const results = BOOKINGS.filter(b => {
    if (f.id    && !b.id.toLowerCase().includes(f.id))       return false;
    if (f.guest && !b.guest.toLowerCase().includes(f.guest)) return false;
    if (f.bdateFrom && b.bookingDate < f.bdateFrom) return false;
    if (f.bdateTo   && b.bookingDate > f.bdateTo)   return false;
    if (f.ciFrom && b.checkIn < f.ciFrom) return false;
    if (f.ciTo   && b.checkIn > f.ciTo)   return false;
    if (b.cost < f.costMin || b.cost > f.costMax) return false;
    if (f.statuses.length && !f.statuses.includes(b.status)) return false;
    if (f.payKeys.length  && !f.payKeys.includes(finPayKey(b))) return false;
    return true;
  });
  renderFinance(results);
}

document.getElementById('fin-adv-toggle').addEventListener('click', () => {
  const panel = document.getElementById('fin-adv-panel');
  const open  = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  document.getElementById('fin-adv-toggle').classList.toggle('open', open);
});

document.getElementById('fin-search-btn').addEventListener('click', finApplyFilters);

['fin-f-id','fin-f-guest'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') finApplyFilters(); });
});

document.getElementById('fin-reset-btn').addEventListener('click', () => {
  ['fin-f-id','fin-f-guest','fin-f-bdate-from','fin-f-bdate-to',
   'fin-f-ci-from','fin-f-ci-to','fin-f-cost-min','fin-f-cost-max'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.querySelectorAll('.fin-f-status').forEach(cb => cb.checked = true);
  document.querySelectorAll('.fin-f-pay').forEach(cb => cb.checked = true);
  renderFinance(BOOKINGS);
});

// ---- CSV / XLSX exports (same pattern as bookings) ----
document.getElementById('fin-dl-csv').addEventListener('click', () => {
  const rows = bookingsToRows(finCurrentList);
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const escape = v => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => escape(r[k])).join(','))].join('\r\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'benoir-finance.csv';
  a.click();
});

document.getElementById('fin-dl-xlsx').addEventListener('click', () => {
  const rows = bookingsToRows(finCurrentList);
  if (!rows.length) return;
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Finance');
  XLSX.writeFile(wb, 'benoir-finance.xlsx');
});

// ---- Invoice generation ----
function buildInvoiceHTML(bookings, fromDate, toDate) {
  const invNo   = 'INV-' + Date.now().toString(36).toUpperCase().slice(-6);
  const today   = new Date().toLocaleDateString('en-GB');
  const fmtD    = iso => iso ? iso.split('-').reverse().join('.') : '—';
  const fmtMoney = n => '$' + Number(n).toLocaleString('en-US');

  let totalCost = 0, totalOverdue = 0;
  const rows = bookings.map(b => {
    const pk      = finPayKey(b);
    const isOD    = pk === 'overdue';
    const cost    = b.cost;
    totalCost    += cost;
    if (isOD) totalOverdue += cost;
    const payLbl  = isOD ? '<span style="color:#d93025;font-weight:700;">OVERDUE</span>'
                  : pk === 'due_today' ? 'Due Today'
                  : pk === 'paid'      ? 'Paid'
                  : `Due ${fmtD(b.payDue)}`;
    const rowStyle = isOD ? 'background:#fff5f5;' : '';
    return `<tr style="${rowStyle}">
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${b.id}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${fmtD(b.bookingDate)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${b.hotel}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${b.guest}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${fmtD(b.checkIn)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${fmtD(b.checkOut)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">${fmtMoney(cost)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${payLbl}</td>
    </tr>`;
  }).join('');

  const dateRangeStr = (fromDate || toDate)
    ? `Booking dates: ${fromDate ? fmtD(fromDate) : '—'} to ${toDate ? fmtD(toDate) : '—'}`
    : 'All bookings';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Benoir Invoice ${invNo}</title>
  <style>
    @page { margin: 18mm 20mm; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1a2e5a; font-size: 13px; margin: 0; padding: 24px; }
    .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .inv-brand { font-size: 22px; font-weight: 900; color: #1a2e5a; letter-spacing: -1px; }
    .inv-brand span { color: #00c2d4; }
    .inv-meta { text-align: right; }
    .inv-meta h2 { font-size: 20px; margin: 0 0 6px; }
    .inv-meta p  { margin: 2px 0; font-size: 12px; color: #666; }
    .inv-divider { border: none; border-top: 2px solid #1a2e5a; margin: 0 0 24px; }
    .inv-date-range { font-size: 12px; color: #666; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    thead th { background: #1a2e5a; color: #fff; padding: 9px 10px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .3px; }
    thead th:last-child, thead th:nth-child(7) { text-align: right; }
    tbody tr:nth-child(even) td { background: #f9fafb; }
    .inv-totals { margin-top: 20px; display: flex; justify-content: flex-end; }
    .inv-totals table { width: 300px; }
    .inv-totals td { padding: 7px 10px; border-bottom: 1px solid #e5e7eb; }
    .inv-totals tr:last-child td { font-weight: 800; font-size: 14px; border-bottom: none; border-top: 2px solid #1a2e5a; }
    .overdue-notice { margin-top: 20px; padding: 12px 16px; background: #fff5f5; border: 1px solid #fca5a5; border-radius: 6px; font-size: 12px; color: #d93025; font-weight: 600; }
    .inv-footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #999; display: flex; justify-content: space-between; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="inv-header">
    <div>
      <div class="inv-brand">Benoir<span>.</span></div>
      <div style="font-size:11px;color:#666;margin-top:4px;">Luxury Travel</div>
    </div>
    <div class="inv-meta">
      <h2>Invoice</h2>
      <p>Invoice No: <strong>${invNo}</strong></p>
      <p>Issue Date: ${today}</p>
      <p>Currency: USD</p>
    </div>
  </div>
  <hr class="inv-divider">
  <div class="inv-date-range">${dateRangeStr} · ${bookings.length} booking${bookings.length !== 1 ? 's' : ''}</div>
  <table>
    <thead>
      <tr>
        <th>Booking ID</th>
        <th>Booked</th>
        <th>Hotel</th>
        <th>Main Guest</th>
        <th style="text-align:center;">Check-in</th>
        <th style="text-align:center;">Check-out</th>
        <th style="text-align:right;">Amount</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="inv-totals">
    <table>
      <tr><td>Subtotal</td><td style="text-align:right;font-weight:600;">${fmtMoney(totalCost)}</td></tr>
      ${totalOverdue > 0 ? `<tr style="color:#d93025;"><td>Of which overdue</td><td style="text-align:right;font-weight:700;">${fmtMoney(totalOverdue)}</td></tr>` : ''}
      <tr><td>Total Due</td><td style="text-align:right;">${fmtMoney(totalCost)}</td></tr>
    </table>
  </div>
  ${totalOverdue > 0 ? `<div class="overdue-notice">⚠ ${fmtMoney(totalOverdue)} of the above total is overdue. Please arrange payment immediately to avoid service disruption.</div>` : ''}
  <div class="inv-footer">
    <span>Benoir Travel · Dubai, UAE · finance@benoir.com · +971 4 400 0000</span>
    <span>Generated ${today}</span>
  </div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;
}

document.getElementById('fin-dl-invoice').addEventListener('click', () => {
  const from = document.getElementById('fin-inv-from').value;
  const to   = document.getElementById('fin-inv-to').value;

  let bookings = BOOKINGS.filter(b => b.status !== 'cancelled' && b.status !== 'noshow');
  if (from) bookings = bookings.filter(b => b.bookingDate >= from);
  if (to)   bookings = bookings.filter(b => b.bookingDate <= to);

  if (!bookings.length) {
    alert('No bookings found in the selected date range.');
    return;
  }

  const win = window.open('', '_blank');
  win.document.write(buildInvoiceHTML(bookings, from, to));
  win.document.close();
});

// ---- Extra deposit invoice ----
document.getElementById('fin-dl-extra-deposit').addEventListener('click', () => {
  const rawAmt = parseFloat(document.getElementById('fin-extra-dep-amount').value);
  if (!rawAmt || rawAmt <= 0) {
    alert('Please enter a deposit amount.');
    return;
  }
  const amount = rawAmt;
  const invNo  = 'DEP-' + Date.now().toString(36).toUpperCase().slice(-6);
  const today  = new Date().toLocaleDateString('en-GB');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Benoir Deposit Invoice ${invNo}</title>
  <style>
    @page { margin: 18mm 20mm; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1a2e5a; font-size: 13px; margin: 0; padding: 24px; }
    .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .inv-brand  { font-size: 22px; font-weight: 900; color: #1a2e5a; letter-spacing: -1px; }
    .inv-brand span { color: #00c2d4; }
    .inv-meta   { text-align: right; }
    .inv-meta h2 { font-size: 20px; margin: 0 0 6px; }
    .inv-meta p  { margin: 2px 0; font-size: 12px; color: #666; }
    hr { border: none; border-top: 2px solid #1a2e5a; margin: 0 0 32px; }
    .dep-box { border: 2px solid #00c2d4; border-radius: 10px; padding: 32px 36px; text-align: center; margin: 40px auto; max-width: 420px; }
    .dep-label { font-size: 12px; text-transform: uppercase; letter-spacing: .5px; color: #666; margin-bottom: 12px; }
    .dep-amount { font-size: 48px; font-weight: 900; color: #1a2e5a; letter-spacing: -2px; }
    .dep-note { font-size: 12px; color: #666; margin-top: 16px; }
    .inv-footer { margin-top: 60px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #999; display: flex; justify-content: space-between; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="inv-header">
    <div>
      <div class="inv-brand">Benoir<span>.</span></div>
      <div style="font-size:11px;color:#666;margin-top:4px;">Luxury Travel</div>
    </div>
    <div class="inv-meta">
      <h2>Deposit Invoice</h2>
      <p>Invoice No: <strong>${invNo}</strong></p>
      <p>Issue Date: ${today}</p>
      <p>Currency: USD</p>
    </div>
  </div>
  <hr>
  <p style="font-size:12px;color:#666;text-align:center;">Please transfer the deposit amount below to increase your available credit.</p>
  <div class="dep-box">
    <div class="dep-label">Extra Deposit Amount Due</div>
    <div class="dep-amount">$${amount.toLocaleString('en-US')}</div>
    <div class="dep-note">Reference: ${invNo} · Benoir Travel account</div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:12px;max-width:400px;margin:0 auto;">
    <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#666;">Current Deposit</td><td style="text-align:right;font-weight:600;">$${ACCOUNT.deposit.toLocaleString('en-US')}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#666;">Extra Deposit</td><td style="text-align:right;font-weight:600;">+$${amount.toLocaleString('en-US')}</td></tr>
    <tr><td style="padding:8px 0;font-weight:800;">New Deposit Total</td><td style="text-align:right;font-weight:800;">$${(ACCOUNT.deposit + amount).toLocaleString('en-US')}</td></tr>
  </table>
  <div class="inv-footer">
    <span>Benoir Travel · Dubai, UAE · finance@benoir.com · +971 4 400 0000</span>
    <span>Generated ${today}</span>
  </div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
});

// ---- Init ----
document.querySelector('[data-page="finance"]').addEventListener('click', () => {
  if (!document.getElementById('fin-tbody').children.length) {
    renderFinSummary();
    renderFinance(BOOKINGS);
  }
});
