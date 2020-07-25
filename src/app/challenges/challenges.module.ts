// lazy loading

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule} from 'nativescript-angular/common';
import { ChallengesroutingModule } from './challenges-routing.module';
import { ChallengeTabComponent } from './challenge-tab/challenge-tab.component';
import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { SharedModule } from '../shared/ui/shared.module';
import { ChallengeActionModule } from './challenge-action/challenge-action.module';
import { ChallengeService } from './challenge.service';


@NgModule({
    declarations: [
        ChallengeTabComponent,
        TodayComponent,
        CurrentChallengeComponent,
           
       
        
    ],
    imports: [ 
        NativeScriptCommonModule, 
        ChallengesroutingModule,
        SharedModule, //PARA EL LAZY LOADING ROUTING ActionBarComponent ENTRE LOS MODULO DE CHALLENGE Y ROOT
        // ChallengeEditModule,
        ChallengeActionModule,
    ],
    exports: [],
    providers: [], // [ChallengeService] solo sera visible in declarations
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ChallengesModule {}