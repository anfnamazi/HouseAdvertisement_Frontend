import http from "./httpService";
import config from "../config.json";

export const registerUser = user => {
    return http.post(
        `${config.api_auth}/register`,
        user
    );
};

export const loginUser = user => {
    return http.post(`${config.api_auth}/login`, user);
};
