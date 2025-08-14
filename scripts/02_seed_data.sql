-- Insert initial categories
INSERT INTO categories (key, name, subtitle) VALUES
  ('starters', 'Starters', 'Begin your culinary journey'),
  ('premiumCuts', 'Premium Cuts', 'Savor the finest selections of beef'),
  ('sides', 'Sides & Accompaniments', 'Perfect pairings for your meal'),
  ('desserts', 'Desserts', 'End on a sweet note')
ON CONFLICT (key) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  updated_at = NOW();

-- Insert initial menu items
INSERT INTO menu_items (
  name, description, detailed_description, price, image, category_key,
  ingredients, allergens, cooking_time, serving_size, chef_recommendation,
  additional_images, nutritional_info
) VALUES
  (
    'Wagyu Beef Carpaccio',
    'Thinly sliced premium wagyu with truffle oil, capers, and aged parmesan',
    'Our signature carpaccio features the finest A5 Wagyu beef, hand-selected and aged to perfection. Each paper-thin slice is delicately arranged and finished with premium black truffle oil, imported Italian capers, and 24-month aged Parmigiano-Reggiano. A true celebration of luxury ingredients.',
    28.00,
    '/wagyu-carpaccio-plating.png',
    'starters',
    ARRAY['A5 Wagyu Beef', 'Black Truffle Oil', 'Italian Capers', 'Parmigiano-Reggiano', 'Arugula', 'Lemon Zest', 'Extra Virgin Olive Oil'],
    ARRAY['Dairy'],
    '15 minutes',
    '1-2 people',
    'Pair with our Barolo wine selection for the ultimate experience',
    ARRAY['/wagyu-carpaccio-plating.png', '/premium-wagyu-raw.png', '/truffle-oil-drizzle.png'],
    '{"calories": 320, "protein": "28g", "carbs": "4g", "fat": "22g"}'::jsonb
  ),
  (
    'Oysters Rockefeller',
    'Fresh Blue Point oysters with spinach, herbs, and hollandaise',
    'Six fresh Blue Point oysters from Long Island Sound, topped with our signature blend of creamed spinach, fresh herbs, and house-made hollandaise sauce. Baked to golden perfection and served on a bed of rock salt.',
    24.00,
    '/oysters-rockefeller-fine-dining.png',
    'starters',
    ARRAY['Blue Point Oysters', 'Fresh Spinach', 'Hollandaise Sauce', 'Butter', 'Shallots', 'Fresh Herbs', 'Pernod', 'Breadcrumbs'],
    ARRAY['Shellfish', 'Dairy', 'Eggs'],
    '12 minutes',
    '6 pieces',
    'Best enjoyed with champagne or crisp white wine',
    ARRAY['/oysters-rockefeller-fine-dining.png', '/fresh-oysters-raw.png', '/hollandaise-preparation.png'],
    NULL
  ),
  (
    'Dry-Aged Ribeye',
    '28-day aged 16oz ribeye, perfectly marbled, grilled to your preference',
    'Our crown jewel - a 16oz ribeye aged for 28 days in our temperature-controlled aging room. The dry-aging process concentrates the flavors and creates an incredibly tender, buttery texture with complex, nutty notes. Grilled over hardwood charcoal and finished with herb butter.',
    68.00,
    '/dry-aged-ribeye.png',
    'premiumCuts',
    ARRAY['28-Day Dry-Aged Ribeye', 'Sea Salt', 'Black Pepper', 'Herb Butter', 'Rosemary', 'Thyme', 'Garlic'],
    ARRAY['Dairy'],
    '18-25 minutes',
    '16oz',
    'Order medium-rare to experience the full flavor profile. Pairs excellently with our truffle mac & cheese',
    ARRAY['/dry-aged-ribeye.png', '/ribeye-on-grill.png', '/aged-beef-marbling.png', '/herb-butter-finish.png'],
    '{"calories": 890, "protein": "72g", "carbs": "0g", "fat": "65g"}'::jsonb
  ),
  (
    'Filet Mignon',
    '8oz center-cut tenderloin, butter-basted with fresh herbs',
    'The most tender cut of beef, sourced from premium cattle and aged for 21 days. This 8oz center-cut tenderloin is seared to perfection and butter-basted with fresh thyme and rosemary. Served with our signature red wine reduction.',
    58.00,
    '/elegant-filet-mignon.png',
    'premiumCuts',
    ARRAY['Center-Cut Tenderloin', 'Butter', 'Fresh Thyme', 'Rosemary', 'Red Wine Reduction', 'Shallots'],
    ARRAY['Dairy'],
    '15-20 minutes',
    '8oz',
    'Perfect with our lobster mashed potatoes and a glass of Cabernet Sauvignon',
    ARRAY['/elegant-filet-mignon.png', '/tenderloin-searing.png', '/red-wine-reduction.png'],
    NULL
  ),
  (
    'Porterhouse for Two',
    '32oz prime porterhouse, perfect for sharing, served with compound butter',
    'A magnificent 32oz prime porterhouse that combines the best of both worlds - the tenderness of filet mignon and the rich flavor of strip steak. Dry-aged for 21 days and grilled to perfection. Served with our house-made compound butter infused with herbs and garlic.',
    95.00,
    '/premium-porterhouse-for-two.png',
    'premiumCuts',
    ARRAY['32oz Prime Porterhouse', 'Compound Butter', 'Fresh Herbs', 'Garlic', 'Sea Salt', 'Cracked Pepper'],
    ARRAY['Dairy'],
    '25-30 minutes',
    '32oz (serves 2)',
    'Ideal for sharing. Complement with multiple sides and a bold red wine',
    ARRAY['/premium-porterhouse-for-two.png', '/porterhouse-raw.png', '/compound-butter.png', '/shared-dining.png'],
    NULL
  ),
  (
    'Truffle Mac & Cheese',
    'Creamy aged cheddar with black truffle and crispy breadcrumbs',
    'Comfort food elevated to fine dining. Our mac and cheese features a blend of aged Vermont cheddar, Gruyère, and Parmigiano-Reggiano, finished with shaved black truffles and topped with herb-infused breadcrumbs. Baked until golden and bubbling.',
    18.00,
    '/truffle-mac-and-cheese.png',
    'sides',
    ARRAY['Aged Cheddar', 'Gruyère Cheese', 'Parmigiano-Reggiano', 'Black Truffles', 'Heavy Cream', 'Pasta', 'Herb Breadcrumbs'],
    ARRAY['Dairy', 'Gluten', 'Eggs'],
    '20 minutes',
    'Generous portion',
    'The perfect accompaniment to any steak',
    ARRAY['/truffle-mac-and-cheese.png', '/cheese-blend.png', '/truffle-shaving.png'],
    NULL
  ),
  (
    'Lobster Mashed Potatoes',
    'Yukon gold potatoes with fresh lobster meat and chives',
    'Creamy Yukon Gold potatoes whipped with butter and cream, then folded with chunks of fresh Maine lobster meat. Finished with fresh chives and a drizzle of lobster oil for an indulgent side that''s worthy of being a main course.',
    22.00,
    '/gourmet-lobster-mashed-potatoes.png',
    'sides',
    ARRAY['Yukon Gold Potatoes', 'Maine Lobster Meat', 'Butter', 'Heavy Cream', 'Fresh Chives', 'Lobster Oil'],
    ARRAY['Shellfish', 'Dairy'],
    '25 minutes',
    'Generous portion',
    'Pairs beautifully with our filet mignon',
    ARRAY['/gourmet-lobster-mashed-potatoes.png', '/fresh-lobster-meat.png', '/yukon-potatoes.png'],
    NULL
  ),
  (
    'Chocolate Lava Cake',
    'Warm chocolate cake with molten center, vanilla bean ice cream',
    'Our signature dessert features a rich, dark chocolate cake with a molten chocolate center that flows like lava when cut. Made with premium Belgian chocolate and served warm with house-made vanilla bean ice cream and fresh berries.',
    16.00,
    '/elegant-chocolate-lava-cake.png',
    'desserts',
    ARRAY['Belgian Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Bean Ice Cream', 'Fresh Berries'],
    ARRAY['Dairy', 'Eggs', 'Gluten'],
    '14 minutes',
    'Individual portion',
    'Order at the beginning of your meal - it takes 14 minutes to prepare fresh',
    ARRAY['/elegant-chocolate-lava-cake.png', '/molten-chocolate-center.png', '/vanilla-ice-cream.png'],
    NULL
  )
ON CONFLICT DO NOTHING;
