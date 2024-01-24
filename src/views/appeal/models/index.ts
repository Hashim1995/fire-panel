import { IGlobalResponse } from "@/models/common"

export interface IAppealItem {
    createdAt: string,
    description: string,
    email: string,
    fullname: string,
    id: 1,
    phoneNumber: string,
    title: string,
}

export interface IAppealListResponse extends IGlobalResponse {
    data: {
        data: IAppealItem[]
        totalDataCount: number
    }
}

export interface IAppealCreate {
    Title: string,
    Description: string,
    CoverPhoto: any,
    FlagPhoto: any,
    Language: any,
}

export interface IAppealUpdate {
    Title: string,
    Description: string,
    Id: string,
    CoverPhoto: any,
    FlagPhoto: any,
    Language: any,
}


export interface IAppealFilter {
    email: string,
    phoneNumber: string,
    title: string
    author: string
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