/*-------------------Tabelas-------------------*/
CREATE SEQUENCE ala_sequence;
CREATE SEQUENCE bilheteria_sequence;
CREATE SEQUENCE ingresso_sequence;
CREATE SEQUENCE especie_sequence;
CREATE SEQUENCE animal_sequence;

CREATE TABLE ala (id INTEGER PRIMARY KEY , localizacao VARCHAR(255) NOT NULL, nome VARCHAR(255) NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL);

CREATE TABLE horarioAla (alaId INTEGER NOT NULL, horarioInicio TIMESTAMP NOT NULL,  horarioFinal TIMESTAMP NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (alaId) REFERENCES ala(id) ON DELETE CASCADE, PRIMARY KEY (alaId, horarioInicio,horarioFinal));

CREATE TABLE bilheteria (id INTEGER PRIMARY KEY , Localizacao VARCHAR(255) NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL);
CREATE TABLE horarioBilheteria (bilheteriaId INTEGER PRIMARY KEY, horarioInicio TIMESTAMP NOT NULL, horarioFinal TIMESTAMP NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (bilheteriaId) REFERENCES bilheteria (id) ON DELETE CASCADE);

CREATE TABLE ingresso (id INTEGER PRIMARY KEY , bilheteriaId INTEGER NOT NULL, preco FLOAT NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (bilheteriaId) REFERENCES bilheteria (id) ON DELETE CASCADE);

CREATE TABLE especie (id INTEGER PRIMARY KEY , nomeCientifico VARCHAR(255) NOT NULL, nomePopular VARCHAR(255) NOT NULL, estado VARCHAR(255) NOT NULL, alimentacao VARCHAR(255) NOT NULL, descricao VARCHAR(255) NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, alaId INTEGER NOT NULL REFERENCES ala (id) ON DELETE CASCADE);
CREATE TABLE animal (id INTEGER PRIMARY KEY , nome VARCHAR(255) NOT NULL, sexo CHAR(255) NOT NULL, dataNascimento TIMESTAMP NOT NULL, ativo INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, especieId INTEGER NOT NULL REFERENCES especie (id) ON DELETE CASCADE);

CREATE TABLE servicosGerais (CPF VARCHAR(255) NOT NULL PRIMARY KEY, Nome VARCHAR(255) NOT NULL, ddn TIMESTAMP NOT NULL, Salario FLOAT NOT NULL, CLT VARCHAR(255) NOT NULL UNIQUE, Endereco VARCHAR(255) NOT NULL , Banco VARCHAR(255) NOT NULL, Agencia INTEGER NOT NULL, Conta INTEGER NOT NULL, Digito CHAR(255) NOT NULL, funcao VARCHAR(255) NOT NULL, ativo INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL);
CREATE TABLE veterinario (CPF VARCHAR(255) NOT NULL PRIMARY KEY, Nome VARCHAR(255) NOT NULL, ddn TIMESTAMP NOT NULL, Salario FLOAT NOT NULL, CLT VARCHAR(255) NOT NULL UNIQUE, Endereco VARCHAR(255) NOT NULL, Banco VARCHAR(255) NOT NULL, Agencia INTEGER NOT NULL, Conta INTEGER NOT NULL, Digito CHAR(255) NOT NULL, CRMV INTEGER NOT NULL UNIQUE, Faculdade VARCHAR(255) NOT NULL, Ativo INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL);
CREATE TABLE bilheteiro (CPF VARCHAR(255) NOT NULL PRIMARY KEY, Nome VARCHAR(255) NOT NULL, ddn TIMESTAMP NOT NULL, Salario FLOAT NOT NULL, CLT VARCHAR(255) NOT NULL UNIQUE, Endereco VARCHAR(255) NOT NULL, Banco VARCHAR(255) NOT NULL, Agencia INTEGER NOT NULL, Conta INTEGER NOT NULL, Digito CHAR(255) NOT NULL, bilheteriaId INTEGER NOT NULL REFERENCES bilheteria (id) ON DELETE CASCADE , Ativo INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL);

CREATE TABLE cuida (bilheteiroCPF VARCHAR(255) NOT NULL, bilheteriaId INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (bilheteiroCPF) REFERENCES bilheteiro (CPF) ON DELETE CASCADE, FOREIGN KEY (bilheteriaId) REFERENCES bilheteria (id) ON DELETE CASCADE, PRIMARY KEY (bilheteiroCPF, bilheteriaId));
CREATE TABLE atende (veterinarioCPF VARCHAR(255) NOT NULL, animalId INTEGER NOT NULL, data TIMESTAMP NOT NULL, diagnostico VARCHAR(255) NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (veterinarioCPF) REFERENCES veterinario (CPF) ON DELETE CASCADE, FOREIGN KEY (animalId) REFERENCES animal (id) ON DELETE CASCADE, PRIMARY KEY (veterinarioCPF, animalId));
CREATE TABLE supervisiona (veterinarioCPF VARCHAR(255) NOT NULL, especieId INTEGER NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (veterinarioCPF) REFERENCES veterinario (CPF) ON DELETE CASCADE, FOREIGN KEY (especieId) REFERENCES especie (id) ON DELETE CASCADE, PRIMARY KEY (veterinarioCPF, especieId));
CREATE TABLE trabalha (alaId INTEGER NOT NULL, servicosGeraisCPF VARCHAR(255) NOT NULL, horarioInicio TIMESTAMP NOT NULL, horariofim TIMESTAMP NOT NULL, createdAt TIMESTAMP NOT NULL, updatedAt TIMESTAMP NOT NULL, FOREIGN KEY (alaId) REFERENCES ala (id) ON DELETE CASCADE, FOREIGN KEY (servicosGeraisCPF) REFERENCES servicosGerais (CPF) ON DELETE CASCADE, PRIMARY KEY (alaId, servicosGeraisCPF, horarioInicio, horariofim));

/*-------------------Views-------------------*/
CREATE VIEW servicosGerais_v as SELECT servicosGerais.*, ala.* FROM servicosGerais, ala, trabalha WHERE servicosGerais.CPF = trabalha.servicosGeraisCPF AND ala.id = trabalha.alaId AND servicosGerais.ativo = 1;
CREATE VIEW veterinario_v as select veterinario.*, especie.* FROM veterinario, especie, supervisiona where supervisiona.veterinarioCPF = veterinario.CPF AND especie.id = supervisiona.especieId AND veterinario.ativo = 1;
CREATE VIEW animal_v as SELECT animal.*, especie.* FROM animal, especie WHERE animal.especieId = especie.id AND animal.ativo = 1;
CREATE VIEW bilheteiro_v as select bilheteiro.*, bilheteria.* FROM bilheteiro, bilheteria, cuida WHERE bilheteiro.CPF = cuida.bilheteiroCPF AND cuida.bilheteriaId = bilheteria.Id AND bilheteiro.ativo=1;
CREATE VIEW alas_especies_v as SELECT ala.id as alaId, especie.id as especieId, ala.nome as alaNome, especie.nomePopular, especie.nomeCientifico from ala, especie where ala.id = especie.alaId;
CREATE VIEW bilheteria_v as SELECT bilheteria.id as id, bilheteria.localizacao as localizacao , SUM(ingresso.preco) as soma, count(ingresso.bilheteriaId) as contagem from ingresso, bilheteria where bilheteria.id = ingresso.bilheteriaId GROUP BY bilheteriaId;
CREATE VIEW bilheteria_v_completa as select bilheteria.*, bilheteria_v.* from bilheteria LEFT JOIN bilheteria_v on bilheteria.id = bilheteria_v.id;

/*-------------------Gatilhos-------------------*/

/*Exclusão Lógica*/
CREATE OR REPLACE TRIGGER delete_servicosGerais
INSTEAD OF delete ON servicosGerais_v
FOR EACH ROW
BEGIN
UPDATE servicosGerais SET ativo = 0 WHERE CPF = :old.CPF;
END;

CREATE OR REPLACE TRIGGER delete_veterinario
INSTEAD OF delete ON veterinario_v
FOR EACH ROW
BEGIN
UPDATE veterinario SET ativo = 0 WHERE CPF = :old.CPF;
END;

CREATE OR REPLACE TRIGGER delete_bilheteiro
INSTEAD OF delete ON bilheteiro_v
FOR EACH ROW
BEGIN
UPDATE bilheteiro SET ativo = 0 WHERE CPF = :old.CPF;
END;

CREATE OR REPLACE TRIGGER delete_animal
INSTEAD OF delete ON animal_v
FOR EACH ROW
BEGIN
UPDATE animal SET ativo = 0 WHERE id = :old.id;
END;

/*Inserção*/
CREATE OR REPLACE TRIGGER ala_on_insert
BEFORE INSERT ON ala
FOR EACH ROW
BEGIN
  SELECT ala_sequence.nextval
  INTO :new.id
  FROM dual;
END;

CREATE OR REPLACE TRIGGER bilheteria_on_insert
BEFORE INSERT ON bilheteria
FOR EACH ROW
BEGIN
  SELECT bilheteria_sequence.nextval
  INTO :new.id
  FROM dual;
END;

CREATE OR REPLACE TRIGGER ingresso_on_insert
BEFORE INSERT ON ingresso
FOR EACH ROW
BEGIN
  SELECT ingresso_sequence.nextval
  INTO :new.id
  FROM dual;
END;

CREATE OR REPLACE TRIGGER especie_on_insert
BEFORE INSERT ON especie
FOR EACH ROW
BEGIN
  SELECT especie_sequence.nextval
  INTO :new.id
  FROM dual;
END;

CREATE OR REPLACE TRIGGER animal_on_insert
BEFORE INSERT ON animal
FOR EACH ROW
BEGIN
  SELECT animal_sequence.nextval
  INTO :new.id
  FROM dual;
END;

CREATE OR REPLACE TRIGGER create_servicosGerais
AFTER INSERT ON servicosGerais
FOR EACH ROW
BEGIN
UPDATE servicosGerais SET ativo = 1 WHERE CPF = :new.CPF;
END;

CREATE OR REPLACE TRIGGER create_veterinario
AFTER INSERT ON veterinario
FOR EACH ROW
BEGIN
UPDATE veterinario SET ativo = 1 WHERE CPF = :new.CPF;
END;

CREATE OR REPLACE TRIGGER create_bilheteiro
AFTER INSERT ON bilheteiro
FOR EACH ROW
BEGIN
UPDATE bilheteiro SET ativo = 1 WHERE CPF = :new.CPF;
END;

CREATE OR REPLACE TRIGGER create_animal
AFTER INSERT ON animal
FOR EACH ROW
BEGIN
UPDATE animal SET ativo = 1 WHERE id = :new.id;
END;

/*Ingresso - Inserir data automaticamente*/
CREATE OR REPLACE TRIGGER create_ingresso
AFTER INSERT ON ingresso
FOR EACH ROW
BEGIN
:new.createdAt :=sysdate;
END;
