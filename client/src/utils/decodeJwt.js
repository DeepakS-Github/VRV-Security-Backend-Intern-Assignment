export const decodeJwt = (token) => {
    const payloadBase64 = token.split('.')[1]; 
    const decodedPayload = atob(payloadBase64); 
    return JSON.parse(decodedPayload); 
}