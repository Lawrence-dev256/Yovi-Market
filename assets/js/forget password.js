/**
 *  Forgot Password  
 */
(function () {
  'use strict';

  const form      = document.getElementById('forgotForm');
  const emailInput = document.getElementById('emailInput');
  const sendBtn   = document.getElementById('sendBtn');
  const backBtn   = document.getElementById('backBtn');

  /* ── Validate email format ── */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  /* ── Form submit ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    /* Clear any previous error state */
    emailInput.classList.remove('input-error');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    /* Loading state */
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.2" class="spin">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83
                 M16.24 16.24l2.83 2.83M2 12h4M18 12h4
                 M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending…
    `;

    /* Simulate API call */
    setTimeout(function () {
      showSuccess(email);
    }, 1600);
  });

  /* ── Set error state ── */
  function setError(msg) {
    emailInput.classList.add('input-error');
    emailInput.focus();
    showToast(msg, 'err');
  }

  /* ── Success state ── */
  function showSuccess(email) {
    sendBtn.disabled = false;
    sendBtn.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.4"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Link Sent!
    `;
    sendBtn.style.background = '#148f50';
    showToast('✓ Reset link sent to ' + email, 'ok');

    /* Reset button after 4s */
    setTimeout(function () {
      sendBtn.innerHTML = `
        Send Reset Link
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.4"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      `;
      sendBtn.style.background = '';

      // goes to check your email page first

      window.location.href="../../auth/email-verification.html";
      
    }, 4000);
  }

  /* ── Back to login ── */
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Redirecting to login…', 'ok');
    window.location.href = '../../auth/login.html'; 
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
    }, 3200);
  }

  /* ── Spin keyframe injected once ── */
  var style = document.createElement('style');
  style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 0.85s linear infinite; display: inline-block; }
    .fp-input.input-error {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12) !important;
    }
  `;
  document.head.appendChild(style);

})();