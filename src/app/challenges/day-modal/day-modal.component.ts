import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DayStatus } from '../day.model';

@Component({
    selector: 'app-day-modal',
    templateUrl: 'day-modal.component.html',
    styleUrls: ['day-modal.component.css']
})
export class DayModalComponent implements OnInit {

    loadDate: Date;
    loadStatus: 'completed' | 'faild' = null;
    constructor(
        private modalParams: ModalDialogParams
    ) { }

    ngOnInit(): void { 
        const param = (this.modalParams.context as { date: Date, status: DayStatus });
        this.loadDate = param.date;
        if(param.status === DayStatus.Completed){
            this.loadStatus ='completed';
        }
        else if (param.status === DayStatus.Failed){
            this.loadStatus ='faild';
        }else{
            this.loadStatus  = null;
        }

    }

    //onHandleInput(action: 'completed' | 'faild' | 'reset' ){

    onHandleInput(action: DayStatus ){
        this.modalParams.closeCallback(action);// send  a callback to onChangeStatus on current-challenge
    }
}
