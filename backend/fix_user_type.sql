-- Run this SQL in your PostgreSQL database to fix the user_type column

-- Step 1: Alter the column type with USING clause
ALTER TABLE users 
ALTER COLUMN user_type TYPE integer USING 
  CASE 
    WHEN user_type = 'USER' THEN 0
    WHEN user_type IS NULL THEN 0
    ELSE user_type::integer
  END;

-- Step 2: Set default value
ALTER TABLE users 
ALTER COLUMN user_type SET DEFAULT 0;

-- Step 3: Set NOT NULL constraint
ALTER TABLE users 
ALTER COLUMN user_type SET NOT NULL;
