export const convertToIST = (utcTime) => {
    const date = new Date(utcTime);

    const istTime = new Date(date.getTime());

    const options = { timeZone: "Asia/Kolkata", hour12: false };
    return istTime.toLocaleString("en-IN", options);
}
