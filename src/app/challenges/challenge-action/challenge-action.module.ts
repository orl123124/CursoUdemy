import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
 
import { ChallengeActionComponent } from './challenge-action.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
    declarations: [ChallengeActionComponent],
    imports: [ NativeScriptCommonModule, NativeScriptRouterModule ],
    exports: [ChallengeActionComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ChallengeActionModule {}
