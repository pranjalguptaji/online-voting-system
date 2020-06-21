import { Component, OnInit } from '@angular/core';
// import { ApitestingService } from '../services/script';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  

  email: string;
  passwd: string;
  lang: string;
  name: string;

  submit(){

    var fdata: FormData=new FormData();
    fdata.append("email",this.email);
    fdata.append("passwd",this.passwd);
    fdata.append("lang",this.lang);
    fdata.append("name",this.name);
    var myjson={"name":fdata.get("name"),"lang":fdata.get("lang"),"email":fdata.get("email"),"passwd":fdata.get("passwd")};
    this.apt
    .postUser(myjson)
    .subscribe((data:any) => {
      console.log(data);
      if(data.code=="SUCCESS")
      {
        alert("Successfully signed up !");
        this.router.navigate(['/', 'login']);
      }
      else
      {
        alert(myjson.email+" already exists. Kindly sign up with a different username.");
      }
    });

  }
 

  constructor(private apt: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

}
