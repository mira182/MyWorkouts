import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/rest/user/user.service";
import {User} from "../../model/user/user";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
  ]
})
export class HomeComponent implements OnInit {

  user : User;

  constructor() { }

  ngOnInit() {
    this.user = UserService.getCurrentUser();
  }

}
