import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenge.service';
import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';
 
 

@Component({
    selector: 'app-today',
    templateUrl: 'today.component.html',
    styleUrls: ['today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {

    currentDay: Day;
    private challengeSub: Subscription;

   constructor(
        private router: RouterExtensions,
        private challengeService: ChallengeService,
    ) { }

    ngOnInit(): void {
        this.challengeSub = this.challengeService.currentChallenge.subscribe(
            curr =>{
                if(curr){
                    this.currentDay = curr.currentday;
                }
                
            }
        );

     }

    //onHandleInput(action: 'completed' | 'faild' | 'reset' )

    onHandleInput(action: DayStatus ){
        console.log(action);
        this.challengeService.updateDayStates(this.currentDay.dayInMonth, action);
    }
    
    ngOnDestroy(){
        if( this.challengeSub ){
             this.challengeSub.unsubscribe();
        }
    }
    // onSignIn(): any {
    //     console.log(' click to current challenge');
    //     this.router.navigate(['/app-current-challenge'],{ transition: {name:'slideLeft'}})
    // }

    getActionName(){
        if(this.currentDay.status === DayStatus.Completed){
            return 'completed';
        }
        if(this.currentDay.status === DayStatus.Failed){
            return 'faild';
        }
        return null;
    }

}
