-- V1.0__create_app_user_table.sql
CREATE TABLE "app_user" (
    "id" uuid PRIMARY KEY,
    "name" character varying(255) UNIQUE,
    "password" text,
    "display_name" character varying(20),
    "creation_time" timestamp with time zone,
    "modification_time" timestamp with time zone
);
