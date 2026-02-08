-- Create a table for storing the portfolio data as a JSON blob
create table portfolio (
  id bigint primary key generated always as identity,
  content jsonb
);

-- Policy to allow public read access
alter table portfolio enable row level security;

create policy "Public Read"
  on portfolio for select
  using (true);

-- Policy to allow authenticated (or public for now, as we use service role or client) 
-- For simplicity in this demo, we can allow anon insert/update if you want, 
-- but usually you'd restrict this. 
-- Since we use the same client for everything in this simple app, 
-- we will allow all 'anon' operations for now, OR rely on the fact that 
-- we are using the standard client. 
-- Ideally, you should enable RLS but allow 'anon' to select, and only service_role to update.
-- But the user's setup uses the public key. 
-- To secure it, we should use RLS policies or just keep it open for this MVP.
create policy "Public All"
  on portfolio for all
  using (true)
  with check (true);

-- Insert a placeholder row with ID 1 if it doesn't exist
insert into portfolio (id, content)
values (1, '{}')
on conflict (id) do nothing;
