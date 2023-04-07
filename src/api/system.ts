import { AxiosResponse } from "axios"
import { $axios, Response } from "."
import { Member, System } from "./types"

export interface SystemData {
    system: System
}

export interface SystemMembersData {
    members: Member[]
}

export const getSystem = (): Promise<AxiosResponse<Response<SystemData>>> => $axios.request<Response<SystemData>>({
    url: '/system',
    method: 'GET',
})

export const getMembers = (): Promise<AxiosResponse<Response<SystemMembersData>>> => $axios.request<Response<SystemMembersData>>({
    url: '/system/members',
    method: 'GET',
})