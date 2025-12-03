import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Code2, Layers, Zap, Terminal } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const cardMainRef = useRef<HTMLDivElement>(null);
  const cardCodeRef = useRef<HTMLDivElement>(null);
  const floatingIcon1Ref = useRef<HTMLDivElement>(null);
  const floatingIcon2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const scrollWheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set([subtitleRef.current, ctaRef.current], { y: 20, autoAlpha: 0 });
      gsap.set([cardMainRef.current, cardCodeRef.current], { scale: 0.8, autoAlpha: 0, rotationY: 15, x: 50 });
      gsap.set([floatingIcon1Ref.current, floatingIcon2Ref.current], { scale: 0, autoAlpha: 0 });

      tl.fromTo(
        titleWordsRef.current,
        { y: 100, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { y: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, stagger: 0.15 }
      )
      .to([subtitleRef.current, ctaRef.current], {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1
      }, "-=0.5")
      
      .to(cardMainRef.current, {
        scale: 1, autoAlpha: 1, x: 0, rotationY: -10, duration: 1.2, ease: "elastic.out(1, 0.75)"
      }, "-=1")
      .to(cardCodeRef.current, {
        scale: 1, autoAlpha: 1, x: 0, rotationY: 10, duration: 1.2, ease: "elastic.out(1, 0.75)"
      }, "-=1")
      .to([floatingIcon1Ref.current, floatingIcon2Ref.current], {
        scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)"
      }, "-=0.8");

      gsap.to(cardMainRef.current, { y: -15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(cardCodeRef.current, { y: 15, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to([floatingIcon1Ref.current, floatingIcon2Ref.current], { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
      gsap.to(glowRef.current, { scale: 1.2, opacity: 0.6, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

      gsap.to(scrollWheelRef.current, {
        y: 12,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power1.inOut"
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!visualContainerRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(cardMainRef.current, { rotationY: -10 + (x * 5), rotationX: -y * 5, x: x * 20, y: y * 20, duration: 1 });
        gsap.to(cardCodeRef.current, { rotationY: 10 + (x * 8), rotationX: -y * 8, x: -x * 30, y: -y * 30 + 100, duration: 1 });
        gsap.to(glowRef.current, { x: -x * 50, y: -y * 50, duration: 2 });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCTA = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToTitleRefs = (el: HTMLSpanElement | null) => {
    if (el && !titleWordsRef.current.includes(el)) {
      titleWordsRef.current.push(el);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 pb-20 md:pt-0 md:pb-0 overflow-hidden"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 md:space-y-10 z-20 relative">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl leading-[1.1] text-foreground font-bold tracking-tight">
            <div className="overflow-hidden"><span ref={addToTitleRefs} className="inline-block text-foreground">Desenvolvedor</span></div>
            <div className="overflow-hidden"><span ref={addToTitleRefs} className="inline-block text-accent">Front-end</span></div>
          </h1>

          <p ref={subtitleRef} className="font-body text-base sm:text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed invisible">
            Transformo ideias em experiências digitais memoráveis. Especializado em React, Next.js e animações avançadas que dão vida à web.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button ref={ctaRef} onClick={handleCTA} className="invisible group relative flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-body font-semibold overflow-hidden hover:gap-5 transition-all duration-300 shadow-lg shadow-accent/20">
              <span className="relative z-10">Ver Meus Projetos</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </div>
        </div>

        <div ref={visualContainerRef} className="hidden lg:flex relative h-[600px] w-full items-center justify-center perspective-1000">
          <div ref={glowRef} className="absolute w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -z-10" />

          <div ref={cardMainRef} className="absolute z-20 w-80 h-96 bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6 flex flex-col gap-4 transform-style-3d invisible">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-foreground/40">Portfolio.tsx</div>
            </div>
            <div className="flex-1 space-y-3 pt-2">
              <div className="w-full h-32 bg-accent/10 rounded-lg animate-pulse" />
              <div className="flex gap-3">
                 <div className="w-1/3 h-20 bg-white/5 rounded-lg" />
                 <div className="w-2/3 h-20 bg-white/5 rounded-lg" />
              </div>
              <div className="w-3/4 h-4 bg-accent/20 rounded full" />
              <div className="w-1/2 h-4 bg-white/10 rounded full" />
            </div>
            <div className="absolute -right-6 -bottom-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg flex items-center gap-3">
               <Zap className="w-6 h-6 fill-current" />
               <div>
                 <div className="text-xs font-bold opacity-80">Performance</div>
                 <div className="font-bold text-lg">100%</div>
               </div>
            </div>
          </div>

          <div ref={cardCodeRef} className="absolute z-10 -left-4 top-1/4 w-72 bg-[#1e1e1e] border border-white/10 rounded-xl shadow-xl p-5 font-mono text-xs transform-style-3d invisible">
             <div className="flex items-center gap-2 text-accent mb-3">
               <Terminal className="w-4 h-4" />
               <span>Command Prompt</span>
             </div>
             <div className="space-y-1 text-gray-400">
               <p><span className="text-green-400">➜</span>  <span className="text-blue-400">~</span> git clone portfolio</p>
               <p><span className="text-green-400">➜</span>  <span className="text-blue-400">~</span> npm install</p>
               <p><span className="text-green-400">➜</span>  <span className="text-blue-400">~</span> npm run dev</p>
               <p className="text-white pt-2"> Ready in <span className="text-green-400">134ms</span></p>
             </div>
          </div>

          <div ref={floatingIcon1Ref} className="absolute top-20 right-20 p-3 bg-secondary rounded-2xl shadow-lg border border-white/5 invisible">
            <Code2 className="w-8 h-8 text-accent" />
          </div>
          <div ref={floatingIcon2Ref} className="absolute bottom-32 left-10 p-3 bg-secondary rounded-2xl shadow-lg border border-white/5 invisible">
            <Layers className="w-8 h-8 text-foreground" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-foreground/50 font-body tracking-[0.2em] uppercase">Scroll</span>
        
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full p-1 flex justify-center">
          <div 
            ref={scrollWheelRef}
            className="w-1 h-2 bg-accent rounded-full" 
          />
        </div>
      </div>

    </section>
  );
}