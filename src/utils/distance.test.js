import { describe, expect, it } from 'vitest';
import { createWhatsAppUrl, findNearestConsultant, haversineDistanceKm, isValidCoordinate } from './distance.js';

const base = { ativo: true, telefone: '5581999999999' };
const people = [
  { ...base, id: 'far', nome: 'Consultor distante', latitude: -7.0, longitude: -35.0 },
  { ...base, id: 'near', nome: 'Consultor próximo', latitude: -8.0, longitude: -36.0 },
  { ...base, id: 'inactive', nome: 'Inativo', latitude: -8.001, longitude: -36.001, ativo: false },
  { ...base, id: 'invalid', nome: 'Inválido', latitude: 500, longitude: -36.0 },
];

describe('distance helpers', () => {
  it('validates geographic coordinates', () => {
    expect(isValidCoordinate(-8, -36)).toBe(true);
    expect(isValidCoordinate(91, -36)).toBe(false);
  });
  it('returns zero for identical points and null for invalid points', () => {
    expect(haversineDistanceKm(-8, -36, -8, -36)).toBe(0);
    expect(haversineDistanceKm(500, 0, 0, 0)).toBeNull();
  });
  it('chooses the closest active consultant with valid details', () => {
    expect(findNearestConsultant({ latitude: -8, longitude: -36 }, people).consultant.id).toBe('near');
  });
  it('returns null for invalid location or no eligible consultant', () => {
    expect(findNearestConsultant(null, people)).toBeNull();
    expect(findNearestConsultant({ latitude: -8, longitude: -36 }, [])).toBeNull();
  });
  it('builds a properly encoded WhatsApp link', () => {
    const url = createWhatsAppUrl(people[0], 'Ana Maria');
    expect(url).toContain('https://wa.me/5581999999999?text=');
    expect(decodeURIComponent(url)).toContain('Olá, Ana Maria!');
    expect(createWhatsAppUrl({ telefone: '123' }, 'Ana')).toBeNull();
  });
});
