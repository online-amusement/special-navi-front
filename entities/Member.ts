import { type BasicResponse } from "./basicResponse";

type MemberEntities = {
    id: number,
    name: string,
    email: string,
    password: string,
    postal_code: string,
    tel: number
}

export interface Member extends BasicResponse  {
    data: MemberEntities
}