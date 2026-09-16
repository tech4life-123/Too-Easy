// ===== Too Easy — cart system =====
(function () {
  var CART_KEY = 'too_easy_cart';
  var WHATSAPP_NUMBER = '2310888908375';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }
  function cartTotal(cart) {
    return cart.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
  }
  function cartCount(cart) {
    return cart.reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  function addToCart(item) {
    var cart = getCart();
    var existing = cart.find(function (i) { return i.name === item.name && i.size === item.size; });
    if (existing) { existing.qty += item.qty; }
    else { cart.push(item); }
    saveCart(cart);
    renderCart();
  }

  function removeItem(idx) {
    var cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
  }

  function changeQty(idx, delta) {
    var cart = getCart();
    if (!cart[idx]) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) { cart.splice(idx, 1); }
    saveCart(cart);
    renderCart();
  }

  function updateCartCount() {
    var badge = document.getElementById('cart-count');
    if (!badge) return;
    var n = cartCount(getCart());
    badge.textContent = n;
    badge.classList.toggle('hidden', n === 0);
  }

  function renderCart() {
    var container = document.getElementById('cart-items');
    var totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;
    var cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
      totalEl.textContent = '$0';
      return;
    }

    container.innerHTML = cart.map(function (item, idx) {
      return (
        '<div class="cart-item">' +
          '<img src="' + item.image + '" alt="' + item.name + '">' +
          '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-meta">Size: ' + item.size + '</div>' +
            '<div class="cart-item-row">' +
              '<div class="qty-stepper">' +
                '<button class="qty-btn" data-action="dec" data-idx="' + idx + '">−</button>' +
                '<span class="qty-val">' + item.qty + '</span>' +
                '<button class="qty-btn" data-action="inc" data-idx="' + idx + '">+</button>' +
              '</div>' +
              '<span class="cart-item-price">$' + (item.price * item.qty) + '</span>' +
            '</div>' +
            '<button class="cart-item-remove" data-action="remove" data-idx="' + idx + '">Remove</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    totalEl.textContent = '$' + cartTotal(cart);
  }

  function openCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderCart();
  }
  function closeCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function checkoutWhatsApp() {
    var cart = getCart();
    if (cart.length === 0) return;
    var lines = cart.map(function (item) {
      return '• ' + item.name + ' — Size ' + item.size + ' × ' + item.qty + ' — $' + (item.price * item.qty);
    });
    var message =
      'Hi Too Easy! I\'d like to order:\n\n' +
      lines.join('\n') +
      '\n\nTotal: $' + cartTotal(cart) +
      '\n\nMy delivery location: ';
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    var cartBtn = document.getElementById('cart-toggle');
    var closeBtn = document.getElementById('cart-close');
    var overlay = document.getElementById('cart-overlay');
    var checkoutBtn = document.getElementById('cart-checkout');

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutWhatsApp);

    var itemsContainer = document.getElementById('cart-items');
    if (itemsContainer) {
      itemsContainer.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-action]');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var action = btn.getAttribute('data-action');
        if (action === 'inc') changeQty(idx, 1);
        if (action === 'dec') changeQty(idx, -1);
        if (action === 'remove') removeItem(idx);
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-add-cart');
      if (!btn) return;
      var card = btn.closest('.card');
      if (!card) return;
      var sizeSelect = card.querySelector('.size-select');
      var item = {
        name: card.getAttribute('data-name'),
        price: parseFloat(card.getAttribute('data-price')),
        image: card.getAttribute('data-image'),
        size: sizeSelect ? sizeSelect.value : 'One size',
        qty: 1
      };
      addToCart(item);
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(function () {
        btn.textContent = 'Add to cart';
        btn.classList.remove('added');
      }, 1200);
      openCart();
    });
  });
})();
