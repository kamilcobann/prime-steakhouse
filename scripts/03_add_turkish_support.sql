-- Add Turkish language support to existing tables

-- Add Turkish columns to categories table
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS name_tr TEXT,
ADD COLUMN IF NOT EXISTS subtitle_tr TEXT;

-- Add Turkish columns to menu_items table
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS name_tr TEXT,
ADD COLUMN IF NOT EXISTS description_tr TEXT,
ADD COLUMN IF NOT EXISTS detailed_description_tr TEXT,
ADD COLUMN IF NOT EXISTS ingredients_tr TEXT[],
ADD COLUMN IF NOT EXISTS allergens_tr TEXT[],
ADD COLUMN IF NOT EXISTS chef_recommendation_tr TEXT;

-- Update existing data with Turkish translations
UPDATE categories SET 
  name_tr = CASE 
    WHEN key = 'starters' THEN 'Başlangıçlar'
    WHEN key = 'premium-cuts' THEN 'Premium Et Çeşitleri'
    WHEN key = 'sides' THEN 'Yan Yemekler'
    WHEN key = 'desserts' THEN 'Tatlılar'
    ELSE name
  END,
  subtitle_tr = CASE 
    WHEN key = 'starters' THEN 'Lezzetli başlangıçlarla yemeğinize başlayın'
    WHEN key = 'premium-cuts' THEN 'En kaliteli et çeşitlerimiz'
    WHEN key = 'sides' THEN 'Ana yemeğinizi tamamlayan lezzetler'
    WHEN key = 'desserts' THEN 'Tatlı bir son için'
    ELSE subtitle
  END;

-- Update menu items with Turkish translations
UPDATE menu_items SET 
  name_tr = CASE 
    WHEN name = 'Wagyu Beef Carpaccio' THEN 'Wagyu Sığır Carpaccio'
    WHEN name = 'Oysters Rockefeller' THEN 'Rockefeller Istiridyesi'
    WHEN name = 'Dry-Aged Ribeye' THEN 'Kurutulmuş Antrikot'
    WHEN name = 'Filet Mignon' THEN 'Filet Mignon'
    WHEN name = 'Porterhouse for Two' THEN 'İki Kişilik Porterhouse'
    WHEN name = 'Truffle Mac & Cheese' THEN 'Trüflü Makarna & Peynir'
    WHEN name = 'Grilled Asparagus' THEN 'Izgara Kuşkonmaz'
    WHEN name = 'Chocolate Lava Cake' THEN 'Çikolatalı Lav Keki'
    ELSE name
  END,
  description_tr = CASE 
    WHEN name = 'Wagyu Beef Carpaccio' THEN 'İnce dilimlenmiş premium wagyu sığır eti, trüf yağı ve parmesan ile'
    WHEN name = 'Oysters Rockefeller' THEN 'Taze istiridye, ıspanak ve hollandaise sos ile'
    WHEN name = 'Dry-Aged Ribeye' THEN '28 gün kurutulmuş, mükemmel marmorlu antrikot'
    WHEN name = 'Filet Mignon' THEN 'En yumuşak et parçası, tereyağı ile pişirilmiş'
    WHEN name = 'Porterhouse for Two' THEN 'İki kişilik dev porterhouse biftek'
    WHEN name = 'Truffle Mac & Cheese' THEN 'Krema peyniri ve trüf ile hazırlanmış makarna'
    WHEN name = 'Grilled Asparagus' THEN 'Izgara kuşkonmaz, limon ve zeytinyağı ile'
    WHEN name = 'Chocolate Lava Cake' THEN 'Sıcak çikolata kalbi olan enfes tatlı'
    ELSE description
  END,
  detailed_description_tr = CASE 
    WHEN name = 'Wagyu Beef Carpaccio' THEN 'Dünyanın en kaliteli wagyu sığır etinden hazırlanan bu carpaccio, ustaca ince dilimlenmiş ve trüf yağı, taze roka, parmesan peyniri ile servis edilir.'
    WHEN name = 'Oysters Rockefeller' THEN 'Taze Atlantik istiridyeleri, kremalı ıspanak, taze otlar ve zengin hollandaise sos ile geleneksel Rockefeller tarzında hazırlanır.'
    WHEN name = 'Dry-Aged Ribeye' THEN '28 gün özel koşullarda kurutulmuş premium antrikot, mükemmel marmorlaşma ile yumuşacık doku ve yoğun lezzet sunar.'
    WHEN name = 'Filet Mignon' THEN 'Sığırın en yumuşak bölümünden alınan filet mignon, tereyağı ve taze otlarla mükemmel pişirme ile servis edilir.'
    WHEN name = 'Porterhouse for Two' THEN 'İki kişi için ideal olan bu dev porterhouse biftek, hem filet hem de antrikot bölümlerini içerir.'
    WHEN name = 'Truffle Mac & Cheese' THEN 'Premium peynirler ve trüf ile hazırlanan bu makarna, klasik Amerikan lezzetinin lüks versiyonudur.'
    WHEN name = 'Grilled Asparagus' THEN 'Taze kuşkonmaz, ızgara üzerinde mükemmel pişirilerek limon ve kaliteli zeytinyağı ile tatlandırılır.'
    WHEN name = 'Chocolate Lava Cake' THEN 'Dışı çıtır, içi sıcak çikolata akışkan olan bu enfes tatlı, vanilyalı dondurma ile servis edilir.'
    ELSE detailed_description
  END,
  ingredients_tr = CASE 
    WHEN name = 'Wagyu Beef Carpaccio' THEN ARRAY['Wagyu sığır eti', 'Trüf yağı', 'Parmesan peyniri', 'Roka', 'Limon']
    WHEN name = 'Oysters Rockefeller' THEN ARRAY['Taze istiridye', 'Ispanak', 'Tereyağı', 'Hollandaise sos', 'Taze otlar']
    WHEN name = 'Dry-Aged Ribeye' THEN ARRAY['Kurutulmuş antrikot', 'Deniz tuzu', 'Karabiber', 'Tereyağı', 'Taze kekik']
    WHEN name = 'Filet Mignon' THEN ARRAY['Filet mignon', 'Tereyağı', 'Sarımsak', 'Taze kekik', 'Deniz tuzu']
    WHEN name = 'Porterhouse for Two' THEN ARRAY['Porterhouse biftek', 'Deniz tuzu', 'Karabiber', 'Tereyağı', 'Biberiye']
    WHEN name = 'Truffle Mac & Cheese' THEN ARRAY['Makarna', 'Gruyere peyniri', 'Cheddar peyniri', 'Trüf', 'Krema']
    WHEN name = 'Grilled Asparagus' THEN ARRAY['Kuşkonmaz', 'Zeytinyağı', 'Limon', 'Deniz tuzu', 'Karabiber']
    WHEN name = 'Chocolate Lava Cake' THEN ARRAY['Bitter çikolata', 'Tereyağı', 'Yumurta', 'Şeker', 'Un']
    ELSE ingredients
  END,
  allergens_tr = CASE 
    WHEN allergens IS NOT NULL THEN 
      ARRAY(
        SELECT CASE 
          WHEN unnest = 'Dairy' THEN 'Süt Ürünleri'
          WHEN unnest = 'Eggs' THEN 'Yumurta'
          WHEN unnest = 'Gluten' THEN 'Gluten'
          WHEN unnest = 'Shellfish' THEN 'Kabuklu Deniz Ürünleri'
          WHEN unnest = 'Nuts' THEN 'Fındık'
          ELSE unnest
        END
        FROM unnest(allergens)
      )
    ELSE NULL
  END,
  chef_recommendation_tr = CASE 
    WHEN chef_recommendation IS NOT NULL THEN 
      CASE 
        WHEN name = 'Wagyu Beef Carpaccio' THEN 'Şefimiz bu lezzeti Barolo şarabı ile eşleştirmeyi öneriyor'
        WHEN name = 'Oysters Rockefeller' THEN 'Champagne veya beyaz şarap ile mükemmel uyum'
        WHEN name = 'Dry-Aged Ribeye' THEN 'Orta-az pişmiş olarak sipariş edin, Cabernet Sauvignon ile servis edin'
        WHEN name = 'Filet Mignon' THEN 'Bernaise sos ile birlikte, Pinot Noir eşliğinde'
        WHEN name = 'Porterhouse for Two' THEN 'Paylaşmak için mükemmel, bold kırmızı şarap ile'
        WHEN name = 'Truffle Mac & Cheese' THEN 'Et yemeklerinizin yanında harika bir seçim'
        WHEN name = 'Grilled Asparagus' THEN 'Hafif ve sağlıklı, ana yemeğinizi tamamlar'
        WHEN name = 'Chocolate Lava Cake' THEN 'Sıcakken servis edilir, vanilyalı dondurma ile'
        ELSE chef_recommendation
      END
    ELSE NULL
  END;
