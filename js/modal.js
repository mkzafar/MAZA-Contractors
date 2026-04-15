/* ============================================================
   modal.js — quote modal open/close + form submit
   ============================================================ */

(function () {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;

  const openers = document.querySelectorAll('[data-open-modal]');
  const closers = modal.querySelectorAll('[data-close-modal]');
  const form    = document.getElementById('quoteForm');
  const success = document.getElementById('quoteSuccess');

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => {
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  };

  openers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  }));
  closers.forEach(btn => btn.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Form submit (front-end only — wire up to your backend later)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic required-field check
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e8a23a';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (!valid) return;

      // TODO: POST to backend endpoint
      form.style.display = 'none';
      if (success) {
        success.hidden = false;
        success.style.display = 'block';
      }

      // Auto-close after 2.4s
      setTimeout(() => {
        close();
        setTimeout(() => {
          form.reset();
          form.style.display = '';
          if (success) {
            success.hidden = true;
            success.style.display = '';
          }
        }, 400);
      }, 2400);
    });
  }
})();
