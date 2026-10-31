/**
 * Keso (@obsurv) &mdash; Apple Minimalist Portfolio Engine
 * AI Specialist Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SMOOTH SCROLL REVEAL (APPLE SYSTEM)
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 2. CAPCUT CINEMA VIDEO PLAYER
  // =========================================================================
  const video = document.getElementById('capcutVideo');
  const frame = document.querySelector('.cinema-player-frame');
  const playBtn = document.getElementById('playBtn');

  if (video && frame && playBtn) {
    function togglePlay() {
      if (video.paused) {
        video.play().then(() => {
          frame.classList.add('playing');
        }).catch(err => {
          console.log('Playback error:', err);
        });
      } else {
        video.pause();
        frame.classList.remove('playing');
      }
    }

    frame.addEventListener('click', togglePlay);

    video.addEventListener('ended', () => {
      frame.classList.remove('playing');
    });

    video.addEventListener('pause', () => {
      frame.classList.remove('playing');
    });

    video.addEventListener('play', () => {
      frame.classList.add('playing');
    });
  }

  // =========================================================================
  // 2.5 YOUTUBE CLICK-TO-PLAY PLAYER (AVOIDS LOCAL CONFIGURATION ERRORS)
  // =========================================================================
  const ytContainer = document.getElementById('ytPlayerContainer');

  if (ytContainer) {
    function loadYouTubePlayer() {
      if (ytContainer.classList.contains('yt-active')) return;
      const videoId = ytContainer.dataset.videoid || 'bOkgfXKpKh8';
      ytContainer.classList.add('yt-active');
      ytContainer.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1" 
          title="Infinite Harvest Roblox Showcase" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      `;
    }

    ytContainer.addEventListener('click', (e) => {
      // Don't intercept direct link clicks
      if (e.target.closest('.yt-direct-pill')) return;
      loadYouTubePlayer();
    });
  }

  // =========================================================================
  // 3. COPY DISCORD HANDLE
  // =========================================================================
  const copyDiscordBtn = document.getElementById('copyDiscordBtn');
  const discordBtnText = document.getElementById('discordBtnText');

  if (copyDiscordBtn) {
    copyDiscordBtn.addEventListener('click', async () => {
      const handle = '@obsurv';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(handle);
        } else {
          const ta = document.createElement('textarea');
          ta.value = handle;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }

        copyDiscordBtn.classList.add('copied');
        if (discordBtnText) discordBtnText.textContent = '✓ Copied @obsurv';

        setTimeout(() => {
          copyDiscordBtn.classList.remove('copied');
          if (discordBtnText) discordBtnText.textContent = 'Copy Discord Handle';
        }, 2200);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  // =========================================================================
  // 4. SMOOTH SCROLLING FOR ALL NAV LINKS
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
