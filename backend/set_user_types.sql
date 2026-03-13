-- SQL to set user types

-- Set user_type = 1 for Super Admin
UPDATE users SET user_type = 1 WHERE email = 'admin@example.com';

-- Set user_type = 2 for Municipal Admin (replace with actual email)
UPDATE users SET user_type = 2 WHERE email = 'municipal@example.com';

-- Set user_type = 0 for Regular Users (default)
-- This is already set during registration

-- To check user types:
SELECT id, name, email, user_type FROM users;
