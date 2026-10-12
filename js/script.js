/**
 * Root Node — Editorial Interaction Scripts
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // 2. Reading Progress Indicator
  const progressBar = document.getElementById('reading-progress');
  const articleContent = document.querySelector('.prose-content');

  if (progressBar && articleContent) {
    window.addEventListener('scroll', () => {
      const articleRect = articleContent.getBoundingClientRect();
      const articleTop = window.scrollY + articleRect.top;
      const articleHeight = articleContent.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY;

      if (scrollPos < articleTop) {
        progressBar.style.width = '0%';
      } else if (scrollPos > articleTop + articleHeight - windowHeight) {
        progressBar.style.width = '100%';
      } else {
        const scrolled = (scrollPos - articleTop) / (articleHeight - windowHeight);
        progressBar.style.width = `${Math.min(100, Math.max(0, scrolled * 100))}%`;
      }
    }, { passive: true });
  }

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Table of Contents Scrollspy Active State
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('.prose-content h2[id]');

  if (tocLinks.length > 0 && headings.length > 0) {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(heading => observer.observe(heading));
  }

  // 5. Blog Archive Search & Category Filtering
  const searchInput = document.getElementById('archive-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-feed-grid .article-card');
  const noResultsNotice = document.getElementById('no-results');

  if (articleCards.length > 0 && (searchInput || filterButtons.length > 0)) {
    let activeCategory = 'all';
    let searchQuery = '';

    const filterArticles = () => {
      let visibleCount = 0;

      articleCards.forEach(card => {
        const cardCategory = card.dataset.category ? card.dataset.category.toLowerCase() : '';
        const cardTitle = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const cardExcerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';

        const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
        const matchesSearch = (!searchQuery || cardTitle.includes(searchQuery) || cardExcerpt.includes(searchQuery));

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsNotice) {
        noResultsNotice.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterArticles();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category.toLowerCase();
        filterArticles();
      });
    });
  }

  // 6. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(197, 94, 64, 0.15)';
        formFeedback.style.border = '1px solid var(--accent-rust)';
        formFeedback.style.color = '#F4F3EE';
        return;
      }

      // Successful simulated submission
      formFeedback.textContent = 'Thank you for reaching out. Your message has been prepared for dispatch.';
      formFeedback.className = 'form-feedback success';
      contactForm.reset();
    });
  }

  // 7. Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const msg = form.querySelector('.newsletter-msg');
      if (emailInput && emailInput.value) {
        if (msg) {
          msg.textContent = 'Subscription recorded. Root Node does not sell or share reader addresses.';
          msg.style.display = 'block';
          msg.style.color = 'var(--accent-sage)';
          msg.style.fontSize = '0.85rem';
          msg.style.marginTop = '0.75rem';
        }
        emailInput.value = '';
      }
    });
  });
});
