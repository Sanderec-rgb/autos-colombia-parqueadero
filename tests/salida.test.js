const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/services/SalidaService', () => ({ registrarSalida: jest.fn() }));
const SalidaService = require('../src/services/SalidaService');
jest.mock('../src/middleware/auth', () => ({
  verificarToken: (req, res, next) => { req.usuario = { id: 1, rol: 'OPERADOR' }; next(); },
}));

describe('POST /api/salidas', () => {
  it('registra una salida correctamente', async () => {
    SalidaService.registrarSalida.mockResolvedValue({ mensaje: 'Salida registrada', placa: 'ABC123', horas: 6, valorPagado: 21000 });
    const res = await request(app).post('/api/salidas').send({ placa: 'ABC123' });
    expect(res.status).toBe(200);
  });

  it('rechaza si falta la placa', async () => {
    const res = await request(app).post('/api/salidas').send({});
    expect(res.status).toBe(400);
  });
});