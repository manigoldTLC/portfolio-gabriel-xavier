import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre Mim', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Contato', href: '#contact' },
  ];

  const social = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/gbrxcardoso/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/manigoldTLC',
      icon: Github,
      label: 'GitHub',
    },
    {
      name: 'Email',
      href: 'mailto:gabrielxcardoso20@gmail.com',
      icon: Mail,
      label: 'Email',
    },
  ];

  return (
    <footer className="relative border-t border-border bg-background pt-20 pb-10 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold tracking-tight">
              Gabriel Xavier
            </h2>
            <p className="font-body text-foreground/60 leading-relaxed max-w-sm">
              Desenvolvedor Front-end especializado em criar interfaces digitais 
              que unem estética refinada, performance e usabilidade intuitiva.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono text-foreground/70">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Goiânia, Brasil
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Liferay Specialist
              </div>
            </div>
          </div>

          <div className="md:col-span-3 md:pl-8">
            <h3 className="font-display text-xl text-foreground font-bold mb-6 border-l-4 border-accent pl-3">
              Menu
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-body text-foreground/70 hover:text-accent hover:pl-2 transition-all duration-300 block w-fit"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display text-xl text-foreground font-bold mb-6 border-l-4 border-accent pl-3">
              Conecte-se
            </h3>
            <ul className="space-y-4">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors duration-300"
                    >
                      <div className="p-2 bg-secondary rounded-lg border border-border group-hover:border-accent/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-body text-sm">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col items-center justify-center relative">
          <button
            onClick={scrollToTop}
            className="absolute right-0 top-8 hidden md:flex items-center justify-center w-10 h-10 bg-secondary border border-border rounded-lg text-foreground/50 hover:text-accent hover:border-accent/30 transition-all duration-300 group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          <p className="font-body text-sm text-foreground/40 text-center">
            &copy; {currentYear} Gabriel Xavier. Desenvolvido com React, Tailwind & GSAP.
          </p>
        </div>
      </div>
    </footer>
  );
}