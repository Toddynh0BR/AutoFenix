const PHOTON_URL = 'https://photon.komoot.io/api/';
const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

/**
 * Converte resultados do Photon para o formato utilizado pelo formulário.
 */
function mapPhotonResults(features = []) {
  return features.map((feature, index) => {
    const [longitude, latitude] = feature.geometry?.coordinates || [];
    const properties = feature.properties || {};
    const label = [
      properties.name,
      properties.housenumber && properties.street
        ? `${properties.street}, ${properties.housenumber}`
        : properties.street,
      properties.district || properties.suburb,
      properties.city || properties.town || properties.village,
      properties.state,
      properties.postcode,
      properties.country,
    ]
      .filter(Boolean)
      .filter((part, i, all) => all.indexOf(part) === i)
      .join(', ');

    return {
      id: `${properties.osm_type || 'place'}-${properties.osm_id || index}-${latitude}-${longitude}`,
      label,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  }).filter((item) => item.label && Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
}

/**
 * Busca sugestões rápidas no Photon. O serviço é comunitário e pode ficar
 * temporariamente indisponível; a interface oferece uma busca alternativa.
 */
export async function searchAddresses(query, signal) {
  const q = query.trim();
  if (q.length < 3) return [];

  const url = new URL(PHOTON_URL);
  url.search = new URLSearchParams({ q, limit: '5', lang: 'pt' }).toString();

  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error('A busca rápida de endereços está temporariamente indisponível.');
  }

  const data = await response.json();
  return mapPhotonResults(data.features || []);
}

/**
 * Alternativa acionada manualmente pelo visitante quando o Photon falha.
 * É uma pesquisa pontual, não autocomplete: a requisição só ocorre depois
 * do clique do usuário. Respeite a política de uso do Nominatim e não faça
 * consultas automáticas por tecla nem requisições em massa.
 */
export async function searchAddressesAlternative(query, signal) {
  const q = query.trim();
  if (q.length < 3) return [];

  const url = new URL(NOMINATIM_SEARCH_URL);
  url.search = new URLSearchParams({
    q,
    format: 'jsonv2',
    addressdetails: '1',
    limit: '5',
    countrycodes: 'br',
    'accept-language': 'pt-BR',
  }).toString();

  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('A busca alternativa também está indisponível. Você ainda pode marcar sua localização diretamente no mapa.');
  }

  const results = await response.json();
  return results.map((item, index) => ({
    id: `nominatim-${item.place_id || index}-${item.lat}-${item.lon}`,
    label: item.display_name || '',
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  })).filter((item) => item.label && Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
}

export async function reverseGeocode(latitude, longitude, signal) {
  const url = new URL('https://photon.komoot.io/reverse');
  url.search = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    lang: 'pt',
  }).toString();

  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Não foi possível identificar o endereço desse ponto.');
  }

  const data = await response.json();
  const properties = data.features?.[0]?.properties || {};
  const label = [
    properties.name,
    properties.housenumber && properties.street
      ? `${properties.street}, ${properties.housenumber}`
      : properties.street,
    properties.district || properties.suburb,
    properties.city || properties.town || properties.village,
    properties.state,
    properties.postcode,
    properties.country,
  ]
    .filter(Boolean)
    .filter((part, i, all) => all.indexOf(part) === i)
    .join(', ');

  return label || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}
