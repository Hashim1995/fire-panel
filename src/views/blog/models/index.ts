import { IGlobalResponse } from "@/models/common"

export interface IBlogItem {
    id: number,
    title: string,
    author: string,
    createdAt: string,
    updatedAt: string | Date,
    language: number,
    isActive: boolean
}

export interface IBlogListResponse extends IGlobalResponse {
    data: {
        data: IBlogItem[]
        totalDataCount: number
    }
}

export interface IBlogCreate {
    Title: string,
    Description: string,
    Photo: File,
    DateOfPublish: any,
    Language: any,
    Tags: string,
}

export interface IBlogFilter {
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