--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Postgres.app)
-- Dumped by pg_dump version 14.15 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AggregationMarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AggregationMarks" (
    id uuid NOT NULL,
    "studentId" uuid NOT NULL,
    "resultMark" numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AggregationMarks" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: StudentMarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentMarks" (
    id uuid NOT NULL,
    "studentId" uuid NOT NULL,
    "subjectName" character varying(255) NOT NULL,
    "subjectMark" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."StudentMarks" OWNER TO postgres;

--
-- Name: Students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Students" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "rollNumber" integer NOT NULL,
    "studentCardId" character varying(255) NOT NULL,
    standard integer NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Students" OWNER TO postgres;

--
-- Data for Name: AggregationMarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AggregationMarks" (id, "studentId", "resultMark", "createdAt", "updatedAt") FROM stdin;
0c29b849-cf95-40d7-b75f-c7c1687770ec	17799b05-1016-434b-8c92-ee7580e86d83	97.50	2025-12-05 17:19:27.617+05:30	2025-12-05 18:17:38.422+05:30
6f1c248f-3ea2-4988-9d59-e1e2a5f5b309	9f59b466-a81a-4774-99e1-7d03160b7ee5	81.00	2025-12-05 18:18:26.142+05:30	2025-12-05 18:19:16.807+05:30
dce895f0-8aba-44c6-aa2c-b50eb110002b	d1234aa5-12dd-4d14-aedc-98c2fce5ed44	0.00	2025-12-05 19:02:29.198+05:30	2025-12-05 19:02:29.198+05:30
661545ab-c138-45b4-8ac8-99a6d6d70115	8ad8123f-858e-4ffb-8acc-7e8608e2a774	0.00	2025-12-05 19:03:54.727+05:30	2025-12-05 19:03:54.727+05:30
b068ff8c-28a9-4cab-a8bb-f4c100802cad	a4d69021-61f2-4a19-8498-504a10cc78b9	0.00	2025-12-05 19:04:08.519+05:30	2025-12-05 19:04:08.519+05:30
57265c1b-e0a6-4884-8eec-97c93bce2d9a	2cca1d26-4cb8-4daa-8489-d09f57856b43	0.00	2025-12-05 19:04:20.158+05:30	2025-12-05 19:04:20.158+05:30
d5e50585-7ac0-4692-b096-188b0599d57d	8032d82e-17c0-421b-a37e-339f0a658bfe	0.00	2025-12-05 19:04:34.656+05:30	2025-12-05 19:04:34.656+05:30
dd8ad5d6-4966-4001-85f7-b16d6cbe9b7f	1db5b3fc-ad23-4857-be5b-50db254378ca	0.00	2025-12-05 19:04:46.799+05:30	2025-12-05 19:04:46.799+05:30
22ce0030-6c0e-46c7-83bf-4b5714a3b99d	b9a3659c-e5c8-4ade-9aba-15f8fdc7e58e	0.00	2025-12-05 19:04:59.234+05:30	2025-12-05 19:04:59.234+05:30
555780ed-8692-4c90-b2cc-0b66339a00ae	0b3f6326-df81-4bf7-a165-888f38d728f4	0.00	2025-12-05 19:05:14.075+05:30	2025-12-05 19:05:14.075+05:30
74211f4c-3c58-4199-a433-d07edcc3e174	adf43322-b827-406f-85dd-2822dce3317d	0.00	2025-12-05 19:05:25.111+05:30	2025-12-05 19:05:25.111+05:30
92babdb1-ef94-4168-959f-5b1ad04f4d63	040ea00a-d43b-4c43-8a25-3d051314058a	0.00	2025-12-05 19:05:37.856+05:30	2025-12-05 19:05:37.856+05:30
06fd732f-77b5-4f92-8afb-2fb1e026c31f	5c6843e3-5c8f-4690-b021-f346ecdbeb63	0.00	2025-12-05 19:05:50.617+05:30	2025-12-05 19:05:50.617+05:30
e8589e1f-beaf-4096-be14-4b0da11b0073	17a14328-4263-4c05-abd0-1849061a2831	0.00	2025-12-05 19:06:02.548+05:30	2025-12-05 19:06:02.548+05:30
4e91d257-18a6-483f-938e-fb7df52f567e	34f84498-50f9-4339-b064-ddc8d0ce9b61	0.00	2025-12-05 19:06:12.816+05:30	2025-12-05 19:06:12.816+05:30
edeb19ed-d9d9-4372-9b59-b4cff8b01384	ca1ed620-7f83-42c5-91b0-6882def9b2c6	0.00	2025-12-05 19:06:23.408+05:30	2025-12-05 19:06:23.408+05:30
bf128ddd-89fe-4507-8927-3f48bc7ffc93	9b4005a2-1174-4c17-a63e-2f33aa61d093	0.00	2025-12-05 19:06:34.437+05:30	2025-12-05 19:06:34.437+05:30
3bca2172-4359-4d84-adcb-add8399d7246	1a019e7d-7b44-4287-a504-f1164cc80333	0.00	2025-12-05 19:06:45.76+05:30	2025-12-05 19:06:45.76+05:30
83d3b9bf-7287-42d6-a084-9c21cab064d6	a1661673-e5c2-45f3-a46b-bd35c1b14a0a	0.00	2025-12-05 19:07:11.811+05:30	2025-12-05 19:07:11.811+05:30
131f01b3-5d58-4c98-b56c-b18b99c0954c	63ef30ec-426e-4f8b-b390-75302bfa7428	0.00	2025-12-05 19:07:22.977+05:30	2025-12-05 19:07:22.977+05:30
74619037-5f7b-4c5e-8b66-57d65e9e8339	6d63e4c4-c17a-4251-96c7-3fa77cc38653	0.00	2025-12-05 19:07:34.074+05:30	2025-12-05 19:07:34.074+05:30
16a53698-bb03-4e1a-b339-84e70ea2df34	541f4439-4ef1-4d6b-bb09-ede3da018060	0.00	2025-12-05 19:07:43.4+05:30	2025-12-05 19:07:43.4+05:30
39e32ecd-9868-4cc3-b2b1-be02cb573965	0a930a3e-1c9f-4af0-97c6-8e050bc630f2	85.00	2025-12-05 19:24:46.564+05:30	2025-12-05 19:25:45.581+05:30
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20251204125720-create-students.cjs
20251204133441-create-studentmarks.cjs
20251204133517-create-aggregation-marks.cjs
\.


--
-- Data for Name: StudentMarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentMarks" (id, "studentId", "subjectName", "subjectMark", "createdAt", "updatedAt") FROM stdin;
1481dbe7-818e-461c-b34e-9ea1595a3040	17799b05-1016-434b-8c92-ee7580e86d83	physics	97	2025-12-05 17:33:51.168+05:30	2025-12-05 18:10:43.237+05:30
687e0fe0-dacc-46c9-b1c8-c7fa38864144	17799b05-1016-434b-8c92-ee7580e86d83	math	98	2025-12-05 18:17:38.407+05:30	2025-12-05 18:17:38.407+05:30
acb7d685-a865-49fd-8ce9-bc103d73667c	9f59b466-a81a-4774-99e1-7d03160b7ee5	math	97	2025-12-05 18:19:01.993+05:30	2025-12-05 18:19:01.993+05:30
5d14841e-4364-43c2-a5bf-4c6c12d81c35	9f59b466-a81a-4774-99e1-7d03160b7ee5	physics	65	2025-12-05 18:19:16.803+05:30	2025-12-05 18:19:16.803+05:30
9afded43-6eba-449a-854f-f4e2524be937	0a930a3e-1c9f-4af0-97c6-8e050bc630f2	physics	85	2025-12-05 19:25:38.786+05:30	2025-12-05 19:25:38.786+05:30
\.


--
-- Data for Name: Students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Students" (id, name, "rollNumber", "studentCardId", standard, email, phone, "createdAt", "updatedAt") FROM stdin;
17799b05-1016-434b-8c92-ee7580e86d83	Rupesh Virani	23	I23	9	rupeshvirani01@gmail.com	6359565990	2025-12-05 17:19:27.613+05:30	2025-12-05 17:20:42.85+05:30
9f59b466-a81a-4774-99e1-7d03160b7ee5	jemis	78	F78	6	jemis@gmail.com	6789345782	2025-12-05 18:18:26.138+05:30	2025-12-05 18:18:26.138+05:30
d1234aa5-12dd-4d14-aedc-98c2fce5ed44	Nishant	45	G45	7	nishant@gmail.com	7862341414	2025-12-05 19:02:29.187+05:30	2025-12-05 19:02:29.187+05:30
8ad8123f-858e-4ffb-8acc-7e8608e2a774	Aarav Sharma	1	G1	7	aarav.sharma07@gmail.com	9876543210	2025-12-05 19:03:54.724+05:30	2025-12-05 19:03:54.724+05:30
a4d69021-61f2-4a19-8498-504a10cc78b9	Diya Patel	2	G2	7	diya.patel23@gmail.com	9898123456	2025-12-05 19:04:08.51+05:30	2025-12-05 19:04:08.51+05:30
2cca1d26-4cb8-4daa-8489-d09f57856b43	Rohan Mehta	3	G3	7	rohan.mehta14@gmail.com	9988776655	2025-12-05 19:04:20.156+05:30	2025-12-05 19:04:20.156+05:30
8032d82e-17c0-421b-a37e-339f0a658bfe	Sneha Shah	4	G4	7	sneha.shah19@gmail.com	9090909090	2025-12-05 19:04:34.652+05:30	2025-12-05 19:04:34.652+05:30
1db5b3fc-ad23-4857-be5b-50db254378ca	Vivaan Desai	5	G5	7	vivaan.desai11@gmail.com	9123456780	2025-12-05 19:04:46.795+05:30	2025-12-05 19:04:46.795+05:30
b9a3659c-e5c8-4ade-9aba-15f8fdc7e58e	Isha Trivedi	6	G6	7	isha.trivedi34@gmail.com	9823123456	2025-12-05 19:04:59.232+05:30	2025-12-05 19:04:59.232+05:30
0b3f6326-df81-4bf7-a165-888f38d728f4	Yash Joshi	7	G7	7	yash.joshi56@gmail.com	9765432109	2025-12-05 19:05:14.07+05:30	2025-12-05 19:05:14.07+05:30
adf43322-b827-406f-85dd-2822dce3317d	Prisha Bhatt	8	G8	7	prisha.bhatt78@gmail.com	9098765432	2025-12-05 19:05:25.11+05:30	2025-12-05 19:05:25.11+05:30
040ea00a-d43b-4c43-8a25-3d051314058a	Krish Chauhan	9	G9	7	krish.chauhan89@gmail.com	9812345678	2025-12-05 19:05:37.854+05:30	2025-12-05 19:05:37.854+05:30
5c6843e3-5c8f-4690-b021-f346ecdbeb63	Mira Solanki	10	G10	7	mira.solanki22@gmail.com	9001234567	2025-12-05 19:05:50.615+05:30	2025-12-05 19:05:50.615+05:30
17a14328-4263-4c05-abd0-1849061a2831	Atharv Vyas	11	G11	7	atharv.vyas55@gmail.com	9811112233	2025-12-05 19:06:02.545+05:30	2025-12-05 19:06:02.545+05:30
34f84498-50f9-4339-b064-ddc8d0ce9b61	Tara Prajapati	12	G12	7	tara.prajapati21@gmail.com	9900990099	2025-12-05 19:06:12.814+05:30	2025-12-05 19:06:12.814+05:30
ca1ed620-7f83-42c5-91b0-6882def9b2c6	Manav Parmar	13	G13	7	manav.parmar10@gmail.com	9877001122	2025-12-05 19:06:23.405+05:30	2025-12-05 19:06:23.405+05:30
9b4005a2-1174-4c17-a63e-2f33aa61d093	Riya Gohil	14	G14	7	riya.gohil15@gmail.com	9123098765	2025-12-05 19:06:34.435+05:30	2025-12-05 19:06:34.435+05:30
1a019e7d-7b44-4287-a504-f1164cc80333	Kabir Rawal	15	G15	7	kabir.rawal37@gmail.com	9797979797	2025-12-05 19:06:45.757+05:30	2025-12-05 19:06:45.757+05:30
a1661673-e5c2-45f3-a46b-bd35c1b14a0a	Devansh Rana	17	G17	7	devansh.rana45@gmail.com	9811223344	2025-12-05 19:07:11.808+05:30	2025-12-05 19:07:11.808+05:30
63ef30ec-426e-4f8b-b390-75302bfa7428	Saumya Dave	18	G18	7	saumya.dave66@gmail.com	9301234567	2025-12-05 19:07:22.972+05:30	2025-12-05 19:07:22.972+05:30
6d63e4c4-c17a-4251-96c7-3fa77cc38653	Harshil Zaveri	19	G19	7	harshil.zaveri31@gmail.com	9876501234	2025-12-05 19:07:34.071+05:30	2025-12-05 19:07:34.071+05:30
541f4439-4ef1-4d6b-bb09-ede3da018060	Kavya Soni	20	G20	7	kavya.soni44@gmail.com	9099887766	2025-12-05 19:07:43.398+05:30	2025-12-05 19:07:43.398+05:30
0a930a3e-1c9f-4af0-97c6-8e050bc630f2	Rupesh	56	L56	12	rupesh@gmail.com	6359565990	2025-12-05 19:24:46.549+05:30	2025-12-05 19:25:03.384+05:30
\.


--
-- Name: AggregationMarks AggregationMarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AggregationMarks"
    ADD CONSTRAINT "AggregationMarks_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: StudentMarks StudentMarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentMarks"
    ADD CONSTRAINT "StudentMarks_pkey" PRIMARY KEY (id);


--
-- Name: Students Students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY (id);


--
-- Name: Students Students_studentCardId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_studentCardId_key" UNIQUE ("studentCardId");


--
-- Name: AggregationMarks AggregationMarks_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AggregationMarks"
    ADD CONSTRAINT "AggregationMarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Students"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudentMarks StudentMarks_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentMarks"
    ADD CONSTRAINT "StudentMarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Students"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

