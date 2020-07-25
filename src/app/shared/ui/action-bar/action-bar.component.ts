import { Component, OnInit, Input } from '@angular/core';
 
import { Page, isAndroid } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../ui.service';


declare var android: any;

@Component({
    selector: 'app-action-bar',
    templateUrl: 'action-bar.component.html',
    styleUrls: ['action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

    @Input()  title: string;
    @Input() showBackButton = true; 
    @Input() hasMenu = true; 
    constructor(
        private router: RouterExtensions,
        private page: Page,
        private uiservice: UIService,
    ) { }
    
    get android(){
        return isAndroid;
    }
   // action bar  android CODE TO GO BACK -- PROPERTY
   get canGoBack(){
        return this.router.canGoBack() && this.showBackButton;
   }
 // GO BACK FUNCTION 
   onGoBack(){
        this.router.backToPreviousPage();
   }

    ngOnInit(): void { }

    onLoadedActionBar(){
        if(isAndroid && !this.hasMenu){
            console.log("====>>>>es un android.....");
            const androidtoolbar = this.page.actionBar.nativeView;
            const backButtom = androidtoolbar.getNavigationIcon();

            if(backButtom){
                console.log("====>>>>back button exists-- android.....");
              var colorIconBack_ = android.graphics.Color.parseColor("black")

                backButtom.setColorFilter(
                    colorIconBack_, 
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
                 
                 

                
            }

        }


    }


    onToogleMenu(){
        console.log('toogle menu ');
        this.uiservice.toggleDrawer();
    }
    
}
