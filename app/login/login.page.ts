import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController,
    public modalCtrl: ModalController,
  ) { }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  async login(){

    try {

      const submit = await this.angularFireAuth.signInWithEmailAndPassword(this.email.value, this.password.value);
      this.router.navigateByUrl('/home')

    } 
    catch (error) {
      console.dir(error);

      this.alertController.create({
        header:'FAIL',
        message:'Your email and password not exist !',
        cssClass:'alertError',
        buttons:[{text:'OK',handler:() => {console.log('OK')}}]
      }).then(response => response.present());

      this.loginForm.reset();

    }

  }

  ngOnInit() {
  }

}
