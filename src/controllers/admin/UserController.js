const User = require('../../models/User');
const { validationUserInput } = require('../../validations/admin/UserValidation');
const standardResponse = require('../../utils/ApiJsonResponse');
exports.index = async(req, res) => {
    try {
        const users = await User.find({ delete_at: null });
        res.render('admin/user/index', { users });
    } catch (err) {

    }
}

exports.create = async(req, res) => {
    try {
        res.render('admin/user/create');
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Oops, Something went wrong!',
            error: err.message
        });
    }
}

exports.store = async (req, res) => {
    try {
        const validationErrors = await validationUserInput(req.body);
        
        if (Object.keys(validationErrors.errors).length > 0) {
            return res.status(400).json(standardResponse.errorResponse('Validation failed', validationErrors.errors));
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            dateofbirth: req.body.dateofbirth,
            country_code: req.body.country_code,
            mobile_number: req.body.mobile_number,
        });

        const data = await user.save();
        res.status(201).json(standardResponse.successResponse('User created successfully', data));
    } catch (err) {
        console.error('Error saving user:', err); // Log the error
        res.status(500).json(standardResponse.errorResponse('Oops, Something went wrong!', { error: err.message }));
    }
};