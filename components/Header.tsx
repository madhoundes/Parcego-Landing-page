
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#steps' },
    { name: 'Pricing', href: '#calculator' },
    { name: 'Track your shipment', href: 'https://www.parcego.com/track-package' },
    { name: 'Log In', href: 'https://www.parcego.com/login' },
  ];

  // Initialize ScrollSpy
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Active when the section is in the top half of the viewport, accounting for header offset
      rootMargin: '-100px 0px -50% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections that might be nav targets
    navLinks.forEach((link) => {
      if (link.href.startsWith('#')) {
        const id = link.href.replace('#', '');
        if (id) {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
        }
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scroll for valid internal anchors
    if (!href.startsWith('#') || href === '#') return;
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      e.preventDefault();
      // Close mobile menu immediately
      setIsOpen(false);

      // Update URL hash without causing a page jump
      window.history.pushState(null, '', href);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Scroll to the element
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      // Accessibility: Move focus to the section
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      
      element.focus({ preventScroll: true });
    }
  }, []);

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-slate-200 shadow-sm' 
          : 'bg-white/0 border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', ' ');
            }}
            className="flex-shrink-0 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            aria-label="Parcego Home"
          >
            <img 
              src="https://www.parcego.com/Logo/Master-logo.svg" 
              alt="Parcego" 
              className="h-[50px] w-auto object-contain" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => {
              // Special styling for Log In button (Primary)
              if (link.name === 'Log In') {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="ml-2 inline-flex items-center justify-center px-7 py-2.5 text-base font-bold text-white transition-all duration-200 bg-brand-600 rounded-full hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    {link.name}
                  </a>
                );
              }

              // Special styling for Track your shipment (Secondary)
              if (link.name === 'Track your shipment') {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                  >
                    {link.name}
                  </a>
                );
              }

              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative font-medium text-sm transition-colors group py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-md px-1 ${
                    isActive && link.href.startsWith('#') ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
                  }`}
                  aria-current={isActive && link.href.startsWith('#') ? 'page' : undefined}
                >
                  {link.name}
                  {link.href.startsWith('#') && (
                    <span className={`absolute left-0 bottom-0 h-0.5 bg-brand-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl overflow-hidden"
        >
          <nav className="px-4 pt-2 pb-6 flex flex-col space-y-2">
            {navLinks.map((link) => {
               // Special rendering for Mobile Log In
               if (link.name === 'Log In') {
                 return (
                   <div key={link.name} className="pt-4">
                    <a
                      href={link.href}
                      className="block w-full text-center px-6 py-3.5 text-lg font-bold text-white bg-brand-600 rounded-full shadow-lg shadow-brand-500/30 hover:bg-brand-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                      {link.name}
                    </a>
                   </div>
                 );
               }

               // Special rendering for Mobile Track Link
               if (link.name === 'Track your shipment') {
                 return (
                   <div key={link.name} className="pt-2">
                    <a
                      href={link.href}
                      className="block w-full text-center px-6 py-3 text-base font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {link.name}
                    </a>
                   </div>
                 );
               }

               const isActive = activeSection === link.href.substring(1);
               return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive && link.href.startsWith('#')
                      ? 'text-brand-600 bg-brand-50' 
                      : 'text-slate-700 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                  aria-current={isActive && link.href.startsWith('#') ? 'page' : undefined}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
