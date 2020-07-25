import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {

    form: FormGroup;
    emailCtrlValid = true;
    passwordCtrlValid = true;
    isLogin = true;
    isLoading = false;

    @ViewChild('emailEl',{static: false}) emailEl: ElementRef<TextField>;
    @ViewChild('passwordEl',{static: false}) passwordEl: ElementRef<TextField>;

    constructor(
        private roter: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void { 
        
         this.form = new FormGroup({
            email: new FormControl(null,{ updateOn: 'blur',validators: [Validators.required, Validators.email] }),
            password: new FormControl(null,{ updateOn: 'blur',validators: [Validators.required, Validators.minLength(6)] })
        }); 

        this.form.get('email').statusChanges.subscribe(status => {
            console.log('status='+status);
            this.emailCtrlValid = status === 'VALID';
        });

        this.form.get('password').statusChanges.subscribe(status => {
            console.log('password='+status);
            this.passwordCtrlValid = status === 'VALID';
        });

        
    }


    onSignIn(): any {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        // this.form.reset();
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;

        if(!this.form.valid){
            return;
        }

        this.isLoading = true;

        if(this.isLogin){
            this.authService.login(email, password).subscribe(resp =>{
                this.isLoading = false;
                this.roter.navigate(["/challenges"]);
        
            },error =>{
                this.isLoading = false;
                console.log(error);
            });
        }
        else{
            console.log('is sign up');
            this.authService.signUp(email, password).subscribe(resp=>{
                this.isLoading = false;
                this.roter.navigate(["/challenges"]);
            },error =>{
                this.isLoading = false;
                console.log(error);
            });
        }
   

       // console.log(email, password);
       // this.roter.navigate(["/challenges"]);
        
    }

    onDone(){
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        console.log('done.....');
    }

    onSwith(){
        this.isLogin = !this.isLogin;
    }

}
