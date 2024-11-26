

export const isStrongPassword = (password) => {
    // Password Criteria:
    // 1. At least 8 characters long.
    // 2. Contains at least one lowercase letter.
    // 3. Contains at least one uppercase letter.
    // 4. Contains at least one numeric digit.
    // 5. Contains at least one special character (e.g., !@#$%^&*()).

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return strongPasswordRegex.test(password);
};



export const isValidEmail = (email) => {

    // Email Criteria:
    // 1. Ensures at least one character exists before the @.
    // 2. Ensures exactly one @ is present.
    // 3. Ensures the domain name has at least one character before the ..
    // 4. Ensures a . exists after the domain name.
    // 5. Ensures the top-level domain (TLD) has at least one character.
    // 6. Disallows spaces anywhere in the email.
    // 7. Validates the basic structure: local-part@domain.tld.


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

