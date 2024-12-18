const validationUserInput = async (input, authType='signup', checkEmailUnique = true) => {
    const errors = {};

    const requiredFields = authType == 'signup' ? ['name', 'email', 'password', 'confirmation_password'] : ['email', 'password'];

    requiredFields.forEach(field => {
        if (!input[field]) {
            if (!errors[field] || input[field].trim() === '') {
                errors[field] = [];
            }
            switch (field) {
                case 'confirmation_password':
                    errors[field].push('The confirmation password is required field is required.');
                    break;
                default:
                    errors[field].push(`The ${field} field is required.`);
                    break;
            }
        }
    });

    if (authType === 'signup' && input.password !== input.confirmation_password) {
        if (!errors.confirmation_password) {
            errors.confirmation_password = [];
        }
        errors.confirmation_password.push('The confirmation password does not match the password.');
    }

    /* Validate email format */
    if (input.email && !/\S+@\S+\.\S+/.test(input.email)) {
        if (!errors.email) {
            errors.email = [];
        }
        errors.email.push('The email format is invalid.');
    }

    if ((authType == 'signup') && checkEmailUnique && input.email && await isEmailTaken(input.email)) {
        if (!errors.email) {
            errors.email = [];
        }
        errors.email.push('The email address is already in use.');
    }

    return {
        errors: errors
    };
};
module.exports = {
    validationUserInput,
};