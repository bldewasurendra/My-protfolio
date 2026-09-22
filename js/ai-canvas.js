/* ==========================================================================
   AI SYNAPTIC NETWORK / NEURAL MESH CANVAS
   High-performance particle system simulating AI neural connections
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('ai-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Theme-aware colors
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      nodeColor: isDark ? 'rgba(99, 102, 241, 0.7)' : 'rgba(79, 70, 229, 0.6)',
      synapseColor: isDark ? '99, 102, 241' : '79, 70, 229',
      activeColor: isDark ? '#06b6d4' : '#2563eb',
      glow: isDark
    };
  }

  // Particle representation (AI Synapse / Node)
  class Node {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.radius = Math.random() * 2 + 1.2;
      this.baseRadius = this.radius;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Pulse size slightly
      this.pulse += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.6;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.8;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
        }
      }
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.nodeColor;
      if (colors.glow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors.activeColor;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
  }

  // Initialize Canvas & Nodes
  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // Density based on screen size (limit on mobile for high FPS)
    const count = Math.min(Math.floor((width * height) / 14000), 75);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Node());
    }
  }

  // Connect close synaptic nodes
  function connect(colors) {
    const maxDist = 135;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / maxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${colors.synapseColor}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - particles[i].x;
        const mdy = mouse.y - particles[i].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mOpacity = (1 - mdist / mouse.radius) * 0.55;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${colors.synapseColor}, ${mOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColors();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(colors);
    }
    connect(colors);

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when tab hidden to preserve battery & CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  // Boot up
  init();
  animate();
})();
