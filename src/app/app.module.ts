import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
// import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { StackComponent } from './layouts/stack/stack.component';
import { FlexboxComponent } from "./layouts/flexbox/flexbox.component";
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
// import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { AuthComponent } from './auth/auth.component';
// import { TodayComponent } from './challenges/today/today.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
// import { ChallengeTabComponent } from "./challenges/challenge-tab/challenge-tab.component";
import { DayModalComponent } from "./challenges/day-modal/day-modal.component";
import { SharedModule } from "./shared/ui/shared.module";
import { ChallengeActionModule } from "./challenges/challenge-action/challenge-action.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptUISideDrawerModule,
        SharedModule, // CONTIENE EL ActionBarComponent PARA EL LAZY LOADING ROUTING
        ChallengeActionModule,
        NativeScriptHttpClientModule,

    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,       
        StackComponent,
        FlexboxComponent,
        GridComponent,
        AbsoluteComponent,
        AuthComponent,
        // ActionBarComponent, // SE ELIMINA YA QUE ESTA COMPARTIDA X SHAREDMODULE
       
        DayModalComponent,
    ],
    providers: [], 
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents:[DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
