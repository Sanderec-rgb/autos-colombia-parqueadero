-- ============================================================
-- ESQUEMA DE BASE DE DATOS - PARQUEADERO AUTOS COLOMBIA
-- Iteración 1: Entrada y Salida de Vehículos
-- ============================================================

DROP DATABASE IF EXISTS parqueadero_autos_colombia;
CREATE DATABASE parqueadero_autos_colombia;
\c parqueadero_autos_colombia;

-- ---------- TABLA: usuario ----------
CREATE TABLE usuario (
    id_usuario      SERIAL PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    documento       VARCHAR(20) UNIQUE NOT NULL,
    usuario         VARCHAR(50) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    rol             VARCHAR(20) NOT NULL CHECK (rol IN ('ADMIN','OPERADOR')),
    estado          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TABLA: vehiculo ----------
CREATE TABLE vehiculo (
    id_vehiculo     SERIAL PRIMARY KEY,
    placa           VARCHAR(10) UNIQUE NOT NULL,
    tipo            VARCHAR(20) NOT NULL CHECK (tipo IN ('CARRO','MOTO','BICICLETA')),
    marca           VARCHAR(50),
    modelo          VARCHAR(50),
    color           VARCHAR(30),
    id_usuario      INT REFERENCES usuario(id_usuario),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TABLA: celda ----------
CREATE TABLE celda (
    id_celda        SERIAL PRIMARY KEY,
    codigo          VARCHAR(10) UNIQUE NOT NULL,
    tipo            VARCHAR(20) NOT NULL CHECK (tipo IN ('CARRO','MOTO','BICICLETA')),
    estado          VARCHAR(15) NOT NULL DEFAULT 'LIBRE'
                    CHECK (estado IN ('LIBRE','OCUPADA','MANTENIMIENTO')),
    ubicacion       VARCHAR(50)
);

-- ---------- TABLA: tarifa ----------
CREATE TABLE tarifa (
    id_tarifa       SERIAL PRIMARY KEY,
    tipo_vehiculo   VARCHAR(20) NOT NULL,
    valor_hora      NUMERIC(10,2) NOT NULL,
    valor_dia       NUMERIC(10,2) NOT NULL,
    valor_mensualidad NUMERIC(10,2) NOT NULL,
    vigencia_desde  DATE NOT NULL,
    vigencia_hasta  DATE
);

-- ---------- TABLA: movimiento ----------
CREATE TABLE movimiento (
    id_movimiento   SERIAL PRIMARY KEY,
    id_vehiculo     INT NOT NULL REFERENCES vehiculo(id_vehiculo),
    id_celda        INT NOT NULL REFERENCES celda(id_celda),
    id_usuario      INT NOT NULL REFERENCES usuario(id_usuario),
    fecha_entrada   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_salida    TIMESTAMP,
    valor_pagado    NUMERIC(10,2),
    estado          VARCHAR(15) NOT NULL DEFAULT 'ACTIVO'
                    CHECK (estado IN ('ACTIVO','CERRADO'))
);

-- ---------- TABLA: novedad ----------
CREATE TABLE novedad (
    id_novedad      SERIAL PRIMARY KEY,
    id_movimiento   INT NOT NULL REFERENCES movimiento(id_movimiento),
    descripcion     TEXT NOT NULL,
    fecha           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario      INT NOT NULL REFERENCES usuario(id_usuario)
);

-- ---------- ÍNDICES ----------
CREATE INDEX idx_movimiento_estado ON movimiento(estado);
CREATE INDEX idx_movimiento_placa ON movimiento(id_vehiculo);
CREATE INDEX idx_celda_estado ON celda(estado);
CREATE UNIQUE INDEX idx_movimiento_activo_vehiculo
    ON movimiento(id_vehiculo) WHERE estado = 'ACTIVO';
CREATE UNIQUE INDEX idx_movimiento_activo_celda
    ON movimiento(id_celda) WHERE estado = 'ACTIVO';

-- ---------- DATOS SEMILLA ----------
INSERT INTO usuario (nombre, documento, usuario, password_hash, rol) VALUES
('Administrador', '1000000000', 'admin', '$2a$10$hash_ejemplo', 'ADMIN'),
('Sander Camargo', '1000000001', 'operador1', '$2a$10$hash_ejemplo', 'OPERADOR');

INSERT INTO tarifa (tipo_vehiculo, valor_hora, valor_dia, valor_mensualidad, vigencia_desde) VALUES
('CARRO', 3500, 25000, 250000, '2026-01-01'),
('MOTO', 2000, 15000, 150000, '2026-01-01'),
('BICICLETA', 1000, 7000, 70000, '2026-01-01');

INSERT INTO celda (codigo, tipo, estado, ubicacion) VALUES
('A1','CARRO','LIBRE','Piso 1 - Zona A'),
('A2','CARRO','LIBRE','Piso 1 - Zona A'),
('A3','CARRO','LIBRE','Piso 1 - Zona A'),
('B1','MOTO','LIBRE','Piso 1 - Zona B'),
('B2','MOTO','LIBRE','Piso 1 - Zona B'),
('C1','BICICLETA','LIBRE','Piso 1 - Zona C');