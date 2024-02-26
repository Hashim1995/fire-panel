import { IGlobalResponse } from "@/models/common"

export interface IOptionItem {
    id: number,
    title: string,
    amount: number,
    isActive: boolean,
    paymentType: any
}

export interface IOptionListResponse extends IGlobalResponse {
    data: IOptionItem[]
}

export interface IOptionCreate {
    title: string,
    amount: number,
    paymentType: any
}

export interface IOptionUpdate {
    id: number,
    title: string,
    amount: number,
}


export interface ICountryFilter {
    title: string,
    Language: any
    status: any
}

// export interface IBlogSelectedItem {
//     "id": number,
//     "title": string,
//     "description": string,
//     "date": "13 Dec",
//     "author": "Admin Farhad Adminov",
//     "imageUrl": "images/blog\\052271d0-b489-4b8c-b8ba-03eb32a58c0f_autumn-forest-3840x2160-4k-hd-wallpaper-leaves-trees-lake-rocks-beach-578.jpg",
//     "slug": "test+ramiz277a1ed0-d45a-4ca7-b5d5-e64f1cabe47a",
//     "tags": []
// }