import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { RouterExtensions } from 'nativescript-angular/router';

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

    constructor(
        private http: HttpClient,
        private router: RouterExtensions,
    ){

    }

    get user(){
        return this._user.asObservable();
    }

    logout(){
        console.log('log out ---->');
        this._user.next(null);
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
       
        const expDate = new Date(new Date().getTime()+ expiresIn * 1000 );
        const user = new User(
            email,
            localId,
            idToken,
            expDate );
        
        this._user.next(user);
        
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