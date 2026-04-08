-- 1. CREATE THE BOOKS TABLE
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  category TEXT,
  cover TEXT,
  file_url TEXT
);

-- Turn on Security Rules for the table
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow anyone on your website to View, Add, and Delete books
DROP POLICY IF EXISTS "Public can view books" ON books;
CREATE POLICY "Public can view books" ON books FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can insert books" ON books;
CREATE POLICY "Public can insert books" ON books FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete books" ON books;
CREATE POLICY "Public can delete books" ON books FOR DELETE TO public USING (true);


-- 2. CREATE THE STORAGE BUCKET FOR PDF FILES
INSERT INTO storage.buckets (id, name, public) VALUES ('library-files', 'library-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone on your website to View and Upload PDF files
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'library-files' );

DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT TO public WITH CHECK ( bucket_id = 'library-files' );
