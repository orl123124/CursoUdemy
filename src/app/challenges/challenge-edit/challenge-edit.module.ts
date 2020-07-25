import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeEditComponent } from './challenge-edit.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '~/app/shared/ui/shared.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [ 
        NativeScriptCommonModule, 
        NativeScriptFormsModule,
        NativeScriptRouterModule, // si usas un nsRouterLink 
        NativeScriptRouterModule.forChild([{
            path:'',component:ChallengeEditComponent,
        }]),
        SharedModule,
     ],
    // exports: [ ChallengeEditComponent ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ChallengeEditModule {}