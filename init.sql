CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  url TEXT NOT NULL,
  latext_capture_image_url TEXT,
  is_store BOOLEAN NOT NULL DEFAULT FALSE,
  open_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.histories (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  id INTEGER NOT NULL,
  title TEXT,
  url TEXT NOT NULL,
  last_visit_time float8 NOT NULL
);
COMMENT ON COLUMN public.histories.last_visit_time IS 'unix timestamp';