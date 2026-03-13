-- Check if user exists and view details
SELECT id, name, email, password, user_type, username 
FROM users 
WHERE email = 'rohitphadatare61@gmail.com';

-- If user exists but can't login, check password
-- The password in database should match: 0987654321

-- If user doesn't exist, you need to register first
-- Or insert manually:
INSERT INTO users (name, full_name, email, mobile_number, phone_number, password, username, user_type, address, city, pincode)
VALUES ('Rohit Phadatare', 'Rohit Phadatare', 'rohitphadatare61@gmail.com', '7875390791', '7875390791', '0987654321', 'rohitphadatare61@gmail.com', 0, 'N/A', 'N/A', '000000');
