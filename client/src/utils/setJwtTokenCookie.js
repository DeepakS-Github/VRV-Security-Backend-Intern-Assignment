export const setJwtTokenCookie = (token, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `access-token=${token};${expires};path=/;Secure`;
};
