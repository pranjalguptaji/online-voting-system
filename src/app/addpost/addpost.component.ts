import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {

  title: string;
  category: string;
  author: string;
  statement: string;

  constructor(private apt: ApiService) { }

  ngOnInit(): void {
  }

  addPost(){
    console.log(this.statement);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var myjson = {title:this.title, category: this.category, date_time:dateTime, author: this.author, statement: this.statement}
    console.log(myjson);
    this.apt
    .addNewPost(myjson)
    .subscribe((data:any) => {
      console.log(data);
      if(data.code=="SUCCESS")
      {
        alert("Successfully posted");
        //this.router.navigate(['/', 'login']);
      }
      else
      {
        alert(data.code);
      }
    });

  }

}
