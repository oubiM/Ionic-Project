import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fullname: string;
  email: string;
  password: string;
  confirmePassword: string;

  constructor(private auth: AngularFireAuth,
     private router: Router,
     private cnx: AngularFireDatabase) { }

  ngOnInit() {
  }

  async register() {

    if(this.password !== this.confirmePassword) {
      return console.error("password don't match");
    }
    
    const res = await this.auth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
      this.cnx.object('users/' + res.user.uid).set({
        fullname: this.fullname,
        email: this.email,
        password: this.password
      }).then(() => {this.router.navigate(['../home'])}); 
    });
    console.log(res);
    
  }
}
