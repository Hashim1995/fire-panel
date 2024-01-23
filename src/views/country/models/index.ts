import { IGlobalResponse } from "@/models/common"

export interface ICountryItem {
    id: number,
    title: string,
    createdAt: string,
    createdBy: string,
    updatedAt: string | null,
    language: number,
    isActive: true
}

export interface ICountryListResponse extends IGlobalResponse {
    data: {
        data: ICountryItem[]
        totalDataCount: number
    }
}

export interface ICountryCreate {
    Title: string,
    Description: string,
    CoverPhoto: File,
    FlagPhoto: File,
    Language: any,
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