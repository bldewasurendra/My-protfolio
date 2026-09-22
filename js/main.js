/* ==========================================================================
   PORTFOLIO LOGIC & INTERACTIVE CONTROLLERS
   Bhagya Lenmini Dewasurendra - Software Engineering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Theme Management (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // 2. Sticky Navbar & Scroll Progress
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollY > 450) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    highlightActiveNavLink();
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Scroll Spy Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 4. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // 5. Dynamic Project Rendering from Data Store
  const projectsGrid = document.getElementById('projects-grid');

  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;

    const allProjects = typeof getAllProjects === 'function' ? getAllProjects() : [];
    projectsGrid.innerHTML = '';

    allProjects.forEach(project => {
      if (filter !== 'all' && project.category !== filter) {
        return;
      }

      const card = document.createElement('article');
      card.className = 'glass-card project-card';
      card.setAttribute('data-category', project.category);
      card.setAttribute('data-id', project.id);

      const techTagsHtml = project.techStack.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('');
      const featuresHtml = (project.keyFeatures || []).map(f => `
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${escapeHtml(f)}</span>
        </li>
      `).join('');

      // Determine if this is a custom (editable/deletable) project stored in localStorage
      const customProjects = JSON.parse(localStorage.getItem('custom-projects') || '[]');
      const isCustom = customProjects.some(p => p.id === project.id);
      // Built-in projects can also be overridden into localStorage for editing
      const isEditable = true; // allow edit/delete on ALL projects

      const adminBarHtml = `
        <div class="project-admin-bar">
          <button class="btn-admin-edit" onclick="openEditProjectModal('${escapeHtml(project.id)}')" title="Edit this project">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </button>
          <button class="btn-admin-delete" onclick="confirmDeleteProject('${escapeHtml(project.id)}', '${escapeHtml(project.title)}')" title="Delete this project">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
            Delete
          </button>
        </div>
      `;

      card.innerHTML = `
        <div class="project-image-box">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-thumbnail" onerror="this.src='assets/images/moodcast.jpg'">
          <span class="project-category-badge">${escapeHtml(project.categoryBadge || project.category)}</span>
          ${isCustom ? '<span class="custom-project-badge">Custom</span>' : ''}
        </div>
        <div class="project-content">
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <div class="project-tech-stack">
            ${techTagsHtml}
          </div>
          <p class="project-desc">${escapeHtml(project.shortDesc)}</p>
          <ul class="project-features-list">
            ${featuresHtml}
          </ul>
          <div class="project-actions">
            <button onclick="openProjectModal('${escapeHtml(project.id)}')" class="btn btn-primary" style="flex-grow: 1;">
              View Details
            </button>
            <a href="${escapeHtml(project.github || 'https://github.com/bldewasurendra')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="View on GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
          ${adminBarHtml}
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Helper to escape HTML and prevent XSS
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial render
  renderProjects();

  // 6. Project Filtering Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderProjects(filterValue);
    });
  });

  // 7. Project Modal Details
  const projectModalBackdrop = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  window.openProjectModal = function (projectId) {
    const project = typeof getProjectById === 'function' ? getProjectById(projectId) : null;
    if (!project || !projectModalBackdrop || !projectModalBody) return;

    const detailedFeatures = project.detailedFeatures || project.keyFeatures || [];

    projectModalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="position: relative; border-radius: 14px; overflow: hidden; max-height: 380px;">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/moodcast.jpg'">
          <span class="project-category-badge">${escapeHtml(project.categoryBadge || project.category)}</span>
        </div>
        <div>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">${escapeHtml(project.title)}</h2>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 1.25rem;">
            ${escapeHtml(project.overview || project.shortDesc)}
          </p>
          
          <h4 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan); margin-bottom: 0.75rem;">Technology Stack</h4>
          <div class="project-tech-stack" style="margin-bottom: 1.5rem;">
            ${project.techStack.map(s => `<span class="tech-tag">${escapeHtml(s)}</span>`).join('')}
          </div>

          <h4 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan); margin-bottom: 0.75rem;">Key Engineering Features</h4>
          <ul class="project-features-list" style="margin-bottom: 2rem;">
            ${detailedFeatures.map(f => `
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${escapeHtml(f)}</span>
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${escapeHtml(project.github || 'https://github.com/bldewasurendra')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View Repository
            </a>
            ${project.demo && project.demo !== '#' ? `
              <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live Demo
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    projectModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  function closeProjectModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // 8. Add New Project Modal Controller
  const addProjectModal = document.getElementById('add-project-modal');
  const addProjectClose = document.getElementById('add-project-modal-close');
  const addProjectForm = document.getElementById('add-project-form');
  const projectImgInput = document.getElementById('new-project-image-file');
  const imagePreview = document.getElementById('new-project-image-preview');
  let selectedImageDataUrl = '';

  window.openAddProjectModal = function () {
    if (addProjectModal) {
      addProjectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (addProjectClose) {
    addProjectClose.addEventListener('click', closeAddProjectModal);
  }

  function closeAddProjectModal() {
    if (addProjectModal) {
      addProjectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Handle local image file upload preview
  if (projectImgInput) {
    projectImgInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          selectedImageDataUrl = evt.target.result;
          if (imagePreview) {
            imagePreview.src = selectedImageDataUrl;
            imagePreview.style.display = 'block';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (addProjectForm) {
    addProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('new-project-title').value.trim();
      const category = document.getElementById('new-project-category').value;
      const categoryBadge = document.getElementById('new-project-badge').value.trim() || category;
      const techStackStr = document.getElementById('new-project-tech').value.trim();
      const shortDesc = document.getElementById('new-project-short-desc').value.trim();
      const featuresStr = document.getElementById('new-project-features').value.trim();
      const github = document.getElementById('new-project-github').value.trim() || 'https://github.com/bldewasurendra';
      const demo = document.getElementById('new-project-demo').value.trim() || '#';
      const imgPathInput = document.getElementById('new-project-image-path').value.trim();

      const image = selectedImageDataUrl || imgPathInput || 'assets/images/moodcast.jpg';
      const techStack = techStackStr.split(',').map(s => s.trim()).filter(Boolean);
      const keyFeatures = featuresStr.split('\n').map(s => s.trim()).filter(Boolean);

      const newProject = {
        id: 'proj_' + Date.now(),
        title,
        category,
        categoryBadge,
        image,
        techStack,
        shortDesc,
        keyFeatures,
        overview: shortDesc,
        detailedFeatures: keyFeatures,
        github,
        demo
      };

      // Save to localStorage for instant persistence
      const currentCustom = JSON.parse(localStorage.getItem('custom-projects') || '[]');
      currentCustom.unshift(newProject);
      localStorage.setItem('custom-projects', JSON.stringify(currentCustom));

      // Refresh project display
      renderProjects();

      // Show generated code snippet in modal so user can also copy to js/projects-data.js
      const snippet = JSON.stringify(newProject, null, 2);
      navigator.clipboard.writeText(snippet).catch(() => {});

      closeAddProjectModal();
      addProjectForm.reset();
      selectedImageDataUrl = '';
      if (imagePreview) imagePreview.style.display = 'none';

      showToast(`Success! "${title}" added to your portfolio.`);
    });
  }

  // 9. CV Modal Management
  const cvModal = document.getElementById('cv-modal');
  const cvModalClose = document.getElementById('cv-modal-close');
  const printCvBtn = document.getElementById('print-cv-btn');

  window.openCvModal = function () {
    if (cvModal) {
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (cvModalClose) {
    cvModalClose.addEventListener('click', closeCvModal);
  }

  function closeCvModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 8b. EDIT PROJECT MODAL CONTROLLER
  // =========================================================================
  const editProjectModal = document.getElementById('edit-project-modal');
  const editProjectClose = document.getElementById('edit-project-modal-close');
  const editProjectForm = document.getElementById('edit-project-form');
  const editImgInput = document.getElementById('edit-project-image-file');
  const editImgPreview = document.getElementById('edit-project-image-preview');
  let editSelectedImageDataUrl = '';

  // Open edit modal and pre-populate fields
  window.openEditProjectModal = function (projectId) {
    const project = typeof getProjectById === 'function' ? getProjectById(projectId) : null;
    if (!project || !editProjectModal) return;

    // Populate form
    document.getElementById('edit-project-id').value = project.id;
    document.getElementById('edit-project-title').value = project.title || '';
    document.getElementById('edit-project-category').value = project.category || 'mobile';
    document.getElementById('edit-project-badge').value = project.categoryBadge || '';
    document.getElementById('edit-project-tech').value = (project.techStack || []).join(', ');
    document.getElementById('edit-project-short-desc').value = project.shortDesc || '';
    document.getElementById('edit-project-features').value = (project.keyFeatures || []).join('\n');
    document.getElementById('edit-project-github').value = project.github || '';
    document.getElementById('edit-project-demo').value = project.demo || '';

    // Show current image preview
    if (editImgPreview && project.image) {
      editImgPreview.src = project.image;
      editImgPreview.style.display = 'block';
    }

    document.getElementById('edit-project-image-path').value = project.image || '';
    editSelectedImageDataUrl = '';

    editProjectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (editProjectClose) {
    editProjectClose.addEventListener('click', closeEditProjectModal);
  }

  function closeEditProjectModal() {
    if (editProjectModal) {
      editProjectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Preview newly uploaded image in edit modal
  if (editImgInput) {
    editImgInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          editSelectedImageDataUrl = evt.target.result;
          if (editImgPreview) {
            editImgPreview.src = editSelectedImageDataUrl;
            editImgPreview.style.display = 'block';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle edit form submission
  if (editProjectForm) {
    editProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = document.getElementById('edit-project-id').value;
      const title = document.getElementById('edit-project-title').value.trim();
      const category = document.getElementById('edit-project-category').value;
      const categoryBadge = document.getElementById('edit-project-badge').value.trim() || category;
      const techStack = document.getElementById('edit-project-tech').value.trim().split(',').map(s => s.trim()).filter(Boolean);
      const shortDesc = document.getElementById('edit-project-short-desc').value.trim();
      const keyFeatures = document.getElementById('edit-project-features').value.trim().split('\n').map(s => s.trim()).filter(Boolean);
      const github = document.getElementById('edit-project-github').value.trim() || 'https://github.com/bldewasurendra';
      const demo = document.getElementById('edit-project-demo').value.trim() || '#';
      const imgPathInput = document.getElementById('edit-project-image-path').value.trim();
      const image = editSelectedImageDataUrl || imgPathInput || 'assets/images/moodcast.jpg';

      // Check if this project exists in custom localStorage projects
      let customProjects = JSON.parse(localStorage.getItem('custom-projects') || '[]');
      const customIdx = customProjects.findIndex(p => p.id === id);

      if (customIdx !== -1) {
        // Update existing custom project
        customProjects[customIdx] = {
          ...customProjects[customIdx],
          title, category, categoryBadge, techStack, shortDesc, keyFeatures,
          overview: shortDesc, detailedFeatures: keyFeatures, github, demo, image
        };
      } else {
        // Built-in project: save an edited copy in custom-projects so it persists
        const updatedProject = {
          id, title, category, categoryBadge, techStack, shortDesc, keyFeatures,
          overview: shortDesc, detailedFeatures: keyFeatures, github, demo, image
        };
        customProjects.unshift(updatedProject);
      }

      localStorage.setItem('custom-projects', JSON.stringify(customProjects));
      renderProjects();
      closeEditProjectModal();
      showToast(`"${title}" has been updated successfully!`);
    });
  }

  // =========================================================================
  // 8c. DELETE PROJECT CONTROLLER
  // =========================================================================
  const deleteConfirmDialog = document.getElementById('delete-confirm-dialog');
  const deleteConfirmCancel = document.getElementById('delete-confirm-cancel');
  const deleteConfirmOk = document.getElementById('delete-confirm-ok');
  let pendingDeleteId = null;

  window.confirmDeleteProject = function (projectId, projectTitle) {
    pendingDeleteId = projectId;
    const msgEl = document.getElementById('delete-confirm-message');
    if (msgEl) {
      msgEl.textContent = `Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`;
    }
    if (deleteConfirmDialog) {
      deleteConfirmDialog.classList.add('active');
    }
  };

  function closeDeleteDialog() {
    if (deleteConfirmDialog) {
      deleteConfirmDialog.classList.remove('active');
    }
    pendingDeleteId = null;
  }

  if (deleteConfirmCancel) {
    deleteConfirmCancel.addEventListener('click', closeDeleteDialog);
  }

  if (deleteConfirmOk) {
    deleteConfirmOk.addEventListener('click', () => {
      if (!pendingDeleteId) return;

      let customProjects = JSON.parse(localStorage.getItem('custom-projects') || '[]');
      const beforeCount = customProjects.length;
      customProjects = customProjects.filter(p => p.id !== pendingDeleteId);

      if (customProjects.length < beforeCount) {
        // Was a custom project — fully removed
        localStorage.setItem('custom-projects', JSON.stringify(customProjects));
        showToast('Project removed from your portfolio.');
      } else {
        // Built-in project: add to a "hidden" list to suppress it from rendering
        const hidden = JSON.parse(localStorage.getItem('hidden-projects') || '[]');
        if (!hidden.includes(pendingDeleteId)) {
          hidden.push(pendingDeleteId);
          localStorage.setItem('hidden-projects', JSON.stringify(hidden));
        }
        showToast('Project hidden from your portfolio.');
      }

      closeDeleteDialog();
      renderProjects();
    });
  }

  // Close delete dialog on backdrop click
  if (deleteConfirmDialog) {
    deleteConfirmDialog.addEventListener('click', (e) => {
      if (e.target === deleteConfirmDialog) closeDeleteDialog();
    });
  }

  // Close modals on escape key or clicking backdrop
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCvModal();
      closeAddProjectModal();
      closeEditProjectModal();
      closeDeleteDialog();
    }
  });

  [projectModalBackdrop, cvModal, addProjectModal, editProjectModal].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeProjectModal();
          closeCvModal();
          closeAddProjectModal();
          closeEditProjectModal();
        }
      });
    }
  });

  // 10. Contact Form Handling with Direct Email Integration
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim() || 'Software Engineering Inquiry';
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      if (formSubmitBtn) {
        const originalText = formSubmitBtn.innerHTML;
        formSubmitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite;" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Opening Email Client...
        `;
        formSubmitBtn.disabled = true;

        setTimeout(() => {
          // Construct mailto link
          const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          const mailtoUrl = `mailto:lenminibhagya@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
          
          window.location.href = mailtoUrl;

          formSubmitBtn.innerHTML = originalText;
          formSubmitBtn.disabled = false;
          contactForm.reset();
          showToast("Thank you! Opening your email app to send message to lenminibhagya@gmail.com");
        }, 800);
      }
    });
  }

  // 11. Toast Notification System
  window.showToast = function (message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  };

  // 12. Copy to Clipboard Utility
  window.copyText = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast(`Copied ${label} to clipboard!`);
    });
  };
});
