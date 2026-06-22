/* ========================================
   Price Check & Book
   ======================================== */

// ---- Mock hotel availability data ----
const MOCK_HOTELS = [
  {
    hotelId: 'H00001', hotelName: 'Burj Al Arab', country: 'AE', stars: 5,
    offers: [
      { offerId: 'O001A', room: 'Deluxe Suite', meal: 'Breakfast Included', cancel: 'free',  price: 1988 },
      { offerId: 'O001B', room: 'Deluxe Suite', meal: 'All Inclusive',       cancel: 'free',  price: 2340 },
      { offerId: 'O001C', room: 'Panoramic Suite', meal: 'Room Only',        cancel: 'paid',  price: 2900 },
      { offerId: 'O001D', room: 'Panoramic Suite', meal: 'Breakfast Included', cancel: 'non', price: 2650 },
      { offerId: 'O001E', room: 'Royal Suite',    meal: 'Breakfast Included', cancel: 'free', price: 4800 },
    ],
  },
  {
    hotelId: 'H00002', hotelName: 'Atlantis The Palm', country: 'AE', stars: 5,
    offers: [
      { offerId: 'O002A', room: 'Ocean Premier Room', meal: 'Breakfast Included', cancel: 'free', price: 566 },
      { offerId: 'O002B', room: 'Ocean Premier Room', meal: 'Room Only',           cancel: 'paid', price: 490 },
      { offerId: 'O002C', room: 'Terrace Suite',      meal: 'Breakfast Included', cancel: 'free', price: 890 },
      { offerId: 'O002D', room: 'Bridge Suite',       meal: 'All Inclusive',       cancel: 'non',  price: 3200 },
    ],
  },
  {
    hotelId: 'H00017', hotelName: 'Four Seasons Doha', country: 'QA', stars: 5,
    offers: [
      { offerId: 'O017A', room: 'Deluxe Room',        meal: 'Room Only',           cancel: 'free', price: 420 },
      { offerId: 'O017B', room: 'Deluxe Room',        meal: 'Breakfast Included', cancel: 'free', price: 490 },
      { offerId: 'O017C', room: 'Premium Suite',      meal: 'Breakfast Included', cancel: 'paid', price: 980 },
      { offerId: 'O017D', room: 'Premium Suite',      meal: 'Half Board',          cancel: 'non',  price: 1120 },
    ],
  },
  {
    hotelId: 'H00022', hotelName: 'Ritz-Carlton Riyadh', country: 'SA', stars: 5,
    offers: [
      { offerId: 'O022A', room: 'Classic Room',       meal: 'Room Only',           cancel: 'free', price: 380 },
      { offerId: 'O022B', room: 'Classic Room',       meal: 'Breakfast Included', cancel: 'paid', price: 440 },
      { offerId: 'O022C', room: 'Deluxe Room',        meal: 'Breakfast Included', cancel: 'free', price: 520 },
      { offerId: 'O022D', room: 'Palace Suite',       meal: 'Half Board',          cancel: 'non',  price: 1850 },
    ],
  },
  {
    hotelId: 'H00027', hotelName: 'Grand Hyatt Amman', country: 'JO', stars: 5,
    offers: [
      { offerId: 'O027A', room: 'Standard Room',      meal: 'Room Only',           cancel: 'free', price: 160 },
      { offerId: 'O027B', room: 'Standard Room',      meal: 'Breakfast Included', cancel: 'free', price: 195 },
      { offerId: 'O027C', room: 'Deluxe Room',        meal: 'Breakfast Included', cancel: 'paid', price: 240 },
      { offerId: 'O027D', room: 'Grand Suite',        meal: 'Half Board',          cancel: 'non',  price: 680 },
    ],
  },
  {
    hotelId: 'H00032', hotelName: 'Four Seasons Bosphorus', country: 'TR', stars: 5,
    offers: [
      { offerId: 'O032A', room: 'Bosphorus View Room', meal: 'Room Only',           cancel: 'free', price: 510 },
      { offerId: 'O032B', room: 'Bosphorus View Room', meal: 'Breakfast Included', cancel: 'paid', price: 580 },
      { offerId: 'O032C', room: 'Ottoman Suite',       meal: 'Breakfast Included', cancel: 'non',  price: 1400 },
    ],
  },
  {
    hotelId: 'H00041', hotelName: 'La Mamounia Marrakech', country: 'MA', stars: 5,
    offers: [
      { offerId: 'O041A', room: 'Classic Room Garden', meal: 'Breakfast Included', cancel: 'free', price: 640 },
      { offerId: 'O041B', room: 'Classic Room Garden', meal: 'Half Board',          cancel: 'paid', price: 760 },
      { offerId: 'O041C', room: 'Suite',               meal: 'Breakfast Included', cancel: 'free', price: 1600 },
      { offerId: 'O041D', room: 'Suite',               meal: 'All Inclusive',       cancel: 'non',  price: 1900 },
    ],
  },
  {
    hotelId: 'H00046', hotelName: 'Shangri-La Muscat', country: 'OM', stars: 5,
    offers: [
      { offerId: 'O046A', room: 'Deluxe Room',         meal: 'Room Only',           cancel: 'free', price: 290 },
      { offerId: 'O046B', room: 'Deluxe Room',         meal: 'Breakfast Included', cancel: 'free', price: 340 },
      { offerId: 'O046C', room: 'Ocean View Suite',    meal: 'Breakfast Included', cancel: 'paid', price: 760 },
    ],
  },
];

const CANCEL_LABELS = {
  free: 'Free cancellation',
  paid: 'Paid cancellation',
  non:  'Non-refundable',
};
const CANCEL_CLASS = {
  free: 'cancel-free',
  paid: 'cancel-paid',
  non:  'cancel-non',
};

// ---- Cart state ----
let cart = [];   // { offerId, hotelId, hotelName, room, meal, cancel, price, qty }
let cartCollapsed = false;

// ---- Set default dates ----
(function setDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const dayAfter  = new Date(today); dayAfter.setDate(today.getDate() + 2);
  document.getElementById('pc-checkin').value  = tomorrow.toISOString().slice(0, 10);
  document.getElementById('pc-checkout').value = dayAfter.toISOString().slice(0, 10);
})();

// ---- Search ----
document.getElementById('pc-search-btn').addEventListener('click', runSearch);

function runSearch() {
  const checkin  = document.getElementById('pc-checkin').value;
  const checkout = document.getElementById('pc-checkout').value;
  const adults   = document.getElementById('pc-adults').value;
  const errEl    = document.getElementById('pc-form-error');

  if (!checkin || !checkout) {
    errEl.textContent = 'Please select check-in and check-out dates.';
    errEl.style.display = 'block'; return;
  }
  if (checkin >= checkout) {
    errEl.textContent = 'Check-out must be after check-in.';
    errEl.style.display = 'block'; return;
  }
  errEl.style.display = 'none';

  const timeout = parseInt(document.getElementById('pc-timeout').value) || 30;

  document.getElementById('pc-results').style.display = 'none';
  document.getElementById('pc-no-results').style.display = 'none';
  document.getElementById('pc-loading').style.display = 'flex';

  // Simulate API call with timeout
  setTimeout(() => {
    document.getElementById('pc-loading').style.display = 'none';
    renderPriceResults();
  }, Math.min(timeout * 50, 2000));  // cap at 2s for UX
}

function renderPriceResults() {
  const sort = document.getElementById('pc-sort').value;

  const hotelIdFilter = document.getElementById('pc-hotel-ids').value
    .split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

  // Deep-clone, filter by hotel IDs if provided, sort offers
  let hotels = MOCK_HOTELS
    .filter(h => hotelIdFilter.length === 0 || hotelIdFilter.includes(h.hotelId.toUpperCase()))
    .map(h => ({
      ...h,
      offers: [...h.offers].sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price),
    }));

  // Sort hotels by their min price
  hotels.sort((a, b) => {
    const minA = Math.min(...a.offers.map(o => o.price));
    const minB = Math.min(...b.offers.map(o => o.price));
    return sort === 'asc' ? minA - minB : minB - minA;
  });

  if (hotels.length === 0) {
    document.getElementById('pc-no-results').style.display = 'block';
    return;
  }

  const checkin  = document.getElementById('pc-checkin').value;
  const checkout = document.getElementById('pc-checkout').value;
  const nights   = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);

  document.getElementById('pc-results-summary').textContent =
    `${hotels.length} hotel${hotels.length !== 1 ? 's' : ''} found · ${nights} night${nights !== 1 ? 's' : ''}`;

  const list = document.getElementById('pc-hotels-list');
  list.innerHTML = '';

  hotels.forEach(h => {
    const minPrice = Math.min(...h.offers.map(o => o.price)) * nights;
    const card = document.createElement('div');
    card.className = 'pc-hotel-card';

    // Group offers by room name
    const rooms = {};
    h.offers.forEach(o => {
      if (!rooms[o.room]) rooms[o.room] = [];
      rooms[o.room].push(o);
    });

    card.innerHTML = `
      <div class="pc-hotel-header" data-hotel="${h.hotelId}">
        <div class="pc-hotel-info">
          <div class="pc-hotel-name">${h.hotelName}</div>
          <div class="pc-hotel-meta">${h.hotelId} · ${h.country} · ${'★'.repeat(h.stars)}</div>
        </div>
        <div class="pc-hotel-stats">
          <div class="pc-stat">
            <div class="pc-stat-val">${h.offers.length}</div>
            <div class="pc-stat-label">Offers</div>
          </div>
          <div class="pc-stat">
            <div class="pc-stat-val">from $${minPrice.toLocaleString()}</div>
            <div class="pc-stat-label">total</div>
          </div>
        </div>
        <button class="pc-show-more" data-hotel="${h.hotelId}">
          Show offers
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>
      <div class="pc-offers-panel" id="offers-${h.hotelId}">
        ${Object.entries(rooms).map(([roomName, offers]) => `
          <div class="pc-room-group">
            <div class="pc-room-name">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              ${roomName}
            </div>
            ${offers.map(o => `
              <div class="pc-offer-row" id="row-${o.offerId}">
                <div class="pc-offer-meal">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                  ${o.meal}
                </div>
                <div class="pc-offer-cancel">
                  <span class="badge ${CANCEL_CLASS[o.cancel]}">${CANCEL_LABELS[o.cancel]}</span>
                </div>
                <div class="pc-offer-price">$${(o.price * nights).toLocaleString()}</div>
                <div class="pc-qty-wrap">
                  <button class="pc-qty-btn" data-offer="${o.offerId}" data-action="dec">−</button>
                  <span class="pc-qty-val" id="qty-${o.offerId}">1</span>
                  <button class="pc-qty-btn" data-offer="${o.offerId}" data-action="inc">+</button>
                </div>
                <button class="pc-add-btn" data-offer="${o.offerId}"
                  data-hotel-id="${h.hotelId}" data-hotel-name="${h.hotelName}"
                  data-room="${o.room}" data-meal="${o.meal}" data-cancel="${o.cancel}" data-price="${o.price * nights}">
                  Add to cart
                </button>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
    list.appendChild(card);

    // Toggle show more
    card.querySelector('.pc-show-more').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const panel = document.getElementById(`offers-${h.hotelId}`);
      const open = panel.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.innerHTML = open
        ? `Hide offers <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`
        : `Show offers <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;
    });

    // Also toggle on header click
    card.querySelector('.pc-hotel-header').addEventListener('click', () => {
      card.querySelector('.pc-show-more').click();
    });

    // Quantity buttons
    card.querySelectorAll('.pc-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const offerId = btn.dataset.offer;
        const el = document.getElementById(`qty-${offerId}`);
        let val = parseInt(el.textContent);
        if (btn.dataset.action === 'inc') val = Math.min(val + 1, 3);
        else                               val = Math.max(val - 1, 1);
        el.textContent = val;
      });
    });

    // Add to cart buttons
    card.querySelectorAll('.pc-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const offerId   = btn.dataset.offer;
        const qty       = parseInt(document.getElementById(`qty-${offerId}`).textContent);
        const existing  = cart.findIndex(c => c.offerId === offerId);

        if (existing >= 0) {
          cart[existing].qty = Math.min(cart[existing].qty + qty, 3);
        } else {
          cart.push({
            offerId,
            hotelId:   btn.dataset.hotelId,
            hotelName: btn.dataset.hotelName,
            room:      btn.dataset.room,
            meal:      btn.dataset.meal,
            cancel:    btn.dataset.cancel,
            price:     parseFloat(btn.dataset.price),
            qty,
          });
        }

        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('added'); }, 1500);

        renderCart();
      });
    });
  });

  document.getElementById('pc-results').style.display = 'block';
}

// ---- Cart ----
function renderCart() {
  const panel = document.getElementById('cart-panel');
  const itemsEl = document.getElementById('cart-items');
  const badgeEl = document.getElementById('cart-badge');
  const totalEl = document.getElementById('cart-total');

  if (cart.length === 0) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  badgeEl.textContent = totalQty;
  totalEl.textContent = '$' + totalPrice.toLocaleString();

  itemsEl.innerHTML = '';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.hotelName}</div>
        <div class="cart-item-sub">${item.room} · ${item.qty > 1 ? item.qty + '× ' : ''}${item.meal}</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</div>
        <button class="cart-item-remove" data-idx="${idx}">✕</button>
      </div>
    `;
    div.querySelector('.cart-item-remove').addEventListener('click', () => {
      cart.splice(idx, 1);
      renderCart();
    });
    itemsEl.appendChild(div);
  });
}

// Cart toggle
document.querySelector('.cart-panel-header').addEventListener('click', () => {
  cartCollapsed = !cartCollapsed;
  document.getElementById('cart-body').style.display = cartCollapsed ? 'none' : '';
  document.getElementById('cart-toggle').classList.toggle('collapsed', cartCollapsed);
});

// ---- Book button ----
document.getElementById('cart-book-btn').addEventListener('click', openBookingModal);

function openBookingModal() {
  if (cart.length === 0) return;

  const checkin  = document.getElementById('pc-checkin').value;
  const checkout = document.getElementById('pc-checkout').value;
  const nights   = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
  const total    = cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Summary
  const summaryEl = document.getElementById('bk-summary');
  const rows = [];

  // Group by hotel
  const byHotel = {};
  cart.forEach(item => {
    if (!byHotel[item.hotelId]) byHotel[item.hotelId] = { name: item.hotelName, rooms: [] };
    for (let i = 0; i < item.qty; i++) byHotel[item.hotelId].rooms.push(item);
  });

  Object.values(byHotel).forEach(h => {
    rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Hotel</div><div class="bk-sum-val">${h.name}</div></div>`);
    rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Hotel ID</div><div class="bk-sum-val">${Object.keys(byHotel).find(k => byHotel[k] === h)}</div></div>`);
  });
  rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Check-in</div><div class="bk-sum-val">${formatDate(checkin)}</div></div>`);
  rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Check-out</div><div class="bk-sum-val">${formatDate(checkout)} (${nights} night${nights !== 1 ? 's' : ''})</div></div>`);

  const totalRooms = cart.reduce((s, c) => s + c.qty, 0);
  let roomNum = 0;
  cart.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      roomNum++;
      const roomLabel = totalRooms > 1 ? `Room ${roomNum}` : 'Room';
      rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">${roomLabel}</div><div class="bk-sum-val">${item.room}</div></div>`);
      rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Meal</div><div class="bk-sum-val">${item.meal}</div></div>`);
      rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Cancellation</div><div class="bk-sum-val"><span class="badge ${CANCEL_CLASS[item.cancel]}">${CANCEL_LABELS[item.cancel]}</span></div></div>`);
      rows.push(`<div class="bk-summary-row"><div class="bk-sum-key">Price</div><div class="bk-sum-val">$${item.price.toLocaleString()}</div></div>`);
    }
  });

  if (cart.length > 1 || cart[0].qty > 1) {
    rows.push(`<div class="bk-summary-row"><div class="bk-sum-key" style="font-weight:700;color:var(--text-pri)">Total</div><div class="bk-sum-val" style="font-weight:700;color:var(--text-pri)">$${total.toLocaleString()}</div></div>`);
  }
  summaryEl.innerHTML = rows.join('');

  // Guest fields — one block per room (across all cart items × qty)
  const guestsEl = document.getElementById('bk-guests');
  guestsEl.innerHTML = '';
  let roomIdx = 0;
  cart.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      roomIdx++;
      const block = document.createElement('div');
      block.className = 'bk-guest-block';
      block.innerHTML = `
        <div class="bk-guest-header">Room ${roomIdx}: ${item.room}</div>
        <div class="bk-guest-fields">
          <div class="pc-field">
            <label class="pc-label">First Name</label>
            <input type="text" class="pc-input" id="bk-fname-${roomIdx}" placeholder="First name" />
          </div>
          <div class="pc-field">
            <label class="pc-label">Last Name</label>
            <input type="text" class="pc-input" id="bk-lname-${roomIdx}" placeholder="Last name" />
          </div>
          <div class="pc-field" style="flex:0 0 110px;">
            <label class="pc-label">Sex</label>
            <select class="pc-input" id="bk-sex-${roomIdx}">
              <option value="">—</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      `;
      guestsEl.appendChild(block);
    }
  });

  window._bkRooms = roomIdx;
  document.getElementById('bk-error').style.display = 'none';
  document.getElementById('booking-modal').classList.add('open');
}

document.getElementById('booking-modal-close').addEventListener('click', () =>
  document.getElementById('booking-modal').classList.remove('open'));

document.getElementById('booking-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// ---- Confirm booking ----
document.getElementById('bk-confirm-btn').addEventListener('click', () => {
  const errEl = document.getElementById('bk-error');
  const rooms = window._bkRooms || 0;

  // Validate guests
  for (let i = 1; i <= rooms; i++) {
    if (!document.getElementById(`bk-fname-${i}`)?.value.trim()) {
      errEl.textContent = `Please enter the first name for Room ${i}.`;
      errEl.style.display = 'block'; return;
    }
    if (!document.getElementById(`bk-lname-${i}`)?.value.trim()) {
      errEl.textContent = `Please enter the last name for Room ${i}.`;
      errEl.style.display = 'block'; return;
    }
  }

  const email = document.getElementById('bk-email').value.trim();
  const phone = document.getElementById('bk-phone').value.trim();
  if (!email) { errEl.textContent = 'Please enter an email address.'; errEl.style.display = 'block'; return; }
  if (!phone) { errEl.textContent = 'Please enter a phone number.';   errEl.style.display = 'block'; return; }

  errEl.style.display = 'none';

  // Generate ref
  const ref = 'BNR-' + Date.now().toString(36).toUpperCase().slice(-8);
  document.getElementById('bk-ref').textContent = ref;

  // Close booking modal, show confirmation
  document.getElementById('booking-modal').classList.remove('open');
  document.getElementById('booking-confirm-modal').classList.add('open');

  // Clear cart
  cart = [];
  renderCart();
});

document.getElementById('bk-confirm-close').addEventListener('click', () => {
  document.getElementById('booking-confirm-modal').classList.remove('open');
});

function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
