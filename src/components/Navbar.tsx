import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0px); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes fadeInStagger {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .nav-glow {
          position: relative;
        }
        .nav-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
        }
        .active-link {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.15));
          color: #60a5fa;
        }
        .drawer-enter {
          animation: slideInRight 0.3s ease-out forwards;
        }
        .drawer-exit {
          animation: slideOutRight 0.3s ease-in forwards;
        }
        .drawer-overlay {
          backdrop-filter: blur(8px);
          background: rgba(0, 0, 0, 0.5);
        }
        
        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .mobile-drawer {
            width: 100vw;
          }
        }
        
        /* Touch improvements */
        .touch-target {
          min-height: 44px;
          min-width: 44px;
        }
      `}</style>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-1 sm:py-2' : 'py-2 sm:py-4'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Main Navigation Container */}
          <div 
            className={`nav-glow flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 lg:px-6 rounded-xl sm:rounded-2xl transition-all duration-700 ${
              scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
            }`}
            style={{
              background: scrolled 
                ? 'rgb(9, 9, 10)' 
                : 'rgba(11, 16, 26, 1)',
              boxShadow: scrolled 
                ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Logo/Brand */}
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-all duration-300 touch-target flex items-center justify-center">
              MB
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="relative px-3 lg:px-4 py-2 text-gray-300 font-medium rounded-lg lg:rounded-xl transition-all duration-300 hover:text-white hover:scale-105 group touch-target flex items-center justify-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm lg:text-base">{item.label}</span>
                  
                  {/* Hover background */}
                  <div className="absolute inset-0 rounded-lg lg:rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                  
                  {/* Active indicator dot */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 z-50 touch-target flex items-center justify-center"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 z-40 drawer-overlay"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              
              {/* Drawer */}
              <div className={`fixed top-0 right-0 h-full z-50 drawer-enter ${
                window.innerWidth < 640 ? 'mobile-drawer' : 'w-72 sm:w-80'
              }`}>
                <div 
                  className="h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRight: 'none'
                  }}
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                      MB
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 touch-target flex items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="space-y-1 sm:space-y-2">
                      {navItems.map((item, index) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className="group flex items-center px-3 sm:px-4 py-3 sm:py-4 text-gray-300 font-medium rounded-lg sm:rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 touch-target"
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeInStagger 0.5s ease-out forwards',
                            opacity: 0
                          }}
                        >
                          <span className="text-base sm:text-lg">{item.label}</span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
