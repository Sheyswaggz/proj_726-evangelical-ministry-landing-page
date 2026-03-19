/**
 * EVANGELICAL MINISTRY LANDING PAGE - INTERACTIVE JAVASCRIPT
 * Vanilla JavaScript functionality for smooth scrolling, scroll-triggered animations,
 * mobile menu toggle, and performance optimizations.
 * @version 1.0.0
 */

(function() {
  'use strict';

  // Configuration constants
  const CONFIG = {
    ANIMATION_DELAY: 100,
    OBSERVER_THRESHOLD: 0.1,
    OBSERVER_ROOT_MARGIN: '0px 0px -50px 0px',
    SMOOTH_SCROLL_BEHAVIOR: 'smooth',
    DEBOUNCE_DELAY: 150,
  };

  // State management
  const state = {
    isReducedMotion: false,
    isMobileMenuOpen: false,
    scrollY: 0,
  };

  /**
   * Utility: Check for prefers-reduced-motion setting
   * @returns {boolean} True if user prefers reduced motion
   */
  function prefersReducedMotion() {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mediaQuery.matches;
    } catch (error) {
      console.error('Error checking reduced motion preference:', error);
      return false;
    }
  }

  /**
   * Utility: Debounce function for performance optimization
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Initialize smooth scrolling for anchor links
   * Provides accessible keyboard navigation and screen reader support
   */
  function initSmoothScroll() {
    try {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');

      if (!anchorLinks.length) {
        console.log('No anchor links found for smooth scrolling');
        return;
      }

      anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
          event.preventDefault();

          const targetId = this.getAttribute('href');

          // Handle empty hash
          if (targetId === '#' || targetId === '#!') {
            return;
          }

          const targetElement = document.querySelector(targetId);

          if (!targetElement) {
            console.warn('Target element not found:', targetId);
            return;
          }

          // Smooth scroll with fallback for older browsers
          if (state.isReducedMotion) {
            targetElement.scrollIntoView({ block: 'start' });
          } else {
            targetElement.scrollIntoView({
              behavior: CONFIG.SMOOTH_SCROLL_BEHAVIOR,
              block: 'start',
            });
          }

          // Update focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });

          // Remove tabindex after focus for proper tab order
          setTimeout(function() {
            targetElement.removeAttribute('tabindex');
          }, 1000);

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        });
      });

      console.log('Smooth scrolling initialized for', anchorLinks.length, 'links');
    } catch (error) {
      console.error('Error initializing smooth scroll:', error);
    }
  }

  /**
   * Initialize scroll-triggered fade-in animations using Intersection Observer API
   * Respects prefers-reduced-motion and provides fallback
   */
  function initScrollAnimations() {
    try {
      // Skip animations if reduced motion is preferred
      if (state.isReducedMotion) {
        console.log('Animations disabled due to prefers-reduced-motion setting');
        return;
      }

      // Check for Intersection Observer support
      if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer not supported, animations disabled');
        return;
      }

      const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');

      if (!animatedElements.length) {
        console.log('No elements found for scroll animations');
        return;
      }

      const observerOptions = {
        threshold: CONFIG.OBSERVER_THRESHOLD,
        rootMargin: CONFIG.OBSERVER_ROOT_MARGIN,
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
          if (entry.isIntersecting) {
            // Stagger animation for multiple elements
            const delay = index * CONFIG.ANIMATION_DELAY;

            setTimeout(function() {
              entry.target.classList.add('visible');

              // Log for debugging
              console.log('Element animated:', entry.target.className);
            }, delay);

            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all animated elements
      animatedElements.forEach(function(element) {
        observer.observe(element);
      });

      console.log('Scroll animations initialized for', animatedElements.length, 'elements');
    } catch (error) {
      console.error('Error initializing scroll animations:', error);
    }
  }

  /**
   * Initialize mobile menu toggle functionality
   * Provides keyboard accessibility and proper ARIA attributes
   */
  function initMobileMenu() {
    try {
      const menuToggle = document.querySelector('[data-menu-toggle]');
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      const body = document.body;

      if (!menuToggle || !mobileMenu) {
        console.log('Mobile menu elements not found');
        return;
      }

      /**
       * Toggle mobile menu open/close
       */
      function toggleMenu() {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;

        // Update classes
        body.classList.toggle('menu-open', state.isMobileMenuOpen);
        mobileMenu.classList.toggle('active', state.isMobileMenuOpen);

        // Update ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', state.isMobileMenuOpen.toString());
        mobileMenu.setAttribute('aria-hidden', (!state.isMobileMenuOpen).toString());

        // Prevent body scroll when menu is open
        if (state.isMobileMenuOpen) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }

        console.log('Mobile menu toggled:', state.isMobileMenuOpen ? 'open' : 'closed');
      }

      /**
       * Close menu when clicking outside
       */
      function handleOutsideClick(event) {
        if (state.isMobileMenuOpen &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
          toggleMenu();
        }
      }

      /**
       * Close menu on escape key
       */
      function handleEscapeKey(event) {
        if (event.key === 'Escape' && state.isMobileMenuOpen) {
          toggleMenu();
          menuToggle.focus();
        }
      }

      // Event listeners
      menuToggle.addEventListener('click', toggleMenu);
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);

      // Close menu when clicking on menu links
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (state.isMobileMenuOpen) {
            toggleMenu();
          }
        });
      });

      console.log('Mobile menu initialized');
    } catch (error) {
      console.error('Error initializing mobile menu:', error);
    }
  }

  /**
   * Initialize lazy loading for images
   * Uses native loading="lazy" with Intersection Observer fallback
   */
  function initLazyLoading() {
    try {
      // Get all images that should be lazy loaded
      const lazyImages = document.querySelectorAll('img[data-src]');

      if (!lazyImages.length) {
        console.log('No images found for lazy loading');
        return;
      }

      // Check for native lazy loading support
      if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(function(img) {
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
        });
        console.log('Native lazy loading used for', lazyImages.length, 'images');
        return;
      }

      // Fallback to Intersection Observer
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              const img = entry.target;

              // Load the image
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }

              // Clean up
              img.removeAttribute('data-src');
              img.removeAttribute('data-srcset');
              img.classList.remove('lazy');

              // Stop observing
              imageObserver.unobserve(img);

              console.log('Image lazy loaded:', img.src);
            }
          });
        }, {
          rootMargin: '50px',
        });

        lazyImages.forEach(function(img) {
          imageObserver.observe(img);
        });

        console.log('Intersection Observer lazy loading initialized for', lazyImages.length, 'images');
      } else {
        // Final fallback: load all images immediately
        lazyImages.forEach(function(img) {
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
        });
        console.warn('Lazy loading not supported, loaded all images immediately');
      }
    } catch (error) {
      console.error('Error initializing lazy loading:', error);
    }
  }

  /**
   * Initialize performance optimizations
   * Tracks scroll position and manages performance-related features
   */
  function initPerformanceOptimizations() {
    try {
      // Track scroll position with debouncing for performance
      const handleScroll = debounce(function() {
        state.scrollY = window.scrollY || window.pageYOffset;

        // Add any scroll-based performance optimizations here
        // For example: lazy load sections, update navigation state, etc.
      }, CONFIG.DEBOUNCE_DELAY);

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Track window resize with debouncing
      const handleResize = debounce(function() {
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);

        // Add any resize-based optimizations here
        // For example: update layouts, recalculate positions, etc.
      }, CONFIG.DEBOUNCE_DELAY);

      window.addEventListener('resize', handleResize, { passive: true });

      console.log('Performance optimizations initialized');
    } catch (error) {
      console.error('Error initializing performance optimizations:', error);
    }
  }

  /**
   * Apply reduced motion styles dynamically if preferred
   * Disables all animations and transitions
   */
  function applyReducedMotionStyles() {
    if (state.isReducedMotion) {
      const style = document.createElement('style');
      style.id = 'reduced-motion-styles';
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
      console.log('Reduced motion styles applied');
    }
  }

  /**
   * Initialize error handling for browser compatibility
   * Provides graceful degradation for unsupported features
   */
  function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(event) {
      console.error('Global error caught:', event.error);
      // Prevent the page from breaking on errors
      event.preventDefault();
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    });

    console.log('Error handling initialized');
  }

  /**
   * Main initialization function
   * Sets up all interactive features when DOM is ready
   */
  function init() {
    try {
      console.log('Initializing interactive features...');

      // Check for reduced motion preference
      state.isReducedMotion = prefersReducedMotion();
      console.log('Reduced motion:', state.isReducedMotion);

      // Apply reduced motion styles if needed
      applyReducedMotionStyles();

      // Initialize error handling
      initErrorHandling();

      // Initialize all features
      initSmoothScroll();
      initScrollAnimations();
      initMobileMenu();
      initLazyLoading();
      initPerformanceOptimizations();

      console.log('All interactive features initialized successfully');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  // Listen for changes to reduced motion preference
  try {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', function() {
      state.isReducedMotion = mediaQuery.matches;
      console.log('Reduced motion preference changed:', state.isReducedMotion);

      // Reload page to apply changes
      if (state.isReducedMotion) {
        applyReducedMotionStyles();
      } else {
        const reducedMotionStyles = document.getElementById('reduced-motion-styles');
        if (reducedMotionStyles) {
          reducedMotionStyles.remove();
        }
      }
    });
  } catch (error) {
    console.error('Error setting up reduced motion listener:', error);
  }

})();
