-- Seed data for Steakhouse Menu
-- Turkish as primary language with English translations

-- Insert categories (Turkish required, English optional)
INSERT INTO public.categories (name_tr, name_en, subtitle_tr, subtitle_en, display_order) VALUES
('Başlangıçlar', 'Starters', 'Lezzetli başlangıç seçenekleri', 'Delicious appetizer selections', 1),
('Premium Et Seçenekleri', 'Premium Cuts', 'En kaliteli et çeşitleri', 'Finest quality meat selections', 2),
('Yan Yemekler', 'Sides', 'Mükemmel tamamlayıcılar', 'Perfect accompaniments', 3),
('Tatlılar', 'Desserts', 'Tatlı son dokunuşlar', 'Sweet finishing touches', 4);

-- Get category IDs for menu items
DO $$
DECLARE
    starters_id UUID;
    premium_cuts_id UUID;
    sides_id UUID;
    desserts_id UUID;
BEGIN
    SELECT id INTO starters_id FROM public.categories WHERE name_tr = 'Başlangıçlar';
    SELECT id INTO premium_cuts_id FROM public.categories WHERE name_tr = 'Premium Et Seçenekleri';
    SELECT id INTO sides_id FROM public.categories WHERE name_tr = 'Yan Yemekler';
    SELECT id INTO desserts_id FROM public.categories WHERE name_tr = 'Tatlılar';

    -- Insert menu items for Başlangıçlar (Starters)
    INSERT INTO public.menu_items (
        category_id, name_tr, name_en, description_tr, description_en, 
        price, image, ingredients_tr, ingredients_en, allergens_tr, allergens_en,
        calories, protein_g, carbs_g, fat_g, chef_recommendation_tr, chef_recommendation_en,
        gallery_images, is_featured, display_order
    ) VALUES
    (
        starters_id,
        'Wagyu Carpaccio',
        'Wagyu Carpaccio',
        'İnce dilimlenmiş premium wagyu eti, truffle yağı ve parmesan ile',
        'Thinly sliced premium wagyu beef with truffle oil and parmesan',
        285.00,
        '/wagyu-carpaccio-plating.png',
        'Wagyu eti, truffle yağı, parmesan peyniri, roka, limon',
        'Wagyu beef, truffle oil, parmesan cheese, arugula, lemon',
        'Süt ürünleri',
        'Dairy',
        320, 28.5, 2.1, 24.8,
        'Şefimizin özel truffle yağı ile hazırladığı imza lezzeti',
        'Our chef''s signature dish prepared with special truffle oil',
        ARRAY['/premium-wagyu-raw.png', '/truffle-oil-drizzle.png'],
        true, 1
    ),
    (
        starters_id,
        'Rockefeller İstiridyesi',
        'Oysters Rockefeller',
        'Taze istiridye, ıspanak ve hollandaise sos ile fırınlanmış',
        'Fresh oysters baked with spinach and hollandaise sauce',
        195.00,
        '/oysters-rockefeller-fine-dining.png',
        'Taze istiridye, ıspanak, tereyağı, hollandaise sos',
        'Fresh oysters, spinach, butter, hollandaise sauce',
        'Kabuklu deniz ürünleri, yumurta, süt ürünleri',
        'Shellfish, eggs, dairy',
        180, 12.3, 8.7, 14.2,
        'Denizin tazeliği ile klasik Fransız mutfağının buluşması',
        'Where ocean freshness meets classic French cuisine',
        ARRAY['/fresh-oysters-raw.png', '/hollandaise-preparation.png'],
        false, 2
    );

    -- Insert menu items for Premium Et Seçenekleri (Premium Cuts)
    INSERT INTO public.menu_items (
        category_id, name_tr, name_en, description_tr, description_en, 
        price, image, ingredients_tr, ingredients_en, allergens_tr, allergens_en,
        calories, protein_g, carbs_g, fat_g, chef_recommendation_tr, chef_recommendation_en,
        gallery_images, is_featured, display_order
    ) VALUES
    (
        premium_cuts_id,
        'Dry-Aged Ribeye',
        'Dry-Aged Ribeye',
        '28 gün olgunlaştırılmış premium ribeye, 400g',
        '28-day aged premium ribeye, 400g',
        650.00,
        '/dry-aged-ribeye.png',
        'Dry-aged ribeye eti, deniz tuzu, karabiber, rozarin',
        'Dry-aged ribeye beef, sea salt, black pepper, rosemary',
        'Yok',
        'None',
        580, 52.8, 0.0, 42.1,
        'Mükemmel marbling ile 28 gün olgunlaştırılmış',
        'Perfect marbling aged for 28 days',
        ARRAY['/ribeye-on-grill.png', '/aged-beef-marbling.png'],
        true, 1
    ),
    (
        premium_cuts_id,
        'Filet Mignon',
        'Filet Mignon',
        'En yumuşak et parçası, özel sos ile, 250g',
        'The most tender cut with special sauce, 250g',
        580.00,
        '/elegant-filet-mignon.png',
        'Filet mignon, tereyağı, taze kekik, kırmızı şarap sosu',
        'Filet mignon, butter, fresh thyme, red wine sauce',
        'Süt ürünleri, alkol',
        'Dairy, alcohol',
        420, 45.2, 2.1, 28.7,
        'Klasik Fransız usulü hazırlanan en yumuşak et',
        'The most tender cut prepared in classic French style',
        ARRAY['/tenderloin-searing.png', '/red-wine-reduction.png'],
        true, 2
    );

    -- Insert menu items for Yan Yemekler (Sides)
    INSERT INTO public.menu_items (
        category_id, name_tr, name_en, description_tr, description_en, 
        price, image, ingredients_tr, ingredients_en, allergens_tr, allergens_en,
        calories, protein_g, carbs_g, fat_g, chef_recommendation_tr, chef_recommendation_en,
        gallery_images, is_featured, display_order
    ) VALUES
    (
        sides_id,
        'Truffle Mac & Cheese',
        'Truffle Mac & Cheese',
        'Üç peynirli makarna, truffle mantarı ile',
        'Three-cheese pasta with truffle mushrooms',
        145.00,
        '/truffle-mac-and-cheese.png',
        'Makarna, gruyere, parmesan, cheddar, truffle mantarı',
        'Pasta, gruyere, parmesan, cheddar, truffle mushrooms',
        'Gluten, süt ürünleri',
        'Gluten, dairy',
        380, 18.5, 32.1, 24.8,
        'Truffle aroması ile zenginleştirilmiş klasik lezzet',
        'Classic comfort elevated with truffle aroma',
        ARRAY['/cheese-blend-melting.png', '/truffle-shaving.png'],
        false, 1
    );

    -- Insert menu items for Tatlılar (Desserts)
    INSERT INTO public.menu_items (
        category_id, name_tr, name_en, description_tr, description_en, 
        price, image, ingredients_tr, ingredients_en, allergens_tr, allergens_en,
        calories, protein_g, carbs_g, fat_g, chef_recommendation_tr, chef_recommendation_en,
        gallery_images, is_featured, display_order
    ) VALUES
    (
        desserts_id,
        'Çikolata Lava Kek',
        'Chocolate Lava Cake',
        'Sıcak çikolata kalbi olan bireysel kek, vanilyalı dondurma ile',
        'Individual cake with molten chocolate center, served with vanilla ice cream',
        95.00,
        '/chocolate-lava-cake-elegant.png',
        'Bitter çikolata, tereyağı, yumurta, un, şeker, vanilya dondurması',
        'Dark chocolate, butter, eggs, flour, sugar, vanilla ice cream',
        'Gluten, yumurta, süt ürünleri',
        'Gluten, eggs, dairy',
        420, 8.2, 45.1, 24.7,
        'Sıcak servis edilmeli, çikolata kalbi akışkan olmalı',
        'Must be served hot with flowing chocolate center',
        ARRAY['/molten-chocolate-center.png', '/vanilla-ice-cream-scoop.png'],
        true, 1
    );

END $$;
