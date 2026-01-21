// Replace the entire protect function with this:
const protect = (req, res, next) => {
    // Automatically inject a dummy admin user
    req.user = {
        userId: 1,
        email: 'admin@restaurant.com',
        role: 'admin',
        restaurant_id: 1
    };
    next(); // Always proceed to the next function
};

// Ensure isAdmin always allows access
const isAdmin = (req, res, next) => {
    next();
};