import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../service/users.service'
import { User } from '../models/User.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private route: ActivatedRoute,private _UsersService: UsersService,private _router: Router){
    
    this.getUsers()
  }

  id!:any;
 
  foundUser:any
  dotos!:any[]
  taskStatus!:boolean
  UserPassword!:string
  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get('id');
    this._UsersService.getUsers()
  }
  logout() {
this.foundUser=null
this.UserPassword=''
this._router.navigate(['']);
  }
  getUsers():void{
    this._UsersService.getUsers().subscribe((data)=>
    {let _User=data
      console.log(data)
    this.foundUser=  _User.find(user=>user.id==parseInt(this.id))}
    ,(error)=>console.log(error));
  }
  getTodo(password:string){
   let userName= this.foundUser.username
   this.UserPassword=password
    this._UsersService.getToDos(userName,password).subscribe((data)=>
    {this.dotos=data
      this._UsersService.auth=true
      console.log(this.dotos)
  }
    ,(error)=>console.log(error));
  }
 
  addTodo(taskName:string){
    if(this.foundUser){
      this._UsersService.createToDos(taskName,this.UserPassword,this.foundUser).subscribe((data)=>{
        this.getTodo(this.UserPassword)

        console.log(data)
      }
      ,(error)=>console.log(error));
    }
  }
  deleteTodo(id:number){
   let todo=this.dotos.find((element)=>element.id==id)
    if(this.foundUser){
      this._UsersService.deleteTodo(todo,this.foundUser.username,this.UserPassword).subscribe((data)=>{
        console.log(data)
        this.getTodo(this.UserPassword)
      }
      ,(error)=>console.log(error));
    }
  }
  changeStatus(id:number){

    if(this.foundUser){
      this._UsersService.toggleToDos(id,this.foundUser.username,this.UserPassword).subscribe((data)=>{
        console.log(data)
        this.getTodo(this.UserPassword)
      }
      ,(error)=>console.log(error));
    }
  }
  }
  


