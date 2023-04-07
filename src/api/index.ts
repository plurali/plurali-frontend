import axios from "axios";

export interface SuccessResponse<TData extends object = object> {
    success: true
    data: TData
}

export interface ErrorResponse {
    success: false
    error: string
}

export type Response<TData extends object> = SuccessResponse<TData> | ErrorResponse;

export const $axios = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})