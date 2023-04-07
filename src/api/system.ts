import { AxiosResponse } from "axios"
import { $axios, Response } from "."
import { Member, System } from "./types"

export interface SystemData {
    system: System
}

export interface SystemMembersData {
    members: Member[]
}

export interface SystemMemberData {
    member: Member
}

export const getSystem = (): Promise<AxiosResponse<Response<SystemData>>> => $axios.request<Response<SystemData>>({
    url: '/system',
    method: 'GET',
})

export const getMembers = (): Promise<AxiosResponse<Response<SystemMembersData>>> => $axios.request<Response<SystemMembersData>>({
    url: '/system/members',
    method: 'GET',
})

export const getMember = (id: string): Promise<AxiosResponse<Response<SystemMemberData>>> => $axios.request<Response<SystemMemberData>>({
    url: `/system/member/${id}`,
    method: 'GET',
})