import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers()
  {
    console.log("hello");
    
    console.log("got");
    //return this.http.get('http://localhost:3308/users');

    return this.http.get('http://localhost:3308/users').
        pipe(
           map((data) => {
            //alert(data);
             return data;
             
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )

  }

  getVotes()
  {
    return this.http.get('http://localhost:3308/getvotes').
        pipe(
           map((data) => {
            //alert(data);
             return data;
             
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
  }

  getVotesByUser(id)
  {
    console.log("entered");
    return this.http.get('http://localhost:3308/getvotesbyuser/'+id).
        pipe(
           map((data) => {
            //alert(data);
             return data;
             
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
  }

  postUser(myjson)
  {
    return this.http.post("http://localhost:3308/adduser",myjson).
        pipe(
           map((data) => {
             return data;
             
           }), catchError( error => {
             return error;
           })
        )

  }

  addNewPost(myjson)
  {
    console.log(myjson)
    return this.http.post('http://localhost:3308/addpost',myjson).
        pipe(
           map((data) => {
             return data;
             
           }), catchError( error => {
             return error;
           })
        )
  }

  postVote(myjson)
  {
    return this.http.post('http://localhost:3308/addvotes',myjson).
        pipe(
           map((data) => {
            //alert(data);
            //console.log(data);
             return data;
             
           }), catchError( error => {
            //console.log(error);
             return error;
           })
        )
  }

  getPosts()
  {
    console.log("hello");
    
    console.log("got");
    //return this.http.get('http://localhost:3308/users');

    return this.http.get('http://localhost:3308/getposts').
        pipe(
           map((data) => {
            //alert(data);
             return data;
             
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
  }
  
}
