import { type BasicResponse } from "./basicResponse";

type MemberEntities = {
    id: number,
    name: string,
    email: string,
    password: string,
    token: string,
    postalCode: string,
    address: string,
    address2: string,
    address3: string
    tel: number
}

export interface Member extends BasicResponse  {
    data: MemberEntities
}