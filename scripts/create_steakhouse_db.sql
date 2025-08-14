-- Steakhouse Menu Database Schema
-- Turkish as primary language, English as optional secondary language

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.menu_items CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

-- Categories table with Turkish as primary language
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_tr TEXT NOT NULL, -- Turkish name (required)
    name_en TEXT, -- English name (optional)
    subtitle_tr TEXT, -- Turkish subtitle (optional)
    subtitle_en TEXT, -- English subtitle (optional)
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table with Turkish as primary language
CREATE TABLE public.menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    
    -- Basic info (Turkish required, English optional)
    name_tr TEXT NOT NULL,
    name_en TEXT,
    description_tr TEXT NOT NULL,
    description_en TEXT,
    
    -- Price and image
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    
    -- Detailed info (Turkish required, English optional)
    ingredients_tr TEXT NOT NULL,
    ingredients_en TEXT,
    allergens_tr TEXT,
    allergens_en TEXT,
    
    -- Nutritional info (optional for both languages)
    calories INTEGER,
    protein_g DECIMAL(5,2),
    carbs_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    
    -- Chef recommendations (optional)
    chef_recommendation_tr TEXT,
    chef_recommendation_en TEXT,
    
    -- Additional images for gallery
    gallery_images TEXT[], -- Array of image URLs
    
    -- Status and ordering
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_categories_display_order ON public.categories(display_order);
CREATE INDEX idx_menu_items_category_id ON public.menu_items(category_id);
CREATE INDEX idx_menu_items_display_order ON public.menu_items(display_order);
CREATE INDEX idx_menu_items_featured ON public.menu_items(is_featured) WHERE is_featured = true;
CREATE INDEX idx_menu_items_available ON public.menu_items(is_available) WHERE is_available = true;

-- Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access, authenticated write access
CREATE POLICY "Allow public read access on categories" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on categories" ON public.categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on categories" ON public.categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on categories" ON public.categories
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on menu_items" ON public.menu_items
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on menu_items" ON public.menu_items
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on menu_items" ON public.menu_items
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on menu_items" ON public.menu_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
