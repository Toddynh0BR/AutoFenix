import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Compass, FileCheck2, HeartHandshake, Instagram, MapPin, Menu, MessageCircle, Shield, ShieldCheck, Users, X, Zap } from 'lucide-react';
import ConsultantFinder from './components/ConsultantFinder.jsx';
import { benefits, faqs } from './data/siteConfig.js';
import { siteConfig } from './data/siteConfig.js';
import phoenix from './assets/logos/phoenix-mark.svg';
import wordmark from './assets/logos/wordmark.svg';

const iconMap = { messages: MessageCircle, 'file-check': FileCheck2, users: Users };


function Header() {
  const [open, setOpen] = useState(false);
  const links = [['A associação', '#associacao'], ['Como funciona', '#como-funciona'], ['Encontre um consultor', '#consultor'], ['Contato', '#contato'], ['Dúvidas frequentes', '#duvidas']];
  return <header className="site-header">
      <div className="header-inner">
      <a href="#inicio" className="brand" aria-label="AutoFênix — início">
      <img src={wordmark} alt="AutoFênix Proteção Veicular" />
      </a>
    <button className="mobile-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#consultor" onClick={() => setOpen(false)}>Falar com consultor <ArrowUpRight size={16}/>
      </a>
      <a className="nav-whatsapp" href={siteConfig.generalWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
      </nav>
  </div>
      </header>;
}

function SectionHeading({ kicker, title, text, light = false }) { return <div className={`section-heading ${light ? 'heading-light' : ''}`}>
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>{text && <p>{text}</p>}</div>; }

function FAQ() {
  const [active, setActive] = useState(0);
  return <div className="faq-list">{faqs.map((item, index) => <article className={`faq-item ${active === index ? 'active' : ''}`} key={item.q}>
      <h3>
      <button aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}>{item.q}<ChevronDown size={20}/>
      </button>
      </h3>{active === index && <div className="faq-answer">
      <p>{item.a}</p>
      </div>}</article>)}</div>;
}

function Footer() {
  return <footer className="site-footer">
      <div className="footer-main">
      <div className="footer-brand">
      <a href="#inicio" aria-label="Voltar ao início">
      <img src={wordmark} alt="AutoFênix Proteção Veicular"/>
      </a>
      <p>Uma proposta associativa de socorro mútuo e rateio de despesas atípicas entre afiliados.</p>
      <span className="footer-note">Informações sobre regras e condições devem ser confirmadas nos documentos vigentes da associação.</span>
      </div>
      <div className="footer-links">
      <h3>Navegue</h3>
      <a href="#associacao">A associação</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#consultor">Encontrar consultor</a>
      <a href="#duvidas">Dúvidas frequentes</a>
      </div>
      <div className="footer-links">
      <h3>Conecte-se</h3>
      <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/>
      </a>
      <a href={siteConfig.googleProfile} target="_blank" rel="noreferrer">Ver localização no Google Maps <ArrowUpRight size={14}/>
      </a>
      <a href={siteConfig.generalWhatsApp} target="_blank" rel="noreferrer">WhatsApp: (81) 99783-9132 <ArrowUpRight size={14}/>
      </a>
      <a href="#associados">Atendimento a associados</a>
      <a href="#privacidade">Política de privacidade</a>
      </div>
      </div>
      <div className="footer-bottom">
      <span>© {new Date().getFullYear()} AutoFênix Proteção Veicular.</span>
      <span>Feito para aproximar pessoas e informação.</span>
      </div>
      <div className="privacy-disclosure" id="privacidade">
      <strong>Privacidade:</strong> este site não grava o nome nem a localização em banco de dados. A busca de endereços e os mapas usam serviços externos (Photon/OpenStreetMap), que recebem solicitações necessárias ao funcionamento. Não são utilizados cookies de analytics nesta versão. Para publicar, confirme e atualize este texto conforme os serviços e a política efetivamente adotados.</div>
      </footer>;
}


export default function App() {
  return <>
      <Header/>
      <main>
    <section className="hero" id="inicio">
      <div className="hero-gridline"/>
      <div className="hero-content">
      <div className="hero-kicker">
      <span className="kicker-line"/> CUIDADO QUE COMEÇA COM CONFIANÇA</div>
      <h1>Seu caminho merece<br/>
      <span>mais tranquilidade.</span>
      </h1>
      <p className="hero-copy">Conheça a proposta associativa da AutoFênix Proteção Veicular e converse com alguém que pode explicar cada detalhe.</p>
      <div className="hero-actions">
      <a className="button button-light" href="#consultor">Encontrar um consultor <ArrowRight size={18}/>
      </a>
      <a className="hero-secondary" href="#associacao">Conheça a associação <ArrowDown size={16}/>
      </a>
      </div>
      <div className="hero-trust">
      <span className="trust-icon">
      <ShieldCheck size={18}/>
      </span>
      <span>
      <strong>Informação clara, sem atalhos.</strong>
      <small>Conheça as regras antes de decidir.</small>
      </span>
      </div>
      </div>
      <div className="hero-art" aria-hidden="true">
      <div className="art-orbit orbit-one"/>
      <div className="art-orbit orbit-two"/>
      <div className="art-glow"/>
      <img className="hero-phoenix" src={phoenix} alt=""/>
      <div className="art-caption">
      <span className="caption-mark">
      <Shield size={18}/>
      </span>
      <span>
      <strong>AutoFênix</strong>
      <small>Proteção Veicular</small>
      </span>
      </div>
      <div className="art-spark spark-one"/>
      <div className="art-spark spark-two"/>
      </div>
      <div className="hero-bottom">
      <span>01 / 04</span>
      <span className="hero-bottom-line"/>
      <span>CONHEÇA. PERGUNTE. DECIDA.</span>
      </div>
      </section>

    <section className="intro-section section-pad" id="associacao">
      <div className="intro-mark">
      <img src={phoenix} alt="Símbolo da fênix da AutoFênix"/>
      <div className="mark-caption">UMA PROPOSTA DE<br/>
      <strong>AJUDA MÚTUA</strong>
      </div>
      </div>
      <div className="intro-copy">
      <span className="eyebrow">QUEM SOMOS</span>
      <h2>Mais do que conhecer uma proposta. É entender como ela funciona.</h2>
      <p>A AutoFênix Proteção Veicular é uma associação de socorro mútuo que pratica o rateio de despesas atípicas ocorridas entre seus afiliados.</p>
      <p>Nosso convite é simples: conheça a proposta, tire suas dúvidas e consulte as regras e condições aplicáveis antes de tomar sua decisão.</p>
      <a className="text-link" href="#como-funciona">Entenda as etapas <ArrowRight size={17}/>
      </a>
      </div>
      </section>

    <section className="benefits-section section-pad">
      <div className="section-shell">
      <SectionHeading kicker="NOSSA PROPOSTA" title={<>Clareza em cada<br/>etapa da conversa.</>} text="O primeiro passo é ter acesso às informações certas para avaliar se a proposta faz sentido para você."/>
      <div className="benefit-grid">{benefits.map((benefit, i) => { const Icon = iconMap[benefit.icon] || ShieldCheck; return <article className="benefit-card" key={benefit.title}>
      <div className="benefit-top">
      <span className="benefit-number">0{i+1}</span>
      <span className="benefit-icon">
      <Icon size={22}/>
      </span>
      </div>
      <h3>{benefit.title}</h3>
      <p>{benefit.text}</p>
      <div className="benefit-rule"/>
      </article>; })}</div>
      <p className="content-note">
      <ShieldCheck size={16}/> Os benefícios, limites e condições aplicáveis devem ser confirmados nos documentos vigentes da associação.</p>
      </div>
      </section>

    <section className="steps-section section-pad" id="como-funciona">
      <div className="section-shell">
      <SectionHeading kicker="UM PASSO DE CADA VEZ" title="Conheça. Converse. Decida." text="Um caminho simples para começar a entender a proposta da AutoFênix."/>
      <div className="steps-grid">
      <article className="step">
      <span className="step-no">01</span>
      <div className="step-icon">
      <Compass size={24}/>
      </div>
      <h3>Conheça a proposta</h3>
      <p>Entenda a natureza associativa e como o rateio de despesas atípicas é descrito pela associação.</p>
      </article>
      <article className="step">
      <span className="step-no">02</span>
      <div className="step-icon">
      <MapPinIcon/>
      </div>
      <h3>Encontre um consultor</h3>
      <p>Informe sua localização para verificar o consultor cadastrado geograficamente mais próximo.</p>
      </article>
      <article className="step">
      <span className="step-no">03</span>
      <div className="step-icon">
      <MessageCircle size={24}/>
      </div>
      <h3>Tire suas dúvidas</h3>
      <p>Converse com o consultor e peça informações sobre regras, condições e documentação.</p>
      </article>
      <article className="step">
      <span className="step-no">04</span>
      <div className="step-icon">
      <FileCheck2 size={24}/>
      </div>
      <h3>Avalie com calma</h3>
      <p>Leia os documentos e avalie as informações antes de decidir sobre uma possível associação.</p>
      </article>
      </div>
      </div>
      </section>

    <section className="finder-section section-pad" id="consultor">
      <div className="finder-bg-orb"/>
      <div className="section-shell">
      <SectionHeading kicker="PERTO DE VOCÊ" title={<>Encontre um consultor<br/>para conversar.</>} text="Informe sua localização. Vamos comparar a distância em linha reta entre o ponto escolhido e os consultores ativos cadastrados." light/>
      <ConsultantFinder/>
      </div>
      </section>

    <section className="members-section section-pad" id="associados">
      <div className="members-icon">
      <HeartHandshake size={30}/>
      </div>
      <div className="members-copy">
      <span className="eyebrow">VOCÊ JÁ FAZ PARTE?</span>
      <h2>Conte com informação para o próximo passo.</h2>
      <p>Se você já é associado e precisa de orientação, confirme com a equipe qual canal atende sua solicitação. O canal específico para associados será disponibilizado aqui assim que validado.</p>
      </div>
      <a className="button button-outline" href={siteConfig.memberSupportUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Falar com a equipe pelo WhatsApp <ArrowUpRight size={17}/>
      </a>
      </section>

    <section className="contact-section section-pad" id="contato">
      <div className="section-shell">
      <SectionHeading kicker="CANAIS OFICIAIS" title="Fale com a AutoFênix." text="Escolha o canal mais conveniente para conversar com nossa equipe ou consultar nossa localização."/>
      <div className="contact-grid">
      <a className="contact-card contact-card-primary" href={siteConfig.generalWhatsApp} target="_blank" rel="noreferrer">
      <span className="contact-card-icon"><MessageCircle size={23}/></span>
      <span className="contact-card-kicker">ATENDIMENTO</span>
      <strong>Converse pelo WhatsApp</strong>
      <span className="contact-card-detail">(81) 99783-9132</span>
      <span className="contact-card-link">Iniciar conversa <ArrowUpRight size={16}/></span>
      </a>
      <a className="contact-card" href={siteConfig.googleProfile} target="_blank" rel="noreferrer">
      <span className="contact-card-icon"><MapPin size={23}/></span>
      <span className="contact-card-kicker">LOCALIZAÇÃO</span>
      <strong>Encontre nossa empresa</strong>
      <span className="contact-card-detail">Consulte o endereço e a rota no Google Maps.</span>
      <span className="contact-card-link">Ver no mapa <ArrowUpRight size={16}/></span>
      </a>
      <a className="contact-card" href={siteConfig.instagram} target="_blank" rel="noreferrer">
      <span className="contact-card-icon"><Instagram size={23}/></span>
      <span className="contact-card-kicker">REDES SOCIAIS</span>
      <strong>Acompanhe o Instagram</strong>
      <span className="contact-card-detail">@autofenixprotecao</span>
      <span className="contact-card-link">Abrir perfil <ArrowUpRight size={16}/></span>
      </a>
      </div>
      </div>
      </section>

    <section className="faq-section section-pad" id="duvidas">
      <div className="faq-layout">
      <div className="faq-side">
      <span className="eyebrow">PERGUNTAS E RESPOSTAS</span>
      <h2>É melhor decidir com tudo às claras.</h2>
      <p>Reunimos algumas informações iniciais. Para detalhes contratuais ou condições específicas, fale com a equipe e consulte os documentos vigentes.</p>
      <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="text-link">Ainda tem dúvidas? Fale com a equipe <ArrowUpRight size={17}/>
      </a>
      <div className="faq-decoration">
      <img src={phoenix} alt=""/>
      </div>
      </div>
      <FAQ/>
      </div>
      </section>

    <section className="final-cta">
      <div className="cta-mark">
      <Zap size={22}/>
      </div>
      <div>
      <span className="eyebrow light">O PRÓXIMO PASSO COMEÇA COM UMA CONVERSA</span>
      <h2>Quer conhecer melhor a AutoFênix?</h2>
      <p>Encontre um consultor e tire suas dúvidas com tranquilidade.</p>
      </div>
      <a className="button button-light" href="#consultor">Encontrar consultor <ArrowRight size={18}/>
      </a>
      <div className="cta-outline"/>
      </section>
  </main>
      <Footer/>
      </>;
}

function MapPinIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
      <circle cx="12" cy="10" r="2.5"/>
      </svg>; }
