export const convertToIST = (utcTime) => {
    const date = new Date(utcTime);

    const istOffset = 5 * 60 + 30; 

    const istTime = new Date(date.getTime() + istOffset * 60 * 1000);

    const options = { timeZone: "Asia/Kolkata", hour12: false };
    return istTime.toLocaleString("en-IN", options);
}
