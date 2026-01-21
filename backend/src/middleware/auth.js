// backend/src/middleware/auth.js

const protect = (req, res, next) => {
    // Automatically inject a dummy admin user
    req.user = {
        userId: 1,
        email: 'admin@restaurant.com',
        role: 'admin',
        restaurant_id: 1
    };
    next(); 
};

const isAdmin = (req, res, next) => {
    next();
};

// ADD THIS LINE AT THE BOTTOM:
module.exports = { protect, isAdmin };