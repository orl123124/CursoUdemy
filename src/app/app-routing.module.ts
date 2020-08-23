import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { StackComponent } from './layouts/stack/stack.component';
import { FlexboxComponent } from './layouts/flexbox/flexbox.component';
import { GridComponent } from "./layouts/grid/grid.component";
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { AuthComponent } from './auth/auth.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { AuthGuard } from "./auth/auth.guard";
 

const routes: Routes = [

    // { path: "", component: AuthComponent },
    { 
        path: "app-auth",  
        loadChildren:'~/app/auth/auth.module#AuthModule' },
    {
        path:"challenges",
        loadChildren:'~/app/challenges/challenges.module#ChallengesModule' ,
        canLoad:[AuthGuard]
    },
    { path: "", redirectTo:'/challenges/tabs',pathMatch:'full' },
   
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers:[AuthGuard]
})
export class AppRoutingModule { }
