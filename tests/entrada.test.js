const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/services/EntradaService', () => ({ registrarEntrada: jest.fn() }));
const EntradaService = require('../src/services/EntradaService');
jest.mock('../src/middleware/auth', () => ({
  verificarToken: (req, res, next) => { req.usuario = { id: 1, rol: 'OPERADOR' }; next(); },
}));

describe('POST /api/entradas', () => {
  it('registra una entrada correctamente', async () => {
    EntradaService.registrarEntrada.mockResolvedValue({ mensaje: 'Entrada registrada correctamente', movimiento: {} });
    const res = await request(app).post('/api/entradas').send({ placa: 'ABC123', tipo: 'CARRO', idCelda: 1 });
    expect(res.status).toBe(201);
  });

  it('rechaza si faltan campos', async () => {
    const res = await request(app).post('/api/entradas').send({});
    expect(res.status).toBe(400);
  });
});