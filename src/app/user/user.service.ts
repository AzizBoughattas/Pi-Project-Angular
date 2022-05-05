import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url ="http://localhost:8089/api/v1/users/"
  constructor(private http:HttpClient) { }

  // public generateToken(requestBody){
  //   return this.http.post("http://localhost:8089/api/v1/users/login",requestBody)
  // }

  // public getUsers(token) {
  //   let tokenStr = 'Bearer ' + token;
  //   const headers = new HttpHeaders().set("Authorization",tokenStr);
  //   return this.http.get("http://localhost:8089/api/v1/users/get-users",{headers,responseType: 'text' as 'json'})
  // }

   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url+ "get-users" , {
      headers : new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJheml6QGdtYWlsLmNvbSIsImV4cCI6MTY1MTc3NjM1MH0.zOkkVcI0D2JBx5aFq4-krmlXn5o4EkKYvtYIH8NAKl1bNgAtl2gN-8Pkfrkae4imMw8tTiMQOwomLQMJ61zxyw'})
    });
  }

  addUser(user : User) {
    return this.http.post<User>(this.url,user);
  }

  deleteUser(id:string){
    return this.http.delete<User>(this.url+id)
  }

  getById(id:string) {
    return this.http.get<User>(this.url+id);
  }

  updateUser(id:string, user: User) {
    return this.http.put<User>(this.url+id,user);
  }
}