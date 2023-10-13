import axios from "axios";
import { toast } from "react-toastify";
import Cookie from 'js-cookie'

axios.defaults.headers.post["Content-Type"] = "application/json";

const token = Cookie.get("token");

if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(null, (error) => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        console.log(error);
        toast.error("مشکلی از سمت سرور رخ داده است.");
    } else if (error.response) {
        toast.error(error.response.data.message)
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
