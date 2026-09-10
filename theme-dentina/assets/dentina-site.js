(() => {
  'use strict';

  const app = window.DentinaSite || (window.DentinaSite = {
    roots: new WeakSet(),
    activeLayer: null,
    globalReady: false
  });

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const money = (cents) => {
    const currency = window.Shopify?.currency?.active || 'EUR';
    try {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format((Number(cents) || 0) / 100);
    } catch (_error) {
      return `${((Number(cents) || 0) / 100).toFixed(2).replace('.', ',')} €`;
    }
  };

  const shopifyRoute = (path) => {
    const root = window.Shopify?.routes?.root || '/';
    return `${root.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  };

  const syncScrollLock = () => {
    document.body.classList.toggle('dt-no-scroll', Boolean(q('.dt-mobile-menu.is-open, .dt-drawer.is-open, .dt-image-lightbox.is-open, .dt-cycle-modal[open]')));
  };

  const activateLayer = (element, close, opener) => {
    if (app.activeLayer && app.activeLayer.element !== element) app.activeLayer.close(false);
    app.activeLayer = { element, close, opener };
    syncScrollLock();
  };

  const releaseLayer = (element, restoreFocus = true) => {
    if (app.activeLayer?.element !== element) {
      syncScrollLock();
      return;
    }
    const opener = app.activeLayer.opener;
    app.activeLayer = null;
    syncScrollLock();
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  };

  function initMenu(root) {
    const menu = q('[data-dt-mobile-menu]', root);
    const openers = qa('[data-dt-menu-open]', root);
    if (!menu || !openers.length) return;

    const closeButton = q('button[data-dt-menu-close]', menu);

    const close = (restoreFocus = true) => {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      openers.forEach((button) => button.setAttribute('aria-expanded', 'false'));
      releaseLayer(menu, restoreFocus);
    };

    const open = (opener) => {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      openers.forEach((button) => button.setAttribute('aria-expanded', 'true'));
      activateLayer(menu, close, opener);
      window.requestAnimationFrame(() => (closeButton || q(focusableSelector, menu))?.focus());
    };

    openers.forEach((button) => button.addEventListener('click', () => open(button)));
    qa('[data-dt-menu-close]', menu).forEach((button) => button.addEventListener('click', () => close()));
    qa('nav a', menu).forEach((link) => link.addEventListener('click', () => close(false)));
  }

  function initGallery(root) {
    const gallery = q('[data-dt-gallery]', root);
    if (!gallery) return;

    const byDataIndex = (left, right) => Number(left.dataset.index || 0) - Number(right.dataset.index || 0);
    const slides = qa('[data-dt-slide]', gallery).sort(byDataIndex);
    const thumbs = qa('[data-dt-thumb]', gallery).sort(byDataIndex);
    const stage = q('.dt-pdp-stage', gallery);
    const currentLabel = q('[data-dt-gallery-current]', gallery);
    const lightbox = q('[data-dt-image-lightbox]', gallery);
    const lightboxImage = q('[data-dt-image-lightbox-image]', lightbox || gallery);
    let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));

    if (!slides.length) return;

    if (stage) {
      stage.tabIndex = 0;
      stage.setAttribute('role', 'group');
      stage.setAttribute('aria-roledescription', 'carrousel');
      stage.setAttribute('aria-label', 'Galerie produit DentinaClean');
    }

    slides.forEach((slide, index) => {
      if (!slide.id) slide.id = `dt-gallery-slide-${index + 1}`;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'diapositive');
      slide.setAttribute('aria-label', `${index + 1} sur ${slides.length}`);
    });

    thumbs.forEach((thumb, index) => {
      const target = slides[index];
      if (target) thumb.setAttribute('aria-controls', target.id);
    });

    const show = (requestedIndex, options = {}) => {
      const index = (requestedIndex + slides.length) % slides.length;
      current = index;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      thumbs.forEach((thumb, thumbIndex) => {
        const active = thumbIndex === index;
        thumb.classList.toggle('is-active', active);
        thumb.setAttribute('aria-selected', String(active));
        thumb.tabIndex = active ? 0 : -1;
      });
      if (currentLabel) currentLabel.textContent = String(index + 1);
      if (options.focusThumb) thumbs[index]?.focus({ preventScroll: true });
      if (options.scrollThumb && thumbs[index]) {
        thumbs[index].scrollIntoView({ behavior: options.instant ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
      }
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => show(index, { scrollThumb: true }));
      thumb.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowLeft') next = index - 1;
        if (event.key === 'ArrowRight') next = index + 1;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = slides.length - 1;
        show((next + slides.length) % slides.length, { focusThumb: true, scrollThumb: true });
      });
    });

    q('[data-dt-gallery-prev]', gallery)?.addEventListener('click', () => show(current - 1, { scrollThumb: true }));
    q('[data-dt-gallery-next]', gallery)?.addEventListener('click', () => show(current + 1, { scrollThumb: true }));

    if (lightbox && lightboxImage) {
      const closeLightbox = (restoreFocus = true) => {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        releaseLayer(lightbox, restoreFocus);
      };
      qa('[data-dt-gallery-zoom]', gallery).forEach((button) => button.addEventListener('click', (event) => {
        event.stopPropagation();
        lightboxImage.src = button.dataset.src || '';
        lightboxImage.alt = button.dataset.alt || 'Visuel produit DentinaClean agrandi';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        activateLayer(lightbox, closeLightbox, button);
        window.requestAnimationFrame(() => q('.dt-image-lightbox__close', lightbox)?.focus());
      }));
      qa('[data-dt-image-lightbox-close]', lightbox).forEach((button) => button.addEventListener('click', () => closeLightbox()));
    }

    stage?.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1), { scrollThumb: true });
    });

    let pointerStart = null;
    stage?.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    stage?.addEventListener('pointerup', (event) => {
      if (!pointerStart || pointerStart.id !== event.pointerId) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      show(current + (deltaX < 0 ? 1 : -1), { scrollThumb: true });
    });
    stage?.addEventListener('pointercancel', () => { pointerStart = null; });

    show(current, { instant: true });
  }

  function initRoutineCarousel(root) {
    qa('[data-dt-review-strip]', root).forEach((strip) => {
      const carousel = strip.closest('.dt-review-carousel') || root;
      const buttons = qa('[data-dt-scroll-reviews]', carousel);

      strip.tabIndex = 0;
      strip.setAttribute('role', 'region');
      strip.setAttribute('aria-label', 'Visuels Dentina au quotidien');

      const distance = () => {
        const card = q('.dt-routine-card, .dt-review-card, .dt-demo-review-card', strip);
        if (!card) return Math.max(280, strip.clientWidth * 0.8);
        const style = window.getComputedStyle(strip);
        return card.getBoundingClientRect().width + (parseFloat(style.columnGap || style.gap) || 16);
      };

      const updateButtons = () => {
        const max = Math.max(0, strip.scrollWidth - strip.clientWidth - 2);
        buttons.forEach((button) => {
          const direction = Number(button.dataset.direction || 1);
          button.disabled = direction < 0 ? strip.scrollLeft <= 2 : strip.scrollLeft >= max;
        });
      };

      const move = (direction) => strip.scrollBy({ left: distance() * direction, behavior: 'smooth' });
      buttons.forEach((button) => button.addEventListener('click', () => move(Number(button.dataset.direction || 1))));
      strip.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      });
      strip.addEventListener('scroll', updateButtons, { passive: true });
      window.addEventListener('resize', updateButtons, { passive: true });
      updateButtons();
    });
  }

  function initMiniReviews(root) {
    qa('[data-dt-mini-reviews]', root).forEach((carousel) => {
      const reviews = qa('[data-dt-mini-review]', carousel);
      const dots = qa('[data-dt-mini-review-dot]', carousel);
      if (reviews.length < 2) return;
      let index = Math.max(0, reviews.findIndex((review) => review.classList.contains('is-active')));
      let timer = null;

      const show = (requestedIndex) => {
        index = (requestedIndex + reviews.length) % reviews.length;
        reviews.forEach((review, reviewIndex) => {
          const active = reviewIndex === index;
          review.classList.toggle('is-active', active);
          review.setAttribute('aria-hidden', String(!active));
        });
        dots.forEach((dot, dotIndex) => {
          const active = dotIndex === index;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
      };

      const stop = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
      };
      const start = () => {
        stop();
        if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
          timer = window.setInterval(() => show(index + 1), 5600);
        }
      };

      q('[data-dt-mini-review-prev]', carousel)?.addEventListener('click', () => { show(index - 1); start(); });
      q('[data-dt-mini-review-next]', carousel)?.addEventListener('click', () => { show(index + 1); start(); });
      dots.forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.index || 0)); start(); }));
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
      carousel.addEventListener('focusin', stop);
      carousel.addEventListener('focusout', start);
      show(index);
      start();
    });
  }

  function initDeliveryWindow(root) {
    const labels = qa('[data-dt-delivery-window]', root);
    if (!labels.length) return;
    const now = new Date();
    const afterCutoff = now.getHours() >= 12;
    const dispatchDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const earliest = new Date(dispatchDay.getFullYear(), dispatchDay.getMonth(), dispatchDay.getDate() + 6);
    const latest = new Date(dispatchDay.getFullYear(), dispatchDay.getMonth(), dispatchDay.getDate() + 10);
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
    const sameMonth = earliest.getMonth() === latest.getMonth() && earliest.getFullYear() === latest.getFullYear();
    const range = sameMonth
      ? `${earliest.getDate()} et le ${latest.getDate()} ${month.format(latest)}`
      : `${earliest.getDate()} ${month.format(earliest)} et le ${latest.getDate()} ${month.format(latest)}`;
    labels.forEach((label) => { label.textContent = `Livraison estimée entre le ${range}`; });
    qa('[data-dt-order-cutoff]', root).forEach((label) => {
      label.textContent = afterCutoff ? 'Commandez aujourd’hui' : 'Commandez avant 12h';
    });
  }

  function initMoreReviews(root) {
    qa('[data-dt-reviews-more]', root).forEach((button) => {
      const scope = button.closest('.dt-review-standard') || root;
      const extras = qa('[data-dt-extra-review]', scope);
      if (!extras.length) {
        button.hidden = true;
        return;
      }
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        extras.forEach((review) => { review.hidden = expanded; });
        button.setAttribute('aria-expanded', String(!expanded));
        button.textContent = expanded ? 'Afficher plus d’avis' : 'Réduire les avis';
      });
    });
  }

  function initColorSelector(root) {
    qa('[data-dt-color-picker]', root).forEach((picker) => {
      const options = qa('[data-dt-color-option]', picker);
      const colorLabel = q('[data-dt-color-label]', picker);
      if (!options.length) return;

      options.forEach((option) => {
        const unavailable = option.dataset.available === 'false';
        option.disabled = unavailable;
        option.setAttribute('aria-disabled', String(unavailable));
      });

      const select = (option, moveGallery = true) => {
        if (!option || option.disabled) return;
        const color = option.dataset.color || '';
        const variantId = option.dataset.variantId || root.dataset.variantId || '';
        const price = option.dataset.price || '';

        options.forEach((candidate) => {
          const active = candidate === option;
          candidate.classList.toggle('is-active', active);
          candidate.setAttribute('aria-pressed', String(active));
        });
        picker.dataset.selectedColor = color;
        if (colorLabel) colorLabel.textContent = option.textContent.trim();

        if (moveGallery) {
          const targetIndex = option.dataset.slideIndex;
          q(`[data-dt-thumb][data-index="${targetIndex}"]`, root)?.click();
        }

        if (variantId) {
          root.dataset.variantId = variantId;
          qa('[data-dt-add-to-cart]', root).forEach((button) => {
            button.dataset.variantId = variantId;
            button.disabled = false;
            button.removeAttribute('aria-disabled');
            if (!button.matches('[aria-busy="true"]')) button.textContent = 'Ajouter au panier';
          });
          try {
            const url = new URL(window.location.href);
            url.searchParams.set('variant', variantId);
            window.history.replaceState({}, '', url);
          } catch (_error) {
            // The selected variant still works if the browser blocks URL updates.
          }
        }
        if (price) qa('[data-dt-product-price]', root).forEach((element) => { element.textContent = price; });
      };

      options.forEach((option) => option.addEventListener('click', () => select(option)));
      const initialColor = picker.dataset.selectedColor || 'blanc';
      const initial = options.find((option) => option.dataset.color === initialColor && !option.disabled)
        || options.find((option) => !option.disabled);
      select(initial, initialColor === 'noir');
    });
  }

  function initCart(root) {
    const drawer = q('[data-dt-cart-drawer]', root);
    const cartBody = q('[data-dt-cart-body]', root);
    if (!drawer || !cartBody) return;

    const status = q('[data-dt-cart-status]', drawer);
    const checkout = q('[data-dt-checkout]', drawer);
    const panel = q('.dt-drawer__panel', drawer);
    const cartTimer = q('[data-dt-cart-timer]', drawer);
    const cartTimerWrap = q('[data-dt-cart-timer-wrap]', drawer);
    const cartTimerCopy = q('[data-dt-cart-timer-copy]', drawer);
    const cartTimerKey = 'dentina-cart-timer-end';
    const cartTimerDuration = 10 * 60 * 1000;
    let cartTimerInterval = 0;
    let requestInProgress = false;
    let cartRefreshId = 0;
    let cartIsRefreshing = false;

    const announce = (message, isError = false) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('is-error', isError);
    };

    const close = (restoreFocus = true) => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      releaseLayer(drawer, restoreFocus);
    };

    const open = (opener) => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      activateLayer(drawer, close, opener);
      window.requestAnimationFrame(() => q('[data-dt-close-cart]', drawer)?.focus());
    };

    const setCheckoutState = (enabled) => {
      if (!checkout) return;
      checkout.setAttribute('aria-disabled', String(!enabled));
      if (enabled) checkout.removeAttribute('tabindex');
      else checkout.tabIndex = -1;
    };

    const setTotals = (cart) => {
      const total = q('[data-dt-total-current]', drawer);
      const delivery = q('[data-dt-total-savings]', drawer);
      if (total) total.textContent = money(cart.total_price);
      if (delivery) delivery.textContent = cart.item_count ? 'Livraison offerte en France métropolitaine' : 'Aucun article';
    };

    const readTimerEnd = () => {
      try { return Number(window.sessionStorage.getItem(cartTimerKey) || 0); } catch (_error) { return 0; }
    };

    const writeTimerEnd = (value) => {
      try {
        if (value) window.sessionStorage.setItem(cartTimerKey, String(value));
        else window.sessionStorage.removeItem(cartTimerKey);
      } catch (_error) {}
    };

    const stopCartTimer = (reset = false) => {
      window.clearInterval(cartTimerInterval);
      cartTimerInterval = 0;
      if (!reset) return;
      writeTimerEnd(0);
      if (cartTimer) {
        cartTimer.textContent = '10:00';
        cartTimer.setAttribute('aria-label', 'Dix minutes restantes');
      }
      if (cartTimerCopy) cartTimerCopy.textContent = 'Compteur indicatif · le panier reste accessible';
      cartTimerWrap?.classList.remove('is-finished');
    };

    const startCartTimer = () => {
      if (!cartTimer) return;
      window.clearInterval(cartTimerInterval);
      let end = readTimerEnd();
      if (!Number.isFinite(end) || end <= 0) {
        end = Date.now() + cartTimerDuration;
        writeTimerEnd(end);
      }

      const updateTimer = () => {
        const remaining = Math.max(0, end - Date.now());
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        cartTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        cartTimer.setAttribute('aria-label', `${minutes} minute${minutes === 1 ? '' : 's'} et ${seconds} seconde${seconds === 1 ? '' : 's'} restantes`);
        if (remaining > 0) return;
        window.clearInterval(cartTimerInterval);
        cartTimerInterval = 0;
        cartTimerWrap?.classList.add('is-finished');
        if (cartTimerCopy) cartTimerCopy.textContent = 'Votre panier reste accessible';
      };

      cartTimerWrap?.classList.remove('is-finished');
      if (cartTimerCopy) cartTimerCopy.textContent = 'Compteur indicatif · le panier reste accessible';
      updateTimer();
      if (end > Date.now()) cartTimerInterval = window.setInterval(updateTimer, 1000);
    };

    const renderEmpty = () => {
      const productUrl = escapeHtml(root.dataset.productUrl || '/collections/all');
      cartBody.innerHTML = `<div class="dt-cart-empty"><span class="dt-cart-empty__icon" aria-hidden="true">D</span><strong>Votre panier est vide.</strong><span>Ajoutez DentinaClean pour commencer votre routine.</span><a class="dt-secondary-btn" href="${productUrl}">Découvrir DentinaClean</a></div>`;
    };

    const renderItems = (cart) => {
      cartBody.innerHTML = cart.items.map((item) => {
        const title = escapeHtml(item.product_title || item.title || 'DentinaClean');
        const variant = item.variant_title && item.variant_title !== 'Default Title'
          ? `<div class="dt-cart-item__variant">${escapeHtml(item.variant_title)}</div>`
          : '';
        const image = escapeHtml(item.featured_image?.url || item.image || root.dataset.fallbackImage || '');
        const originalPrice = Number(item.original_line_price || 0);
        const finalPrice = Number(item.final_line_price || 0);
        const comparePrice = originalPrice > finalPrice ? `<s>${escapeHtml(money(originalPrice))}</s>` : '';
        const key = escapeHtml(item.key);
        const quantity = Math.max(1, Number(item.quantity) || 1);

        return `<article class="dt-cart-item" data-line="${key}">
          <div class="dt-cart-item__img"><img src="${image}" alt="${title}" loading="lazy"></div>
          <div class="dt-cart-item__content">
            <div class="dt-cart-item__main">
              <div><div class="dt-cart-item__title">${title}</div>${variant}</div>
              <div class="dt-cart-item__prices">${comparePrice}<span class="current">${escapeHtml(money(finalPrice))}</span></div>
            </div>
            <div class="dt-cart-actions">
              <button type="button" class="dt-cart-item__remove" data-remove="${key}" aria-label="Retirer ${title} du panier">Retirer</button>
              <div class="dt-qty" aria-label="Quantité pour ${title}">
                <button type="button" class="dt-qty-btn" data-qty="${key}" data-delta="-1" aria-label="Diminuer la quantité">−</button>
                <span aria-live="polite">${quantity}</span>
                <button type="button" class="dt-qty-btn" data-qty="${key}" data-delta="1" aria-label="Augmenter la quantité">+</button>
              </div>
            </div>
          </div>
        </article>`;
      }).join('');
    };

    const fetchJson = async (url, options = {}) => {
      const response = await fetch(url, {
        credentials: 'same-origin',
        ...options,
        headers: { Accept: 'application/json', ...(options.headers || {}) }
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.description || payload.message || 'Une erreur est survenue.');
      return payload;
    };

    const refreshCart = async () => {
      const refreshId = ++cartRefreshId;
      cartIsRefreshing = true;
      cartBody.setAttribute('aria-busy', 'true');
      setCheckoutState(false);
      try {
        const cart = await fetchJson(shopifyRoute('cart.js'));
        if (refreshId !== cartRefreshId) return null;
        qa('[data-dt-cart-count]', root).forEach((element) => {
          element.textContent = String(cart.item_count || 0);
          element.setAttribute('aria-label', `${cart.item_count || 0} article${cart.item_count === 1 ? '' : 's'} dans le panier`);
        });
        const hasItems = Boolean(cart.items?.length);
        drawer.classList.toggle('is-empty', !hasItems);
        setCheckoutState(hasItems);
        setTotals(cart);
        if (hasItems) {
          startCartTimer();
          announce(`Livraison offerte · ${cart.item_count} article${cart.item_count === 1 ? '' : 's'} dans votre panier`);
          renderItems(cart);
        } else {
          stopCartTimer(true);
          announce('Votre panier est prêt à accueillir DentinaClean.');
          renderEmpty();
        }
        return cart;
      } catch (_error) {
        if (refreshId !== cartRefreshId) return null;
        setCheckoutState(false);
        qa('[data-dt-total-current]', drawer).forEach((element) => { element.textContent = '—'; });
        announce('Le panier ne peut pas être chargé pour le moment. Réessayez dans un instant.', true);
        cartBody.innerHTML = '<div class="dt-cart-empty"><strong>Connexion au panier impossible.</strong><span>Vos articles ne sont pas supprimés. Reconnectez-vous pour actualiser votre panier.</span><button type="button" class="dt-secondary-btn" data-dt-cart-retry>Réessayer</button></div>';
        return null;
      } finally {
        if (refreshId === cartRefreshId) {
          cartIsRefreshing = false;
          cartBody.removeAttribute('aria-busy');
        }
      }
    };

    const updateLine = async (id, quantity, sourceButton) => {
      if (requestInProgress || cartIsRefreshing) return;
      const restoreControlFocus = document.activeElement === sourceButton;
      const controlDelta = sourceButton?.dataset.delta;
      requestInProgress = true;
      drawer.setAttribute('aria-busy', 'true');
      setCheckoutState(false);
      sourceButton?.setAttribute('aria-disabled', 'true');
      try {
        await fetchJson(shopifyRoute('cart/change.js'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, quantity })
        });
        await refreshCart();
        if (restoreControlFocus && drawer.classList.contains('is-open') && !sourceButton?.isConnected) {
          const replacement = qa('[data-qty]', cartBody).find((button) => button.dataset.qty === id && button.dataset.delta === controlDelta);
          (replacement || q('[data-dt-close-cart]', drawer))?.focus();
        }
      } catch (error) {
        await refreshCart();
        announce(error.message || 'La quantité n’a pas pu être modifiée.', true);
      } finally {
        requestInProgress = false;
        drawer.removeAttribute('aria-busy');
        sourceButton?.removeAttribute('aria-disabled');
      }
    };

    cartBody.addEventListener('click', (event) => {
      if (event.target.closest('[data-dt-cart-retry]')) {
        if (!cartBody.hasAttribute('aria-busy')) refreshCart();
        return;
      }
      const removeButton = event.target.closest('[data-remove]');
      if (removeButton) {
        updateLine(removeButton.dataset.remove, 0, removeButton);
        return;
      }
      const quantityButton = event.target.closest('[data-qty]');
      if (!quantityButton) return;
      const item = quantityButton.closest('[data-line]');
      const currentQuantity = Number(q('.dt-qty span', item)?.textContent || 1);
      const newQuantity = Math.max(0, currentQuantity + Number(quantityButton.dataset.delta || 0));
      updateLine(quantityButton.dataset.qty, newQuantity, quantityButton);
    });

    qa('[data-dt-open-cart]', root).forEach((button) => button.addEventListener('click', async (event) => {
      event.preventDefault();
      open(button);
      if (!requestInProgress) await refreshCart();
    }));
    qa('[data-dt-close-cart]', drawer).forEach((button) => button.addEventListener('click', () => close()));
    q('[data-dt-cart-overlay]', drawer)?.addEventListener('click', () => close());
    checkout?.addEventListener('click', (event) => {
      if (checkout.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });

    qa('[data-dt-add-to-cart]', root).forEach((button) => button.addEventListener('click', async (event) => {
      event.preventDefault();
      if (button.disabled || requestInProgress) return;
      const variantId = button.dataset.variantId || root.dataset.variantId;
      if (!variantId) {
        announce('Ce produit est actuellement indisponible.', true);
        await refreshCart();
        open(button);
        return;
      }

      requestInProgress = true;
      const originalContent = button.innerHTML;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Ajout en cours…';
      try {
        await fetchJson(shopifyRoute('cart/add.js'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
        });
        await refreshCart();
        open(button);
      } catch (error) {
        announce(error.message || 'DentinaClean n’a pas pu être ajouté. Réessayez.', true);
        open(button);
      } finally {
        requestInProgress = false;
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.innerHTML = originalContent;
      }
    }));

    if (panel) panel.tabIndex = -1;
    refreshCart();
  }

  function initStickyBuy(root) {
    const sticky = q('[data-dt-sticky-buy]', root);
    const trigger = q('[data-dt-buy-trigger]', root);
    if (!sticky || !trigger) return;

    const setVisible = (visible) => {
      sticky.classList.toggle('is-visible', visible);
      sticky.setAttribute('aria-hidden', String(!visible));
    };

    setVisible(false);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
      observer.observe(trigger);
    } else {
      const update = () => setVisible(trigger.getBoundingClientRect().bottom < 0);
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    }
  }

  function initCycleStory(root) {
    const story = q('[data-dt-cycle-story]', root);
    if (!story) return;

    const slides = qa('[data-dt-cycle-slide]', story);
    const videos = slides.map((slide) => q('[data-dt-cycle-video]', slide));
    const dots = qa('[data-dt-cycle-dot]', story);
    const status = q('[data-dt-cycle-status]', story);
    const previous = q('[data-dt-cycle-prev]', story);
    const next = q('[data-dt-cycle-next]', story);
    const toggle = q('[data-dt-cycle-toggle]', story);
    const toggleIcon = q('[data-dt-cycle-toggle-icon]', story);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const labels = ['Immersion', 'Nettoyage', 'Résultat'];
    let activeIndex = 0;
    let isVisible = false;
    let isPaused = Boolean(reducedMotion);
    let isModalOpen = false;
    let isTransitioning = false;
    let transitionTimer = 0;
    let mediaPrepared = false;
    const prepareSeries = () => {
      if (mediaPrepared) return;
      mediaPrepared = true;
      videos.forEach((video) => {
        if (!video) return;
        video.preload = 'auto';
        video.load();
      });
    };

    const resetVideo = (video) => {
      if (!video) return;
      video.pause();
      try { video.currentTime = 0; } catch (_error) {}
    };

    const pauseSeries = () => videos.forEach((video) => video?.pause());

    const canPlaySeries = () => isVisible && !isPaused && !isModalOpen && document.visibilityState !== 'hidden';

    const updateToggle = () => {
      if (!toggle) return;
      toggle.setAttribute('aria-pressed', String(isPaused));
      toggle.setAttribute('aria-label', isPaused ? 'Reprendre la mini-série' : 'Mettre la mini-série en pause');
      if (toggleIcon) toggleIcon.textContent = isPaused ? '▶' : 'Ⅱ';
    };

    const playActive = () => {
      if (!canPlaySeries()) return;
      prepareSeries();
      const video = videos[activeIndex];
      if (!video) return;
      if (video.ended) {
        show(activeIndex + 1, true, false);
        return;
      }
      video.play().catch(() => {});
    };

    const updateSelection = (announceChange = false) => {
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
        dot.tabIndex = isActive ? 0 : -1;
      });
      story.dataset.active = String(activeIndex);
      if (status && announceChange) status.textContent = `Étape ${activeIndex + 1} sur ${slides.length} · ${labels[activeIndex] || ''}`;
    };

    const finishTransition = () => {
      window.clearTimeout(transitionTimer);
      slides.forEach((slide, index) => {
        if (index === activeIndex) return;
        slide.classList.remove('is-active', 'is-leaving');
        slide.setAttribute('aria-hidden', 'true');
        resetVideo(videos[index]);
      });
      isTransitioning = false;
    };

    const show = (requestedIndex, shouldPlay = true, announceChange = false) => {
      if (!slides.length) return;
      const targetIndex = (requestedIndex + slides.length) % slides.length;
      const previousIndex = activeIndex;
      finishTransition();

      if (targetIndex === previousIndex) {
        resetVideo(videos[targetIndex]);
        slides[targetIndex]?.classList.add('is-active');
        slides[targetIndex]?.classList.remove('is-leaving');
        slides[targetIndex]?.setAttribute('aria-hidden', 'false');
        updateSelection(announceChange);
        if (shouldPlay) playActive();
        return;
      }

      const targetVideo = videos[targetIndex];
      resetVideo(targetVideo);
      if (shouldPlay && canPlaySeries()) targetVideo?.play().catch(() => {});

      activeIndex = targetIndex;
      slides.forEach((slide, index) => {
        if (index === targetIndex) {
          slide.classList.remove('is-leaving');
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else if (index === previousIndex) {
          slide.classList.remove('is-active');
          slide.classList.add('is-leaving');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          slide.classList.remove('is-active', 'is-leaving');
          slide.setAttribute('aria-hidden', 'true');
          resetVideo(videos[index]);
        }
      });
      updateSelection(announceChange);
      isTransitioning = true;
      transitionTimer = window.setTimeout(finishTransition, 520);
    };

    videos.forEach((video, index) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.addEventListener('timeupdate', () => {
        if (index !== activeIndex || isTransitioning || isPaused || !isVisible || !Number.isFinite(video.duration)) return;
        if (video.duration - video.currentTime <= 0.38) show(activeIndex + 1);
      });
      video.addEventListener('ended', () => {
        if (index === activeIndex && !isTransitioning && !isPaused) show(activeIndex + 1);
      });
    });

    previous?.addEventListener('click', () => show(activeIndex - 1, true, true));
    next?.addEventListener('click', () => show(activeIndex + 1, true, true));
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => show(Number(dot.dataset.index || 0), true, true));
      dot.addEventListener('keydown', (event) => {
        let targetIndex = null;
        if (event.key === 'ArrowRight') targetIndex = (index + 1) % dots.length;
        if (event.key === 'ArrowLeft') targetIndex = (index - 1 + dots.length) % dots.length;
        if (event.key === 'Home') targetIndex = 0;
        if (event.key === 'End') targetIndex = dots.length - 1;
        if (targetIndex === null) return;
        event.preventDefault();
        dots[targetIndex]?.focus();
        show(targetIndex, true, true);
      });
    });
    toggle?.addEventListener('click', () => {
      isPaused = !isPaused;
      updateToggle();
      if (isPaused) pauseSeries();
      else playActive();
      if (status) status.textContent = isPaused ? 'Mini-série en pause.' : 'Lecture de la mini-série reprise.';
    });
    updateToggle();
    show(0, false);

    const viewport = q('.dt-cycle-viewport', story);
    if ('IntersectionObserver' in window && viewport) {
      // Prepare all chapters together before arrival, keeping transitions ready.
      const preloadObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        prepareSeries();
        preloadObserver.disconnect();
      }, { rootMargin: '700px 0px', threshold: 0 });
      preloadObserver.observe(viewport);
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) playActive();
        else pauseSeries();
      }, { rootMargin: '80px 0px', threshold: 0.35 });
      observer.observe(viewport);
    } else {
      isVisible = true;
      playActive();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') pauseSeries();
      else playActive();
    });

    const modal = q('[data-dt-cycle-modal]', root);
    const openButton = q('[data-dt-cycle-open]', root);
    const closeButton = modal ? q('[data-dt-cycle-close]', modal) : null;
    const fullVideo = modal ? q('[data-dt-cycle-full-video]', modal) : null;
    if (!modal || !openButton || !fullVideo) return;

    const closeModal = (restoreFocus = true) => {
      fullVideo.pause();
      isModalOpen = false;
      if (modal.open && typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
      releaseLayer(modal, restoreFocus);
      playActive();
    };

    const openModal = () => {
      isModalOpen = true;
      pauseSeries();
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
      activateLayer(modal, closeModal, openButton);
      try { fullVideo.currentTime = 0; } catch (_error) {}
      fullVideo.play().catch(() => {});
      window.requestAnimationFrame(() => closeButton?.focus());
    };

    openButton.addEventListener('click', openModal);
    closeButton?.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    modal.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeModal();
    });

  }

  function initInViewVideos(root) {
    const videos = qa('[data-dt-inview-video]', root);
    if (!videos.length) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (reducedMotion) {
        video.removeAttribute('autoplay');
        video.pause();
      }
    });
    if (reducedMotion) return;

    const play = (video) => video.play().catch(() => {});
    if (!('IntersectionObserver' in window)) {
      videos.forEach(play);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && document.visibilityState !== 'hidden') play(entry.target);
        else entry.target.pause();
      });
    }, { rootMargin: '120px 0px', threshold: 0.18 });
    videos.forEach((video) => observer.observe(video));
  }

  function applyReducedMotion(root) {
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    qa('video[autoplay]', root).forEach((video) => {
      video.removeAttribute('autoplay');
      video.pause();
    });
  }

  function initRoot(root) {
    if (!root || app.roots.has(root)) return;
    app.roots.add(root);
    initMenu(root);
    initGallery(root);
    initRoutineCarousel(root);
    initMiniReviews(root);
    initDeliveryWindow(root);
    initMoreReviews(root);
    initColorSelector(root);
    initCart(root);
    initStickyBuy(root);
    initCycleStory(root);
    initInViewVideos(root);
    applyReducedMotion(root);
  }

  function initAll(scope = document) {
    if (scope.matches?.('.dt-site')) initRoot(scope);
    qa('.dt-site', scope).forEach(initRoot);
  }

  if (!app.globalReady) {
    app.globalReady = true;
    document.addEventListener('keydown', (event) => {
      const active = app.activeLayer;
      if (!active) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        active.close();
        return;
      }
      if (event.key !== 'Tab') return;
      // Native modal dialogs keep focus inside their controls, including the video toolbar.
      if (active.element.matches('dialog[open]')) return;
      const focusable = qa(focusableSelector, active.element).filter((element) => element.offsetParent !== null && element.tabIndex >= 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!active.element.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener('shopify:section:load', (event) => initAll(event.target));
    document.addEventListener('shopify:section:unload', (event) => {
      if (app.activeLayer && event.target.contains(app.activeLayer.element)) app.activeLayer = null;
      syncScrollLock();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initAll(), { once: true });
  else initAll();
})();
