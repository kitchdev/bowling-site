CREATE TABLE public.availability (
	id serial4 NOT NULL,
	day_of_week varchar(10) NOT NULL,
	start_time time NOT NULL,
	end_time time NOT NULL,
	CONSTRAINT availability_pkey PRIMARY KEY (id)
);


-- public.blocked_dates definition

-- Drop table

-- DROP TABLE public.blocked_dates;

CREATE TABLE public.blocked_dates (
	id serial4 NOT NULL,
	blocked_date date NOT NULL,
	reason varchar(255) NULL,
	CONSTRAINT blocked_dates_pkey PRIMARY KEY (id)
);


-- public.lanes definition

-- Drop table

-- DROP TABLE public.lanes;

CREATE TABLE public.lanes (
	id serial4 NOT NULL,
	lane_number int4 NOT NULL,
	max_capacity int4 DEFAULT 5 NOT NULL,
	CONSTRAINT lanes_lane_number_key UNIQUE (lane_number),
	CONSTRAINT lanes_pkey PRIMARY KEY (id)
);


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id serial4 NOT NULL,
	role_name varchar(50) NOT NULL,
	permissions _text NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	email varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	phone_number varchar(20) NULL,
	active bool DEFAULT true NULL,
	role_id serial4 NOT NULL,
	"password" varchar NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id)
);


-- public.reservations definition

-- Drop table

-- DROP TABLE public.reservations;

CREATE TABLE public.reservations (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	reservation_date date NOT NULL,
	reservation_time time NOT NULL,
	duration_minutes int4 NOT NULL,
	create_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	status varchar(20) DEFAULT 'confirmed'::character varying NULL,
	number_of_lanes int4 NOT NULL,
	reservation_endtime time NOT NULL,
	CONSTRAINT reservations_pkey PRIMARY KEY (id),
	CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.reservation_lanes definition

-- Drop table

-- DROP TABLE public.reservation_lanes;

CREATE TABLE public.reservation_lanes (
	id serial4 NOT NULL,
	reservation_id int4 NOT NULL,
	lane_id int4 NOT NULL,
	CONSTRAINT reservation_lanes_pkey PRIMARY KEY (id),
	CONSTRAINT reservation_lanes_lane_id_fkey FOREIGN KEY (lane_id) REFERENCES public.lanes(id),
	CONSTRAINT reservation_lanes_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservations(id)
);
