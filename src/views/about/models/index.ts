import { IGlobalResponse } from "@/models/common"

export interface IAboutItem {
    id: number
    title: string
    description: string
    imageUrl: string
    language: number
    updatedAt: string
    updatedBy: string
}
export interface IAboutResponse extends IGlobalResponse { data: IAboutItem[] }

export interface IAboutForm {
    id: number
    title: string
    description: string
    imageUrl: string

}
export interface IAboutUpsert {
    description: string
    title: string
    photo: any
    language: number
}