// Password Criteria:
// 1. At least 8 characters long.
// 2. Contains at least one lowercase letter.
// 3. Contains at least one uppercase letter.
// 4. Contains at least one numeric digit.
// 5. Contains at least one special character (e.g., !@#$%^&*()).


export const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return strongPasswordRegex.test(password);
};

