import { AxiosResponse } from "axios"
import { $axios, Response } from "."
import {Member, MemberField, MemberFieldData, System} from "./types"

export interface SystemData {
    system: System
}

export interface SystemMembersData {
    members: Member[]
}

export interface SystemMemberData {
    member: Member
}

export interface UpdateSystemFieldRequest {
    visible?: boolean,
    description?: string
}

export interface SystemFieldData {
    field: MemberField
}

export interface SystemFieldsData {
    fields: MemberField[]
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
    url: `/system/members/${id}`,
    method: 'GET',
})

export const getFields = (): Promise<AxiosResponse<Response<SystemFieldsData>>> => $axios.request<Response<SystemFieldsData>>({
    url: '/system/fields',
    method: 'GET',
})

export const updateField = (id: string, data: UpdateSystemFieldRequest): Promise<AxiosResponse<Response<SystemFieldData>>> => $axios.request<Response<SystemFieldData>>({
    url: `/system/fields/${id}`,
    method: 'POST',
    data
})