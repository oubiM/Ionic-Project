import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private email: string = "";
  private password: string = "";

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    const {email, password} = this;
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['../home']);
    } catch (error) {
      console.log(error);
    }
  }

}
