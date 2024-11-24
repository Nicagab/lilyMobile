import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, private authService: AuthService) {
    // this.redirecionarLogin()
  }

  redirecionarLogin(){
    if(!this.authService.isLogged()){
      this.router.navigate(['login'])
    }
  }

}
