export default class Basic {
    static createPromise<T>(callback: Function, parameter: {}, token: boolean = true): Promise<T> {
        let combinedParams = Object.assign(parameter);

        if(token) {
            combinedParams["Authorization"] = localStorage.getItem("auth._token")
        }
        return new Promise(async (resolve,reject) => {
            try 
            {
                const response = await callback(combinedParams);
                resolve(response.data.value)
            }
            catch(error)
            {
                reject(error)
            }
        });
    }
}