import Cookie from 'js-cookie';
import JWT from 'jsonwebtoken';

export const isValidToken = () => {
    const token = Cookie.get("token")
    if (token) {
        const tokenDecoded = JWT.decode(token);
        const exp = tokenDecoded.exp;
        const now = Math.floor(Date.now() / 1000);
        if (exp > now) {
            return true;
        } else {
            Cookie.remove("token");
            return false;
        }
    } else {
        return false;
    }
}