const validationUserInput = async (input, checkEmailUnique = true, userType='store') => {
    const errors = {};
    const requiredFields = ['name', 'username', 'email', 'dateofbirth', 'password', 'confirmation_password', 'country_code', 'mobile_number'];

    requiredFields.forEach(field => {
        if (!input[field]) {
            if (!errors[field] || input[field].trim() === '') {
                errors[field] = [];
            }
            switch (field) {
                case 'dateofbirth':
                    errors[field].push('The date of birth field is required.');
                    break;
                case 'mobile_number':
                    errors[field].push('The mobile number field is required.');
                    break;
                case 'country_code':
                    errors[field].push('The country code field is required.');
                    break;
                case 'confirmation_password':
                    errors[field].push('The confirmation password is required field is required.');
                    break;
                default:
                    errors[field].push(`The ${field} field is required.`);
                    break;
            }
        }
    });

    /* Validate email format */
    if (input.email && !/\S+@\S+\.\S+/.test(input.email)) {
        if (!errors.email) {
            errors.email = [];
        }
        errors.email.push('The email format is invalid.');
    }

    if (checkEmailUnique && input.email && await isEmailTaken(input.email)) {
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