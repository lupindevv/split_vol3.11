-- 1. Insert/Update the restaurant (Forcing ID 1)
INSERT INTO restaurants (id, name, address, phone) 
VALUES (1, 'Restaurant Deluxe', '123 Main Street, Sofia', '+359 2 123 4567')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    address = EXCLUDED.address;

-- 2. Insert/Update the Admin User (Forcing ID 1)
-- Since you are bypassing login, the password doesn't matter, but we include a placeholder.
INSERT INTO users (id, restaurant_id, email, password, name, role)
VALUES (
    1, 
    1, 
    'admin@restaurant.com', 
    'bypassed', 
    'Administrator',
    'admin'
)
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    role = EXCLUDED.role;

-- 3. Insert sample menu items (Idempotent check)
-- This adds the items only if they don't already exist by name
INSERT INTO menu_items (restaurant_id, name, description, category, price, available)
SELECT 1, 'Margherita Pizza', 'Classic tomato, mozzarella, basil', 'Main Course', 12.50, true
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Margherita Pizza');

INSERT INTO menu_items (restaurant_id, name, description, category, price, available)
SELECT 1, 'Pepperoni Pizza', 'Tomato, mozzarella, pepperoni', 'Main Course', 14.00, true
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Pepperoni Pizza');

-- (Add other items similarly or truncate the table before seeding)

-- 4. Insert sample tables (Idempotent check)
INSERT INTO tables (restaurant_id, table_number, status)
SELECT 1, '1', 'available' WHERE NOT EXISTS (SELECT 1 FROM tables WHERE table_number = '1');

INSERT INTO tables (restaurant_id, table_number, status)
SELECT 1, '5', 'available' WHERE NOT EXISTS (SELECT 1 FROM tables WHERE table_number = '5');