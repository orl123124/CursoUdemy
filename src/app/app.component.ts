import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { UIService } from "./shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AuthService } from "./auth/auth.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit { 

    @ViewChild(RadSideDrawerComponent,{ static:false }) drawerComponent: RadSideDrawerComponent;
    
    enteredChallenge="";
    ActiveChallenge: string[] = [];

    private drawerSub: Subscription;
    private drawer: RadSideDrawer;
    constructor(
        private uiservice: UIService,
        private changedetectorRef: ChangeDetectorRef,
        private authService: AuthService,
        private router: RouterExtensions,
    ){}

    ngOnInit(){
        this.drawerSub = this.uiservice.drawerState.subscribe(
            ()=>{
                console.log('->subscripton toggle drawer! ');
                if(this.drawer){
                        this.drawer.toggleDrawerState();
                }
                
            }
        );
        //  YA NO SE NECESITA POR Q VA DIRECTO AL CHALLENGE Y VALIDA CON EL AUTHGUARD
        /*
        this.authService.autoLogin().subscribe(success =>{
            console.log('autoLogin()--->'+ success);
        });
        */
    }

    ngOnDestroy(){
        if(this.drawerSub){
            this.drawerSub.unsubscribe();
        }
    }

    ngAfterViewInit(){
        this.drawer = this.drawerComponent.sideDrawer;
        this.changedetectorRef.detectChanges();
    }

    onChallengeInput( challengeDescription: string){
        console.log('log onChallengeInput()->'+challengeDescription);
         
        this.ActiveChallenge.push(challengeDescription);
    }

    onLogOut(){
        this.uiservice.toggleDrawer();
        this.authService.logout();
      // this.router.navigate(['/',{ clearHistory: true}]);
        /*
        nsRouterLink="/" [clearHistory]="true"

        */
    }


}
