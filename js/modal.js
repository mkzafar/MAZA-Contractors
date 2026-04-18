/* ============================================================
   modal.js — quote modal open/close + Web3Forms submit
   ============================================================ */

(function () {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;

  const openers = document.querySelectorAll('[data-open-modal]');
  const closers = modal.querySelectorAll('[data-close-modal]');
  const form    = document.getElementById('quoteForm');
  const success = document.getElementById('quoteSuccess');

  let lastFocused = null;

  /* ---------- open / close ---------- */

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

  /* ---------- form submit via Web3Forms ---------- */

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic required-field check
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('field-error');
        } else {
          input.classList.remove('field-error');
        }
      });
      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

      try {
        // Use FormData — Web3Forms recommended approach for vanilla JS
        const formData = new FormData(form);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData          // Do NOT set Content-Type header; browser sets it with boundary
        });

        const result = await response.json();

        if (result.success) {
          form.reset();
          form.style.display = 'none';
          success.hidden = false;

          // Reset form after 5 seconds so it's ready if they reopen
          setTimeout(() => {
            form.style.display = '';
            success.hidden = true;
          }, 5000);
        } else {
          alert('Something went wrong. Please try again or call us at (647) 564-7144.');
          console.error('Web3Forms error:', result);
        }
      } catch (err) {
        alert('Network error. Please try again or call us at (647) 564-7144.');
        console.error('Fetch error:', err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
})();