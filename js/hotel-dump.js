/* ========================================
   Hotel Dump & ID Search
   ======================================== */

// ---- Country list ----
const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'CN', name: 'China' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'DE', name: 'Germany' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ES', name: 'Spain' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'GE', name: 'Georgia' },
  { code: 'GR', name: 'Greece' },
  { code: 'IL', name: 'Israel' },
  { code: 'IN', name: 'India' },
  { code: 'IT', name: 'Italy' },
  { code: 'JO', name: 'Jordan' },
  { code: 'JP', name: 'Japan' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MT', name: 'Malta' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'OM', name: 'Oman' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RU', name: 'Russia' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'US', name: 'United States' },
  { code: 'YE', name: 'Yemen' },
];

// ---- Hotel database ----
const HOTELS = [
  // 5-star
  { hid: 'H00001', name: 'Burj Al Arab',                  stars: 5, country: 'AE' },
  { hid: 'H00002', name: 'Atlantis The Palm',              stars: 5, country: 'AE' },
  { hid: 'H00003', name: 'Address Downtown Dubai',         stars: 5, country: 'AE' },
  { hid: 'H00004', name: 'Jumeirah Beach Hotel',           stars: 5, country: 'AE' },
  { hid: 'H00005', name: 'Four Seasons DIFC',              stars: 5, country: 'AE' },
  { hid: 'H00006', name: 'Marriott Marquis City Centre',   stars: 5, country: 'AE' },
  { hid: 'H00007', name: 'Ritz-Carlton Abu Dhabi',         stars: 5, country: 'AE' },
  { hid: 'H00008', name: 'Emirates Palace',                stars: 5, country: 'AE' },
  { hid: 'H00011', name: 'Nile Ritz-Carlton Cairo',        stars: 5, country: 'EG' },
  { hid: 'H00012', name: 'Sofitel Cairo El Gezirah',       stars: 5, country: 'EG' },
  { hid: 'H00017', name: 'Four Seasons Doha',              stars: 5, country: 'QA' },
  { hid: 'H00018', name: 'St. Regis Doha',                 stars: 5, country: 'QA' },
  { hid: 'H00022', name: 'Ritz-Carlton Riyadh',            stars: 5, country: 'SA' },
  { hid: 'H00023', name: 'Four Seasons Riyadh',            stars: 5, country: 'SA' },
  { hid: 'H00027', name: 'Grand Hyatt Amman',              stars: 5, country: 'JO' },
  { hid: 'H00031', name: 'Grand Hyatt Istanbul',           stars: 5, country: 'TR' },
  { hid: 'H00032', name: 'Four Seasons Bosphorus',         stars: 5, country: 'TR' },
  { hid: 'H00041', name: 'Sofitel Marrakech',              stars: 5, country: 'MA' },
  { hid: 'H00042', name: 'Four Seasons Marrakech',         stars: 5, country: 'MA' },
  { hid: 'H00043', name: 'La Mamounia Marrakech',          stars: 5, country: 'MA' },
  { hid: 'H00046', name: 'Shangri-La Muscat',              stars: 5, country: 'OM' },
  { hid: 'H00047', name: 'Al Bustan Palace Ritz-Carlton',  stars: 5, country: 'OM' },
  { hid: 'H00049', name: 'Four Seasons Kuwait',            stars: 5, country: 'KW' },
  { hid: 'H00052', name: 'Gulf Hotel Bahrain',             stars: 5, country: 'BH' },
  { hid: 'H00055', name: 'Hotel Grande Bretagne Athens',   stars: 5, country: 'GR' },
  { hid: 'H00057', name: 'Four Seasons Paris George V',    stars: 5, country: 'FR' },
  { hid: 'H00058', name: 'Ritz Paris',                     stars: 5, country: 'FR' },
  { hid: 'H00062', name: 'Four Seasons Moscow',            stars: 5, country: 'RU' },
  { hid: 'H00064', name: 'Tbilisi Marriott Hotel',         stars: 5, country: 'GE' },
  // 4-star
  { hid: 'H00009', name: 'Hilton Abu Dhabi',               stars: 4, country: 'AE' },
  { hid: 'H00015', name: 'Steigenberger Hotel El Tahrir',  stars: 4, country: 'EG' },
  { hid: 'H00016', name: 'Hilton Cairo Zamalek',           stars: 4, country: 'EG' },
  { hid: 'H00035', name: 'Radisson Blu Pera Istanbul',     stars: 4, country: 'TR' },
  { hid: 'H00036', name: 'Marriott Istanbul Sisli',        stars: 4, country: 'TR' },
  { hid: 'H00054', name: 'Sofitel Athens Airport',         stars: 4, country: 'GR' },
  { hid: 'H00059', name: 'Marriott Paris Champs-Elysees',  stars: 4, country: 'FR' },
  { hid: 'H00063', name: 'Hilton Moscow Leningradskaya',   stars: 4, country: 'RU' },
  { hid: 'H00071', name: 'Crowne Plaza Amman',             stars: 4, country: 'JO' },
  { hid: 'H00072', name: 'InterContinental Doha',          stars: 4, country: 'QA' },
  { hid: 'H00073', name: 'Millennium Hotel Doha',          stars: 4, country: 'QA' },
  { hid: 'H00074', name: 'Novotel Cairo Airport',          stars: 4, country: 'EG' },
  { hid: 'H00075', name: 'Mercure Dubai Barsha Heights',   stars: 4, country: 'AE' },
  { hid: 'H00076', name: 'Holiday Inn Riyadh',             stars: 4, country: 'SA' },
  { hid: 'H00077', name: 'DoubleTree by Hilton Marrakech', stars: 4, country: 'MA' },
  // 3-star
  { hid: 'H00010', name: 'Premier Inn Dubai Airport',      stars: 3, country: 'AE' },
  { hid: 'H00080', name: 'Ibis Dubai Mall of the Emirates',stars: 3, country: 'AE' },
  { hid: 'H00081', name: 'Ibis Cairo Citystars',           stars: 3, country: 'EG' },
  { hid: 'H00082', name: 'City Seasons Hotel Muscat',      stars: 3, country: 'OM' },
  { hid: 'H00083', name: 'Al Murjan Palace Jeddah',        stars: 3, country: 'SA' },
  { hid: 'H00084', name: 'Ibis Amman',                     stars: 3, country: 'JO' },
  { hid: 'H00085', name: 'Holiday Inn Express Doha',       stars: 3, country: 'QA' },
  { hid: 'H00086', name: 'Novotel Istanbul Zeytinburnu',   stars: 3, country: 'TR' },
  { hid: 'H00087', name: 'Ibis Marrakech Palmeraie',       stars: 3, country: 'MA' },
  { hid: 'H00088', name: 'Premier Inn Riyadh King Salman', stars: 3, country: 'SA' },
  { hid: 'H00089', name: 'Ibis Paris Gare du Nord',        stars: 3, country: 'FR' },
  { hid: 'H00090', name: 'Park Inn by Radisson Tbilisi',   stars: 3, country: 'GE' },
  { hid: 'H00091', name: 'Ibis Athens City',               stars: 3, country: 'GR' },
  { hid: 'H00092', name: 'Holiday Inn Kuwait',             stars: 3, country: 'KW' },
  { hid: 'H00093', name: 'Ibis Beirut Downtown',           stars: 3, country: 'LB' },
];

// ---- Session: selected hotels ----
const selectedHotels = {};   // hid → hotel object

// ---- Dump date ----
document.getElementById('dump-update-date').textContent = '01.06.2025';

// ---- Populate country dropdown ----
const countrySelect = document.getElementById('filter-country');
COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.code;
  opt.textContent = `${c.code} — ${c.name}`;
  countrySelect.appendChild(opt);
});

// ---- Search ----
document.getElementById('hd-search-btn').addEventListener('click', runSearch);
document.getElementById('filter-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') runSearch();
});

function runSearch() {
  const country = document.getElementById('filter-country').value;
  const stars   = document.getElementById('filter-stars').value;
  const name    = document.getElementById('filter-name').value.trim().toLowerCase();

  const hint = document.getElementById('hd-filter-hint');
  if (!country && !stars && !name) {
    hint.style.display = 'block';
    document.getElementById('hd-results-wrap').style.display = 'none';
    document.getElementById('hd-no-results').style.display = 'none';
    return;
  }
  hint.style.display = 'none';

  const results = HOTELS.filter(h => {
    if (country && h.country !== country) return false;
    if (stars   && h.stars  !== parseInt(stars)) return false;
    if (name    && !h.name.toLowerCase().includes(name)) return false;
    return true;
  });

  renderHotelResults(results);
}

// ---- Render results table ----
function renderHotelResults(results) {
  const wrap  = document.getElementById('hd-results-wrap');
  const noRes = document.getElementById('hd-no-results');
  const tbody = document.getElementById('hd-results-tbody');
  const count = document.getElementById('hd-results-count');

  tbody.innerHTML = '';

  if (results.length === 0) {
    wrap.style.display  = 'none';
    noRes.style.display = 'block';
    return;
  }

  noRes.style.display = 'none';
  wrap.style.display  = 'block';
  count.textContent   = `${results.length} hotel${results.length !== 1 ? 's' : ''} found`;

  results.forEach(h => {
    const tr  = document.createElement('tr');
    const checked = selectedHotels[h.hid] ? 'checked' : '';
    tr.innerHTML = `
      <td><input type="checkbox" class="hd-cb" data-hid="${h.hid}" ${checked} /></td>
      <td>${h.name}</td>
      <td><span class="hd-stars">${'★'.repeat(h.stars)}</span></td>
      <td>${h.country}</td>
      <td class="hd-hid">${h.hid}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Checkbox: event delegation on the results table ----
document.getElementById('hd-results-tbody').addEventListener('change', e => {
  if (!e.target.matches('.hd-cb')) return;
  const hid  = e.target.dataset.hid;
  const hotel = HOTELS.find(h => h.hid === hid);
  if (!hotel) return;

  if (e.target.checked) {
    selectedHotels[hid] = hotel;
  } else {
    delete selectedHotels[hid];
  }
  renderSelected();
});

// ---- Render selected hotels table ----
function renderSelected() {
  const tbody   = document.getElementById('selected-tbody');
  const hidsEl  = document.getElementById('selected-hids-text');
  const emptyRow = document.getElementById('selected-empty-row');
  const hotels  = Object.values(selectedHotels);
  const hids    = hotels.map(h => h.hid).join(',');

  hidsEl.textContent = hids || '—';
  hidsEl.style.color = hids ? 'var(--text-pri)' : 'var(--text-muted)';

  // Remove all non-empty rows
  Array.from(tbody.querySelectorAll('tr:not(#selected-empty-row)')).forEach(r => r.remove());

  if (hotels.length === 0) {
    emptyRow.style.display = '';
    return;
  }
  emptyRow.style.display = 'none';

  hotels.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><button class="selected-row-remove" data-hid="${h.hid}" title="Remove">✕</button></td>
      <td>${h.name}</td>
      <td><span class="hd-stars">${'★'.repeat(h.stars)}</span></td>
      <td>${h.country}</td>
      <td class="hd-hid">${h.hid}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Remove from selected via ✕ button (event delegation) ----
document.getElementById('selected-tbody').addEventListener('click', e => {
  const btn = e.target.closest('.selected-row-remove');
  if (!btn) return;
  const hid = btn.dataset.hid;
  delete selectedHotels[hid];
  // Uncheck in results table if visible
  const cb = document.querySelector(`#hd-results-tbody .hd-cb[data-hid="${hid}"]`);
  if (cb) cb.checked = false;
  renderSelected();
});

// ---- Copy HIDs ----
document.getElementById('copy-hids-btn').addEventListener('click', () => {
  const text = document.getElementById('selected-hids-text').textContent;
  if (text === '—') return;
  const btn = document.getElementById('copy-hids-btn');
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
});

// ---- Clear table ----
document.getElementById('hd-clear-btn').addEventListener('click', () => {
  if (Object.keys(selectedHotels).length === 0) return;
  if (!confirm('Clear all selected hotels?')) return;
  Object.keys(selectedHotels).forEach(k => delete selectedHotels[k]);
  document.querySelectorAll('#hd-results-tbody .hd-cb').forEach(cb => cb.checked = false);
  renderSelected();
});
