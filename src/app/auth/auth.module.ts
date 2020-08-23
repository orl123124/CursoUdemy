import { NgModule } from '@angular/core';
 
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/ui/shared.module';
import { AuthComponent } from './auth.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
    declarations: [AuthComponent],
    imports: [ 
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            {path:'', component: AuthComponent}
        ]),
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedModule
    
    
    ],
    exports: [],
    providers: [],
})
export class AuthModule {}