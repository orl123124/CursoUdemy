import { Component, OnInit, ViewContainerRef, OnDestroy  } from '@angular/core';
 import { ModalDialogService} from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { dateProperty } from 'tns-core-modules/ui/date-picker';
import { UIService } from '~/app/shared/ui/ui.service';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '../day.model';
// import { RouterExtensions } from 'nativescript-angular/router';
// import { ItemEventData } from 'tns-core-modules/ui/list-view';
@Component({
    selector: 'app-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.scss']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    
    currentChallengeSub: Subscription;
    WeekDays: string [] = ['S','M','T','W','T','F','S'];
    //days: {daysInMonth: number, daysInweek: number}[] = [];
    currentChallenge: Challenge;

 

    // @Input() Challenges : string[] = [];
    constructor(
       // private router: RouterExtensions
       private modalDialog: ModalDialogService,
       private vcRef: ViewContainerRef,
       private uiService: UIService,
       private challengeService: ChallengeService,
    ) { }

    ngOnInit(): void { 
        console.log('........ngOnInit........');
         
     this.currentChallengeSub =  this.challengeService.currentChallenge.subscribe(
         c =>{
           this.currentChallenge = c;    
       }, err =>{
            console.log('error en  current challenge'+ err);
       });
  
    }

  /*   onEdit() {
        this.router.navigate(['/challenges/edit']);
    } */
    onChangeStatus( day: Day){
        if( !this.getDayIsSettable(day.dayInMonth)){
            return;
        }

        this.modalDialog.showModal(DayModalComponent,
            { fullscreen:true, 
                viewContainerRef: this.vcRef,
                context:{ date: day.date, status: day.status }
             }
            ).then((status: DayStatus)=>{
                console.log(status);    
                if(status === DayStatus.Open){
                    return;
                }            
                this.challengeService.updateDayStates(day.dayInMonth,status);
            });
    }



    getRow(index: number,day: {dayInMonth: number, dayInWeek: number} ){
        const startRow = 1;
        const weekRow = Math.floor(index/7);
        // console.log(index+" weekRow:"+ weekRow);
        const firstDayInMonth = new Date(new Date().getFullYear(),new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstDayInMonth ? 1:0;

        return startRow + weekRow + irregularRow;
    }



    getDayIsSettable(dayInMonth: number){

        return dayInMonth<= new Date().getDate();
    }

    ngOnDestroy(){
        if(this.currentChallengeSub){
            this.currentChallengeSub.unsubscribe();
        }
        
    }

}
