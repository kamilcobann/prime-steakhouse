-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category_key TEXT NOT NULL REFERENCES categories(key) ON DELETE CASCADE,
  ingredients TEXT[], -- Array of ingredients
  allergens TEXT[], -- Array of allergens
  cooking_time TEXT,
  serving_size TEXT,
  chef_recommendation TEXT,
  additional_images TEXT[], -- Array of additional image URLs
  nutritional_info JSONB, -- JSON object for nutritional information
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category_key ON menu_items(category_key);
CREATE INDEX IF NOT EXISTS idx_categories_key ON categories(key);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on menu_items" ON menu_items
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage data (for admin)
CREATE POLICY "Allow authenticated users to insert categories" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update categories" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete categories" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert menu_items" ON menu_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update menu_items" ON menu_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete menu_items" ON menu_items
  FOR DELETE USING (auth.role() = 'authenticated');
