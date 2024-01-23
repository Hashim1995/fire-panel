import { IGlobalResponse } from "@/models/common"

export interface IContactItem {
    id: number,
    header: string,
    description: string,
    phoneNumber: string,
    email: string,
    address: string,
    language: number
}
export interface IContactResponse extends IGlobalResponse { data: IContactItem[] }

export interface IContactForm {
    id: number
    header: string,
    description: string,
    phoneNumber: string,
    email: string,
    address: string,

}
export interface IContactUpsert {
    header: string,
    description: string,
    phoneNumber: string,
    email: string,
    address: string,
    language: number
}