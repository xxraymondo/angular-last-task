import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User} from '../models/User.model'
import { Axios } from '../../../node_modules/axios';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  _User!:User[]
  _axios!:Axios

constructor(public _UsersService: UsersService){
 
  this.getUsers()
  // this.getTodos()
}



getUsers():void{
  this._UsersService.getUsers().subscribe((data)=>
  {this._User=data
  console.log(this._User)
}
  ,(error)=>console.log(error));
}

// getTodos():void{
//   this._UsersService.getToDos().subscribe((data)=>
//   {this._User=data
//   console.log(this._User)
// }
//   ,(error)=>console.log(error));
// }
}


