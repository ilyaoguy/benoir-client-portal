/* ========================================
   Internationalisation  (EN / RU)
   ======================================== */

const TRANSLATIONS = {
  en: {
    /* ── Nav ── */
    'nav.main':         'Main',
    'nav.operations':   'Operations',
    'nav.tools':        'Tools',
    'nav.admin':        'Admin',
    'nav.home':         'Home',
    'nav.bookings':     'Bookings',
    'nav.support':      'Support',
    'nav.finance':      'Finance',
    'nav.hotel_dump':   'Hotel Dump & ID Search',
    'nav.price_check':  'Price Check & Book',
    'nav.users':        'Users',
    'nav.account':      'Account',
    'brand.sub':        'Client Portal',

    /* ── Topbar ── */
    'page.home':        'Dashboard',
    'page.bookings':    'Bookings',
    'page.support':     'Support',
    'page.finance':     'Finance',
    'page.hotel_dump':  'Hotel Search',
    'page.price_check': 'Price Check',
    'page.users':       'Users',
    'page.account':     'Account',

    /* ── Common ── */
    'btn.search':   'Search',
    'btn.reset':    'Reset',
    'btn.csv':      'CSV',
    'btn.xlsx':     'XLSX',
    'adv.toggle':   'Advanced Filters',
    'lbl.status':   'Status',
    'lbl.payment':  'Payment Status',
    'no.results':   'No bookings match the current filters.',

    /* ── Filter labels ── */
    'f.booking_id':  'Booking ID',
    'f.hotel':       'Hotel Name',
    'f.guest':       'Main Guest',
    'f.bdate':       'Booking Date',
    'f.checkin':     'Check-in Date',
    'f.checkout':    'Check-out Date',
    'f.cost':        'Booking Cost (USD)',
    'f.cost_min':    'Min',
    'f.cost_max':    'Max',
    'ph.booking_id': 'e.g. BNR-001',
    'ph.hotel':      'Search hotel…',
    'ph.guest':      'Search guest…',

    /* ── Table headers ── */
    'th.id':         'Booking ID',
    'th.bdate':      'Booking Date',
    'th.checkin':    'Check-in',
    'th.hotel':      'Hotel Name',
    'th.guest':      'Main Guest',
    'th.cost':       'Booking Cost',
    'th.status':     'Status',
    'th.payment':    'Payment Status',
    'th.name':       'Name',
    'th.email':      'Email',
    'th.role':       'Role',
    'th.sections':   'Section Access',
    'th.last_login': 'Last Login',
    'th.actions':    'Actions',

    /* ── Status badges ── */
    'status.confirmed': 'Confirmed',
    'status.cancelled': 'Cancelled',
    'status.pending':   'Pending',
    'status.noshow':    'No Show',

    /* ── Payment badges ── */
    'pay.paid':       'Paid',
    'pay.due_today':  'Due Today',
    'pay.overdue':    'Overdue',
    'pay.due_in':     'Due in',
    'pay.days_abbr':  'd',

    /* ── Booking table toolbar ── */
    'toolbar.results': '{n} booking',
    'toolbar.results_pl': '{n} bookings',

    /* ── Booking detail ── */
    'det.checkin':       'Check-in',
    'det.checkout':      'Check-out',
    'det.los':           'Length of Stay',
    'det.night':         'night',
    'det.nights':        'nights',
    'det.final_cost':    'Final Cost',
    'det.meal':          'Meal Plan',
    'det.bed':           'Bed Type',
    'det.guests':        'Guests',
    'det.arrival':       'Arrival Time',
    'det.cancel_fee':    "Today's Cancel Fee",
    'det.notes':         'Notes',
    'det.cancel_policy': 'Cancellation Policy',
    'det.free_until':    'Free until',
    'det.nonrefundable': 'Non-refundable',

    /* ── Auth overlay ── */
    'auth.tab_token':    'Admin Token',
    'auth.tab_user':     'User Sign In',
    'auth.hint_token':   'Enter the admin token associated with this organisation.',
    'auth.hint_user':    'Sign in with your organisation credentials.',
    'auth.lbl_token':    'Admin Token',
    'auth.ph_token':     'BNR-••••••••••',
    'auth.lbl_email':    'Email',
    'auth.ph_email':     'you@benoir.com',
    'auth.lbl_password': 'Password',
    'auth.ph_password':  'Password',
    'auth.btn_admin':    'Sign In as Admin',
    'auth.btn_user':     'Sign In',
    'auth.err_token':    'Invalid admin token. Please check and try again.',
    'auth.err_user':     'Invalid email or password.',
    'auth.footer':       'Benoir Travel · Secure Client Portal',

    /* ── Finance ── */
    'fin.overdue':        'Overdue',
    'fin.due':            'Payment Due',
    'fin.upcoming':       'Upcoming Payment',
    'fin.inv_dl':         'Create an Invoice',
    'fin.deposit':        'Deposit',
    'fin.balance':        'Available balance',
    'fin.leverage':       'Leverage Available',
    'fin.leverage_sub':   'Credit limit / deposit ratio',
    'fin.credit':         'Credit Limit',
    'fin.extra_dep':      'Extra Deposit Invoice',
    'fin.range_from':     'From',
    'fin.range_to':       'To',
    'fin.dl_btn':         'Download Invoice',
    'fin.amount_usd':     'Amount (USD)',
    'fin.gen_dep':        'Generate Deposit Invoice',
    'fin.credit_lbl':     'used',
    'fin.avail':          'available',
    'fin.bookings':       'booking',
    'fin.bookings_pl':    'bookings',

    /* ── Support sections ── */
    'sup.f_id':         'Booking ID',
    'sup.f_guest':      'Main Guest',
    'sup.cancel':       'Cancellation and Refund Requests',
    'sup.modify':       'Modification Requests',
    'sup.arrival':      'Arrival / In-Stay',
    'sup.info':         'Booking Information',
    'sup.emergency':    'Emergency',
    'sup.cancel_btn':   'Cancel Booking',
    'sup.refund_btn':   'Refund Calculation',
    'sup.recalc_btn':   'Recalculate',
    'sup.refund_lbl':   'Calculating refund from backend…',
    'sup.submit_claim': 'Submit Claim',
    'sup.voucher':      'Request Voucher',
    'sup.hcn':          'Request HCN',

    /* ── Users page ── */
    'usr.title':        'User Management',
    'usr.add':          'Add User',
    'usr.invite_title': 'Invite New User',
    'usr.f_name':       'Full Name',
    'usr.f_email':      'Email Address',
    'usr.f_role':       'Role',
    'usr.f_sections':   'Section Access',
    'usr.send':         'Send Invitation',
    'usr.cancel':       'Cancel',
    'usr.role_ro':      'Read Only',
    'usr.role_full':    'Booking & Modifications',
    'usr.role_admin':   'Admin',
    'usr.status_active':   'Active',
    'usr.status_invited':  'Invited',
    'usr.status_inactive': 'Inactive',
    'usr.restricted_h':  'Access Restricted',
    'usr.restricted_p':  'User management is available to administrators only.',
    'usr.never':         'Never',
    'usr.you':           'you',
    'usr.ph_name':  'e.g. Sarah Chen',
    'usr.ph_email': 'sarah@company.com',

    /* ── Account page ── */
    'acct.org':         'Organisation',
    'acct.profile':     'My Profile',
    'acct.access':      'Access & Permissions',
    'acct.token_card':  'Admin Token',
    'acct.key_name':    'Name',
    'acct.key_id':      'Account ID',
    'acct.key_country': 'Country',
    'acct.key_email':   'Email',
    'acct.key_phone':   'Phone',
    'acct.key_role':    'Role',
    'acct.key_since':   'Member since',
    'acct.key_last':    'Last login',
    'acct.key_sections':'Sections',
    'acct.key_modify':  'Can modify',
    'acct.key_token':   'Token',
    'acct.key_auth':    'Auth type',
    'acct.auth_type':   'API Token',
    'acct.reveal':      'Reveal',
    'acct.hide':        'Hide',
    'acct.copy':        'Copy',
    'acct.copied':      'Copied!',
    'acct.token_note':  'Keep this token confidential. Use it to sign in as admin and to authenticate API calls on behalf of this organisation.',
    'acct.can_modify_yes': '✓ Yes',
    'acct.can_modify_no':  '✗ No (view only)',

    /* ── Read-only badge ── */
    'badge.readonly': 'Read Only',

    /* ── Date range picker ── */
    'range.7d':  'Last 7 days',
    'range.30d': 'Last 30 days',
    'range.90d': 'Last 90 days',
    'range.ytd': 'Year to date',

    /* ── Page sub-titles ── */
    'page.home_sub':        'Overview for {range}',
    'page.bookings_sub':    'Search and manage your bookings',
    'page.support_sub':     'Get help & submit tickets',
    'page.finance_sub':     'Invoices, payments & credit',
    'page.hotel_dump_sub':  'Download inventory and look up hotel IDs',
    'page.price_check_sub': 'Live pricing and booking',
    'page.users_sub':       'Team members & permissions',
    'page.account_sub':     'Settings & preferences',

    /* ── Home page ── */
    'home.overview':   'Overview',
    'home.barometer':  "Today's Barometer",
    'home.fin':        'Finance',
    'home.sales':      'Sales (USD)',
    'home.bookings':   'Bookings Made',
    'home.confirmed':  'Bookings Confirmed',
    'home.cancels':    'Cancelled',
    'home.avg_val':    'Avg Booking Value',
    'home.lead_time':  'Avg Lead Time',
    'home.los':        'Length of Stay',
    'baro.checkins':   'Check-ins',
    'baro.checkouts':  'Check-outs',
    'baro.current':    'Current Stays',
    'baro.tomorrow':   'Tomorrow Check-ins',
    'baro.today':      'Today',
    'baro.inhouse':    'In-house guests',
    'baro.arriving':   'Arriving tomorrow',
    'home.fin.credit': 'Credit Limit',
    'home.fin.util':   'Credit Utilization',
    'home.fin.due':    'Payment Due',
    'home.fin.days':   'Days Left for Payment',
    'home.fin.next':   'Next invoice amount',
    'home.fin.used':   'used',
    'home.fin.on_track': 'On track',
    'home.fin.due_soon': 'Due soon',
    'home.fin.urgent':   'Urgent',
    'home.chart':      'Daily Sales & Bookings',
    'home.days':       'days',
    'home.nts':        'nts',

    /* ── Hotel Dump page ── */
    'hd.title':          'Hotel Dump',
    'hd.search_title':   'Hotel ID Search',
    'hd.selected_title': 'Selected Hotels',
    'hd.latest_update':  'Latest Update',
    'hd.dl_btn':         'Download Full Hotel Dump',
    'hd.note':           'JSONL·GZ format · Contains full hotel inventory with IDs, names, locations and metadata',
    'hd.country':        'Country',
    'hd.stars':          'Stars',
    'hd.name_kw':        'Name / Keyword',
    'hd.exact':          '(exact match)',
    'hd.any_country':    'Any country',
    'hd.any_stars':      'Any stars',
    'hd.3stars':         '⭐⭐⭐ 3 Stars',
    'hd.4stars':         '⭐⭐⭐⭐ 4 Stars',
    'hd.5stars':         '⭐⭐⭐⭐⭐ 5 Stars',
    'hd.ph_name':        'e.g. Marriott, Hilton…',
    'hd.search_btn':     'Search',
    'hd.th_name':        'Hotel Name',
    'hd.th_stars':       'Stars',
    'hd.th_country':     'Country',
    'hd.th_hid':         'HID',
    'hd.no_results':     'No hotels match your search. Try different filters.',
    'hd.selected_hids':  'Selected HIDs',
    'hd.clear':          'Clear Table',
    'hd.copy':           'Copy',
    'hd.empty':          'No hotels selected yet. Use the search above to find and select hotels.',
    'hd.filter_hint':    '⚠ Please select at least one filter before searching.',

    /* ── Price Check page ── */
    'pc.checkin':      'Check-in',
    'pc.checkout':     'Check-out',
    'pc.adults':       'Adults',
    'pc.children':     'Children ages',
    'pc.children_hint':'comma-separated',
    'pc.sort':         'Sort by price',
    'pc.sort_asc':     'Ascending ↑',
    'pc.sort_desc':    'Descending ↓',
    'pc.timeout':      'Timeout (sec)',
    'pc.hotel_ids':    'Hotel IDs',
    'pc.hotel_hint':   'comma-separated',
    'pc.ph_hotel':     'e.g. H00001, H00002',
    'pc.loading':      'Searching for availability…',
    'pc.no_results':   'No availability found for the selected dates and parameters.',

    /* ── Payment filter checkbox ── */
    'pay.due_in_x':    'Due in X days',
    'pay.due_label':   'Payment Due',
    'pay.over_label':  'Payment Overdue',

    /* ── Support panel content ── */
    'sup1.bk_cost':    'Booking Cost',
    'sup1.pay_status': 'Payment Status',
    'sup1.free_dl':    'Free Cancellation Deadline',
    'sup1.cancel_fee': 'Cancel Fee If Cancelled Today',
    'sup1.noshow_fee': 'No-Show Fee',
    'sup1.city_tax':   'Est. City / Tourism Tax',
    'sup1.final':      'Final Cost',
    'sup1.free':       'Free',
    'sup1.paid':       'Paid',
    'sup1.due_pfx':    'Due',
    'sup1.due_today':  'Due today',
    'sup1.overdue':    'Overdue',
    'sup1.already':    'Booking is already',
    'sup2.dates':      'Change Dates',
    'sup2.dates_sub':  'Request new check-in / check-out dates',
    'sup2.guest':      'Change Guest Details',
    'sup2.guest_sub':  'Update names, adults & children',
    'sup2.room':       'Change Room',
    'sup2.room_sub':   'Choose from available room types',
    'sup2.meal':       'Change Meal Plan',
    'sup2.meal_sub':   'Switch meal plan for your rooms',
    'sup2.upgrade':    'Upgrade Request',
    'sup2.upgrade_sub':'Request an upgrade if available',
    'sup2.extend':     'Extend Stay',
    'sup2.extend_sub': 'Add extra nights to this booking',
    'sup3.select_ph':  '— Select issue category —',
    'sup3.grp_arrival':'Arrival Issues',
    'sup3.grp_instay': 'In-Stay Issues',
    'sup3.no_res':     'No reservation found at hotel',
    'sup3.unpaid':     'Booking is unpaid — hotel requesting payment',
    'sup3.unavail':    'Room is unavailable at check-in',
    'sup3.extra_pay':  'Hotel asking for additional / unexpected payment',
    'sup3.wrong_room': 'Wrong room type assigned',
    'sup3.quality':    'Hotel quality does not match description',
    'sup3.clean':      'Room conditions / cleanliness complaint',
    'sup3.amenity':    'Amenity not available as promised',
    'sup3.other':      'Other in-stay issue',
    'sup3.ph_issue':   'Describe the issue…',
    'sup4.hotel':      'Hotel',
    'sup4.addr':       'Address',
    'sup4.phone':      'Phone',
    'sup4.email':      'Email',
    'sup4.ci_co':      'Check-in / Check-out',
    'sup4.checkin':    'Check-in',
    'sup4.checkout':   'Check-out',
    'sup4.los':        'Length of Stay',
    'sup4.reception':  'Reception',
    'sup4.early':      'Early Arrival',
    'sup4.late':       'Late Checkout',
    'sup4.guests':     'Guests',
    'sup4.room_meal':  'Room & Meal Plan',
    'sup4.meal':       'Meal',
    'sup4.bed':        'Bed',
    'sup4.extras':     'Extras Included',
    'sup4.special':    'Special Requests',
    'sup4.none':       'None',
    'sup4.none_incl':  'None included',
    'sup4.from':       'from',
    'sup4.by':         'by',
    'sup4.voucher_sent':'Voucher request sent',
    'sup4.hcn_sent':   'HCN request sent',
    'sup5.benoir':     '🚨 Benoir Support (24/7)',
    'sup5.hotel_emrg': 'Hotel Emergency Contact',
    'sup_form.checkin':  'New Check-in',
    'sup_form.checkout': 'New Check-out',
    'sup_form.current':  'Current',
    'sup_form.nights_arrow': '→ {n} nights',
    'sup_form.extra_nights': '+{n} additional night',
    'sup_form.extra_nights_pl': '+{n} additional nights',
    'sup_form.adults':   'Adults',
    'sup_form.children': 'Children',
    'sup_form.child_age':'Child {n} age',
    'sup_form.room_type':'New Room Type',
    'sup_form.room_info':'Room change is subject to availability. Our team will confirm within 2 hours.',
    'sup_form.meal_plan':'New Meal Plan',
    'sup_form.apply_to': 'Apply to',
    'sup_form.all_rooms':'All rooms',
    'sup_form.upgrade_to':'Preferred Upgrade Category',
    'sup_form.upgrade_info':'Upgrades are subject to availability and may incur additional charges. We will contact you with options.',
    'sup_form.new_co':   'New Check-out Date',
    'sup_form.cur_co':   'Current checkout',
    'sup_form.submit':   'Submit Request',
    'sup_form.cancel':   'Cancel',
    'sup_form.err_dates':'Please enter valid check-in and check-out dates.',
    'sup_form.err_ext':  'Please select a date after the current checkout.',
    'sup_form.ok_dates': 'Date change',
    'sup_form.ok_guest': 'Guest detail update',
    'sup_form.ok_room':  'Room change',
    'sup_form.ok_meal':  'Meal plan change',
    'sup_form.ok_upgrade':'Upgrade request',
    'sup_form.ok_extend':'Stay extension',
    'sup_form.submitted':' submitted. Our team will contact you within 2 business hours.',
    'sup_refund.loading':'Calculating refund from backend…',
    'sup_refund.bk_cost':'Booking Cost',
    'sup_refund.paid':   'Amount Paid',
    'sup_refund.fee':    'Cancellation Fee ({pct}%)',
    'sup_refund.net':    'Net Refund',
    'sup_refund.refunded':' to be refunded',
    'sup_refund.owed':   ' still owed',
    'sup_refund.even':   'No balance — break even',
    'sup_refund.not_paid':'Not paid',
    'sup_refund.free':   'Free',
    'sup_refund.recalc': 'Recalculate',
    'sup_cancel.confirm':'Confirm cancellation?',
    'sup_cancel.fee':    ' cancellation fee applies.',
    'sup_cancel.free':   'Free cancellation — no charge.',
    'sup_cancel.yes':    'Yes, Cancel',
    'sup_cancel.no':     'No, Keep',
    'sup_cancel.done':   '✓ Cancellation request submitted. You will receive a confirmation email shortly.',
    'sup_claim.no_cat':  'Please select an issue category.',
    'sup_claim.no_txt':  'Please describe the issue.',
    'sup_claim.ok_pfx':  '✓ Claim submitted — "',
    'sup_claim.ok_sfx':  '". Our team will respond within 1 hour.',
    'sup_meta.results':  '{n} booking',
    'sup_meta.results_pl':'{n} bookings',

    /* ── Booking modal ── */
    'modal.title':    'Complete Booking',
    'modal.summary':  'Booking Summary',
    'modal.guests':   'Guest Details',
    'modal.details':  'Booking Details',
    'modal.email':    'Email',
    'modal.phone':    'Phone Number',
    'modal.arrival':  'Expected Arrival Time',
    'modal.comments': 'Comments',
    'modal.ph_email': 'guest@example.com',
    'modal.ph_phone': '+971 50 000 0000',
    'modal.ph_arrival':'dd/mm/yyyy hh:mm',
    'modal.ph_comments':'Special requests, preferences…',
    'modal.confirm':  'Confirm Booking',
    'modal.sent_h':   'Booking Request Sent',
    'modal.sent_p':   "Your booking request has been submitted. You'll receive a confirmation by email shortly.",
    'modal.close':    'Close',

    /* ── Token & Session modal ── */
    'tmpl.title':     'Token & Session',
    'tmpl.api_token': 'API Token',
    'tmpl.session':   'Session ID',
    'tmpl.expires':   'Session Expires',
    'tmpl.note':      'Keep your API token confidential. Rotate it in Account settings if compromised.',
    'tmpl.copy':      'Copy',

    /* ── Cart panel ── */
    'cart.title': 'Cart',
    'cart.total': 'Total',
    'cart.book':  'Book Now',

    /* ── User menu ── */
    'menu.token':   'Token & Session',
    'menu.api_docs':'API Documentation',
    'menu.signout': 'Sign Out',
  },

  ru: {
    /* ── Nav ── */
    'nav.main':         'Главное',
    'nav.operations':   'Операции',
    'nav.tools':        'Инструменты',
    'nav.admin':        'Администрирование',
    'nav.home':         'Главная',
    'nav.bookings':     'Бронирования',
    'nav.support':      'Поддержка',
    'nav.finance':      'Финансы',
    'nav.hotel_dump':   'Поиск отелей',
    'nav.price_check':  'Проверка цен',
    'nav.users':        'Пользователи',
    'nav.account':      'Аккаунт',
    'brand.sub':        'Клиентский портал',

    /* ── Topbar ── */
    'page.home':        'Панель управления',
    'page.bookings':    'Бронирования',
    'page.support':     'Поддержка',
    'page.finance':     'Финансы',
    'page.hotel_dump':  'Поиск отелей',
    'page.price_check': 'Проверка цен',
    'page.users':       'Пользователи',
    'page.account':     'Аккаунт',

    /* ── Common ── */
    'btn.search':   'Поиск',
    'btn.reset':    'Сброс',
    'btn.csv':      'CSV',
    'btn.xlsx':     'XLSX',
    'adv.toggle':   'Расширенные фильтры',
    'lbl.status':   'Статус',
    'lbl.payment':  'Оплата',
    'no.results':   'Нет бронирований, соответствующих фильтрам.',

    /* ── Filter labels ── */
    'f.booking_id':  'Номер брони',
    'f.hotel':       'Название отеля',
    'f.guest':       'Главный гость',
    'f.bdate':       'Дата бронирования',
    'f.checkin':     'Дата заезда',
    'f.checkout':    'Дата выезда',
    'f.cost':        'Стоимость (USD)',
    'f.cost_min':    'Мин',
    'f.cost_max':    'Макс',
    'ph.booking_id': 'напр. BNR-001',
    'ph.hotel':      'Поиск отеля…',
    'ph.guest':      'Поиск гостя…',

    /* ── Table headers ── */
    'th.id':         'Номер брони',
    'th.bdate':      'Дата брони',
    'th.checkin':    'Заезд',
    'th.hotel':      'Отель',
    'th.guest':      'Гость',
    'th.cost':       'Стоимость',
    'th.status':     'Статус',
    'th.payment':    'Оплата',
    'th.name':       'Имя',
    'th.email':      'Email',
    'th.role':       'Роль',
    'th.sections':   'Доступ к разделам',
    'th.last_login': 'Последний вход',
    'th.actions':    'Действия',

    /* ── Status badges ── */
    'status.confirmed': 'Подтверждено',
    'status.cancelled': 'Отменено',
    'status.pending':   'В ожидании',
    'status.noshow':    'Неявка',

    /* ── Payment badges ── */
    'pay.paid':       'Оплачено',
    'pay.due_today':  'Срок сегодня',
    'pay.overdue':    'Просрочено',
    'pay.due_in':     'Через',
    'pay.days_abbr':  'д',

    /* ── Booking table toolbar ── */
    'toolbar.results':    '{n} бронь',
    'toolbar.results_pl': '{n} бронирований',

    /* ── Booking detail ── */
    'det.checkin':       'Заезд',
    'det.checkout':      'Выезд',
    'det.los':           'Длительность',
    'det.night':         'ночь',
    'det.nights':        'ночей',
    'det.final_cost':    'Итого',
    'det.meal':          'Питание',
    'det.bed':           'Тип кровати',
    'det.guests':        'Гости',
    'det.arrival':       'Время прибытия',
    'det.cancel_fee':    'Штраф за отмену сегодня',
    'det.notes':         'Примечания',
    'det.cancel_policy': 'Политика отмены',
    'det.free_until':    'Бесплатно до',
    'det.nonrefundable': 'Невозвратный',

    /* ── Auth overlay ── */
    'auth.tab_token':    'Токен администратора',
    'auth.tab_user':     'Вход пользователя',
    'auth.hint_token':   'Введите токен администратора этой организации.',
    'auth.hint_user':    'Войдите с корпоративными учётными данными.',
    'auth.lbl_token':    'Токен администратора',
    'auth.ph_token':     'BNR-••••••••••',
    'auth.lbl_email':    'Email',
    'auth.ph_email':     'вы@компания.com',
    'auth.lbl_password': 'Пароль',
    'auth.ph_password':  'Пароль',
    'auth.btn_admin':    'Войти как администратор',
    'auth.btn_user':     'Войти',
    'auth.err_token':    'Неверный токен администратора. Проверьте и попробуйте снова.',
    'auth.err_user':     'Неверный email или пароль.',
    'auth.footer':       'Benoir Travel · Защищённый клиентский портал',

    /* ── Finance ── */
    'fin.overdue':        'Оплата просрочена',
    'fin.due':            'К оплате',
    'fin.upcoming':       'Будущий платёж',
    'fin.inv_dl':         'Создать инвойс',
    'fin.deposit':        'Депозит',
    'fin.balance':        'Доступный баланс',
    'fin.leverage':       'Коэффициент Лимита',
    'fin.leverage_sub':   'Кредитный лимит / депозит',
    'fin.credit':         'Кредитный лимит',
    'fin.extra_dep':      'Счёт на доп. депозит',
    'fin.range_from':     'С',
    'fin.range_to':       'По',
    'fin.dl_btn':         'Скачать счёт',
    'fin.amount_usd':     'Сумма (USD)',
    'fin.gen_dep':        'Создать счёт на депозит',
    'fin.credit_lbl':     'использовано',
    'fin.avail':          'доступно',
    'fin.bookings':       'бронь',
    'fin.bookings_pl':    'бронирований',

    /* ── Support sections ── */
    'sup.f_id':         'Номер брони',
    'sup.f_guest':      'Главный гость',
    'sup.cancel':       'Отмена и возврат средств',
    'sup.modify':       'Запросы на изменение',
    'sup.arrival':      'Заезд / Проживание',
    'sup.info':         'Информация о брони',
    'sup.emergency':    'Экстренная связь',
    'sup.cancel_btn':   'Отменить бронь',
    'sup.refund_btn':   'Расчёт возврата',
    'sup.recalc_btn':   'Пересчитать',
    'sup.refund_lbl':   'Расчёт возврата на сервере…',
    'sup.submit_claim': 'Подать жалобу',
    'sup.voucher':      'Запросить ваучер',
    'sup.hcn':          'Запросить HCN',

    /* ── Users page ── */
    'usr.title':        'Управление пользователями',
    'usr.add':          'Добавить пользователя',
    'usr.invite_title': 'Пригласить нового пользователя',
    'usr.f_name':       'Полное имя',
    'usr.f_email':      'Email адрес',
    'usr.f_role':       'Роль',
    'usr.f_sections':   'Доступ к разделам',
    'usr.send':         'Отправить приглашение',
    'usr.cancel':       'Отмена',
    'usr.role_ro':      'Только просмотр',
    'usr.role_full':    'Бронирование и изменения',
    'usr.role_admin':   'Администратор',
    'usr.status_active':   'Активен',
    'usr.status_invited':  'Приглашён',
    'usr.status_inactive': 'Неактивен',
    'usr.restricted_h':  'Доступ ограничен',
    'usr.restricted_p':  'Управление пользователями доступно только администраторам.',
    'usr.never':         'Не входил',
    'usr.you':           'вы',
    'usr.ph_name':  'напр. Иван Иванов',
    'usr.ph_email': 'ivan@компания.com',

    /* ── Account page ── */
    'acct.org':         'Организация',
    'acct.profile':     'Мой профиль',
    'acct.access':      'Доступ и права',
    'acct.token_card':  'Токен администратора',
    'acct.key_name':    'Название',
    'acct.key_id':      'ID аккаунта',
    'acct.key_country': 'Страна',
    'acct.key_email':   'Email',
    'acct.key_phone':   'Телефон',
    'acct.key_role':    'Роль',
    'acct.key_since':   'Участник с',
    'acct.key_last':    'Последний вход',
    'acct.key_sections':'Разделы',
    'acct.key_modify':  'Может изменять',
    'acct.key_token':   'Токен',
    'acct.key_auth':    'Тип аутентификации',
    'acct.auth_type':   'API Токен',
    'acct.reveal':      'Показать',
    'acct.hide':        'Скрыть',
    'acct.copy':        'Копировать',
    'acct.copied':      'Скопировано!',
    'acct.token_note':  'Храните токен в секрете. Используйте его для входа как администратор и для аутентификации API-запросов от имени организации.',
    'acct.can_modify_yes': '✓ Да',
    'acct.can_modify_no':  '✗ Нет (только просмотр)',

    /* ── Read-only badge ── */
    'badge.readonly': 'Только просмотр',

    /* ── Date range picker ── */
    'range.7d':  'Последние 7 дней',
    'range.30d': 'Последние 30 дней',
    'range.90d': 'Последние 90 дней',
    'range.ytd': 'С начала года',

    /* ── Page sub-titles ── */
    'page.home_sub':        'Обзор за {range}',
    'page.bookings_sub':    'Поиск и управление бронированиями',
    'page.support_sub':     'Поддержка и обращения',
    'page.finance_sub':     'Счета, платежи и кредит',
    'page.hotel_dump_sub':  'Скачать инвентарь и найти ID отелей',
    'page.price_check_sub': 'Актуальные цены и бронирование',
    'page.users_sub':       'Участники команды и права доступа',
    'page.account_sub':     'Настройки и предпочтения',

    /* ── Home page ── */
    'home.overview':   'Обзор',
    'home.barometer':  'Барометр сегодня',
    'home.fin':        'Финансы',
    'home.sales':      'Продажи (USD)',
    'home.bookings':   'Бронирований сделано',
    'home.confirmed':  'Бронирований подтверждено',
    'home.cancels':    'Отменено',
    'home.avg_val':    'Средняя стоимость',
    'home.lead_time':  'Ср. время до заезда',
    'home.los':        'Длительность пребывания',
    'baro.checkins':   'Заезды',
    'baro.checkouts':  'Выезды',
    'baro.current':    'Текущие проживания',
    'baro.tomorrow':   'Заезды завтра',
    'baro.today':      'Сегодня',
    'baro.inhouse':    'Гости в отеле',
    'baro.arriving':   'Прибывают завтра',
    'home.fin.credit': 'Кредитный лимит',
    'home.fin.util':   'Использование кредита',
    'home.fin.due':    'К оплате',
    'home.fin.days':   'Дней до оплаты',
    'home.fin.next':   'Сумма следующего счёта',
    'home.fin.used':   'использовано',
    'home.fin.on_track': 'В срок',
    'home.fin.due_soon': 'Скоро оплата',
    'home.fin.urgent':   'Срочно',
    'home.chart':      'Продажи и бронирования',
    'home.days':       'дней',
    'home.nts':        'дн.',

    /* ── Hotel Dump page ── */
    'hd.title':          'База отелей',
    'hd.search_title':   'Поиск ID отеля',
    'hd.selected_title': 'Выбранные отели',
    'hd.latest_update':  'Последнее обновление',
    'hd.dl_btn':         'Скачать базу отелей',
    'hd.note':           'Формат JSONL·GZ · Полный инвентарь отелей с ID, названиями, локациями и метаданными',
    'hd.country':        'Страна',
    'hd.stars':          'Звёзды',
    'hd.name_kw':        'Название / Ключевое слово',
    'hd.exact':          '(точное совпадение)',
    'hd.any_country':    'Любая страна',
    'hd.any_stars':      'Любые звёзды',
    'hd.3stars':         '⭐⭐⭐ 3 звезды',
    'hd.4stars':         '⭐⭐⭐⭐ 4 звезды',
    'hd.5stars':         '⭐⭐⭐⭐⭐ 5 звёзд',
    'hd.ph_name':        'напр. Marriott, Hilton…',
    'hd.search_btn':     'Поиск',
    'hd.th_name':        'Название отеля',
    'hd.th_stars':       'Звёзды',
    'hd.th_country':     'Страна',
    'hd.th_hid':         'HID',
    'hd.no_results':     'Нет отелей по вашему запросу. Измените фильтры.',
    'hd.selected_hids':  'Выбранные HID',
    'hd.clear':          'Очистить таблицу',
    'hd.copy':           'Копировать',
    'hd.empty':          'Нет выбранных отелей. Используйте поиск выше.',
    'hd.filter_hint':    '⚠ Выберите хотя бы один фильтр перед поиском.',

    /* ── Price Check page ── */
    'pc.checkin':      'Заезд',
    'pc.checkout':     'Выезд',
    'pc.adults':       'Взрослые',
    'pc.children':     'Возраст детей',
    'pc.children_hint':'через запятую',
    'pc.sort':         'Сортировка по цене',
    'pc.sort_asc':     'По возрастанию ↑',
    'pc.sort_desc':    'По убыванию ↓',
    'pc.timeout':      'Тайм-аут (сек)',
    'pc.hotel_ids':    'ID отелей',
    'pc.hotel_hint':   'через запятую',
    'pc.ph_hotel':     'напр. H00001, H00002',
    'pc.loading':      'Поиск доступных вариантов…',
    'pc.no_results':   'Нет доступных вариантов для выбранных дат и параметров.',

    /* ── Payment filter checkbox ── */
    'pay.due_in_x':    'Через X дней',
    'pay.due_label':   'К оплате сегодня',
    'pay.over_label':  'Просрочен',

    /* ── Support panel content ── */
    'sup1.bk_cost':    'Стоимость брони',
    'sup1.pay_status': 'Статус оплаты',
    'sup1.free_dl':    'Срок бесплатной отмены',
    'sup1.cancel_fee': 'Штраф за отмену сегодня',
    'sup1.noshow_fee': 'Штраф за неявку',
    'sup1.city_tax':   'Ориент. городской / туристический налог',
    'sup1.final':      'Итоговая стоимость',
    'sup1.free':       'Бесплатно',
    'sup1.paid':       'Оплачено',
    'sup1.due_pfx':    'Срок',
    'sup1.due_today':  'Срок сегодня',
    'sup1.overdue':    'Просрочено',
    'sup1.already':    'Бронь уже',
    'sup2.dates':      'Изменить даты',
    'sup2.dates_sub':  'Запросить новые даты заезда/выезда',
    'sup2.guest':      'Изменить данные гостей',
    'sup2.guest_sub':  'Обновить имена, взрослых и детей',
    'sup2.room':       'Изменить номер',
    'sup2.room_sub':   'Выбрать из доступных типов номеров',
    'sup2.meal':       'Изменить питание',
    'sup2.meal_sub':   'Сменить план питания',
    'sup2.upgrade':    'Запрос на апгрейд',
    'sup2.upgrade_sub':'Запросить апгрейд при наличии',
    'sup2.extend':     'Продлить проживание',
    'sup2.extend_sub': 'Добавить ночи к брони',
    'sup3.select_ph':  '— Выберите категорию —',
    'sup3.grp_arrival':'Проблемы при заезде',
    'sup3.grp_instay': 'Проблемы при проживании',
    'sup3.no_res':     'Бронь не найдена в отеле',
    'sup3.unpaid':     'Бронь не оплачена — отель требует оплату',
    'sup3.unavail':    'Номер недоступен при заезде',
    'sup3.extra_pay':  'Отель требует дополнительную/неожиданную оплату',
    'sup3.wrong_room': 'Назначен неверный тип номера',
    'sup3.quality':    'Качество не соответствует описанию',
    'sup3.clean':      'Жалоба на состояние/чистоту номера',
    'sup3.amenity':    'Удобство недоступно по обещанию',
    'sup3.other':      'Другая проблема при проживании',
    'sup3.ph_issue':   'Опишите проблему…',
    'sup4.hotel':      'Отель',
    'sup4.addr':       'Адрес',
    'sup4.phone':      'Телефон',
    'sup4.email':      'Email',
    'sup4.ci_co':      'Заезд / Выезд',
    'sup4.checkin':    'Заезд',
    'sup4.checkout':   'Выезд',
    'sup4.los':        'Длительность',
    'sup4.reception':  'Ресепшн',
    'sup4.early':      'Ранний заезд',
    'sup4.late':       'Поздний выезд',
    'sup4.guests':     'Гости',
    'sup4.room_meal':  'Номер и питание',
    'sup4.meal':       'Питание',
    'sup4.bed':        'Кровать',
    'sup4.extras':     'Включённые услуги',
    'sup4.special':    'Особые пожелания',
    'sup4.none':       'Нет',
    'sup4.none_incl':  'Не включено',
    'sup4.from':       'с',
    'sup4.by':         'до',
    'sup4.voucher_sent':'Запрос на ваучер отправлен',
    'sup4.hcn_sent':   'Запрос HCN отправлен',
    'sup5.benoir':     '🚨 Поддержка Benoir (24/7)',
    'sup5.hotel_emrg': 'Экстренный контакт отеля',
    'sup_form.checkin':  'Новая дата заезда',
    'sup_form.checkout': 'Новая дата выезда',
    'sup_form.current':  'Текущее',
    'sup_form.nights_arrow': '→ {n} ночей',
    'sup_form.extra_nights':    '+{n} доп. ночь',
    'sup_form.extra_nights_pl': '+{n} доп. ночей',
    'sup_form.adults':   'Взрослые',
    'sup_form.children': 'Дети',
    'sup_form.child_age':'Возраст ребёнка {n}',
    'sup_form.room_type':'Новый тип номера',
    'sup_form.room_info':'Смена номера зависит от наличия. Наша команда подтвердит в течение 2 часов.',
    'sup_form.meal_plan':'Новое питание',
    'sup_form.apply_to': 'Применить к',
    'sup_form.all_rooms':'Все номера',
    'sup_form.upgrade_to':'Предпочтительная категория апгрейда',
    'sup_form.upgrade_info':'Апгрейд зависит от наличия и может повлечь доп. расходы. Мы свяжемся с вами с вариантами.',
    'sup_form.new_co':   'Новая дата выезда',
    'sup_form.cur_co':   'Текущий выезд',
    'sup_form.submit':   'Отправить запрос',
    'sup_form.cancel':   'Отмена',
    'sup_form.err_dates':'Введите корректные даты заезда и выезда.',
    'sup_form.err_ext':  'Выберите дату позже текущего выезда.',
    'sup_form.ok_dates': 'Изменение дат',
    'sup_form.ok_guest': 'Обновление данных гостей',
    'sup_form.ok_room':  'Смена номера',
    'sup_form.ok_meal':  'Смена питания',
    'sup_form.ok_upgrade':'Запрос на апгрейд',
    'sup_form.ok_extend':'Продление проживания',
    'sup_form.submitted':' отправлен. Наша команда свяжется с вами в течение 2 рабочих часов.',
    'sup_refund.loading':'Расчёт возврата на сервере…',
    'sup_refund.bk_cost':'Стоимость брони',
    'sup_refund.paid':   'Оплачено',
    'sup_refund.fee':    'Штраф за отмену ({pct}%)',
    'sup_refund.net':    'Сумма возврата',
    'sup_refund.refunded':' к возврату',
    'sup_refund.owed':   ' к доплате',
    'sup_refund.even':   'Нулевой баланс',
    'sup_refund.not_paid':'Не оплачено',
    'sup_refund.free':   'Бесплатно',
    'sup_refund.recalc': 'Пересчитать',
    'sup_cancel.confirm':'Подтвердить отмену?',
    'sup_cancel.fee':    ' штраф применяется.',
    'sup_cancel.free':   'Бесплатная отмена — без штрафа.',
    'sup_cancel.yes':    'Да, отменить',
    'sup_cancel.no':     'Нет, оставить',
    'sup_cancel.done':   '✓ Запрос на отмену отправлен. Подтверждение придёт на email.',
    'sup_claim.no_cat':  'Выберите категорию проблемы.',
    'sup_claim.no_txt':  'Опишите проблему.',
    'sup_claim.ok_pfx':  '✓ Жалоба подана — «',
    'sup_claim.ok_sfx':  '». Наша команда ответит в течение 1 часа.',
    'sup_meta.results':  '{n} бронь',
    'sup_meta.results_pl':'{n} бронирований',

    /* ── Booking modal ── */
    'modal.title':    'Завершение бронирования',
    'modal.summary':  'Сводка брони',
    'modal.guests':   'Данные гостей',
    'modal.details':  'Детали бронирования',
    'modal.email':    'Email',
    'modal.phone':    'Номер телефона',
    'modal.arrival':  'Ожидаемое время прибытия',
    'modal.comments': 'Комментарии',
    'modal.ph_email': 'гость@пример.com',
    'modal.ph_phone': '+971 50 000 0000',
    'modal.ph_arrival':'дд/мм/гггг чч:мм',
    'modal.ph_comments':'Особые пожелания…',
    'modal.confirm':  'Подтвердить бронирование',
    'modal.sent_h':   'Запрос на бронирование отправлен',
    'modal.sent_p':   'Ваш запрос принят. Подтверждение придёт на email в ближайшее время.',
    'modal.close':    'Закрыть',

    /* ── Token & Session modal ── */
    'tmpl.title':     'Токен и сессия',
    'tmpl.api_token': 'API Токен',
    'tmpl.session':   'ID сессии',
    'tmpl.expires':   'Срок сессии',
    'tmpl.note':      'Храните токен в секрете. Смените его в настройках аккаунта при компрометации.',
    'tmpl.copy':      'Копировать',

    /* ── Cart panel ── */
    'cart.title': 'Корзина',
    'cart.total': 'Итого',
    'cart.book':  'Забронировать',

    /* ── User menu ── */
    'menu.token':   'Токен и сессия',
    'menu.api_docs':'Документация API',
    'menu.signout': 'Выйти',
  },
};

/* ── Runtime state ── */
let LANG = localStorage.getItem('benoir_lang') || 'en';

function t(key) {
  return (TRANSLATIONS[LANG] || TRANSLATIONS.en)[key] ?? (TRANSLATIONS.en[key] ?? key);
}

function tPlural(n, singular, plural) {
  return n === 1 ? singular : plural;
}

/* ── Apply all static translations ── */
function applyTranslations() {
  /* Topbar title for active page */
  const activePage = document.querySelector('.page.active');
  if (activePage && typeof updateTopbarTitle === 'function') {
    updateTopbarTitle(activePage.id.replace('page-', ''));
  }

  /* Nav section labels */
  const navSections = document.querySelectorAll('.nav-section-label');
  const sectionKeys = ['nav.main', 'nav.operations', 'nav.tools', 'nav.admin'];
  navSections.forEach((el, i) => { if (sectionKeys[i]) el.textContent = t(sectionKeys[i]); });

  /* Nav item spans */
  [['home','nav.home'],['bookings','nav.bookings'],['support','nav.support'],
   ['finance','nav.finance'],['hotel-dump','nav.hotel_dump'],['price-check','nav.price_check'],
   ['users','nav.users'],['account','nav.account']]
    .forEach(([page, key]) => {
      const sp = document.querySelector(`.nav-item[data-page="${page}"] span`);
      if (sp) sp.textContent = t(key);
    });

  /* Brand sub */
  const brandSub = document.querySelector('.brand-sub');
  if (brandSub) brandSub.textContent = t('brand.sub');

  /* Auth overlay */
  const authTabs = document.querySelectorAll('.auth-tab');
  if (authTabs[0]) authTabs[0].textContent = t('auth.tab_token');
  if (authTabs[1]) authTabs[1].textContent = t('auth.tab_user');
  const hintToken = document.querySelector('#auth-panel-token .auth-hint');
  const hintUser  = document.querySelector('#auth-panel-user .auth-hint');
  if (hintToken) hintToken.textContent = t('auth.hint_token');
  if (hintUser)  hintUser.textContent  = t('auth.hint_user');
  const tokenLabels = document.querySelectorAll('#auth-panel-token .auth-label');
  if (tokenLabels[0]) tokenLabels[0].textContent = t('auth.lbl_token');
  const userLabels = document.querySelectorAll('#auth-panel-user .auth-label');
  if (userLabels[0]) userLabels[0].textContent = t('auth.lbl_email');
  if (userLabels[1]) userLabels[1].textContent = t('auth.lbl_password');
  const tokenInput = document.getElementById('auth-token-input');
  const emailInput = document.getElementById('auth-email');
  const passInput  = document.getElementById('auth-password');
  if (tokenInput) tokenInput.placeholder = t('auth.ph_token');
  if (emailInput) emailInput.placeholder = t('auth.ph_email');
  if (passInput)  passInput.placeholder  = t('auth.ph_password');
  const btnAdmin = document.getElementById('auth-token-submit');
  const btnUser  = document.getElementById('auth-user-submit');
  if (btnAdmin) btnAdmin.textContent = t('auth.btn_admin');
  if (btnUser)  btnUser.textContent  = t('auth.btn_user');
  const authFooter = document.querySelector('.auth-footer');
  if (authFooter) authFooter.textContent = t('auth.footer');

  /* User menu */
  const menuToken = document.getElementById('menu-token');
  if (menuToken) { const svg = menuToken.querySelector('svg'); menuToken.textContent = t('menu.token'); if (svg) menuToken.prepend(svg); }
  const menuSignout = document.getElementById('menu-signout');
  if (menuSignout) { const svg = menuSignout.querySelector('svg'); menuSignout.textContent = t('menu.signout'); if (svg) menuSignout.prepend(svg); }

  /* Date range dropdown */
  document.querySelectorAll('.date-option').forEach(opt => {
    const key = { '7d':'range.7d','30d':'range.30d','90d':'range.90d','ytd':'range.ytd' }[opt.dataset.range];
    if (key) opt.textContent = t(key);
  });
  const activeRange = document.querySelector('.date-option.active');
  const dateLabel   = document.querySelector('.date-label');
  if (activeRange && dateLabel) {
    const key = { '7d':'range.7d','30d':'range.30d','90d':'range.90d','ytd':'range.ytd' }[activeRange.dataset.range];
    if (key) dateLabel.textContent = t(key);
  }

  /* Home page section titles */
  const secTitles = document.querySelectorAll('#page-home .section-title');
  const secKeys   = ['home.overview', 'home.barometer', 'home.fin'];
  secTitles.forEach((el, i) => { if (secKeys[i]) el.textContent = t(secKeys[i]); });
  /* Home KPI labels */
  [['kpi-sales','home.sales'],['kpi-bookings','home.bookings'],['kpi-confirmed','home.confirmed'],
   ['kpi-cancellations','home.cancels'],['kpi-avgvalue','home.avg_val'],
   ['kpi-leadtime','home.lead_time'],['kpi-los','home.los']]
    .forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const lbl = el.querySelector('.kpi-label');
      if (lbl) { const svg = lbl.querySelector('svg'); lbl.textContent = t(key); if (svg) lbl.prepend(svg); }
    });
  /* Home barometer */
  const baroCards = document.querySelectorAll('.baro-card');
  const baroData = [
    ['baro.checkins',  'baro.today'],
    ['baro.checkouts', 'baro.today'],
    ['baro.current',   'baro.inhouse'],
    ['baro.tomorrow',  'baro.arriving'],
  ];
  baroCards.forEach((card, i) => {
    if (!baroData[i]) return;
    const lbl = card.querySelector('.baro-label');
    const sub = card.querySelector('.baro-sub');
    if (lbl) lbl.textContent = t(baroData[i][0]);
    if (sub) sub.textContent = t(baroData[i][1]);
  });
  /* Home finance mini-cards */
  const homeFin = document.querySelectorAll('#page-home .fin-card');
  [['home.fin.credit',null,'home.fin.used'],
   ['home.fin.util',null,null],
   ['home.fin.due','home.fin.next',null],
   ['home.fin.days',null,null]]
    .forEach(([lblKey, subKey], i) => {
      const card = homeFin[i];
      if (!card) return;
      const lbl = card.querySelector('.fin-label');
      const sub = card.querySelector('.fin-sub');
      if (lbl && lblKey) lbl.textContent = t(lblKey);
      if (sub && subKey) sub.textContent = t(subKey);
    });
  /* Home chart title */
  const chartTitle = document.querySelector('.chart-card .card-title');
  if (chartTitle) {
    const rangeSpan = chartTitle.querySelector('span');
    chartTitle.textContent = t('home.chart');
    if (rangeSpan) chartTitle.appendChild(rangeSpan);
  }

  /* Hotel Dump page */
  const hdSecTitles = document.querySelectorAll('#page-hotel-dump .hd-section-title');
  if (hdSecTitles[0]) hdSecTitles[0].textContent = t('hd.title');
  if (hdSecTitles[1]) hdSecTitles[1].textContent = t('hd.search_title');
  if (hdSecTitles[2]) {
    const clearBtn = hdSecTitles[2].querySelector('.hd-clear-btn');
    hdSecTitles[2].textContent = t('hd.selected_title');
    if (clearBtn) { const svg = clearBtn.querySelector('svg'); clearBtn.textContent = t('hd.clear'); if (svg) clearBtn.prepend(svg); hdSecTitles[2].appendChild(clearBtn); }
  }
  const hdLatestLbl = document.querySelector('.hd-meta-label');
  if (hdLatestLbl) hdLatestLbl.textContent = t('hd.latest_update');
  const hdDlBtn = document.querySelector('.hd-download-btn[href*="yandex"]');
  if (hdDlBtn) { const svg = hdDlBtn.querySelector('svg'); hdDlBtn.textContent = t('hd.dl_btn'); if (svg) hdDlBtn.prepend(svg); }
  const hdNote = document.querySelector('.hd-dump-note');
  if (hdNote) hdNote.textContent = t('hd.note');
  const hdFilterLabels = document.querySelectorAll('#page-hotel-dump .hd-filter-label');
  const hdLabelKeys = ['hd.country','hd.stars','hd.name_kw'];
  hdFilterLabels.forEach((el, i) => {
    if (!hdLabelKeys[i]) return;
    const hint = el.querySelector('span');
    el.textContent = t(hdLabelKeys[i]);
    if (hint && i === 2) { hint.textContent = ' ' + t('hd.exact'); el.appendChild(hint); }
  });
  const hdCountrySel = document.getElementById('filter-country');
  if (hdCountrySel?.options[0]) hdCountrySel.options[0].textContent = t('hd.any_country');
  const hdStarsSel = document.getElementById('filter-stars');
  if (hdStarsSel) {
    if (hdStarsSel.options[0]) hdStarsSel.options[0].textContent = t('hd.any_stars');
    if (hdStarsSel.options[1]) hdStarsSel.options[1].textContent = t('hd.3stars');
    if (hdStarsSel.options[2]) hdStarsSel.options[2].textContent = t('hd.4stars');
    if (hdStarsSel.options[3]) hdStarsSel.options[3].textContent = t('hd.5stars');
  }
  _setText('#filter-name', 'placeholder', 'hd.ph_name');
  const hdSearchBtn = document.getElementById('hd-search-btn');
  if (hdSearchBtn) { const svg = hdSearchBtn.querySelector('svg'); hdSearchBtn.textContent = t('hd.search_btn'); if (svg) hdSearchBtn.prepend(svg); }
  _setTableHeaders('#hd-results-table thead tr', ['','hd.th_name','hd.th_stars','hd.th_country','hd.th_hid']);
  _setTableHeaders('#selected-table thead tr',   ['','hd.th_name','hd.th_stars','hd.th_country','hd.th_hid']);
  const hdNoRes = document.getElementById('hd-no-results');
  if (hdNoRes) hdNoRes.textContent = t('hd.no_results');
  const hdHidLbl = document.querySelector('.hd-filter-label[style]');
  if (hdHidLbl && hdHidLbl.textContent.includes('HID')) hdHidLbl.textContent = t('hd.selected_hids');
  const copyHidsBtn = document.getElementById('copy-hids-btn');
  if (copyHidsBtn) copyHidsBtn.textContent = t('hd.copy');
  const hdFilterHint = document.getElementById('hd-filter-hint');
  if (hdFilterHint) hdFilterHint.textContent = t('hd.filter_hint');
  const selEmpty = document.querySelector('#selected-empty-row td');
  if (selEmpty) selEmpty.textContent = t('hd.empty');

  /* Price Check page */
  const pcLabels = document.querySelectorAll('#page-price-check .pc-label');
  const pcLabelKeys = ['pc.checkin','pc.checkout','pc.adults','pc.children','pc.sort','pc.timeout','pc.hotel_ids'];
  pcLabels.forEach((el, i) => {
    if (!pcLabelKeys[i]) return;
    const hint = el.querySelector('.pc-hint');
    el.textContent = t(pcLabelKeys[i]);
    if (hint) {
      const hintKey = i === 3 ? 'pc.children_hint' : i === 6 ? 'pc.hotel_hint' : null;
      if (hintKey) { hint.textContent = t(hintKey); el.appendChild(hint); }
    }
  });
  const pcSort = document.getElementById('pc-sort');
  if (pcSort) {
    if (pcSort.options[0]) pcSort.options[0].textContent = t('pc.sort_asc');
    if (pcSort.options[1]) pcSort.options[1].textContent = t('pc.sort_desc');
  }
  _setText('#pc-hotel-ids', 'placeholder', 'pc.ph_hotel');
  const pcSearchBtn = document.getElementById('pc-search-btn');
  if (pcSearchBtn) { const svg = pcSearchBtn.querySelector('svg'); pcSearchBtn.textContent = t('btn.search'); if (svg) pcSearchBtn.prepend(svg); }
  const pcLoading = document.querySelector('#pc-loading span');
  if (pcLoading) pcLoading.textContent = t('pc.loading');
  const pcNoRes = document.getElementById('pc-no-results');
  if (pcNoRes) pcNoRes.textContent = t('pc.no_results');

  /* Bookings filter card */
  _setText('#bk-f-id',    'placeholder', 'ph.booking_id');
  _setText('#bk-f-hotel', 'placeholder', 'ph.hotel');
  _setText('#bk-f-guest', 'placeholder', 'ph.guest');
  _setAllPcLabels('#page-bookings .bk-filter-card',
    ['f.booking_id', 'f.hotel', 'f.guest'],
    ['f.bdate', 'f.checkin', 'f.checkout', 'f.cost']);
  _setText('#bk-search-btn', 'text', 'btn.search');
  _setText('#bk-reset-btn',  'text', 'btn.reset');
  _setText('#bk-adv-toggle', 'adv', 'adv.toggle');
  /* Bookings filter check-group titles */
  const bkCheckGroups = document.querySelectorAll('#page-bookings .bk-check-group .pc-label');
  if (bkCheckGroups[0]) bkCheckGroups[0].textContent = t('lbl.status');
  if (bkCheckGroups[1]) bkCheckGroups[1].textContent = t('lbl.payment');
  _setCheckLabels('#page-bookings .bk-f-status',
    ['status.confirmed','status.cancelled','status.pending','status.noshow']);
  _setCheckLabels('#page-bookings .bk-f-pay',
    ['pay.due_in_x','pay.due_label','pay.over_label','pay.paid']);
  _setText('#bk-dl-csv',  'dl', 'btn.csv');
  _setText('#bk-dl-xlsx', 'dl', 'btn.xlsx');
  _setTableHeaders('#bk-table thead tr',
    ['th.id','th.bdate','th.checkin','th.hotel','th.guest','th.cost','th.status','th.payment','']);
  const bkNoRes = document.getElementById('bk-no-results');
  if (bkNoRes) bkNoRes.textContent = t('no.results');

  /* Support filter */
  _setText('#sup-f-id',    'placeholder', 'ph.booking_id');
  _setText('#sup-f-hotel', 'placeholder', 'ph.hotel');
  _setText('#sup-f-guest', 'placeholder', 'ph.guest');
  _setAllPcLabels('#page-support .bk-filter-card',
    ['f.booking_id', 'f.hotel', 'f.guest'],
    ['f.bdate', 'f.checkin', 'f.checkout']);
  _setText('#sup-search-btn', 'text', 'btn.search');
  _setText('#sup-reset-btn',  'text', 'btn.reset');
  _setText('#sup-adv-toggle', 'adv', 'adv.toggle');
  /* Support filter check-group title */
  const supCheckGroup = document.querySelector('#page-support .bk-check-group .pc-label');
  if (supCheckGroup) supCheckGroup.textContent = t('lbl.status');
  _setCheckLabels('#page-support .sup-f-status',
    ['status.confirmed','status.cancelled','status.pending','status.noshow']);
  _setTableHeaders('#sup-table thead tr',
    ['th.id','th.bdate','th.checkin','th.hotel','th.guest','th.status','']);
  const supNoRes = document.getElementById('sup-no-results');
  if (supNoRes) supNoRes.textContent = t('no.results');

  /* Finance summary cards */
  _setFinCardLabel(0, 'fin.overdue');
  _setFinCardLabel(1, 'fin.due');
  _setFinCardLabel(2, 'fin.upcoming');
  _setFinCardLabel(3, 'fin.inv_dl');
  _setFinCardLabel(4, 'fin.deposit');
  _setFinCardLabel(5, 'fin.leverage');
  _setFinCardLabel(6, 'fin.credit');
  _setFinCardLabel(7, 'fin.extra_dep');
  const finPageCards = document.querySelectorAll('#page-finance .fin-card');
  const depSub = finPageCards[4]?.querySelector('.fin-card-sub');
  if (depSub) depSub.textContent = t('fin.balance');
  const levSub = finPageCards[5]?.querySelector('.fin-card-sub');
  if (levSub) levSub.textContent = t('fin.leverage_sub');
  const finRangeLabels = document.querySelectorAll('.fin-range-lbl');
  if (finRangeLabels[0]) finRangeLabels[0].textContent = t('fin.range_from');
  if (finRangeLabels[1]) finRangeLabels[1].textContent = t('fin.range_to');
  if (finRangeLabels[2]) finRangeLabels[2].textContent = t('fin.amount_usd');
  const finInvBtn = document.getElementById('fin-dl-invoice');
  const finDepBtn = document.getElementById('fin-dl-extra-deposit');
  if (finInvBtn) { const svg = finInvBtn.querySelector('svg'); finInvBtn.textContent = t('fin.dl_btn'); if (svg) finInvBtn.prepend(svg); }
  if (finDepBtn) { const svg = finDepBtn.querySelector('svg'); finDepBtn.textContent = t('fin.gen_dep'); if (svg) finDepBtn.prepend(svg); }

  /* Finance filter */
  _setText('#fin-f-id',    'placeholder', 'ph.booking_id');
  _setText('#fin-f-guest', 'placeholder', 'ph.guest');
  _setAllPcLabels('#page-finance .bk-filter-card',
    ['f.booking_id', 'f.guest'],
    ['f.bdate', 'f.checkin', 'f.cost']);
  _setText('#fin-search-btn', 'text', 'btn.search');
  _setText('#fin-reset-btn',  'text', 'btn.reset');
  _setText('#fin-adv-toggle', 'adv', 'adv.toggle');
  /* Finance filter check-group titles */
  const finCheckGroups = document.querySelectorAll('#page-finance .bk-check-group .pc-label');
  if (finCheckGroups[0]) finCheckGroups[0].textContent = t('lbl.status');
  if (finCheckGroups[1]) finCheckGroups[1].textContent = t('lbl.payment');
  _setCheckLabels('#page-finance .fin-f-status',
    ['status.confirmed','status.cancelled','status.pending','status.noshow']);
  _setCheckLabels('#page-finance .fin-f-pay',
    ['pay.due_in_x','pay.due_label','pay.over_label','pay.paid']);
  _setText('#fin-dl-csv',  'dl', 'btn.csv');
  _setText('#fin-dl-xlsx', 'dl', 'btn.xlsx');
  _setTableHeaders('#fin-table thead tr',
    ['th.id','th.bdate','th.checkin','th.hotel','th.guest','th.cost','th.status','th.payment','']);
  const finNoRes = document.getElementById('fin-no-results');
  if (finNoRes) finNoRes.textContent = t('no.results');

  /* Users page */
  const usrTitle = document.querySelector('.users-page-title');
  if (usrTitle) usrTitle.textContent = t('usr.title');
  const addBtn = document.getElementById('users-add-btn');
  if (addBtn && !addBtn.textContent.includes('✕')) {
    addBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ${t('usr.add')}`;
  }
  const invTitle = document.querySelector('.users-add-title');
  if (invTitle) invTitle.textContent = t('usr.invite_title');
  _setLabelById('users-add-name',  'usr.f_name');
  _setLabelById('users-add-email', 'usr.f_email');
  _setLabelById('users-add-role',  'usr.f_role');
  const secLabel = document.querySelector('#users-section-access-row .sup-form-label');
  if (secLabel) secLabel.textContent = t('usr.f_sections');
  const usrSend   = document.getElementById('users-add-submit');
  const usrCancel = document.getElementById('users-add-cancel');
  if (usrSend)   usrSend.textContent   = t('usr.send');
  if (usrCancel) usrCancel.textContent = t('usr.cancel');
  const roleOpts = document.querySelectorAll('#users-add-role option');
  if (roleOpts[0]) roleOpts[0].textContent = t('usr.role_ro');
  if (roleOpts[1]) roleOpts[1].textContent = t('usr.role_full');
  _setTableHeaders('#page-users .users-table thead tr',
    ['th.name','th.email','th.role','th.sections','th.status','th.last_login','th.actions']);
  const restH = document.querySelector('#users-restricted h2');
  const restP = document.querySelector('#users-restricted p');
  if (restH) restH.textContent = t('usr.restricted_h');
  if (restP) restP.textContent = t('usr.restricted_p');

  /* Account page card headers */
  const acctHdrs = document.querySelectorAll('.acct-card-hdr');
  const acctHdrKeys = ['acct.org', 'acct.profile', 'acct.access', 'acct.token_card'];
  acctHdrs.forEach((el, i) => {
    if (!acctHdrKeys[i]) return;
    const svg = el.querySelector('svg');
    el.textContent = t(acctHdrKeys[i]);
    if (svg) el.prepend(svg);
  });
  _setAcctKey('acct-org-name',    'acct.key_name');
  _setAcctKey('acct-org-id',      'acct.key_id');
  _setAcctKey('acct-org-country', 'acct.key_country');
  _setAcctKey('acct-org-email',   'acct.key_email');
  _setAcctKey('acct-org-phone',   'acct.key_phone');
  _setAcctKey('acct-user-name',   'acct.key_name');
  _setAcctKey('acct-user-email',  'acct.key_email');
  _setAcctKey('acct-user-role-wrap', 'acct.key_role');
  _setAcctKey('acct-user-since',  'acct.key_since');
  _setAcctKey('acct-user-last',   'acct.key_last');
  _setAcctKey('acct-sections-list', 'acct.key_sections');
  _setAcctKey('acct-can-modify',  'acct.key_modify');
  _setAcctKey('acct-token-display', 'acct.key_token');
  const acctAuthRow = document.querySelector('#acct-token-card .acct-row:last-child .acct-val');
  if (acctAuthRow && !acctAuthRow.id) acctAuthRow.textContent = t('acct.auth_type');
  const acctAuthKey = document.querySelector('#acct-token-card .acct-row:last-child .acct-key');
  if (acctAuthKey) acctAuthKey.textContent = t('acct.key_auth');
  const revealBtn = document.getElementById('acct-token-reveal');
  const copyBtn   = document.getElementById('acct-token-copy');
  if (revealBtn && revealBtn.dataset.revealed !== 'true') revealBtn.textContent = t('acct.reveal');
  if (copyBtn) copyBtn.textContent = t('acct.copy');
  const tokenNote = document.querySelector('#acct-token-card > div[style]');
  if (tokenNote) tokenNote.textContent = t('acct.token_note');

  /* Booking modal */
  const modalTitle = document.querySelector('#booking-modal .modal-title');
  if (modalTitle) modalTitle.textContent = t('modal.title');
  const bkSecTitles = document.querySelectorAll('#booking-modal .bk-section-title');
  if (bkSecTitles[0]) bkSecTitles[0].textContent = t('modal.summary');
  if (bkSecTitles[1]) bkSecTitles[1].textContent = t('modal.guests');
  if (bkSecTitles[2]) bkSecTitles[2].textContent = t('modal.details');
  const bkModalLabels = document.querySelectorAll('#booking-modal .pc-label');
  const bkModalLabelKeys = ['modal.email','modal.phone','modal.arrival','modal.comments'];
  bkModalLabels.forEach((el, i) => { if (bkModalLabelKeys[i]) el.textContent = t(bkModalLabelKeys[i]); });
  _setText('#bk-email',    'placeholder', 'modal.ph_email');
  _setText('#bk-phone',    'placeholder', 'modal.ph_phone');
  _setText('#bk-arrival',  'placeholder', 'modal.ph_arrival');
  _setText('#bk-comments', 'placeholder', 'modal.ph_comments');
  const bkConfirmBtn = document.getElementById('bk-confirm-btn');
  if (bkConfirmBtn) { const svg = bkConfirmBtn.querySelector('svg'); bkConfirmBtn.textContent = t('modal.confirm'); if (svg) bkConfirmBtn.prepend(svg); }
  const bkSentH = document.querySelector('#booking-confirm-modal h2');
  const bkSentP = document.querySelector('#booking-confirm-modal p');
  const bkClose = document.getElementById('bk-confirm-close');
  if (bkSentH) bkSentH.textContent = t('modal.sent_h');
  if (bkSentP) bkSentP.textContent = t('modal.sent_p');
  if (bkClose) { const svg = bkClose.querySelector('svg'); bkClose.textContent = t('modal.close'); if (svg) bkClose.prepend(svg); }

  /* Token & Session modal */
  const tmplTitle = document.querySelector('#token-modal .modal-title');
  if (tmplTitle) tmplTitle.textContent = t('tmpl.title');
  const tmplLabels = document.querySelectorAll('#token-modal .modal-label');
  if (tmplLabels[0]) tmplLabels[0].textContent = t('tmpl.api_token');
  if (tmplLabels[1]) tmplLabels[1].textContent = t('tmpl.session');
  if (tmplLabels[2]) tmplLabels[2].textContent = t('tmpl.expires');
  const tmplNote = document.querySelector('#token-modal .modal-info');
  if (tmplNote) tmplNote.textContent = t('tmpl.note');
  document.querySelectorAll('#token-modal .copy-btn').forEach(btn => btn.textContent = t('tmpl.copy'));

  /* Cart panel */
  const cartTitle = document.querySelector('.cart-panel-title');
  if (cartTitle) {
    const badge = cartTitle.querySelector('.cart-badge');
    const svg   = cartTitle.querySelector('svg');
    cartTitle.textContent = t('cart.title');
    if (svg)   cartTitle.prepend(svg);
    if (badge) cartTitle.appendChild(badge);
  }
  const cartTotalRow = document.querySelector('.cart-total-row span:first-child');
  if (cartTotalRow) cartTotalRow.textContent = t('cart.total');
  const cartBookBtn = document.getElementById('cart-book-btn');
  if (cartBookBtn) { const svg = cartBookBtn.querySelector('svg'); cartBookBtn.textContent = t('cart.book'); if (svg) cartBookBtn.prepend(svg); }

  /* Read-only badge */
  const roBadge = document.getElementById('readonly-badge');
  if (roBadge) roBadge.textContent = t('badge.readonly');
}

/* ── Internal helpers ── */
function _setText(sel, mode, key) {
  const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if (!el) return;
  if (mode === 'placeholder') { el.placeholder = t(key); }
  else if (mode === 'text')   { el.textContent = t(key); }
  else if (mode === 'dl')     {
    // keep the SVG, replace or create trailing text node
    const textNodes = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
    if (textNodes.length) {
      textNodes.forEach(n => n.textContent = ' ' + t(key));
    } else {
      el.appendChild(document.createTextNode(' ' + t(key)));
    }
  } else if (mode === 'adv')  {
    // advanced filter toggle — keep the SVGs
    const svgs = el.querySelectorAll('svg');
    el.textContent = t(key);
    svgs.forEach(s => el.appendChild(s));
  }
}

function _setTableHeaders(sel, keys) {
  const row = document.querySelector(sel);
  if (!row) return;
  const ths = row.querySelectorAll('th');
  keys.forEach((key, i) => { if (ths[i] && key) ths[i].textContent = t(key); });
}

function _setAllPcLabels(containerSel, topKeys, advKeys) {
  const container = document.querySelector(containerSel);
  if (!container) return;
  const topRow  = container.querySelectorAll('.bk-filter-row:first-child .pc-label');
  const advRows = container.querySelectorAll('.bk-adv-panel .pc-label');
  topKeys.forEach((key, i) => { if (topRow[i]) topRow[i].textContent = t(key); });
  advKeys.forEach((key, i) => { if (advRows[i]) advRows[i].textContent = t(key); });
}

function _setCheckLabels(sel, keys) {
  const checkboxes = document.querySelectorAll(sel);
  checkboxes.forEach((cb, i) => {
    if (!keys[i]) return;
    const label = cb.closest('label');
    if (!label) return;
    // preserve checkbox input, replace text node
    const textNode = [...label.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (textNode) textNode.textContent = ' ' + t(keys[i]);
  });
}

function _setFinCardLabel(idx, key) {
  const cards = document.querySelectorAll('#page-finance .fin-card');
  const card  = cards[idx];
  if (!card) return;
  const lbl = card.querySelector('.fin-card-label');
  if (!lbl) return;
  const svg = lbl.querySelector('svg');
  lbl.textContent = t(key);
  if (svg) lbl.prepend(svg);
}

function _setLabelById(inputId, key) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const label = input.closest('.sup-form-field')?.querySelector('.sup-form-label');
  if (label) label.textContent = t(key);
}

function _setAcctKey(valId, key) {
  const valEl = document.getElementById(valId);
  if (!valEl) return;
  const row = valEl.closest('.acct-row');
  if (!row) return;
  const keyEl = row.querySelector('.acct-key');
  if (keyEl) keyEl.textContent = t(key);
}

/* ── Re-render active page tables/badges ── */
function rerenderActive() {
  const active = document.querySelector('.page.active');
  if (!active) return;
  const id = active.id;
  if (id === 'page-home' && typeof updateDashboard === 'function') updateDashboard();
  if (id === 'page-bookings' && typeof renderBookings === 'function') {
    renderBookings(typeof currentFilteredBookings !== 'undefined' ? currentFilteredBookings : BOOKINGS);
  }
  if (id === 'page-support' && typeof renderSupport === 'function') {
    renderSupport(typeof supCurrentList !== 'undefined' ? supCurrentList : BOOKINGS);
  }
  if (id === 'page-finance' && typeof renderFinSummary === 'function') {
    renderFinSummary();
    if (typeof renderFinance === 'function') renderFinance(typeof finCurrentList !== 'undefined' ? finCurrentList : BOOKINGS);
  }
  if (id === 'page-users'   && typeof renderUsersPage   === 'function') renderUsersPage();
  if (id === 'page-account' && typeof renderAccountPage === 'function') renderAccountPage();
}

/* ── Language switch ── */
function setLang(lang) {
  LANG = lang;
  localStorage.setItem('benoir_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations();
  rerenderActive();
}

/* ── Wire up language buttons once DOM is ready ── */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
  btn.classList.toggle('active', btn.dataset.lang === LANG);
});

/* ── Initial application ── */
applyTranslations();
