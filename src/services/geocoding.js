const PHOTON_URL = 'https://photon.komoot.io/api/';

/**
 * Photon provides address suggestions and reverse geocoding without a browser API key.
 * It is a community service: availability and fair-use limits are not guaranteed for production.
 */
export async function searchAddresses(query, signal) {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = new URL(PHOTON_URL);
  url.search = new URLSearchParams({ q, limit: '5', lang: 'pt' }).toString();
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('O serviço de endereços está indisponível no momento. Tente novamente.');
  const data = await response.json();
  return (data.features || []).map((feature, index) => {
    const [longitude, latitude] = feature.geometry?.coordinates || [];
    const p = feature.properties || {};
    const label = [p.name, p.housenumber && p.street ? `${p.street}, ${p.housenumber}` : p.street, p.district || p.suburb, p.city || p.town || p.village, p.state, p.postcode, p.country].filter(Boolean).filter((part, i, all) => all.indexOf(part) === i).join(', ');
    return { id: `${p.osm_type || 'place'}-${p.osm_id || index}-${latitude}-${longitude}`, label, latitude: Number(latitude), longitude: Number(longitude) };
  }).filter((item) => item.label && Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
}

export async function reverseGeocode(latitude, longitude, signal) {
  const url = new URL('https://photon.komoot.io/reverse');
  url.search = new URLSearchParams({ lat: String(latitude), lon: String(longitude), lang: 'pt' }).toString();
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Não foi possível identificar o endereço desse ponto.');
  const data = await response.json();
  const p = data.features?.[0]?.properties || {};
  const label = [p.name, p.housenumber && p.street ? `${p.street}, ${p.housenumber}` : p.street, p.district || p.suburb, p.city || p.town || p.village, p.state, p.postcode, p.country].filter(Boolean).filter((part, i, all) => all.indexOf(part) === i).join(', ');
  return label || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}
