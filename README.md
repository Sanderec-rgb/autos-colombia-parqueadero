# 🅿 Parqueadero "Autos Colombia"

Sistema de gestión de parqueadero — **Iteración 1: Entrada y Salida de Vehículos**.

##  Arquitectura

Patrón **N-Tier + MVC**:
- **Presentación:** API REST (Express)
- **Negocio:** Controllers + Services + Entidades
- **Acceso a datos:** Repositories (DAO)
- **Persistencia:** PostgreSQL

##  Instalación

```bash
# 1. Clonar
git clone https://github.com/TU_USUARIO/autos-colombia-parqueadero.git
cd autos-colombia-parqueadero

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# 4. Crear base de datos
psql -U postgres -f sql/schema.sql

# 5. Ejecutar
npm run dev
```

Servidor en `http://localhost:3000`.

##  Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/entradas` | Registrar entrada de vehículo |
| POST | `/api/salidas` | Registrar salida y calcular valor |
| GET | `/api/celdas` | Listar todas las celdas |
| GET | `/api/celdas/libres?tipo=CARRO` | Celdas libres por tipo |

### Ejemplo: Registrar entrada

```bash
curl -X POST http://localhost:3000/api/entradas \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"placa":"ABC123","tipo":"CARRO","idCelda":1}'
```

##  Pruebas

```bash
npm test
```

##  Requerimientos cubiertos

- **RF-01** Registrar entrada de vehículo
- **RF-02** Validar placa única activa
- **RF-03** Asignar celda disponible
- **RF-04** Registrar salida de vehículo
- **RF-05** Calcular valor a pagar
- **RF-06** Liberar celda
- **RF-07** Consultar historial
- **RF-08** Registrar novedades

##  Autor

**Sander Enrique Camargo Orozco**