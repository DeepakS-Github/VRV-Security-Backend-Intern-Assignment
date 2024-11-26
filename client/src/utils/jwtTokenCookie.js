
export const setJwtTokenCookie = (token, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `access-token=${token};${expires};path=/;Secure`;
};


export const getJwtDecodedTokenCookie = () => {
    const cookies = document.cookie;
    const match = cookies
        .split("; ")
        .find(row => row.startsWith("access-token="));

    return match ? match.split("=")[1] : null;
};

export const removeJwtTokenCookie = () => {
    document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};


export const isAuthenticated = () => {
    return document.cookie.includes("access-token=");
};


