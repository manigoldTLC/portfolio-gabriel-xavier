import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const logoBracketsRef = useRef<HTMLSpanElement[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  
  const themeIconRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        }
      });

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const scrollTop = self.scroll();

          const bgLight = "rgba(255, 255, 255, 0.9)";
          const bgDark = "rgba(10, 10, 10, 0.9)";
          const currentBg = theme === 'dark' ? bgDark : bgLight;

          if (scrollTop > 50) {
            gsap.to(headerRef.current, {
              backgroundColor: currentBg,
              backdropFilter: "blur(12px)",
              borderBottomColor: theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              height: "64px",
              duration: 0.3,
              ease: "power2.out"
            });
          } else {
            gsap.to(headerRef.current, {
              backgroundColor: "transparent",
              backdropFilter: "blur(0px)",
              borderBottomColor: "transparent",
              height: "90px",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    });
    return () => ctx.revert();
  }, [theme]);

  const handleMouseEnterLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!activePillRef.current) return;
    const target = e.currentTarget;
    const { offsetLeft, offsetWidth } = target;

    gsap.to(activePillRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.6)"
    });
  };

  const handleMouseLeaveNav = () => {
    if (!activePillRef.current) return;
    gsap.to(activePillRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoHover = () => {
    gsap.to(logoBracketsRef.current[0], { x: -4, duration: 0.3, ease: "back.out(2)" });
    gsap.to(logoBracketsRef.current[1], { x: 4, duration: 0.3, ease: "back.out(2)" });
  };
  const handleLogoLeave = () => {
    gsap.to(logoBracketsRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  const animateThemeToggle = () => {
    gsap.fromTo(themeIconRef.current,
      { rotation: 0, scale: 0.5, opacity: 0 },
      { 
        rotation: 360, 
        scale: 1, 
        opacity: 1, 
        duration: 0.8,
        ease: "elastic.out(1, 0.5)" 
      }
    );

    setTimeout(() => {
      toggleTheme?.();
    }, 250);
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-[90px] border-b border-transparent transition-all will-change-transform"
    >
      <div ref={progressBarRef} className="absolute bottom-0 left-0 h-[2px] w-full bg-accent origin-left scale-x-0" />

      <div className="container h-full flex items-center justify-between">
        
        <button
          onClick={() => handleNavClick('#hero')}
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
          className="font-display text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
        >
          <span ref={el => { if(el) logoBracketsRef.current[0] = el }} className="text-accent transition-transform">&lt;</span>
          Dev
          <span ref={el => { if(el) logoBracketsRef.current[1] = el }} className="text-accent transition-transform">/&gt;</span>
        </button>

        <nav 
          ref={navContainerRef}
          className="hidden md:flex items-center relative p-1 bg-secondary/0 rounded-full"
          onMouseLeave={handleMouseLeaveNav}
        >
          <div 
            ref={activePillRef}
            className="absolute top-1 bottom-1 bg-accent rounded-lg pointer-events-none opacity-0 shadow-lg shadow-accent/20"
          />

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              onMouseEnter={handleMouseEnterLink}
              className="relative px-5 py-2 text-sm font-medium text-foreground/70 hover:text-white transition-colors duration-200 z-10"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={animateThemeToggle}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors duration-300 group overflow-hidden relative"
            aria-label="Alternar tema"
          >
            <div ref={themeIconRef}>
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/70" />
              )}
            </div>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors duration-300"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-[100%] left-0 w-full h-[calc(100vh-90px)] border-t border-border bg-background transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container h-full flex flex-col justify-center gap-4">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-6 py-5 text-2xl font-display font-bold text-foreground/80 hover:text-accent hover:bg-secondary/50 rounded-2xl transition-all duration-300"
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}