export enum Visibility {
    Trusted = 'Trusted',
    Private = 'Private',
    Public = 'Public'
}

export interface MemberField {
    fieldId: string,
    name: string,
    position: number,
    visibility: Visibility
}

export interface MemberFieldWithValue extends MemberField {
    value: string
}

export interface User {
    id: string
    username: string
    pluralKey: string
}

export interface System {
    id: string,
    lastModified: Date,
    username: string,
    fields: MemberField[],
    color: string | null,
    description: string | null,
    avatar: string | null
}

export interface Member {
    id: string,
    name: string,
    pronouns: string|null,
    visibility: Visibility,
    lastModified: Date,
    color: string|null,
    description: string|null,
    fields: MemberFieldWithValue[],
    avatar: string|null
}