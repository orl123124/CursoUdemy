import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { User } from './user.model';
import { RouterExtensions } from 'nativescript-angular/router';

import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { ChallengeService } from '../challenges/challenge.service';

const FIREBASE_KEY ='AIzaSyBPdhSJAw49eD-BFYUMIByZnJGr29oHl_k';
interface authRespondeData{
        idToken: string;	// A Firebase Auth ID token for the newly created user.
        email: string;	// The email for the newly created user.
        refreshToken: string; // A Firebase Auth refresh token for the newly created user.
        expiresIn: string;	// The number of seconds in which the ID token expires.
        localId: string;
        registered?:	boolean	//Whether the email is for an existing account.
}
@Injectable({
        providedIn:'root' // visible for all proyect
    })

export class AuthService {

    private _user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: number;

    constructor(
        private http: HttpClient,
        private router: RouterExtensions,
        // private challengeService: ChallengeService,
    ){

    }

    get user(){
        return this._user.asObservable();
    }

    autoLogin(){
        if(!hasKey('userdata')){
            return of(false);
        }

        const userData:{
              email: string;
              id: string;
              _token: string;
              _tokeExpirationDate: string;
        } = JSON.parse(getString('userdata'));

        const loadUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokeExpirationDate)
        );

        if(loadUser.isAuth){

            this._user.next(loadUser);
            this.autoLogOut(loadUser.timeToExpiry);
            // SE INICA DESDE CHALLENGE VALIDADO CON GUARD
            //this.router.navigate(['/challenges'],{ clearHistory: true })
            return of(true);
        }
        return of(false);
    }

    autoLogOut(expDuration: number){
console.log('autoLogOut-------->'+expDuration );
        this.tokenExpirationTimer = setTimeout(() => this.logout(),expDuration);

    }

    logout(){
        console.log('log out ---->');
        this._user.next(null);

        remove('userdata');
        if(this.tokenExpirationTimer){
            console.log(' tokenExpirationTimer --->');
            clearTimeout(this.tokenExpirationTimer);
        }
           
        
        // this.challengeService.cleanUP();
        this.router.navigate(['/app-auth'],{  clearHistory: true });
    }

    signUp(email: string, password: string ){
       return  this.http.post<authRespondeData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
        {email: email, password: password, returnSecureToken: true }).pipe(catchError(err => {
            this.handleError(err.error.error.message);
            return throwError(err);
        }),
        tap(respData => {
            if(respData && respData.idToken){

                this.handleLogin(
                    email,
                    respData.localId, 
                    respData.idToken,
                    parseInt(respData.expiresIn)
                   );

            }
        })
        );         
    }

    login(email: string, password: string ){ 
        return this.http.post<authRespondeData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
            {email: email, password: password, returnSecureToken: true }).pipe(catchError(err =>{
                this.handleError(err.error.error.message);
                return throwError(err);
            }),
            tap(respData => {
                if(respData && respData.idToken){
                  
                    this.handleLogin(
                        email,
                        respData.localId, 
                        respData.idToken,
                        parseInt(respData.expiresIn)
                       );

                }
            })

            
            );            
    }

    handleLogin(email: string, localId: string, idToken: string, expiresIn: number ){
       
        const expDate = new Date(new Date().getTime()+ expiresIn  * 1000 );
        const user = new User(
            email,
            localId,
            idToken,
            expDate );
        
            setString('userdata',JSON.stringify(user));
        this.autoLogOut(user.timeToExpiry);
        this._user.next(user);
        //save local storage


    }

    handleError(error: string){
        console.log(error);
        switch(error){
            case 'INVALID_PASSWORD':
                    alert('The email address is already in use by another account.');
                    break;
            case 'EMAIL_EXISTS':
                alert('The password is invalid or the user does not have a password.');
                    break;
            default:
                    alert('Check your credencial!.');
                    break;
        }
    }


}