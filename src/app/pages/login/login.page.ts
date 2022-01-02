import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/user/data-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private email: string = "";
  private password: string = "";

  constructor(private auth: AngularFireAuth,
    private router: Router,
    private userId: DataUserService
    ) { }

  ngOnInit() {
  }

  async login() {
    const {email, password} = this;
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password).then(res => {
        this.userId.currentUser = res.user.uid;
        this.router.navigate(['../']);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
