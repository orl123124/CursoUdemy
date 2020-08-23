export class User{


    constructor(
        private email: string,
        private id: string,
        private _token: string,
        private _tokeExpirationDate: Date
    ){}


    get userId(){
        return this.id;
    }

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


    get timeToExpiry(){
        console.log('timeToExpiry()'+ ( new Date().getTime() ) );
        console.log('timeToExpiry() .....'+  this._tokeExpirationDate.getTime()  );
        
        
        return this._tokeExpirationDate.getTime() - new Date().getTime(); 
    }

    

}