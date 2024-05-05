-- Active: 1714649973602@@127.0.0.1@5432@9cfd6911-781e-4055-bf17-933906dda418
CREATE TABLE public.employees (
	id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
	"position" varchar NOT NULL,
	phone varchar NOT NULL,
	email varchar NOT NULL,
	CONSTRAINT employees_pk PRIMARY KEY (id),
	CONSTRAINT employees_un UNIQUE (email)
);
