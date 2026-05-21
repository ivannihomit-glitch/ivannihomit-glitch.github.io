// ==================== ДАННЫЕ МОТОЦИКЛОВ ====================
const bikes = [
  { id: 1, name: "Thunder 900", desc: "Круизёр 900 см³, воздушное охлаждение, идеален для трасс и шоссе", price: "1 249 000 ₽", img: "images/bike1.jpg" },
  { id: 2, name: "Storm XR", desc: "Спорт-туризм, 110 л.с., ABS, контроль тяги, электронная подвеска", price: "1 890 000 ₽", img: "images/bike2.jpg" },
  { id: 3, name: "Urban 400", desc: "Нейкед для города, лёгкий и манёвренный, 400 куб.см, расход 3.5л", price: "699 000 ₽", img: "images/bike3.jpg" },
  { id: 4, name: "Adventure Pro", desc: "Эндуро-туринг, 21 дюйм, подготовка к бездорожью, ABS offroad", price: "1 590 000 ₽", img: "images/bike4.jpg" }
];

// Функция всплывающего уведомления
function showToast(message) {
  const toast = document.getElementById('toastMsg');
  toast.textContent = message || '✅ Готово!';
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2100);
}

// Рендер карточек мотоциклов
function renderBikes() {
  const grid = document.getElementById('bikesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  bikes.forEach(bike => {
    const card = document.createElement('div');
    card.className = 'bike-card';
    card.innerHTML = `
      <div class="card-img">
        <img src="${bike.img}" alt="${bike.name}">
      </div>
      <div class="card-content">
        <div class="bike-title">${bike.name}</div>
        <div class="bike-desc">${bike.desc}</div>
        <div class="price">${bike.price}</div>
        <div class="card-actions">
          <button class="btn-card details" data-id="${bike.id}" data-action="details">🔍 Подробнее</button>
          <button class="btn-card buy" data-id="${bike.id}" data-action="buy">🛒 Купить сейчас</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Обработчики кнопок внутри карточек
  document.querySelectorAll('.btn-card.details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      const bike = bikes.find(b => b.id === id);
      showToast(`📖 ${bike.name}: ${bike.desc} | Гарантия 3 года.`);
    });
  });
  
  document.querySelectorAll('.btn-card.buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      const bike = bikes.find(b => b.id === id);
      showToast(`🛵 ${bike.name} добавлен в корзину! Менеджер свяжется для оформления.`);
    });
  });
  
  // Клик по карточке целиком
  document.querySelectorAll('.bike-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast(`🔍 Быстрый просмотр: нажмите "Подробнее" для полной информации`);
    });
  });
}

// ==================== ВСЕ ОБРАБОТЧИКИ КЛИКОВ ====================
document.addEventListener('DOMContentLoaded', () => {
  renderBikes();

  // Логотип
  document.getElementById('logoBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('🏍️ MotoRide — твой путь к свободе');
  });

  // Навигация
  document.getElementById('navCatalog')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
    showToast('🏍️ Открыт каталог мотоциклов');
  });
  
  document.getElementById('navFeatures')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('featuresBlock')?.scrollIntoView({ behavior: 'smooth' });
    showToast('⭐ Наши преимущества: гарантия, доставка, кредит');
  });
  
  document.getElementById('navContact')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('callbackFormBlock')?.scrollIntoView({ behavior: 'smooth' });
    showToast('📞 Оставьте заявку — перезвоним за 2 минуты');
  });
  
  document.getElementById('headerCallbackBtn')?.addEventListener('click', () => {
    document.getElementById('callbackFormBlock')?.scrollIntoView({ behavior: 'smooth' });
    showToast('📞 Заполните форму ниже, и мы свяжемся с вами');
  });

  // Hero кнопки
  document.getElementById('heroShowBikesBtn')?.addEventListener('click', () => {
    document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
    showToast('🔥 Смотрите топовые модели ниже');
  });
  
  document.getElementById('heroTestDriveBtn')?.addEventListener('click', () => {
    showToast('🚀 Отлично! Менеджер свяжется для записи тест-драйва.');
  });

  // Кнопка введения
  document.getElementById('introMoreBtn')?.addEventListener('click', () => {
    showToast('📖 MotoRide основан в 2012 году. Более 5000 мотоциклов продано!');
  });

  // Преимущества
  document.getElementById('featGaranty')?.addEventListener('click', () => {
    showToast('🏅 Расширенная гарантия: 3 года + помощь на дороге 24/7');
  });
  
  document.getElementById('featDelivery')?.addEventListener('click', () => {
    showToast('🚚 Доставка по всей РФ от 1 до 5 дней. Бесплатно при заказе от 800 000₽');
  });
  
  document.getElementById('featCredit')?.addEventListener('click', () => {
    showToast('💸 Кредит от 0% на 24 месяца. Первоначальный взнос от 0₽');
  });

  // Форма обратной связи
  const submitBtn = document.getElementById('submitCallbackBtn');
  const nameInput = document.getElementById('callbackName');
  const phoneInput = document.getElementById('callbackPhone');
  
  submitBtn?.addEventListener('click', () => {
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    if (!nameVal || !phoneVal) {
      showToast('❌ Пожалуйста, укажите имя и номер телефона');
      return;
    }
    showToast(`✅ Спасибо, ${nameVal}! Менеджер свяжется по номеру ${phoneVal} в ближайшее время.`);
    nameInput.value = '';
    phoneInput.value = '';
  });

  // Футер кнопки
  document.getElementById('footerPolicyBtn')?.addEventListener('click', () => {
    showToast('📜 Политика конфиденциальности: ваши данные под надежной защитой.');
  });
  
  document.getElementById('footerOfferBtn')?.addEventListener('click', () => {
    showToast('📄 Публичная оферта: все цены включают НДС, возможны акции.');
  });
  
  document.getElementById('footerSocialBtn')?.addEventListener('click', () => {
    showToast('📸 Instagram: @motoride_official — подписывайтесь!');
  });
  
  document.getElementById('footerSupportBtn')?.addEventListener('click', () => {
    showToast('📞 Поддержка: 8-800-555-35-35 (ежедневно с 9 до 21)');
  });

  // Дополнительно: клик на герой-изображение
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.style.cursor = 'pointer';
    heroImg.addEventListener('click', () => {
      showToast('⚡ Мотоциклы с передовыми технологиями — выбери своего!');
    });
  }
});