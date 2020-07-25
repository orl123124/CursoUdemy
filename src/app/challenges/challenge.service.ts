import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, switchMap, catchError } from 'rxjs/operators';
import { Challenge } from './challenge.model';
import { dateProperty } from 'tns-core-modules/ui/date-picker';
import { DayStatus, Day } from './day.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn:'root' // visible for all proyect
})
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);


constructor(
    private http: HttpClient,
    private authService: AuthService,
){}

    get currentChallenge(){
        return this._currentChallenge.asObservable();
    }

    fetchCurrentChallenge(){
        return this.authService.user.pipe(
            
            switchMap(currentUser => {

                if(!currentUser || !currentUser.isAuth){ 
                    return; 
                }
                
                console.log(currentUser);
                return this.http.get<{
                    title:string;
                    description: string;
                    year: number;
                    month:number;
                    _days: Day[];
                }>(`https://app-challenge-76a46.firebaseio.com/challenge.json?auth=${currentUser.token}`)

            }),
            tap(data =>{
                if(data){
                    const loadedChallenge = new Challenge(
                        data.title,
                        data.description,
                        data.year,
                        data.month,
                        data._days
                    );
                    this._currentChallenge.next(loadedChallenge);
                }            
            }),
            catchError(err => {
                console.log(err);
                return err; 
            })       
        );
   
    }
    
    createNewChallenge(
        tittle: string,
        description: string
    ){
        console.log('createNewChallenge();');
        const newChallenge = new Challenge(tittle,description, new Date().getFullYear(),new Date().getMonth());
        // save it to server
        this.saveToServer(newChallenge);

        console.log('titulo:'+newChallenge.title);  
        console.log('desc:'+newChallenge.description);  
        this._currentChallenge.next(newChallenge); 
      

    }


    updateDayStates(dayInMonth: number, status: DayStatus){
        this._currentChallenge.pipe(
            take(1)
        ).subscribe(
            challenge =>{
                if(!challenge || challenge.days.length< dayInMonth){ return; }
                const dayIndex = challenge.days.findIndex( d => d.dayInMonth === dayInMonth);
                challenge.days[dayIndex].status = status;


                this._currentChallenge.next(challenge);
                console.log('updateDayStates() '+challenge.days[dayIndex]);
                // save this to a server
                this.saveToServer(challenge);

            }
        );

    }


    updateChallenge( title: string, description: string){

        this.currentChallenge.pipe(take(1)).subscribe(
            chall => {
                const upChallenge = new Challenge(
                    title,
                    description,
                    chall.year,
                    chall.month,
                    chall.days
                );
                // send to a server
                this.saveToServer(upChallenge);
                this._currentChallenge.next(upChallenge);

            }
        );

    }



    private saveToServer(challenge: Challenge){
            this.authService.user.pipe(
                 switchMap(currentUser => {

                    if(!currentUser || !currentUser.isAuth){
                        return;
                    }

                    return this.http.put(
                        `https://app-challenge-76a46.firebaseio.com/challenge.json?auth=${currentUser.token}`, 
                        challenge
                    )
                })
            )
            .subscribe( res => {
                console.log('respuesta new challenge: '+ res);
            });

    }
/*
    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
          if (!challenge || challenge.days.length < dayInMonth) {
            return;
          }
          const dayIndex = challenge.days.findIndex(
            d => d.dayInMonth === dayInMonth
          );
          challenge.days[dayIndex].status = status;
          this._currentChallenge.next(challenge);
          console.log(challenge.days[dayIndex]);
        
        });
      }
      */




}