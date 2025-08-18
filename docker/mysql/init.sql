CREATE TABLE historico_consultas
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    detalhes     JSON,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
