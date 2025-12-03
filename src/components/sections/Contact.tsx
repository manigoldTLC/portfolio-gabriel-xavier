import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Check, 
  Copy, 
  Send,
  Loader2
} from 'lucide-react';
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/gbrxcardoso/' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/manigoldTLC' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert("Erro ao enviar sua mensagem. Tente novamente.");
      setStatus("idle");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gabrielxcardoso20@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-20 md:py-32 border-t border-white/10 bg-background overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div ref={infoRef} className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Vamos conversar sobre tecnologia
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
                Ideias, parcerias e boas conversas também constroem <br />
                <span className="text-accent">grandes projetos.</span>
              </h2>
            </div>

            <p className="font-body text-foreground/70 text-lg leading-relaxed max-w-md">
              Se quiser trocar uma ideia sobre desenvolvimento, produtos digitais ou apenas se conectar,
              fique à vontade para entrar em contato.
            </p>

            <div className="space-y-4">
              <p className="text-sm font-mono text-foreground/50 uppercase tracking-wider">Contato Direto</p>
              <button 
                onClick={handleCopyEmail}
                className="group w-full sm:w-auto flex items-center justify-between gap-6 p-4 bg-secondary/30 border border-white/10 rounded-xl hover:border-accent/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/50">Email</p>
                    <p className="text-foreground font-semibold">gabrielxcardoso20@gmail.com</p>
                  </div>
                </div>
                
                <div className="mr-2 text-foreground/40 group-hover:text-accent transition-colors">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-mono text-foreground/50 uppercase tracking-wider">Redes Sociais</p>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-secondary/30 border border-white/10 rounded-xl text-foreground/70 hover:text-accent hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
                      aria-label={link.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-secondary/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <div className="space-y-8">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 top-3 text-foreground/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Seu Nome
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-0 top-3 text-foreground/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Seu Email
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-0 top-3 text-foreground/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Sobre o que vamos conversar?
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-body font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Mensagem Enviada!</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Enviar Mensagem</span>
                      <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                  
                  {status === 'idle' && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}