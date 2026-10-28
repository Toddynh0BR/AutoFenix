import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, MapPin, LocateFixed, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import LocationMap from './LocationMap.jsx';
import { searchAddresses, reverseGeocode } from '../services/geocoding.js';
import { consultores } from '../data/consultores.js';
import { findNearestConsultant, createWhatsAppUrl, isValidCoordinate } from '../utils/distance.js';
import { siteConfig } from '../data/siteConfig.js';


export default function ConsultantFinder() {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const abortRef = useRef(null);
  const timerRef = useRef(null);
  const eligibleCount = consultores.filter((c) => c?.ativo === true && c.nome?.trim() && /^\d{12,15}$/.test(String(c.telefone ?? '')) && isValidCoordinate(c.latitude, c.longitude)).length;

  useEffect(() => {
    if (location || query.trim().length < 3) { setSuggestions([]); setLoadingSuggestions(false); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController(); abortRef.current = controller;
      setLoadingSuggestions(true); setError('');
      try { setSuggestions(await searchAddresses(query, controller.signal)); }
      catch (e) { if (e.name !== 'AbortError') setError(e.message || 'Não foi possível buscar endereços agora.'); }
      finally { if (!controller.signal.aborted) setLoadingSuggestions(false); }
    }, 850);
    return () => clearTimeout(timerRef.current);
  }, [query, location]);

  function chooseAddress(item) {
    if (!isValidCoordinate(item.latitude, item.longitude)) { setError('Selecione uma sugestão válida para continuar.'); return; }
    setLocation({ latitude: item.latitude, longitude: item.longitude, label: item.label });
    setQuery(item.label); setSuggestions([]); setError(''); setResult(null); setSearched(false);
  }
  async function chooseMapPoint(point) {
    setLocation({ ...point, label: '' }); setResult(null); setSearched(false); setError('');
    try { const label = await reverseGeocode(point.latitude, point.longitude); setLocation({ ...point, label }); setQuery(label); }
    catch { setQuery(`${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`); }
  }
  function useDeviceLocation() {
    setError('');
    if (!navigator.geolocation) { setError('Este navegador não disponibiliza geolocalização. Você pode buscar um endereço manualmente.'); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const point = { latitude: coords.latitude, longitude: coords.longitude };
      let label = `${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`;
      try { label = await reverseGeocode(point.latitude, point.longitude); } catch { /* coordenadas continuam utilizáveis */ }
      setLocation({ ...point, label }); setQuery(label); setSuggestions([]); setGpsLoading(false); setResult(null); setSearched(false);
    }, (e) => {
      const messages = { 1: 'Permissão de localização negada. Busque seu endereço manualmente.', 2: 'Não foi possível obter sua localização. Confira o GPS ou tente a busca manual.', 3: 'A localização demorou demais. Tente novamente ou busque o endereço manualmente.' };
      setError(messages[e.code] || 'Não foi possível acessar a localização.'); setGpsLoading(false);
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function submit(event) {
    event.preventDefault(); setError('');
    if (name.trim().length < 2) { setError('Informe seu nome para continuar.'); return; }
    if (!location || !isValidCoordinate(location.latitude, location.longitude)) { setError('Busque e selecione um endereço válido ou marque um ponto no mapa.'); return; }
    setSearched(true); setResult(findNearestConsultant(location, consultores));
  }
  const whatsappUrl = result ? createWhatsAppUrl(result.consultant, name) : null;
  return <div className="finder-grid">
    <div className="finder-form-card">
      <div className="finder-intro">
      <span className="eyebrow light">
      <MapPin size={14}/> LOCALIZADOR DE CONSULTORES</span>
      <h3>Vamos encontrar o caminho?</h3>
      <p>Informe seu nome e escolha uma localização para calcular qual consultor cadastrado fica geograficamente mais próximo.</p>
      </div>
      <form onSubmit={submit} noValidate>
        <label className="field-label" htmlFor="visitor-name">Como podemos chamar você?</label>
        <input id="visitor-name" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" autoComplete="given-name" maxLength={100} />
        <label className="field-label" htmlFor="visitor-location">Sua localização</label>
        <div className="address-wrap">
      <div className="address-input-wrap">
      <Search size={18}/>
      <input id="visitor-location" className="address-input" value={query} onChange={(e) => { setQuery(e.target.value); setLocation(null); setResult(null); setSearched(false); }} placeholder="Cidade, bairro, CEP ou endereço" autoComplete="off" aria-autocomplete="list" aria-controls="address-suggestions" />
      </div>
          {loadingSuggestions && <span className="search-status">
      <LoaderCircle className="spin" size={17}/>
      </span>}
          {suggestions.length > 0 && <ul className="suggestions" id="address-suggestions" role="listbox">{suggestions.map((item) => <li key={item.id}>
      <button type="button" role="option" onClick={() => chooseAddress(item)}>{item.label}</button>
      </li>)}</ul>}
        </div>
        <button type="button" className="gps-button" onClick={useDeviceLocation} disabled={gpsLoading}>{gpsLoading ? <LoaderCircle size={17} className="spin"/> : <LocateFixed size={17}/>} Usar minha localização atual</button>
        <p className="privacy-note">
      <ShieldCheck size={15}/> A localização é usada para esta busca. O site não grava seus dados em banco de dados.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary find-button" type="submit">
      <Search size={18}/> Encontrar consultor <ArrowUpRight size={17}/>
      </button>
      </form>
    </div>
    <div className="finder-map-card">
      <div className="map-heading">
      <div>
      <span className="eyebrow">ESCOLHA NO MAPA</span>
      <h3>Onde você está?</h3>
      </div>
      <span className="map-live">
      <span/> Mapa interativo</span>
      </div>
      <LocationMap position={location} onSelect={chooseMapPoint}/>
      {location && <div className="selected-location">
      <CheckCircle2 size={17}/>
      <span>
      <strong>Localização selecionada</strong>
      <small>{location.label || `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}</small>
      </span>
      <button type="button" onClick={() => { setLocation(null); setQuery(''); setResult(null); setSearched(false); }} aria-label="Limpar localização">Alterar</button>
      </div>}
      {searched && result && <div className="consultant-result">
      <div className="result-icon">
      <MessageCircle size={21}/>
      </div>
      <div className="result-copy">
      <span className="eyebrow">CONSULTOR MAIS PRÓXIMO</span>
      <h4>{result.consultant.nome}</h4>
      <p>Aproximadamente <strong>{result.distanceKm < 10 ? result.distanceKm.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : Math.round(result.distanceKm).toLocaleString('pt-BR')} km</strong> em linha reta da localização escolhida.</p>
      <small>Essa distância não representa o trajeto por estrada.</small>{whatsappUrl && <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
      <MessageCircle size={18}/> Conversar no WhatsApp <ArrowUpRight size={16}/>
      </a>}</div>
      </div>}
      {searched && !result && <div className="empty-result">
      <MapPin size={22}/>
      <div>
      <strong>{eligibleCount ? 'Não encontramos um consultor elegível.' : 'Estamos preparando o localizador.'}</strong>
      <p>{eligibleCount ? 'Confira sua localização e tente novamente.' : 'A lista de consultores ainda não foi cadastrada. Para falar com a equipe, acesse o Instagram oficial.'}</p>
      <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Abrir Instagram oficial <ArrowUpRight size={14}/>
      </a>
      </div>
      </div>}
      {!location && !searched && <div className="map-footnote">Dica: selecione uma sugestão de endereço ou clique no mapa para marcar um ponto.</div>}
    </div>
  </div>;
}
