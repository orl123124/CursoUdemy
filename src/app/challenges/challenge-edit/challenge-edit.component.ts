import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenge.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {
    
    isCreated: Boolean =true;
    title = '';
    description ='';

    constructor(
        private activatedRouter: ActivatedRoute,
        private pageRoute: PageRoute,
        private routerExtensions: RouterExtensions,
        private challengeService: ChallengeService,
    ) { }

    ngOnInit(): void { 

        console.log(".......app-challenge-edit......");

   /*      this.activatedRouter.paramMap.subscribe( p =>{
           console.log(p.get('mode'));
        }); */

        this.pageRoute.activatedRoute.subscribe(activatedRoute =>{
            activatedRoute.paramMap.subscribe(paraMap =>{
                console.log(paraMap.get('mode'));
                if(!paraMap.has('mode')){
                    this.isCreated = true;
                }else{
                    this.isCreated  = (paraMap.get('mode')==='edit')?false:true;
                }

                //se value when is editing
                if(!this.isCreated){ 
                    this.challengeService.currentChallenge.pipe( take(1) ).subscribe(
                        chall =>{
                            this.title = chall.title;
                            this.description = chall.description;
                        }
                    );
                }


            });
        });
    }

    /*
    challengeDescription = "";   
    @Output() input = new EventEmitter<string>();

    onSetChallenge(): any { 
       this.input.emit(this.challengeDescription);
    }
    */
   onSubmit(title: string, descrip: string){
    console.log('-----crear registro -------->>>');
      // console.log(title, descrip);
      if(this.isCreated){
        this.challengeService.createNewChallenge(title,descrip);
      }
      else{
          this.challengeService.updateChallenge(title, descrip);
      }
       
       this.routerExtensions.backToPreviousPage();
       
       //this.routerExtensions.navigate(['/challenges/app-current-challenge']);

   }

}
