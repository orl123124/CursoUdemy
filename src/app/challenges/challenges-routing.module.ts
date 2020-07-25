import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
 
import { ChallengeTabComponent } from './challenge-tab/challenge-tab.component';
import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { Routes } from '@angular/router';
 

const routes: Routes = [
    { path: "tabs", component:ChallengeTabComponent, children:[
        { path: "app-today", component: TodayComponent,outlet:"today", },
        { path: "app-current-challenge", component: CurrentChallengeComponent ,outlet:"current_Challenge",},
    ] },
    { path: ":mode", loadChildren:'~/app/challenges/challenge-edit/challenge-edit.module#ChallengeEditModule' },
    { path: "", redirectTo: "/challenges/tabs", pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [ NativeScriptRouterModule ]
})
export class ChallengesroutingModule {}
