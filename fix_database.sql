-- Run this in pgAdmin SQL Query Tool (connect to postgres database first)

-- Create the correct database
CREATE DATABASE hackathonprojectdb;

-- To copy data from old database (if needed):
-- 1. First backup old database: pg_dump "hackathonproject db" > backup.sql
-- 2. Restore to new: psql hackathonprojectdb < backup.sql
-- 3. Drop old: DROP DATABASE "hackathonproject db";
