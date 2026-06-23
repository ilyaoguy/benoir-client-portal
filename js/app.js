/* ========================================
   Benoir Client Portal — App Logic
   ======================================== */

// ---- Mock data ----
const mockData = {
  '7d': {
    sales: 1240, salesPrev: 980,
    bookings: 3, bookingsPrev: 4,
    confirmed: 3, confirmedPrev: 3,
    cancellations: 0, cancellationsPrev: 1,
    avgValue: 413, avgValuePrev: 245,
    leadTime: 18, leadTimePrev: 22,
    los: 4.2, losPrev: 3.8,
    daily: [
      { date: '13 Jun', sales: 0,    bookings: 0 },
      { date: '14 Jun', sales: 566,  bookings: 1 },
      { date: '15 Jun', sales: 0,    bookings: 0 },
      { date: '16 Jun', sales: 674,  bookings: 1 },
      { date: '17 Jun', sales: 0,    bookings: 0 },
      { date: '18 Jun', sales: 0,    bookings: 0 },
      { date: '19 Jun', sales: 0,    bookings: 0 },
    ],
  },
  '30d': {
    sales: 2554, salesPrev: 972,
    bookings: 2, bookingsPrev: 3,
    confirmed: 2, confirmedPrev: 1,
    cancellations: 0, cancellationsPrev: 1,
    avgValue: 1277, avgValuePrev: 324,
    leadTime: 24, leadTimePrev: 18,
    los: 5.1, losPrev: 4.4,
    daily: generateDaily(30, [1988, 566]),
  },
  '90d': {
    sales: 5812, salesPrev: 3100,
    bookings: 7, bookingsPrev: 9,
    confirmed: 6, confirmedPrev: 7,
    cancellations: 1, cancellationsPrev: 2,
    avgValue: 830, avgValuePrev: 344,
    leadTime: 21, leadTimePrev: 19,
    los: 4.7, losPrev: 4.1,
    daily: generateDaily(90, [1988, 566, 0, 972, 726, 0, 1560]),
  },
  'ytd': {
    sales: 9450, salesPrev: 5200,
    bookings: 12, bookingsPrev: 15,
    confirmed: 10, confirmedPrev: 12,
    cancellations: 2, cancellationsPrev: 3,
    avgValue: 787, avgValuePrev: 347,
    leadTime: 23, leadTimePrev: 20,
    los: 4.9, losPrev: 4.3,
    daily: generateDaily(170, [1988, 566, 972, 726, 1200, 800]),
  },
};

function generateDaily(days, salesValues) {
  const result = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const s = salesValues[Math.floor(Math.random() * salesValues.length)];
    result.push({ date: label, sales: Math.random() > .55 ? s : 0, bookings: Math.random() > .65 ? 1 : 0 });
  }
  return result;
}

const financeData = {
  creditLimit: 10000,
  creditUsed: 2554,
  paymentDue: 1200,
  daysLeft: 18,
};

const todayBarometer = {
  checkIns: 0,
  checkOuts: 0,
  currentStays: 2,
  tomorrowCheckIns: 1,
};

// ---- State ----
let currentRange = '30d';
let salesChart = null;

const rangeLabels = {
  '7d': () => t('range.7d'),
  '30d': () => t('range.30d'),
  '90d': () => t('range.90d'),
  'ytd': () => t('range.ytd'),
};

// ---- Navigation ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const target = item.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + target).classList.add('active');
    updateTopbarTitle(target);
    document.getElementById('date-range-btn').style.display = target === 'home' ? '' : 'none';
  });
});

function updateTopbarTitle(page) {
  const pageKey = page.replace('-', '_');
  const title   = t('page.' + pageKey) || 'Dashboard';
  const sub     = page === 'home'
    ? t('page.home_sub').replace('{range}', getDateRangeStr())
    : (t('page.' + pageKey + '_sub') || '');
  document.querySelector('.topbar-left h1').textContent = title;
  document.querySelector('.topbar-left p').textContent = sub;
}

// ---- Date range picker ----
const dateBtn = document.getElementById('date-range-btn');
const dateDropdown = document.getElementById('date-dropdown');
const dropdownOverlay = document.getElementById('dropdown-overlay');

dateBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dateDropdown.classList.toggle('open');
  dropdownOverlay.classList.toggle('open');
});

dropdownOverlay.addEventListener('click', () => {
  dateDropdown.classList.remove('open');
  dropdownOverlay.classList.remove('open');
});

document.querySelectorAll('.date-option').forEach(opt => {
  opt.addEventListener('click', () => {
    currentRange = opt.dataset.range;
    document.querySelectorAll('.date-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    dateBtn.querySelector('.date-label').textContent = rangeLabels[currentRange]();
    dateDropdown.classList.remove('open');
    dropdownOverlay.classList.remove('open');
    updateDashboard();
    document.querySelector('.topbar-left p').textContent = t('page.home_sub').replace('{range}', getDateRangeStr());
  });
});

function getDateRangeStr() {
  const today = new Date();
  const fmt = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const maps = { '7d': 7, '30d': 30, '90d': 90, 'ytd': null };
  if (currentRange === 'ytd') {
    const start = new Date(today.getFullYear(), 0, 1);
    return fmt(start) + ' – ' + fmt(today);
  }
  const start = new Date(today);
  start.setDate(start.getDate() - maps[currentRange]);
  return fmt(start) + ' – ' + fmt(today);
}

// ---- Dashboard update ----
function updateDashboard() {
  const d = mockData[currentRange];

  setKPI('kpi-sales',         '$' + fmt(d.sales),       pct(d.sales, d.salesPrev));
  setKPI('kpi-bookings',      d.bookings,                pct(d.bookings, d.bookingsPrev));
  setKPI('kpi-confirmed',     d.confirmed,               pct(d.confirmed, d.confirmedPrev));
  setKPI('kpi-cancellations', d.cancellations,           pct(d.cancellations, d.cancellationsPrev, true));
  setKPI('kpi-avgvalue',      '$' + fmt(d.avgValue),     pct(d.avgValue, d.avgValuePrev));
  setKPI('kpi-leadtime',      d.leadTime + ' ' + t('home.days'), pct(d.leadTime, d.leadTimePrev));
  setKPI('kpi-los',           d.los.toFixed(1) + ' ' + t('home.nts'), pct(d.los, d.losPrev));

  updateChart(d.daily);
}

function setKPI(id, value, change) {
  const el = document.getElementById(id);
  if (!el) return;
  el.querySelector('.kpi-value').textContent = value;
  const chEl = el.querySelector('.kpi-change');
  const arrow = change.val > 0 ? '▲' : change.val < 0 ? '▼' : '—';
  const cls   = change.val > 0 ? (change.good ? 'up' : 'down') : change.val < 0 ? (change.good ? 'down' : 'up') : 'neutral';
  chEl.className = 'kpi-change ' + cls;
  chEl.textContent = change.val !== null ? arrow + ' ' + Math.abs(change.pct).toFixed(1) + '%' : '—';
}

function pct(curr, prev, lowerIsBetter = false) {
  if (!prev) return { val: null, pct: 0, good: true };
  const v = curr - prev;
  const p = ((curr - prev) / prev) * 100;
  return { val: v, pct: p, good: lowerIsBetter ? v <= 0 : v >= 0 };
}

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return n.toLocaleString();
}

// ---- Finance section ----
function renderFinance() {
  const usagePct = Math.round((financeData.creditUsed / financeData.creditLimit) * 100);
  document.getElementById('fin-credit-limit').textContent = '$' + financeData.creditLimit.toLocaleString();
  document.getElementById('fin-credit-used').textContent  = '$' + financeData.creditUsed.toLocaleString() + ' ' + t('home.fin.used');

  const bar = document.getElementById('credit-bar-fill');
  bar.style.width = usagePct + '%';
  bar.className = 'credit-bar-fill' + (usagePct >= 90 ? ' danger' : usagePct >= 70 ? ' warn' : '');

  document.getElementById('credit-usage-pct').textContent = usagePct + '%';
  document.getElementById('fin-payment-due').textContent  = '$' + financeData.paymentDue.toLocaleString();
  document.getElementById('fin-days-left').textContent    = financeData.daysLeft + ' days';

  const daysEl = document.getElementById('fin-days-badge');
  daysEl.className = 'badge ' + (financeData.daysLeft <= 5 ? 'red' : financeData.daysLeft <= 14 ? 'amber' : 'green');
  daysEl.textContent = financeData.daysLeft <= 5 ? t('home.fin.urgent') : financeData.daysLeft <= 14 ? t('home.fin.due_soon') : t('home.fin.on_track');
}

// ---- Chart ----
function updateChart(daily) {
  const labels = daily.map(d => d.date);
  const sales   = daily.map(d => d.sales);
  const bookings = daily.map(d => d.bookings);

  const ctx = document.getElementById('sales-chart').getContext('2d');

  if (salesChart) salesChart.destroy();

  salesChart = new Chart(ctx, {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: t('home.sales'),
          data: sales,
          backgroundColor: 'rgba(0,212,255,.2)',
          borderColor: '#00D4FF',
          borderWidth: 1.5,
          borderRadius: 4,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: t('home.bookings'),
          data: bookings,
          borderColor: '#0A2540',
          backgroundColor: 'rgba(10,37,64,.07)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#0A2540',
          tension: .3,
          fill: true,
          yAxisID: 'y2',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true },
        },
        tooltip: {
          backgroundColor: '#0A2540',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,.8)',
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#8898AA', maxTicksLimit: 12 },
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(227,232,239,.6)' },
          ticks: {
            font: { family: 'Inter', size: 11 }, color: '#8898AA',
            callback: v => v >= 1000 ? '$' + (v/1000).toFixed(0) + 'k' : '$' + v,
          },
        },
        y2: {
          position: 'right',
          grid: { display: false },
          ticks: {
            font: { family: 'Inter', size: 11 }, color: '#8898AA',
            stepSize: 1,
            callback: v => Number.isInteger(v) ? v : '',
          },
        },
      },
    },
  });
}

// ---- Barometer ----
function renderBarometer() {
  document.getElementById('baro-checkins').textContent    = todayBarometer.checkIns;
  document.getElementById('baro-checkouts').textContent   = todayBarometer.checkOuts;
  document.getElementById('baro-current').textContent     = todayBarometer.currentStays;
  document.getElementById('baro-tomorrow').textContent    = todayBarometer.tomorrowCheckIns;
}

// ---- Avatar menu ----
const avatarBtn  = document.getElementById('avatar-btn');
const userMenu   = document.getElementById('user-menu');

avatarBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  userMenu.classList.toggle('open');
});

document.addEventListener('click', () => userMenu.classList.remove('open'));

document.getElementById('menu-token').addEventListener('click', () => {
  userMenu.classList.remove('open');
  const expiry = new Date(Date.now() + 8 * 60 * 60 * 1000);
  document.getElementById('session-expiry').textContent =
    expiry.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  document.getElementById('token-modal').classList.add('open');
});

document.getElementById('modal-close').addEventListener('click', () =>
  document.getElementById('token-modal').classList.remove('open'));

document.getElementById('token-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

document.getElementById('menu-signout').addEventListener('click', () => {
  userMenu.classList.remove('open');
  if (confirm('Sign out of the client portal?')) location.reload();
});

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = document.getElementById(btn.dataset.copy).textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  });
});

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  renderFinance();
  renderBarometer();

  // Set greeting
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = greet + ', Ilya';
  document.querySelector('.topbar-left p').textContent = 'Overview for ' + getDateRangeStr();
});
