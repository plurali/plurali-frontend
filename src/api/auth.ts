import { AxiosResponse } from "axios"
import { $axios, Response } from "."
import { User } from "./types"

export interface AuthInput {
    username: string
    password: string
}

export interface AuthData {
    user: User
}

export interface AuthLogoutData {
    message: 'ok'
}

export const register = (data: AuthInput): Promise<AxiosResponse<Response<AuthData>>> => $axios.request<Response<AuthData>>({
    url: '/auth/register',
    method: 'PUT',
    data,
})

export const login = (data: AuthInput): Promise<AxiosResponse<Response<AuthData>>> => $axios.request<Response<AuthData>>({
    url: '/auth/login',
    method: 'POST',
    data,
})

export const logout = (): Promise<AxiosResponse<Response<AuthLogoutData>>> => $axios.request<Response<AuthLogoutData>>({
    url: '/auth/logout',
    method: 'POST',
})