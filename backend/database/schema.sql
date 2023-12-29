
CREATE TABLE Resultado (
  id VARCHAR(36) PRIMARY KEY,
  bimestre ENUM('1', '2', '3', '4') NOT NULL,
  disciplina ENUM('Biologia', 'Artes', 'Geografia', 'Sociologia') NOT NULL,
  nota FLOAT NOT NULL CHECK (nota >= 0 AND nota <= 10),
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
