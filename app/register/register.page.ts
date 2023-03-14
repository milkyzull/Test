import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public alertController: AlertController,
    public router: Router
  ) { }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  ngOnInit() {
  }

  async register(){
    
    try {

      const submit = await this.angularFireAuth.createUserWithEmailAndPassword(this.email.value, this.password.value);
      this.router.navigateByUrl('/login')
      console.log(submit);

      this.alertController.create({
        header:'SUCCESS',
        message:'Your registeration is successful !',
        cssClass:'alertError',
        buttons:[{text:'OK',handler:() => {console.log('OK')}}]
      }).then(response => response.present()); 

    } 
    catch (error) {

      console.dir(error);
      
      this.alertController.create({
        header:'FAIL',
        message:'Your registeration is fail !',
        cssClass:'alertError',
        buttons:[{text:'OK',handler:() => {console.log('OK')}}]
      }).then(response => response.present());

    }
    
    this.registerForm.reset();
    
  }

}
