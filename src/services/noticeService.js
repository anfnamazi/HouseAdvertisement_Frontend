import http from "./httpService";
import config from "../config.json";

export const getNotices = () => {
    return http.get(config.api_notice);
};

export const getNotice = (NoticeId) => {
    return http.get(`${config.api_notice}/${NoticeId}`);
};
export const createNewNotice = (Notice) => {
    return http.post(`${config.api_notice}/create`, Notice);
};

export const deleteNotice = (NoticeId) => {
    return http.delete(`${config.api_notice}/delete/${NoticeId}`);
};

export const updateNotice = (NoticeId, Notice) => {
    return http.put(`${config.api_notice}/update/${NoticeId}`, Notice);
};
