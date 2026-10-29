const EARTH_RADIUS_KM = 6371.0088;

export function isValidCoordinate(latitude, longitude) {
  return Number.isFinite(latitude) && Number.isFinite(longitude)
    && latitude >= -90 && latitude <= 90
    && longitude >= -180 && longitude <= 180;
}

export function haversineDistanceKm(aLat, aLon, bLat, bLon) {
  if (![aLat, aLon, bLat, bLon].every(Number.isFinite)
      || !isValidCoordinate(aLat, aLon) || !isValidCoordinate(bLat, bLon)) return null;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(Math.min(1, h)));
}

export function findNearestConsultant(location, consultants = []) {
  if (!location || !isValidCoordinate(location.latitude, location.longitude)) return null;
  const eligible = consultants.filter((c) => c?.ativo === true && typeof c.nome === 'string'
    && c.nome.trim() && /^\d{12,15}$/.test(String(c.telefone ?? ''))
    && isValidCoordinate(c.latitude, c.longitude));
  const ranked = eligible.map((consultant) => ({
    consultant,
    distanceKm: haversineDistanceKm(location.latitude, location.longitude, consultant.latitude, consultant.longitude),
  })).filter((item) => Number.isFinite(item.distanceKm));
  ranked.sort((a, b) => a.distanceKm - b.distanceKm || a.consultant.nome.localeCompare(b.consultant.nome, 'pt-BR'));
  return ranked[0] ?? null;
}

/**
 * Monta a conversa do WhatsApp com o consultor encontrado e o nome do lead.
 */
export function createWhatsAppUrl(consultant, visitorName) {
  const phone = String(consultant?.telefone ?? '');
  const consultantName = consultant?.nome?.trim();

  if (!consultantName || !/^\d{12,15}$/.test(phone) || !visitorName?.trim()) {
    return null;
  }

  const leadName = visitorName.trim();
  const message =
    `Olá, ${consultantName}! Me chamo ${leadName} e encontrei seu contato pelo site da AutoFênix Proteção Veicular. Gostaria de saber mais sobre os planos de proteção veicular.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
