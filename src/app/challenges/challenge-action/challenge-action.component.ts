import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DayStatus } from '../day.model';

@Component({
    selector: 'app-challenge-action',
    templateUrl: './challenge-action.component.html',
    styleUrls: ['./challenge-action.component.scss']
})
export class ChallengeActionComponent implements OnInit, OnChanges {

    @Output() actionSelect = new EventEmitter<DayStatus>();
    @Input() cancelText ='cancel';
    @Input() chosen: 'completed' | 'faild' = null;
    @Input() startDone = false;

    action: 'completed' | 'faild' = null;
    done = false;

    constructor() { }

  

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.chosen){
            this.action = changes.chosen.currentValue;
            if (changes.chosen.currentValue === null){ this.done = false; } 
         //   else{ this.done = true;  }
        }
        if(changes.startDone){
            if(changes.startDone.currentValue){
                this.done = true; 
            }
        }

    }


    onAction(action: 'completed' | 'faild' | 'reset' ){
        this.done = true;
        let status = DayStatus.Open;

        if(action === 'completed'){
            status = DayStatus.Completed;
            this.action = 'completed';
        }
        else if( action === 'faild'){
            status = DayStatus.Failed;
            this.action = 'faild';
        }
        else if( action === 'reset'){           
            this.action = null;
            this.done = false;
        }

        
        this.actionSelect.emit(status);

    }
    
}
