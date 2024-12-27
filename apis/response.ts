import Basic from './basic';
import * as SpaNavi from '../transmission/apis/speNavi';
import { type Member } from '~/entities/Member';

export default class Response extends Basic {
    //仮登録
    //新規会員登録
    //ログイン
    public static login(email: string, password: string): Promise<Member> {
        return this.createPromise(SpaNavi.login, {
            email: email,
            password: password
        })
    }
}