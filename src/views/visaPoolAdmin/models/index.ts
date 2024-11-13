import { IGlobalResponse } from "@/models/common"

export interface IIdTitleObj {
    id: number;
    title: string;
}

export interface IOperator {
    id: string;
    firstname: string;
    lastname: string;
}


export interface IRepresentative {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export interface IEuropeanFamilyMember {
    id: number;
    firstname: string;
    lastname: string;
    passportUri: string;
}

export interface IVisaApplicant {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    nationality: string;
    dateOfBirth: string;
    personalNo: string;
    gender: number;
    passportNo: string;
    passportDateOfIssue: string;
    passportDateOfExpiry: string;
    isAdult: boolean;
    hasEuropeanFamilyMember: boolean;
    otherCountryResidenceInformation: string;
    representative?: IRepresentative;
    europeanFamilyMember: IEuropeanFamilyMember;
    visaDocuments?: {
        id: number,
        uri: string,
        documentType: number,
        isConfirmed?: boolean
    }[];
}
export interface IVisaExtraOption {
    title: string;
    id: number;
}
export interface IVisaApplicationItem {
    id: number;
    visaCategory: number;
    entryCountry: number;
    visaType: number;
    travelDocumentType: string;
    departureDate: string;
    returnDate: string;
    visaLevel: number;
    visaLevelText: string;
    visaStatus: number;
    isDone: boolean;
    country: IIdTitleObj;
    operator: IOperator;
    canEnterExpense: boolean;
    extraOptions: IVisaExtraOption[] | null,
    customer: {
        firstname: string,
        lastname: string,
        email: string
    }
    visaApplicants: IVisaApplicant[];
}


export interface IVisaApplicationListResponse extends IGlobalResponse {
    data: {
        data: IVisaApplicationItem[]
        totalDataCount: number
    }
}

export interface ICountryCreate {
    Title: string,
    Description: string,
    CoverPhoto: any,
    FlagPhoto: any,
    Language: any,
}

export interface ICountryUpdate {
    Title: string,
    Description: string,
    Id: string,
    CoverPhoto: any,
    FlagPhoto: any,
    Language: any,
}


export interface IVisaFilter {
    applicantName: string,
    visaTypes: any
    visaLevels: any
}

export interface IVisaLevels {
   count: number;
   label: string;
   value : number;
}

export interface IGetVisaLevelsResposne extends IGlobalResponse {
  data : IVisaLevels[];
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