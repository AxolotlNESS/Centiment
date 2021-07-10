SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"points" integer,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.shoutouts (
	"_id" serial NOT NULL,
    "name" varchar NOT NULL,
    "recipient_id" varchar NOT NULL,
	"points" integer,
    "datetime_created" integer,
	CONSTRAINT "shoutouts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


INSERT INTO public.users VALUES (1, 'Nick', 100);

INSERT INTO public.users VALUES (2, 'Emma', 100);

INSERT INTO public.users VALUES (3,'Sean',100);

INSERT INTO public.users VALUES (4, 'Spencer', 100);

INSERT INTO public.users VALUES (5,'Brent',100);

INSERT INTO public.users VALUES (6, 'May', 100);

INSERT INTO public.users VALUES (7,'Gary',100);

INSERT INTO public.users VALUES (8, 'Faraz', 100);

INSERT INTO public.users VALUES (9,'Anthony',100);

INSERT INTO public.users VALUES (10, 'Jongsun', 100);

INSERT INTO public.users VALUES (11,'John',100);

INSERT INTO public.users VALUES (12, 'Jinhee', 100);

INSERT INTO public.users VALUES (13,'Khayal',100);

INSERT INTO public.users VALUES (14, 'Ted', 100);

INSERT INTO public.users VALUES (15,'Tim',100);

INSERT INTO public.users VALUES (16, 'Tash', 100);

INSERT INTO public.users VALUES (17,'Ricardo',100);

INSERT INTO public.users VALUES (18, 'Vivian', 100);

INSERT INTO public.users VALUES (19,'Terry',100);

INSERT INTO public.users VALUES (20, 'Colin', 100);

INSERT INTO public.users VALUES (21,'Mike',100);

INSERT INTO public.users VALUES (22, 'Chris', 100);

INSERT INTO public.users VALUES (23,'Nayan',100);

INSERT INTO public.users VALUES (24, 'Olivia', 100);

