export class User{


    constructor(
        private email: string,
        private id: string,
        private _token: string,
        private _tokeExpirationDate: Date
    ){}

    get isAuth(){
        return !!this.token;
    }

    get token(){

        if(!this._token){
            return null;
        }
        if(!this._tokeExpirationDate || new Date() > this._tokeExpirationDate  ){
            return null;
        }

        return this._token;
    }

    

}