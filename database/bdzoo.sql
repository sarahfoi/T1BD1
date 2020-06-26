/*-------------------Tabelas-------------------*/
CREATE TABLE IF NOT EXISTS `bilheteria` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `Localizacao` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS `especie` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nomeCientifico` VARCHAR(255) NOT NULL, `nomePopular` VARCHAR(255) NOT NULL, `estado` VARCHAR(255) NOT NULL, `alimentacao` VARCHAR(255) NOT NULL, `descricao` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `alaId` INTEGER NOT NULL REFERENCES `ala` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `ala` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `localizacao` VARCHAR(255) NOT NULL, `nome` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);

CREATE TABLE IF NOT EXISTS `horarioAla` (`alaId` INTEGER NOT NULL REFERENCES `ala` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `horario` TIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`alaId`, `horario`));
CREATE TABLE IF NOT EXISTS `horarioBilheteria` (`bilheteriaId` INTEGER PRIMARY KEY REFERENCES `bilheteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `horarioInicio` TIME NOT NULL, `horarioFinal` TIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);

CREATE TABLE IF NOT EXISTS `animal` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nome` VARCHAR(255) NOT NULL, `sexo` CHAR(255) NOT NULL, `dataNascimento` DATETIME NOT NULL, `ativo` TINYINT(1) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `especieId` INTEGER NOT NULL REFERENCES `especie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `ingresso` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `bilheteriaId` INTEGER NOT NULL REFERENCES `bilheteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `preco` FLOAT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);

CREATE TABLE IF NOT EXISTS `servicosGerais` (`CPF` VARCHAR(255) NOT NULL PRIMARY KEY, `Nome` VARCHAR(255) NOT NULL, `ddn` DATE NOT NULL, `Salario` FLOAT NOT NULL, `CLT` VARCHAR(255) NOT NULL, `Endereco` VARCHAR(255) NOT NULL, `Banco` VARCHAR(255) NOT NULL, `Agencia` INTEGER NOT NULL, `Conta` INTEGER NOT NULL, `Digito` CHAR(255) NOT NULL, `funcao` VARCHAR(255) NOT NULL, `ativo` TINYINT(1) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS `veterinario` (`CPF` VARCHAR(255) NOT NULL PRIMARY KEY, `Nome` VARCHAR(255) NOT NULL, `ddn` DATE NOT NULL, `Salario` FLOAT NOT NULL, `CLT` VARCHAR(255) NOT NULL, `Endereco` VARCHAR(255) NOT NULL, `Banco` VARCHAR(255) NOT NULL, `Agencia` INTEGER NOT NULL, `Conta` INTEGER NOT NULL, `Digito` CHAR(255) NOT NULL, `CRMV` INTEGER NOT NULL, `Faculdade` VARCHAR(255) NOT NULL, `Ativo` TINYINT(1) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS `bilheteiro` (`CPF` VARCHAR(255) NOT NULL PRIMARY KEY, `Nome` VARCHAR(255) NOT NULL, `ddn` DATE NOT NULL, `Salario` FLOAT NOT NULL, `CLT` VARCHAR(255) NOT NULL, `Endereco` VARCHAR(255) NOT NULL, `Banco` VARCHAR(255) NOT NULL, `Agencia` INTEGER NOT NULL, `Conta` INTEGER NOT NULL, `Digito` CHAR(255) NOT NULL, `bilheteriaId` INTEGER NOT NULL REFERENCES `bilheteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `Ativo` TINYINT(1) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);

CREATE TABLE IF NOT EXISTS `cuida` (`bilheteiroCPF` VARCHAR(255) NOT NULL REFERENCES `bilheteiro` (`CPF`) ON DELETE CASCADE ON UPDATE CASCADE, `bilheteriaId` INTEGER NOT NULL REFERENCES `bilheteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`bilheteiroCPF`, `bilheteriaId`));
CREATE TABLE IF NOT EXISTS `atende` (`veterinarioCPF` VARCHAR(255) NOT NULL REFERENCES `veterinario` (`CPF`) ON DELETE CASCADE ON UPDATE CASCADE, `animalId` INTEGER NOT NULL REFERENCES `animal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `data` DATE NOT NULL, `diagnostico` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`veterinarioCPF`, `animalId`));
CREATE TABLE IF NOT EXISTS `superviona` (`veterinarioCPF` VARCHAR(255) NOT NULL REFERENCES `veterinario` (`CPF`) ON DELETE CASCADE ON UPDATE CASCADE, `especieId` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `animalId` INTEGER REFERENCES `especie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY (`veterinarioCPF`, `especieId`));
CREATE TABLE IF NOT EXISTS `trabalha` (`alaId` INTEGER NOT NULL REFERENCES `ala` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `servicosGeraisCPF` VARCHAR(255) NOT NULL REFERENCES `servicosGerais` (`CPF`) ON DELETE CASCADE ON UPDATE CASCADE, `horarioInicio` TIME NOT NULL, `horariofim` TIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`alaId`, `servicosGeraisCPF`, `horarioInicio`, `horariofim`));

/*-------------------Views-------------------*/
CREATE VIEW IF NOT EXISTS `servicosGerais_v` as SELECT servicosGerais.*, ala.nome as nomeAla, ala.localizacao as localizacaoAla FROM servicosGerais, ala, trabalha WHERE servicosGerais.CPF = trabalha.servicosGeraisCPF AND ala.id = trabalha.alaId;
CREATE VIEW IF NOT EXISTS `veterinario_v` as SELECT veterinario.*, especie.nomePopular, especie.nomeCientifico FROM veterinario, especie, supervisiona WHERE especie.id = supervisiona.especieId AND veterinario.CPF = supervisiona.veterinarioCPF; 
CREATE VIEW IF NOT EXISTS `bilheteiro_v` as SELECT * FROM bilheteiro;
CREATE VIEW IF NOT EXISTS `animal_v` as SELECT animal.*, especie.nomePopular, especie.nomeCientifico FROM animal, especie WHERE especie.id = animal.especieId;
/*-------------------Gatilhos-------------------*/

/*Exclusão Lógica*/
CREATE TRIGGER IF NOT EXISTS delete_servicosGerais
INSTEAD OF delete ON servicosGerais_v
FOR EACH ROW
BEGIN
UPDATE servicosGerais SET ativo = false WHERE CPF = OLD.CPF;
END;

CREATE TRIGGER IF NOT EXISTS delete_veterinario
INSTEAD OF delete ON veterinario_v
FOR EACH ROW
BEGIN
UPDATE veterinario SET ativo = false WHERE CPF = OLD.CPF;
END;

CREATE TRIGGER IF NOT EXISTS delete_bilheteiro
INSTEAD OF delete ON bilheteiro_v
FOR EACH ROW
BEGIN
UPDATE bilheteiro SET ativo = false WHERE CPF = OLD.CPF;
END;

CREATE TRIGGER IF NOT EXISTS delete_animal
INSTEAD OF delete ON animal_v
FOR EACH ROW
BEGIN
UPDATE animal SET ativo = false WHERE id = OLD.id;
END;

/*Inserção*/
CREATE TRIGGER IF NOT EXISTS create_servicosGerais
AFTER INSERT ON servicosGerais
FOR EACH ROW
BEGIN
UPDATE servicosGerais SET ativo = true WHERE CPF = NEW.CPF;
END;

CREATE TRIGGER IF NOT EXISTS create_veterinario
AFTER INSERT ON veterinario
FOR EACH ROW
BEGIN
UPDATE veterinario SET ativo = true WHERE CPF = NEW.CPF;
END;

CREATE TRIGGER IF NOT EXISTS create_bilheteiro
AFTER INSERT ON bilheteiro
FOR EACH ROW
BEGIN
UPDATE bilheteiro SET ativo = TRUE WHERE CPF = NEW.CPF;
END;

CREATE TRIGGER IF NOT EXISTS create_animal
AFTER INSERT ON animal
FOR EACH ROW
BEGIN
UPDATE animal SET ativo = true WHERE id = NEW.id;
END;

/*Ingresso - Inserir data automaticamente*/
CREATE TRIGGER IF NOT EXISTS create_ingresso
AFTER INSERT ON ingresso
FOR EACH ROW
BEGIN
update ingresso set createdAt = DATETIME('NOW') where id = NEW.id;
END;
