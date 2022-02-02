create database dbChallenge;
use dbChallenge;

create table if not exists tbCategory
(
	id   int          not null auto_increment,
    name varchar(128) not null default '',
    primary key(id)
);

create table if not exists tbDevice
(
	id         int         not null auto_increment,
	categoryId int         not null default 0,
	color      varchar(16) not null default '',
	partNumber int         not null default 0,
    primary key(id)
);