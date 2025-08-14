-- Make Turkish the primary language (required) and English optional

-- First, ensure all existing records have Turkish values
UPDATE categories SET 
  name_tr = COALESCE(name_tr, name),
  subtitle_tr = COALESCE(subtitle_tr, subtitle)
WHERE name_tr IS NULL OR subtitle_tr IS NULL;

UPDATE menu_items SET 
  name_tr = COALESCE(name_tr, name),
  description_tr = COALESCE(description_tr, description),
  detailed_description_tr = COALESCE(detailed_description_tr, detailed_description),
  ingredients_tr = COALESCE(ingredients_tr, ingredients),
  allergens_tr = COALESCE(allergens_tr, allergens),
  chef_recommendation_tr = COALESCE(chef_recommendation_tr, chef_recommendation)
WHERE name_tr IS NULL OR description_tr IS NULL;

-- Now make Turkish fields NOT NULL and English fields nullable
ALTER TABLE categories 
  ALTER COLUMN name_tr SET NOT NULL,
  ALTER COLUMN subtitle_tr SET NOT NULL,
  ALTER COLUMN name DROP NOT NULL,
  ALTER COLUMN subtitle DROP NOT NULL;

ALTER TABLE menu_items 
  ALTER COLUMN name_tr SET NOT NULL,
  ALTER COLUMN description_tr SET NOT NULL,
  ALTER COLUMN detailed_description_tr SET NOT NULL,
  ALTER COLUMN ingredients_tr SET NOT NULL,
  ALTER COLUMN allergens_tr SET NOT NULL,
  ALTER COLUMN name DROP NOT NULL,
  ALTER COLUMN description DROP NOT NULL,
  ALTER COLUMN detailed_description DROP NOT NULL,
  ALTER COLUMN ingredients DROP NOT NULL,
  ALTER COLUMN allergens DROP NOT NULL;

-- Update the check constraints to reflect Turkish as primary
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_name_check;
ALTER TABLE categories ADD CONSTRAINT categories_name_tr_check CHECK (length(trim(name_tr)) > 0);

ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_name_check;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_name_tr_check CHECK (length(trim(name_tr)) > 0);
ALTER TABLE menu_items ADD CONSTRAINT menu_items_description_tr_check CHECK (length(trim(description_tr)) > 0);
