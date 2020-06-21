import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Post } from '../customtypes/post';
import { User } from '../customtypes/user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  @Input()
  cur_pid;

  title = 'flex-tutorial';
  mediaSub: Subscription;
  deviceXs: boolean;
  topVal = 0;
  posts: Post[];
  users: User[];
  votes;
  map={};
  cur_user;
  
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
  constructor(private mediaObserver: MediaObserver, private apt: ApiService) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.apt.getPosts().subscribe((data:any) => {
      this.posts=data;
      for(var post of this.posts)
      {
        (this.map)[post["Post_ID"]] = {};
        (this.map)[post["Post_ID"]]["up"] = [];
        (this.map)[post["Post_ID"]]["down"] = [];
      }
    })

    this.apt.getUsers().subscribe((data:any) => {
      this.users=data;
    })

    this.apt.getVotes().subscribe((data:any) => {
      this.votes=data;
      console.log("All posts-");
    console.log(this.posts);
    for(var post of this.posts)
    {
        // (this.map)[post["Post_ID"]] = {};
        // (this.map)[post["Post_ID"]]["up"] = [];
        // (this.map)[post["Post_ID"]]["down"] = [];
        console.log("aehfabiya");
        //console.log(this.map);
        for(var vote of this.votes)
        {
          if(vote.upvote==1 && vote.pid==post["Post_ID"])
          {
            for(var user of this.users)
            {
              if(vote.uid==user.id)
              {
                (this.map)[post["Post_ID"]]["up"].push(user.Name);
                break;
              }
            }
          }
          else if(vote.downvote==1 && vote.pid==post["Post_ID"])
          {
            for(var user of this.users)
            {
              if(vote.uid==user.id)
              {
                (this.map)[post["Post_ID"]]["down"].push(user.Name);
                break;
              }
            }
          }
        }
    }

    console.log(this.map);
    })

  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}

