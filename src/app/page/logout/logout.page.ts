/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  private logout(){
    this.navCtrl.navigateRoot('login').then(()=> {
      localStorage.setItem("username", null)
    })
  }

  private return(){
    this.navCtrl.navigateRoot("home")
  }

  ngOnInit() {
  }

}
