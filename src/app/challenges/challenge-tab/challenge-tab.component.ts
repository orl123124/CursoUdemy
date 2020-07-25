import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ChallengeService } from '../challenge.service';

@Component({
    selector: 'app-challenge-tab',
    templateUrl: 'challenge-tab.component.html',
    styleUrls: ['challenge-tab.component.css']
})
export class ChallengeTabComponent implements OnInit {

    isLoading = false;

    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page,
        private challengeService: ChallengeService,
    ) { }

    ngOnInit(): void { 
        this.isLoading = true;
        
        this.challengeService.fetchCurrentChallenge().subscribe( res =>{
            console.log('fetch.....!');
            this.isLoading = false;
            this.loadTabRoad();
        },
        err =>{
            alert(err.error.error);
            this.isLoading = false;
            this.loadTabRoad();
        });
        

        this.isLoading = false;
        this.loadTabRoad();
    
        this.page.actionBarHidden= true;
    }



    loadTabRoad(){
      setTimeout(() => {
            this.router.navigate(
                [{ 
                    outlets:{ current_Challenge:['app-current-challenge'],today:['app-today']  } 
                 }],
                 {
                     relativeTo: this.active
                 }
            );
      }, 10);
        console.log('loadTabRoad --_>');
    }


}
