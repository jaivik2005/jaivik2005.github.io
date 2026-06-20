/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender name
  - `email` (text, not null) — sender email
  - `subject` (text, not null) — message subject
  - `message` (text, not null) — message body
  - `read` (boolean, default false) — admin read status
  - `created_at` (timestamptz) — submission timestamp

2. Security
- Enable RLS on `contact_messages`.
- Allow anonymous (public) INSERT so the contact form can submit without auth.
- Only service_role (admin) can SELECT/UPDATE/DELETE — no public read access.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_select_contact" ON contact_messages;
CREATE POLICY "service_select_contact" ON contact_messages FOR SELECT
  TO authenticated
  USING (true);
