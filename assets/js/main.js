/**
 * Altair Sign & Light - Main Interactive Application Logic
 * Location: Smyrna, GA (Metro Atlanta)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initScrollReveals();
  initQuoteFormHandling();
  initModalListeners();
});

/* --------------------------------------------------------------------------
   1. Header Shrink & Sticky Scroll Logic
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation & Accordion Controls
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Mobile submenu accordion expander
  const expanders = document.querySelectorAll('.mobile-nav-expander');
  expanders.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.mobile-nav-item');
      const subMenu = parent.querySelector('.mobile-sub-menu');
      if (subMenu) {
        const isExpanded = subMenu.style.display === 'flex';
        subMenu.style.display = isExpanded ? 'none' : 'flex';
        btn.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

// Add CSS rule dynamically for revealed elements
const style = document.createElement('style');
style.textContent = `
  .reveal-on-scroll.revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

/* --------------------------------------------------------------------------
   4. Fast Quote Form Validation & Instant Visual Simulation
   -------------------------------------------------------------------------- */
function initQuoteFormHandling() {
  const quoteForms = document.querySelectorAll('.fast-quote-form');

  quoteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();

      if (!name || !phone || !email) {
        showToast('Please fill out all required contact fields.', 'error');
        return;
      }

      // Visual success state replacing form content temporarily
      const formCard = form.closest('.fast-quote-card') || form;
      const originalHTML = formCard.innerHTML;

      formCard.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <div style="width: 64px; height: 64px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 style="font-size: 1.8rem; color: #0B132B; margin-bottom: 0.5rem; font-family: var(--font-heading);">Quote Request Received!</h3>
          <p style="font-size: 1rem; color: #334155; margin-bottom: 1.5rem; line-height: 1.5;">
            Thank you, <strong>${escapeHTML(name)}</strong>. An Altair sign specialist will review your project specs and contact you within <strong>24 business hours</strong>.
          </p>
          <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; font-size: 0.9rem; color: #64748B; margin-bottom: 1.5rem; border: 1px solid #E2E8F0;">
            Immediate need? Call our Smyrna office directly at <a href="tel:7709441114" style="color: #0073BA; font-weight: 700;">(770) 944-1114</a>.
          </div>
          <button class="btn btn-outline-dark btn-sm reset-form-btn">Submit Another Request</button>
        </div>
      `;

      showToast('Quote request submitted successfully!', 'success');

      // Allow reset
      const resetBtn = formCard.querySelector('.reset-form-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          formCard.innerHTML = originalHTML;
          initQuoteFormHandling();
        });
      }
    });
  });
}

/* Helper escape HTML */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   5. Toast Notification Banner System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: ${type === 'error' ? '#EF4444' : '#0B132B'};
    color: white;
    padding: 0.9rem 1.4rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    border-left: 5px solid ${type === 'error' ? '#991B1B' : '#FF5500'};
    pointer-events: auto;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
  `;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* --------------------------------------------------------------------------
   6. Universal Modal Event Listeners
   -------------------------------------------------------------------------- */
function initModalListeners() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const modalCloses = document.querySelectorAll('.modal-close, .modal-backdrop');
  modalCloses.forEach(close => {
    close.addEventListener('click', (e) => {
      if (e.target === close || close.classList.contains('modal-close')) {
        const modal = close.closest('.modal-backdrop');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}
