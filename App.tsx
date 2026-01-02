import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, ArrowRight, Shield, Clock, Shuffle, FileText, 
  User, Calendar, Stethoscope, BarChart, Users, Menu, X, Globe, Bell, Send
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language, Role } from './types';
import Demo from './components/Demo';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

// Simple Reveal on Scroll Component
const Reveal: React.FC<RevealProps> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDemoRole, setActiveDemoRole] = useState<Role>('admin');
  
  const t = TRANSLATIONS[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'uz' ? 'ru' : 'uz');
  };

  const icons: Record<string, React.ReactNode> = {
    file: <FileText className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
    shuffle: <Shuffle className="w-6 h-6" />,
    'eye-off': <Shield className="w-6 h-6" />, 
    user: <User className="w-6 h-6" />,
    calendar: <Calendar className="w-6 h-6" />,
    stethoscope: <Stethoscope className="w-6 h-6" />,
    'bar-chart': <BarChart className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    bell: <Bell className="w-6 h-6" />,
  };

  const navLinks = [
    { href: "#features", label: t.nav.features, id: 'features' },
    { href: "#demo", label: t.nav.clinicSystem, id: 'demo', role: 'admin' as Role },
    { href: "#demo", label: t.nav.onlineQueue, id: 'demo', role: 'patient' as Role },
    { href: "#why-us", label: t.nav.whyUs, id: 'why-us' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string, role?: Role) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (role) {
      setActiveDemoRole(role);
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group relative z-50">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MedFlow</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.id, link.role)}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
              {t.nav.login}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out pt-24 px-6 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col space-y-6">
             {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.id, link.role)}
                className="text-xl font-bold text-slate-900 py-2 border-b border-slate-100" 
              >
                {link.label}
              </a>
             ))}
            <div className="flex flex-col gap-4 mt-8">
               <button 
                onClick={toggleLang}
                className="flex items-center justify-between w-full text-lg font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl"
              >
                <span className="flex items-center gap-2"><Globe className="w-5 h-5" /> Language</span>
                {lang === 'uz' ? "O'zbekcha" : "Русский"}
              </button>
              <button className="bg-blue-600 text-white w-full py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-200">
                {t.nav.login}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-32 lg:pb-36">
           <div className="absolute top-0 right-0 -z-10 opacity-40 translate-x-1/3 -translate-y-1/4">
             <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2563eb" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22,70.8,32.4C59.8,42.7,49.4,50.3,38.5,58.3C27.6,66.3,16.2,74.7,2.8,79.5C-10.6,84.4,-25.9,85.6,-39.2,80.1C-52.5,74.6,-63.8,62.4,-72.1,49.1C-80.4,35.8,-85.8,21.4,-86.3,6.8C-86.8,-7.8,-82.4,-22.6,-73.3,-35.1C-64.2,-47.6,-50.3,-57.8,-36.4,-65.1C-22.5,-72.4,-8.6,-76.8,4.1,-83.9C16.8,-91,30.5,-100.8,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <Reveal>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1] whitespace-pre-line">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                <a 
                  href="#demo"
                  onClick={(e) => handleNavClick(e, 'demo', 'admin')} 
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#demo"
                  onClick={(e) => handleNavClick(e, 'demo', 'patient')} 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-bold text-lg transition-all hover:scale-105 cursor-pointer block sm:flex items-center justify-center"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 md:py-28 bg-white relative z-10 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8">
             <Reveal>
               <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">Raqamli Transformatsiya</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">{t.features.title}</h2>
                <p className="text-slate-500 text-lg md:text-xl">{t.features.subtitle}</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {t.features.list.map((feature, idx) => (
                <Reveal key={idx} className={`delay-[${idx * 100}ms]`}>
                  <div className="group bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {icons[feature.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">{feature.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Component */}
        <section id="demo" className="scroll-mt-20 relative">
           <Reveal>
             <Demo 
               lang={lang} 
               activeRole={activeDemoRole} 
               onRoleChange={setActiveDemoRole}
             />
           </Reveal>
        </section>

        {/* Telegram Bot Integration Section */}
        <section className="py-16 bg-blue-50 border-y border-blue-100 relative overflow-hidden">
           <div className="container mx-auto px-4 relative z-10">
             <Reveal>
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                 <div className="flex-1 text-center md:text-left">
                   <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                      <Send className="w-4 h-4" /> Telegram Integration
                   </div>
                   <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                     {t.telegramSection.title}
                   </h2>
                   <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                     {t.telegramSection.subtitle}
                   </p>
                   <button className="bg-[#229ED9] hover:bg-[#1b8bc2] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-300 transition-all flex items-center justify-center gap-3 w-full md:w-auto group">
                      <Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      {t.telegramSection.button}
                   </button>
                 </div>
                 <div className="flex-1 w-full max-w-md">
                    <div className="relative">
                       <div className="absolute inset-0 bg-[#229ED9] rounded-3xl blur-3xl opacity-20"></div>
                       <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 relative">
                          {/* Fake Telegram Chat UI */}
                          <div className="space-y-4">
                             <div className="flex items-end gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#229ED9] flex items-center justify-center text-white font-bold text-xs">Bot</div>
                                <div className="bg-slate-100 rounded-2xl rounded-bl-none p-3 max-w-[80%] text-sm text-slate-700">
                                   Assalomu alaykum! MedFlow Botiga xush kelibsiz. Qanday yordam bera olaman?
                                </div>
                             </div>
                             <div className="flex items-end gap-3 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">Siz</div>
                                <div className="bg-[#229ED9] text-white rounded-2xl rounded-br-none p-3 max-w-[80%] text-sm">
                                   Dr. Azimov qabuliga yozilmoqchiman.
                                </div>
                             </div>
                             <div className="flex items-end gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#229ED9] flex items-center justify-center text-white font-bold text-xs">Bot</div>
                                <div className="bg-slate-100 rounded-2xl rounded-bl-none p-3 max-w-[80%] text-sm text-slate-700">
                                   Xo'p, Dr. Azimov 15-May kuni soat 14:00 da bo'sh. Band qilaymi?
                                   <div className="mt-3 grid grid-cols-2 gap-2">
                                      <button className="bg-white border border-slate-200 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm">Ha, tasdiqlash</button>
                                      <button className="bg-white border border-slate-200 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm">Boshqa vaqt</button>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
             </Reveal>
           </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">{t.whyUs.title}</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.whyUs.items.map((item, idx) => (
                <Reveal key={idx} className={`delay-[${idx * 150}ms]`}>
                  <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 md:mb-8 text-xl md:text-2xl font-bold border border-blue-500/20">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-xl">
                    <Activity className="text-white w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">MedFlow</span>
                </div>
                <p className="text-slate-500 font-medium max-w-sm">{t.footer.description}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-semibold text-slate-600">
                <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.privacy}</a>
                <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.terms}</a>
                <a href="mailto:info@medflow.uz" className="hover:text-blue-600 transition-colors">info@medflow.uz</a>
              </div>
              <div className="text-slate-400 text-sm font-medium">
                &copy; 2026 MedFlow Inc.
              </div>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}

export default App;