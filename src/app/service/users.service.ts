import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Axios } from '../../../node_modules/axios';

import{User}from '../models/User.model'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  ApiLink="http://localhost:4000"
  _axios!:Axios
  auth=false
  constructor(private _HttpClient:HttpClient) { }

  //  httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': 'Basic ' + btoa('zucker:123456')
  //   })
  // };
  // async method(){
  //   await this._axios.post('http://localhost:4000/todos', this.httpOptions, {
  //     auth: {
  //       username: 'zucker',
  //       password: '123456'
  //     }
  //   });

  // }


  getUsers():Observable<User[]>{
    return this._HttpClient.get<User[]>(this.ApiLink+"/users")
  }
  getToDos(username:string,password:string):Observable<any>{
   let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };
    return this._HttpClient.get<any>(this.ApiLink+"/todos", _httpOptions); 
  }
  createToDos(todo:string,password:string,user:any):Observable<any>{
    console.log("user"+ user)
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${user.username}:${password}`)
      })
    };
    this.auth=true
    let obj={
      id:null,
      task: todo,
      user_id: user.id,
    }

    return this._HttpClient.post<any>(this.ApiLink+"/todos",obj,_httpOptions)
  }
  deleteTodo(todo:any,username:string,password:string):Observable<any>{
  
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };
    let id= todo.id
    return this._HttpClient.delete<any>(this.ApiLink+"/todos/"+id,_httpOptions)
  }

  toggleToDos(id:number,username:string,password:string):Observable<any>{
    const updates = { completed:Boolean }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };
    return this._HttpClient.put<any>(this.ApiLink+"/todos/"+id, updates, httpOptions);
  }
}
