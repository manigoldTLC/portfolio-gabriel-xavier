import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Code2, Coffee, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      const cards = gsap.utils.toArray('.info-card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: widgetsRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 md:py-32 border-t border-border bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="space-y-8 about-text pt-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Gabriel Xavier
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
                Além das linhas <br />
                <span className="text-accent">de código.</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-body">
              <p>
                Acredito que o desenvolvimento front-end é a arte de tornar o complexo, invisível. 
                Minha jornada começou com a curiosidade de entender como as coisas funcionam na web e evoluiu para uma carreira focada em arquitetura de software e experiência do usuário.
              </p>
              <p>
                Especialista no ecossistema <strong className="text-foreground font-semibold">Liferay DXP</strong>, atuo criando portais corporativos que exigem alta performance e escalabilidade. Mas não paro por aí: meu playground inclui React, Next.js e animações interativas que dão vida à interface.
              </p>
            </div>
          </div>

          <div ref={widgetsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
            
            <div className="info-card group p-6 bg-secondary/30 border border-border hover:border-accent/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <Code2 className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-xl text-foreground mb-1">Front-end</h3>
              <p className="font-mono text-xs text-foreground/50">React & Modern Web</p>
            </div>

            <div className="info-card group p-6 bg-secondary/30 border border-border hover:border-accent/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <Coffee className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-xl text-foreground mb-1">Criativo</h3>
              <p className="font-mono text-xs text-foreground/50">Design & Code</p>
            </div>

            <div className="info-card group col-span-1 sm:col-span-2 p-6 bg-gradient-to-br from-secondary/50 to-background border border-border hover:border-accent/30 rounded-2xl transition-all duration-300 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="font-mono text-xs text-accent uppercase tracking-wider">Foco Atual</span>
                </div>
                <h3 className="font-display text-2xl text-foreground">Liferay Specialist</h3>
                <p className="text-sm text-foreground/60 mt-1">DXP 7.4 • Themes • Fragments</p>
              </div>
              <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform">
                <span className="font-display font-bold text-lg text-accent">L</span>
              </div>
            </div>

            <div className="info-card group p-6 bg-secondary/30 border border-border hover:border-accent/30 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-xl text-foreground mb-1">Goiânia, GO</h3>
              <p className="font-mono text-xs text-foreground/50">Brasil</p>
            </div>

            <div className="info-card group p-6 bg-secondary/30 border border-border hover:border-accent/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <GraduationCap className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-xl text-foreground mb-1">PUC Goiás</h3>
              <p className="font-mono text-xs text-foreground/50">Análise e Desenvolvimento de Sistemas</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}