import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Folder } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Plataforma de distribuição de músicas',
      description: 'Website institucional desenvolvido para apresentar uma plataforma de distribuição musical, com foco em artistas independentes, destacando serviços, diferenciais, planos e formas de contato de maneira clara e moderna.',
      tags: ['React', 'TypeScript', 'NextJS', 'Redux', 'Chatwoot', 'Tailwind', 'Lucide React', 'Framer Motion' ],
      link: 'https://www.7sete.com/pt',
      featured: true,
      color: 'from-blue-500/20 to-purple-500/20',
      image: '/assets/images/img1.png',
    },
    {
      id: 2,
      title: 'Agência de Marketing Musical',
      description: 'Site institucional criado para uma agência de marketing musical, com layout moderno e responsivo, voltado à apresentação de serviços, portfólio, propostas comerciais e captação de novos clientes.',
      tags: ['React', 'TypeScript', 'NextJS', 'Redux', 'Chatwoot', 'Tailwind', 'Lucide React', 'Framer Motion' ],
      link: 'https://www.7corp.net/home',
      featured: true,
      color: 'from-emerald-500/20 to-teal-500/20',
      image: '/assets/images/img2.png',
    },
    {
      id: 3,
      title: 'Institucional 062 Embalagens',
      description: 'Site institucional com catálogo de produtos, integração com WhatsApp, formulário de contato funcional e otimização completa de SEO com Angular SSR.',
      tags: ['Angular', 'TypeScript', 'SCSS', 'SSR'],
      link: 'https://www.062embalagens.com.br',
      github: 'https://github.com/manigoldTLC/institucional-062-embalagens',
      featured: true,
      image: '/assets/images/img3.png',
    },
    {
      id: 4,
      title: 'E-commerce 062 Embalagens',
      description: 'Catálogo digital de alta performance com foco em SEO local. Desenvolvido para facilitar orçamentos, permitindo que clientes montem listas de pedidos persistentes e finalizem a compra diretamente via WhatsApp, eliminando a complexidade de checkouts tradicionais.',
      tags: ['React', 'NextJS', 'Redux', 'Sass'],
      link: 'https://062-embalagens.vercel.app/',
      github: 'https://github.com/manigoldTLC/062-embalagens',
      featured: false,
    },
    {
      id: 5,
      title: 'Music Dot',
      description: 'Landing page de plataforma de aulas de música.',
      tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
      link: 'https://music-dot-nu.vercel.app/',
      github: 'https://github.com/manigoldTLC/projeto-music-dot',
      featured: false,
    },
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

      const featuredCards = gsap.utils.toArray('.featured-card');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featuredCards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2
        });
      });

      gsap.from('.compact-card', {
        scrollTrigger: {
          trigger: '.compact-grid',
          start: "top 85%",
        },
        y: 30,
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
      id="projects"
      ref={containerRef}
      className="relative py-20 md:py-32 border-t border-white/10 bg-background overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Projetos <span className="text-accent">Selecionados</span>
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </div>
          <p className="font-body text-foreground/60 max-w-sm text-sm md:text-base">
            Uma coleção de aplicações web focadas em performance, experiência do usuário e código limpo.
          </p>
        </div>

        <div className="space-y-12 md:space-y-24 mb-24">
          {projects.filter(p => p.featured).map((project, index) => (
            <div 
              key={project.id} 
              className={`featured-card group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}
            >
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary/50 backdrop-blur-sm shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-accent/30">
                  
                  <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>

                  <div className={`absolute inset-0 top-8 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute inset-0 top-8 flex items-center justify-center">
                    <div className="relative flex-1 w-full overflow-hidden bg-secondary/30 group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none`} />
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-display text-4xl text-foreground/10">Sem Preview</span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-4">
                    Projeto em Destaque
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="font-body text-foreground/70 leading-relaxed text-base md:text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-sm font-mono text-foreground/60">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a href={project.link} target="_blank" className="flex items-center gap-2 text-foreground font-semibold hover:text-accent transition-colors group/link">
                    Live Demo 
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="compact-grid">
          <h3 className="font-display text-2xl text-foreground mb-8 flex items-center gap-3">
            <Folder className="w-6 h-6 text-accent" />
            Outros Projetos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project) => (
              <div 
                key={project.id}
                className="compact-card group bg-secondary/20 hover:bg-secondary/40 border border-white/5 hover:border-accent/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-accent/10 rounded text-accent group-hover:text-white group-hover:bg-accent transition-colors">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} className="text-foreground/40 hover:text-foreground transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={project.link} className="text-foreground/40 hover:text-accent transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h4 className="font-display text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                
                <p className="font-body text-sm text-foreground/60 mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-foreground/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}