import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/user/data-user.service';

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
  dontMatch;

  constructor(private auth: AngularFireAuth,
     private router: Router,
     private cnx: AngularFireDatabase,
     private user: DataUserService) { }

  ngOnInit() {
  }

  async register() {

    if(this.password !== this.confirmePassword) {
      this.dontMatch = 'password don\'t match';
    }
    
    const res = await this.auth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
      this.cnx.object('users/' + res.user.uid).set({
        fullname: this.fullname,
        email: this.email,
        password: this.password
      }).then(() => { 
        this.user.admin = this.email.split("@")[1] === 'admin.com' ? true :false;
        this.user.currentUser = res.user.uid;
        this.router.navigate(['../country'])}); 
    });
    console.log(res);
    
  }
}
