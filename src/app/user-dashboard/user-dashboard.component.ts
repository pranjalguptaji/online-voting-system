import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Post } from '../customtypes/post';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  @Input()
  cur_pid;

  title = 'flex-tutorial';
  mediaSub: Subscription;
  deviceXs: boolean;
  topVal = 0;
  posts: Post[];
  original_order: Post[];
  searched_posts = [];
  cur_user;
  map={};
  search_string: string;
  
  onScroll(e: { srcElement: { scrollTop: number; }; }) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }
  constructor(public mediaObserver: MediaObserver, public apt: ApiService, private activatedroute:ActivatedRoute) {

    this.map["up"]=[];
    this.map["down"]=[];

    this.activatedroute.params.subscribe(data => {
      this.cur_user=data;
      console.log(data);
    })

  }
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.apt.getPosts().subscribe((data:any) => {
      this.posts=data;
      
      this.original_order=data;
      console.log(this.original_order);
    });

    this.apt.getVotesByUser(this.cur_user.id).subscribe((data:any) => {
      console.log("Here it is-");
      console.log(data);
      for(var vote of data)
      {
        if(vote["upvote"]==1)
        {
          this.map["up"].push(vote["pid"]);
        }
        else if(vote["downvote"]==1)
        {
          this.map["down"].push(vote["pid"]);
        }
      }
      console.log("heyyyy-");
      console.log(this.map);
    });

  }

  sortByTime(){
    this.apt.getPosts().subscribe((data:any) => {
      this.posts=data;
      //this.users = data.data;
    });
  }

  sortByKey(str){
    if(str=="Post_ID")
    {
      this.posts=this.original_order
      this.posts.sort((a, b) => (a[str] > b[str]) ? 1 : -1)
      console.log(this.posts);
    }
    else
    {
      this.posts=this.original_order;
      this.posts.sort((a, b) => (a[str].toUpperCase() > b[str].toUpperCase()) ? 1 : -1)
      console.log(this.posts);
      console.log(this.original_order);
      console.log(this.posts[0][str].toUpperCase());
    }
  }

  searchBy()
  {
    this.posts=this.original_order;
    this.searched_posts=[];
    var str = this.search_string;
    var search_category;
    var flag=0;
    for(let post of this.posts)
    {
      if(post["Title"]==str)
      {
        search_category="Title";
        flag=1;
      }
      else if(post["Category"]==str)
      {
        search_category="Category";
        flag=1;
      }
      else if(post["Author"]==str)
      {
        search_category="Author";
        flag=1;
      }
    }
    if(flag==1)
    {
      var i=-1;
      console.log(str);
      console.log(search_category);
      for(let post of this.posts)
      {
        if(post[search_category]==str)
        {
          console.log(post);
          console.log(this.searched_posts);
          this.searched_posts.push(post);
        }
      }
      this.posts=this.searched_posts;
      console.log(this.posts);
    }
    else
    {
      alert("Searched keyword does not exists");
    }
  }


  votePressed(pid,vote){
    let myjson={uid: this.cur_user.id, pid: pid, vote:vote};
    console.log(myjson);
    // if(vote=="UP")
    // {
    //   this.map["up"].push(pid);
    // }
    // else if(vote=="DOWN")
    // {
    //   this.map["down"].push(pid);
    // }

    this.apt
    .postVote(myjson)
    .subscribe((data:any) => {
      console.log(data);
      if(data.code=="upvoted" && vote=="UP")
      {
        this.map["up"].push(pid);
      }
      else if(data.code=="downvoted" && vote=="DOWN")
      {
        this.map["down"].push(pid);
      }
      else
      {
        alert("This post is already voted by you.");
      }
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
