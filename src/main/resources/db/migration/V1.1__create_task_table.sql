-- V1.1__create_task_table.sql
CREATE TABLE "task" (
    "id" uuid PRIMARY KEY,
    "user_id" uuid NOT NULL,
    "task_name" character varying(255),
    "pomodoro_goal" INTEGER NOT NULL,
    "pomodoro_spent" INTEGER NOT NULL,
    "completed_at" timestamp with time zone
);
