var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var currentSlide = 0;
var autoSlide;

function showslide(index) {
  slides.forEach(function(s) { s.classList.remove("active"); });
  dots.forEach(function(d) { d.classList.remove("active"); });
  if (slides[index]) slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() { showslide((currentSlide + 1) % slides.length); }
function prevSlide() { showslide((currentSlide - 1 + slides.length) % slides.length); }

if (slides.length > 0) {
  autoSlide = setInterval(nextSlide, 3000);
  
  var nextBtn = document.getElementById("sliderNext");
  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      nextSlide();
      autoSlide = setInterval(nextSlide, 3000);
    });
  }

  var prevBtn = document.getElementById("sliderPrev");
  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      prevSlide();
      autoSlide = setInterval(nextSlide, 3000);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlide);
      showslide(i);
      autoSlide = setInterval(nextSlide, 3000);
    });
  });
}

var menuTrack = document.getElementById("menuTrack");
var menuIndex = 0;

function uMenuCardStep() {
  if (!menuTrack || !menuTrack.children.length) return 284;
  var card = menuTrack.children[0];
  var style = getComputedStyle(menuTrack);
  var gap = parseFloat(style.columnGap || style.gap || 24);
  return card.getBoundingClientRect().width + gap;
}

function uMenuVisibleCount() {
  var wrapper = menuTrack.parentElement;
  var step = uMenuCardStep();
  return Math.max(1, Math.floor(wrapper.getBoundingClientRect().width / step));
}

if (menuTrack) {
  document.querySelectorAll("#menuPrev, #menuNext").forEach(btn => {
    btn.addEventListener("click", function() {
      var step = uMenuCardStep();
      var maxIndex = menuTrack.children.length - uMenuVisibleCount();
      if (this.id === "menuNext") menuIndex = Math.min(menuIndex + 1, maxIndex);
      else menuIndex = Math.max(menuIndex - 1, 0);
      menuTrack.style.transform = `translateX(-${menuIndex * step}px)`;
    });
  });
}

var tTrack = document.getElementById("testimonialsTrack");
var tDotsEl = document.getElementById("testimonialsDots");
var tIndex = 0;

function uTestimonialsCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  
  return 2;
}

if (tTrack) {
  var tCards = tTrack.querySelectorAll(".testimonials-card");
  var totalCards = tCards.length;
  var cardsPerView = uTestimonialsCardsPerView();
  var totalGroups = Math.ceil(totalCards / cardsPerView);

  function uGoToTestimonials(index) {
    tIndex = index;
    var cardW = tCards[0].offsetWidth + 24;
    tTrack.style.transform = `translateX(-${tIndex * cardW * cardsPerView}px)`;
    document.querySelectorAll(".t-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === tIndex);
    });
  }

  function uBuildTestimonialsDots() {
    if (!tDotsEl) return;
    tDotsEl.innerHTML = "";
    for (let i = 0; i < totalGroups; i++) {
      let dot = document.createElement("span");
      dot.className = "t-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => uGoToTestimonials(i));
      tDotsEl.appendChild(dot);
    }
  }

  uBuildTestimonialsDots();

  var tNext = document.getElementById("tNext");
  if (tNext) {
    tNext.addEventListener("click", () => {
      if (tIndex < totalGroups - 1) uGoToTestimonials(tIndex + 1);
    });
  }

  var tPrev = document.getElementById("tPrev");
  if (tPrev) {
    tPrev.addEventListener("click", () => {
      if (tIndex > 0) uGoToTestimonials(tIndex - 1);
    });
  }
}

function updateNavbar() {
  var loggedIn = localStorage.getItem("ub_loggedIn");
  var userName = localStorage.getItem("ub_name");
  var loginBtn = document.getElementById("navLoginBtn");
  var userSection = document.getElementById("navUserSection");
  var userAvatar = document.getElementById("navUserAvatar");

  if (loggedIn === "true" && userName) {
    if (loginBtn) loginBtn.style.display = "none";
    if (userSection) userSection.style.display = "flex";
    if (userAvatar) userAvatar.textContent = userName.charAt(0).toUpperCase();
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (userSection) userSection.style.display = "none";
  }
}

updateNavbar();

var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("ub_loggedIn");
    localStorage.removeItem("ub_name");
    window.location.href = "login.html";
  });
}

var signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim();
    var password = document.getElementById("signupPassword").value;
    var confirm = document.getElementById("signupConfirm").value;
    var isValid = true;

    if (name.length < 3) { showError("signupNameErr"); isValid = false; } else { hideError("signupNameErr"); }
    if (!email.includes("@")) { showError("signupEmailErr"); isValid = false; } else { hideError("signupEmailErr"); }
    if (password.length < 6) { showError("signupPassErr"); isValid = false; } else { hideError("signupPassErr"); }
    if (confirm !== password) { showError("signupConfirmErr"); isValid = false; } else { hideError("signupConfirmErr"); }

    if (isValid) {
      localStorage.setItem("ub_name", name);
      localStorage.setItem("ub_email", email);
      localStorage.setItem("ub_password", password);
      alert("Account created successfully!");
      window.location.href = "login.html";
    }
  });
}

var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;
    var isValid = true;

    if (!email.includes("@")) { showError("loginEmailErr"); isValid = false; } else { hideError("loginEmailErr"); }
    if (password.length < 1) { showError("loginPassErr"); isValid = false; } else { hideError("loginPassErr"); }

    if (isValid) {
      var savedEmail = localStorage.getItem("ub_email");
      var savedPassword = localStorage.getItem("ub_password");

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("ub_loggedIn", "true");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password!");
      }
    }
  });
}

var reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
  reservationForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("resName").value;
    var phone = document.getElementById("resPhone").value;
    var date = document.getElementById("resDate").value;
    var time = document.getElementById("resTime").value;
    var guests = document.getElementById("resGuests").value;
    var isValid = true;

    if (!name) { showError("resNameErr"); isValid = false; } else hideError("resNameErr");
    if (!phone) { showError("resPhoneErr"); isValid = false; } else hideError("resPhoneErr");
    if (!date) { showError("resDateErr"); isValid = false; } else hideError("resDateErr");
    if (!time) { showError("resTimeErr"); isValid = false; } else hideError("resTimeErr");
    if (!guests) { showError("resGuestsErr"); isValid = false; } else hideError("resGuestsErr");

    if (isValid) {
      var msg = document.getElementById("reservationSuccess");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = `Thank you, ${name}! Reservation received.`;
      }
      reservationForm.reset();
    }
  });
}

var contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("contactName").value;
    var email = document.getElementById("contactEmail").value;
    var message = document.getElementById("contactMsg").value;
    var isValid = true;

    if (!name) { showError("contactNameErr"); isValid = false; } else hideError("contactNameErr");
    if (!email.includes("@")) { showError("contactEmailErr"); isValid = false; } else hideError("contactEmailErr");
    if (!message) { showError("contactMsgErr"); isValid = false; } else hideError("contactMsgErr");

    if (isValid) {
      var msg = document.getElementById("contactSuccess");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "Message sent! We will get back to you soon.";
      }
      contactForm.reset();
    }
  });
}

function showError(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "block";
}

function hideError(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "none";
}

function ubGetCart() {
  var raw = localStorage.getItem("ub_cart");
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (e) { return []; }
}

function ubSaveCart(cart) {
  localStorage.setItem("ub_cart", JSON.stringify(cart));
  ubUpdateCartBadge();
  ubRenderCartDrawer();
}

function ubAddToCart(id, qty) {
  if (localStorage.getItem("ub_loggedIn") !== "true") {
    alert("Please login first to add items to your cart.");
    window.location.href = "login.html";
    return;
  }

  id = parseInt(id, 10);
  qty = parseInt(qty, 10) || 1;
  var cart = ubGetCart();
  var found = false;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty += qty;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ id: id, qty: qty });
  }

  ubSaveCart(cart);
  ubOpenCart();
}

function ubRemoveFromCart(id) {
  id = parseInt(id, 10);
  var cart = ubGetCart().filter(function(item) { return item.id !== id; });
  ubSaveCart(cart);
}

function ubUpdateCartQty(id, qty) {
  id = parseInt(id, 10);
  qty = parseInt(qty, 10);
  var cart = ubGetCart();
  if (qty <= 0) {
    ubRemoveFromCart(id);
    return;
  }
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty = qty;
      break;
    }
  }
  ubSaveCart(cart);
}

function ubGetCartCount() {
  var cart = ubGetCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }
  return total;
}

function ubGetCartTotal() {
  var cart = ubGetCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var p = typeof UB_PRODUCTS !== "undefined" ? ubGetProductById(cart[i].id) : null;
    if (p) total += p.price * cart[i].qty;
  }
  return total;
}

function ubBuildCartUI() {
  var navRight = document.querySelector(".navbar-right");
  if (!navRight || document.getElementById("cartToggleBtn")) return;

  var cartBtn = document.createElement("button");
  cartBtn.id = "cartToggleBtn";
  cartBtn.className = "cart-toggle-btn";
  cartBtn.setAttribute("aria-label", "Open Cart");
  cartBtn.innerHTML = `🛒 <span class="cart-badge" id="cartBadge">0</span>`;
  
  var navLogin = document.getElementById("navLoginBtn");
  if (navLogin) navRight.insertBefore(cartBtn, navLogin);
  else navRight.appendChild(cartBtn);

  cartBtn.addEventListener("click", ubOpenCart);

  var overlay = document.createElement("div");
  overlay.id = "cartOverlay";
  overlay.className = "cart-overlay";

  var drawer = document.createElement("div");
  drawer.id = "cartDrawer";
  drawer.className = "cart-drawer";
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h3>Your Cart</h3>
      <button class="cart-close-btn" id="cartCloseBtn">&times;</button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-footer">
      <div class="cart-total-row">Total: <span id="cartTotalAmount">$0</span></div>
      <button class="btn-primary cart-checkout-btn" id="cartCheckoutBtn">Checkout</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  overlay.addEventListener("click", ubCloseCart);
  document.getElementById("cartCloseBtn").addEventListener("click", ubCloseCart);
  document.getElementById("cartCheckoutBtn").addEventListener("click", function() {
    if (ubGetCart().length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you! Your order has been placed.");
    ubSaveCart([]);
    ubCloseCart();
  });

  ubUpdateCartBadge();
  ubRenderCartDrawer();
}

function ubOpenCart() {
  var overlay = document.getElementById("cartOverlay");
  var drawer = document.getElementById("cartDrawer");
  if (overlay) overlay.classList.add("active");
  if (drawer) drawer.classList.add("active");
}

function ubCloseCart() {
  var overlay = document.getElementById("cartOverlay");
  var drawer = document.getElementById("cartDrawer");
  if (overlay) overlay.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
}

function ubUpdateCartBadge() {
  var badge = document.getElementById("cartBadge");
  if (!badge) return;
  var count = ubGetCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-block" : "none";
}

function ubRenderCartDrawer() {
  var body = document.getElementById("cartDrawerBody");
  var totalEl = document.getElementById("cartTotalAmount");
  if (!body) return;

  var cart = ubGetCart();
  if (cart.length === 0) {
    body.innerHTML = `<p class="cart-empty-msg">Your cart is empty.</p>`;
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var p = typeof UB_PRODUCTS !== "undefined" ? ubGetProductById(cart[i].id) : null;
    if (!p) continue;
    html += `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.img}" alt="${p.name}">
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <p class="cart-item-price">$${p.price}</p>
          <div class="cart-qty-controls">
            <button class="qty-btn qty-decrease" data-id="${p.id}">-</button>
            <span>${cart[i].qty}</span>
            <button class="qty-btn qty-increase" data-id="${p.id}">+</button>
          </div>
        </div>
        <button class="cart-remove-btn" data-id="${p.id}">&times;</button>
      </div>
    `;
  }
  body.innerHTML = html;
  if (totalEl) totalEl.textContent = "$" + ubGetCartTotal().toFixed(2);

  body.querySelectorAll(".qty-decrease").forEach(btn => {
    btn.addEventListener("click", function() {
      var id = parseInt(this.getAttribute("data-id"), 10);
      var cart = ubGetCart();
      var item = cart.find(x => x.id === id);
      if (item) ubUpdateCartQty(id, item.qty - 1);
    });
  });

  body.querySelectorAll(".qty-increase").forEach(btn => {
    btn.addEventListener("click", function() {
      var id = parseInt(this.getAttribute("data-id"), 10);
      var cart = ubGetCart();
      var item = cart.find(x => x.id === id);
      if (item) ubUpdateCartQty(id, item.qty + 1);
    });
  });

  body.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      var id = parseInt(this.getAttribute("data-id"), 10);
      ubRemoveFromCart(id);
    });
  });
}

ubBuildCartUI();

function ubBuildMobileNav() {
  var navRight = document.querySelector(".navbar-right");
  if (!navRight || document.getElementById("navToggleBtn")) return;

  var toggleBtn = document.createElement("button");
  toggleBtn.id = "navToggleBtn";
  toggleBtn.className = "navbar-toggle-btn";
  toggleBtn.setAttribute("aria-label", "Open Menu");
  toggleBtn.innerHTML = `☰`;
  navRight.appendChild(toggleBtn);

  var linksMarkup = "";
  var navLinksSource = document.querySelectorAll(".navbar-links a");
  navLinksSource.forEach(function(a) {
    var activeClass = a.classList.contains("active") ? " active" : "";
    linksMarkup += `<a href="${a.getAttribute("href")}" class="nav-drawer-link${activeClass}">${a.textContent}</a>`;
  });

  var overlay = document.createElement("div");
  overlay.id = "navDrawerOverlay";
  overlay.className = "nav-drawer-overlay cart-overlay";

  var drawer = document.createElement("div");
  drawer.id = "navDrawer";
  drawer.className = "nav-drawer cart-drawer";
  drawer.innerHTML = `
    <div class="nav-drawer-header" id="navDrawerHeader"></div>
    <div class="nav-drawer-body">
      <nav class="nav-drawer-links">${linksMarkup}</nav>
    </div>
    <div class="nav-drawer-footer" id="navDrawerFooter"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  toggleBtn.addEventListener("click", ubOpenNavDrawer);
  overlay.addEventListener("click", ubCloseNavDrawer);

  drawer.querySelectorAll(".nav-drawer-link").forEach(link => {
    link.addEventListener("click", ubCloseNavDrawer);
  });

  ubRenderNavDrawerUser();
}

function ubOpenNavDrawer() {
  var overlay = document.getElementById("navDrawerOverlay");
  var drawer = document.getElementById("navDrawer");
  if (overlay) overlay.classList.add("active");
  if (drawer) drawer.classList.add("active");
}

function ubCloseNavDrawer() {
  var overlay = document.getElementById("navDrawerOverlay");
  var drawer = document.getElementById("navDrawer");
  if (overlay) overlay.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
}

function ubRenderNavDrawerUser() {
  var header = document.getElementById("navDrawerHeader");
  var footer = document.getElementById("navDrawerFooter");
  if (!header || !footer) return;

  var loggedIn = localStorage.getItem("ub_loggedIn") === "true";
  var name = localStorage.getItem("ub_name");

  if (loggedIn && name) {
    header.innerHTML = `
      <div class="nav-drawer-user">
        <div class="nav-drawer-avatar">${name.charAt(0).toUpperCase()}</div>
        <span>${name}</span>
      </div>
      <button class="nav-drawer-close" id="navDrawerCloseBtn">&times;</button>
    `;
    footer.innerHTML = `<button class="btn-primary nav-drawer-btn" id="navDrawerLogoutBtn">Logout</button>`;

    document.getElementById("navDrawerLogoutBtn").addEventListener("click", function() {
      localStorage.removeItem("ub_loggedIn");
      localStorage.removeItem("ub_name");
      window.location.href = "login.html";
    });
  } else {
    header.innerHTML = `
      <h3>Menu</h3>
      <button class="nav-drawer-close" id="navDrawerCloseBtn">&times;</button>
    `;
    footer.innerHTML = `<a href="login.html" class="btn-primary nav-drawer-btn">Login / Register</a>`;
  }

  document.getElementById("navDrawerCloseBtn").addEventListener("click", ubCloseNavDrawer);
}

ubBuildMobileNav();

var productDetailRoot = document.getElementById("productDetail");
if (productDetailRoot && typeof UB_PRODUCTS !== "undefined") {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = parseInt(urlParams.get("id"), 10);
  var product = ubGetProductById(productId);

  if (product) {
    document.title = "Urban Bites - " + product.name;
    var imgEl = document.getElementById("pdImage");
    var titleEl = document.getElementById("pdName");
    var descEl = document.getElementById("pdDesc");
    var priceEl = document.getElementById("pdPrice");

    if (imgEl) { imgEl.src = product.img; imgEl.alt = product.name; }
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.longDesc;
    if (priceEl) priceEl.textContent = "$" + product.price;

    var qty = 1;
    var qtyValEl = document.getElementById("pdQtyValue");
    var decBtn = document.getElementById("pdQtyMinus");
    var incBtn = document.getElementById("pdQtyPlus");

    if (decBtn) {
      decBtn.addEventListener("click", () => {
        if (qty > 1) { qty--; if (qtyValEl) qtyValEl.textContent = qty; }
      });
    }

    if (incBtn) {
      incBtn.addEventListener("click", () => {
        qty++; if (qtyValEl) qtyValEl.textContent = qty;
      });
    }

    var addBtn = document.getElementById("pdAddToCart");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        ubAddToCart(product.id, qty);
      });
    }
  } else {
    productDetailRoot.innerHTML = `<p class="error-msg">Product not found. <a href="menu.html">Go to Menu</a></p>`;
  }
}

