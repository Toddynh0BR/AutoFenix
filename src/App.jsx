import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Compass, FileCheck2, HeartHandshake, Instagram, MapPin, Menu, MessageCircle, Shield, ShieldCheck, Users, X, Zap } from 'lucide-react';
import ConsultantFinder from './components/ConsultantFinder.jsx';
import { benefits, faqs, siteConfig, vehiclePlans } from './data/siteConfig.js';
import phoenix from './assets/logos/phoenix-mark.svg';
import wordmark from './assets/logos/wordmark.svg';
import susepBadge from './assets/logos/susep-badge-reference-only.png';

const iconMap = { messages: MessageCircle, 'file-check': FileCheck2, users: Users };


/**
 * Cabeçalho principal e navegação responsiva do site.
 * Em telas pequenas, os links são agrupados no menu expansível.
 */
function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    ['A associação', '#associacao'],
    ['Planos', '#planos'],
    ['Como funciona', '#como-funciona'],
    ['Encontre um consultor', '#consultor'],
    ['Contato', '#contato'],
    ['Dúvidas frequentes', '#duvidas'],
  ];

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand" aria-label="AutoFênix — início">
          <img src={wordmark} alt="AutoFênix Proteção Veicular" />
        </a>

        <button
          className="mobile-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          id="main-navigation"
          className={`main-nav ${open ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <a className="nav-cta" href="#consultor" onClick={closeMenu}>
            Falar com consultor <ArrowUpRight size={16} />
          </a>

          <a
            className="nav-whatsapp"
            href={siteConfig.generalWhatsApp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </nav>
      </div>
      </header>
    </>
  );
}

function SectionHeading({ kicker, title, text, light = false }) { return <div className={`section-heading ${light ? 'heading-light' : ''}`}>
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>{text && <p>{text}</p>}</div>; }

function FAQ() {
  const [active, setActive] = useState(0);
  return <div className="faq-list">{faqs.map((item, index) => <article className={`faq-item ${active === index ? 'active' : ''}`} key={item.q}>
      <h3>
      <button id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}>{item.q}<ChevronDown size={20} aria-hidden="true"/>
      </button>
      </h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className={`faq-answer ${active === index ? 'is-open' : ''}`} aria-hidden={active !== index}>
      <div className="faq-answer-inner"><p>{item.a}</p></div>
      </div></article>)}</div>;
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
      <a href="/privacidade.html">Política de privacidade</a>
      </div>
      </div>
      <div className="company-details">
      <strong>{siteConfig.legalName}</strong>
      <span>CNPJ: {siteConfig.cnpj}</span>
      <span>Sede principal: {siteConfig.headquarters}</span>
      <span>Horário dos escritórios: {siteConfig.officeHours}</span>
      <span>{siteConfig.whatsappHours}</span>
      </div>
      <div className="footer-bottom">
      <span>© {new Date().getFullYear()} AutoFênix Proteção Veicular.</span>
      <span>Feito para aproximar pessoas e informação.</span>
      </div>
      <div className="privacy-disclosure">
      <strong>Privacidade:</strong> explicamos quais dados são tratados, para quais finalidades e quais são seus direitos na <a href="/privacidade.html">Política de Privacidade</a>.</div>
      </footer>;
}


export default function App() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(vehiclePlans[0].id);
  const selectedVehiclePlans = vehiclePlans.find((category) => category.id === selectedVehicleType) || vehiclePlans[0];

  return <>
      <Header/>
      <main id="conteudo-principal" tabIndex="-1">
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
      <img className="susep-badge" src={susepBadge} alt="Imagem ilustrativa de referência; não representa certificação ou autorização oficial da SUSEP" />
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

    <section className="plans-section section-pad" id="planos">
      <div className="section-shell">
      <SectionHeading kicker="PLANOS DISPONÍVEIS" title={<>Encontre o plano para<br/>o seu tipo de veículo.</>} text="Compare as opções descritas no material comercial da AutoFênix e fale com a equipe para confirmar valores e condições."/>
      <div className="plan-category-tabs" role="group" aria-label="Tipo de veículo">
      {vehiclePlans.map((category) => <button
        key={category.id}
        type="button"
        className={selectedVehicleType === category.id ? 'plan-category-tab is-active' : 'plan-category-tab'}
        aria-pressed={selectedVehicleType === category.id}
        onClick={() => setSelectedVehicleType(category.id)}
      >{category.label}</button>)}
      </div>
      <p className="plan-category-description">{selectedVehiclePlans.description}</p>
      <div className="plan-grid">
      {selectedVehiclePlans.plans.map((plan) => <article className="plan-card" key={plan.name}>
        <div className="plan-card-heading">
        <span className="eyebrow">AUTOFÊNIX</span>
        <h3>Plano {plan.name}</h3>
        <p>Consulte as condições aplicáveis ao seu veículo.</p>
        </div>
        <ul className="plan-features">
        {plan.features.map((feature) => <li key={feature}><ShieldCheck size={16}/><span>{feature}</span></li>)}
        </ul>
        <a className="plan-cta" href={siteConfig.generalWhatsApp} target="_blank" rel="noreferrer">Consultar condições <ArrowUpRight size={16}/></a>
      </article>)}
      </div>
      <p className="plans-disclaimer">Informações transcritas do material comercial fornecido à equipe de desenvolvimento. A disponibilidade, os limites, as regras de acionamento, as exclusões, os valores e as condições contratuais devem ser confirmados diretamente com a AutoFênix antes da adesão. Este site não apresenta preços porque eles não constam do material recebido.</p>
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
      <p>Se você já é associado e precisa de orientação, fale com a equipe pelo WhatsApp oficial e informe que já faz parte da AutoFênix. O atendimento pelo WhatsApp ocorre 24 horas de segunda a sexta-feira, sem atendimento aos sábados e domingos.</p>
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
      <span className="contact-card-detail">{siteConfig.whatsappHours}</span>
      <span className="contact-card-link">Iniciar conversa <ArrowUpRight size={16}/></span>
      </a>
      <a className="contact-card" href={siteConfig.googleProfile} target="_blank" rel="noreferrer">
      <span className="contact-card-icon"><MapPin size={23}/></span>
      <span className="contact-card-kicker">SEDE PRINCIPAL</span>
      <strong>Pão de Açúcar, Taquaritinga do Norte</strong>
      <span className="contact-card-detail">Pernambuco — CEP 55790-000</span>
      <span className="contact-card-detail">Escritórios: {siteConfig.officeHours}. Fechados aos sábados e domingos.</span>
      <span className="contact-card-link">Ver localização no Google Maps <ArrowUpRight size={16}/></span>
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
      <a href={siteConfig.generalWhatsApp} target="_blank" rel="noreferrer" className="text-link">Ainda tem dúvidas? Fale pelo WhatsApp <ArrowUpRight size={17}/>
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
