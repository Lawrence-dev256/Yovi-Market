/**
 * YOVI — Reset Link Sent  |  app.js
 * Handles: mail app links, resend, try another address, back to login.
 */
(function () {
  'use strict';

  /* ── Resend email ── */
  document.getElementById('resendBtn').addEventListener('click', function (e) {
    e.preventDefault();
    const btn = this;
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';

    setTimeout(function () {
      btn.textContent = 'Resend email';
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      showToast('Reset link resent successfully.', 'ok');
    }, 1500);
  });

  /* ── Try another address ── */
  document.getElementById('tryOtherBtn').addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Redirecting to forgot password…', 'ok');
     window.location.href = '../../auth/forget password.html';
  });

  /* ── Back to login ── */
  document.getElementById('backBtn').addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Redirecting to login…', 'ok');
     window.location.href = '../../auth/login.html'; 
  });

  /* ── Mail app rows — track clicks ── */
  ['gmailBtn', 'outlookBtn', 'yahooBtn'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function () {
        showToast('Opening ' + el.querySelector('.mail-row__label').textContent + '…', 'ok');
      });
    }
  });

  /* ── Toast ── */
  function showToast(msg, type) {
    document.querySelectorAll('.yv-toast').forEach(function (t) { t.remove(); });

    var el = document.createElement('div');
    el.className = 'yv-toast';
    el.textContent = msg;

    Object.assign(el.style, {
      position:     'fixed',
      bottom:       '28px',
      left:         '50%',
      transform:    'translateX(-50%) translateY(12px)',
      background:   type === 'ok' ? '#1aab62' : '#dc2626',
      color:        '#fff',
      padding:      '12px 24px',
      borderRadius: '999px',
      fontSize:     '13.5px',
      fontFamily:   'Inter, sans-serif',
      fontWeight:   '500',
      boxShadow:    '0 6px 20px rgba(0,0,0,.18)',
      zIndex:       '9999',
      opacity:      '0',
      transition:   'opacity .25s ease, transform .25s ease',
      whiteSpace:   'nowrap',
      maxWidth:     'calc(100vw - 32px)',
      textAlign:    'center',
    });

    document.body.appendChild(el);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity   = '1';
        el.style.transform = 'translateX(-50%) translateY(0)';
      });
    });

    setTimeout(function () {
      el.style.opacity   = '0';
      el.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(function () { el.remove(); }, 300);
    }, 3000);
  }

})();