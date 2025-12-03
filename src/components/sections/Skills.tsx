import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Layout, 
  GitBranch, 
  Users, 
  Zap, 
  Palette, 
  Terminal,
  BrainCircuit,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const softSkills = [
    "Resolução de Problemas", "Comunicação Clara", "Adaptabilidade", 
    "Ownership", "Trabalho em Equipe", "Gestão de Tempo"
  ];

  const hardSkills = [
    "JavaScript Avançado", "TypeScript", "React.js", 
    "Next.js", "Vite", "Angular", "HTML5/CSS3", 
    "Tailwind CSS", "GSAP", "Framer Motion"
  ];

  const motionSkills = [
    "GSAP", "Framer Motion", 
    "Figma", "Responsive Design"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      const cards = gsap.utils.toArray('.skill-card');
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-20 md:py-32 border-t border-white/10 bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        
        <div ref={headerRef} className="mb-16 md:mb-24">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Arsenal <span className="text-accent">Tecnológico</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <p className="font-body text-foreground/60 max-w-lg">
              Um conjunto de ferramentas e metodologias que utilizo para transformar problemas complexos em interfaces elegantes e funcionais.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="skill-card col-span-1 md:col-span-2 bg-secondary/30 border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-accent/10 rounded text-accent">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest">Core</span>
            </div>
            
            <h3 className="font-display text-2xl text-foreground mb-4">Ecossistema Frontend</h3>
            <p className="font-body text-sm text-foreground/60 mb-8 max-w-lg">
              Domínio profundo das tecnologias modernas para construção de SPAs e aplicações web escaláveis.
            </p>

            <div className="flex flex-wrap gap-3">
              {hardSkills.map(tech => (
                <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-background border border-white/10 rounded-md text-foreground/80 group-hover:border-accent/30 group-hover:text-foreground transition-all">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-card col-span-1 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-accent/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/20 transition-all duration-500" />
            
            <div className="p-3 bg-accent text-accent-foreground rounded w-fit mb-6">
              <Layout className="w-6 h-6" />
            </div>
            
            <h3 className="font-display text-2xl text-foreground mb-2">Especialista Liferay</h3>
            <p className="font-mono text-xs text-accent mb-6">DXP 7.4 & Frontend Infra</p>
            
            <p className="font-body text-sm text-foreground/70 mb-8 leading-relaxed">
              Experiência sólida na criação de portais corporativos, temas personalizados, fragments e widgets utilizando a plataforma Liferay.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Zap className="w-4 h-4 text-accent" /> Freemarker & Fragments
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Zap className="w-4 h-4 text-accent" /> Client Extensions
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Zap className="w-4 h-4 text-accent" /> Collections
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Zap className="w-4 h-4 text-accent" /> Blueprints
              </div>
            </div>
          </div>

          <div className="skill-card bg-secondary/30 border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300 group">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded w-fit mb-6">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-4">Motion & UI</h3>
            <div className="flex flex-wrap gap-2">
              {motionSkills.map(item => (
                <span key={item} className="px-3 py-1.5 text-sm font-medium bg-background border border-white/10 rounded-md text-foreground/80 group-hover:border-accent/30 group-hover:text-foreground transition-all">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-card bg-secondary/30 border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300">
             <div className="p-3 bg-green-500/10 text-green-400 rounded w-fit mb-6">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-4">DevOps & Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <GitBranch className="w-4 h-4" /> Git / Github
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Workflow className="w-4 h-4" /> Jira / Agile
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Terminal className="w-4 h-4" /> NPM / Yarn
              </div>
            </div>
          </div>

          <div className="skill-card bg-secondary/30 border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300">
             <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded w-fit mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-4">Soft Skills</h3>
            <ul className="space-y-3">
              {softSkills.slice(0, 4).map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <BrainCircuit className="w-4 h-4 text-yellow-500/50 mt-0.5 shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}