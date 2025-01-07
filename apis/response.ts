import Basic from './basic';
import * as SpaNavi from '../transmission/apis/speNavi';
import { type Member } from '~/entities/Member';

export default class Response extends Basic {
    //仮登録
    public static temporaryRegistration(email: string): Promise<Member> { 
        return this.createPromise(SpaNavi.temporaryRegistration, {
            email: email,
        })
    }
    //新規会員登録
    public static officialRegistration(name: string, password: string, apiToken: string, postalCode: string, address: string, address2: string, address3: string, tel: number): Promise<Member> { 
        return this.createPromise(SpaNavi.officialRegistration, {
            name: name,
            password: password,
            apiToken: apiToken,
            postalCode: postalCode,
            address: address,
            address2: address2,
            address3: address3, 
            tel: tel
        })
    }
    //ログイン
    public static login(email: string, password: string): Promise<Member> {
        return this.createPromise(SpaNavi.login, {
            email: email,
            password: password
        })
    }
    //住所取得
    public static searchAddress(postalCode: string): Promise<Member> {
        return this.createPromise(SpaNavi.searchAddress, {
            postalCode: postalCode
        })
    }
}