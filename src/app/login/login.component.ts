import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { User } from '../customtypes/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwd: string;
  username: string;
  users: User[];
  cur_user: User;
  flag: number;

  constructor( private apt: ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.apt.getUsers().subscribe((data:any) => {
      console.log(data);
      this.users=data;
    });
    this.flag=0;
  }

  loginPressed()
  {
    for(let user of this.users)
    {
      if(this.username=="admin@voting.com" && this.passwd=="admin")
      {
        this.router.navigate(['/admin-dashboard']);
        console.log("hey admin");
        this.flag=1;
        break;
      }
      if(user.Username==this.username && user.Password==this.passwd)
      {
        this.cur_user=user;
        this.flag=1;
        this.router.navigate(['/user-dashboard', {id:this.cur_user.id,Name:this.cur_user.Name}]);
      }
    }
    if(this.flag==0)
    {
      alert("Invalid username or password");
    }
  }

}
