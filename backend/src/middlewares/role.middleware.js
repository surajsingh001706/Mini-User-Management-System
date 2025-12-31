const User = require('../models/user.model');

const protect = (req, res, next) => {
    // This strictly relies on auth middleware running first
    if (!req.user) {
        return res.status(500).json({ message: 'Role middleware require auth middleware' });
    }
    next();
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

module.exports = { authorize };
