const express = require('express');
const router = express.Router();
const {
    getMe,
    updateDetails,
    updatePassword,
    getUsers,
    updateUserStatus
} = require('../controllers/user.controller');

const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { validateUpdateProfile, validateChangePassword, validate } = require('../utils/validators');

// Re-use protect middleware for all routes
router.use(protect);

router.get('/me', getMe);
router.put('/updatedetails', validateUpdateProfile, validate, updateDetails);
router.put('/updatepassword', validateChangePassword, validate, updatePassword);

// Admin Routes
router.get('/admin/users', authorize('admin'), getUsers);
router.put('/admin/users/:id/status', authorize('admin'), updateUserStatus);

module.exports = router;
