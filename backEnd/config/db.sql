create database saep_pediatria

create table responsaveis(
Id_Responsavel int auto_increment primary key,
Nome varchar(100) not null,
CPF  varchar(14) not null unique,
Telefone varchar(14) not null
);


create table filho(
Id_Filho int auto_increment primary key,
Nome varchar(100) not null,
Data_Nascimento date not null,
Id_Responsavel int,
foreign key(Id_Responsavel) references responsaveis(Id_Responsavel)
)


create table agendamento(
Id_Agendamento int auto_increment primary key,
Data_Consulta date not null,
Motivo varchar(500) not null,
Id_Filho int,
foreign key (Id_Filho) references filho (Id_Filho)
)

insert into responsaveis(Nome,CPF,Telefone)
values
('Luciano Voss', 11807824503, 47996240905),
('Luan Voss',11707924303,47996240706),
('Marlei Voss',16697843903,47996752490);


insert into filho(Nome,Data_Nascimento,Id_Responsavel)
values
('Priscilla Voss', "2001-04-26", 2),
('Maurio Voss',"1993-06-21", 1),
('Paulo Voss',"199-08-11",3);

insert into agendamento(Data_Consulta,Motivo,Id_Filho)
values
("2026-09-07", 'Dor de Cabeça fortes', 2),
("2026-10-04", 'Dor de barriga', 1),
("2026-07-09", 'Dor de Cabeça fortes', 3);

\\coreções\\

USE saep_pediatria;

ALTER TABLE filho
MODIFY Id_Responsavel INT NOT NULL;

ALTER TABLE agendamento
MODIFY Id_Filho INT NOT NULL;

//
UPDATE filho
SET Data_Nascimento = '1999-08-11'
WHERE Nome = 'Paulo Voss';
//
CREATE TABLE usuarios (
    Id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL
);



