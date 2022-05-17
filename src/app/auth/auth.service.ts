import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/models/user";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { UserStored } from "./user-stored";


@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<UserStored>(null)
    private tokenExpirationTimer : any;
    constructor(private http : HttpClient , private router : Router) {}
    signup(user : User) {
       return this.http.post<User>('http://localhost:8089/api/v1/users' ,user)
       .pipe(catchError(errorRes => {
           let errorMessage = 'An unknown error occured'
           console.log(errorRes)
           if(!errorRes.error && !errorRes.error.error && !errorRes.error.error.error) {
               return throwError(errorMessage)
           }
        errorMessage = errorRes.error.message
        return throwError(errorMessage);
       }))
    }

    login(email : string , password : string) {
       return this.http.post('http://localhost:8089/api/v1/users/login', {
            email : email,
            password : password
        }, {
            observe : 'response'
        } ).pipe(catchError(errorRes => {
            let errorMessage = 'Authentication failed'
            return throwError(errorMessage);
         
         
        }) , tap(resData => {
            const expirationDate = new Date(new Date().getTime() + 3600000)
            const user = new UserStored(email , resData.headers.get('userid'), resData.headers.get('id'),resData.headers.get('role'),resData.headers.get('authorization'),expirationDate)
            this.user.next(user);
            this.autoLogout(3600000);
            localStorage.setItem('userData',JSON.stringify(user))
        }))
     }

     logout() {
         this.user.next(null);
         this.router.navigate(['/auth'])
         localStorage.removeItem('userData')
         if(this.tokenExpirationTimer) {
             clearTimeout(this.tokenExpirationTimer)
         }
         this.tokenExpirationTimer=null
     }

     autoLogout(expirationDuration : number) {
         console.log(expirationDuration)
       this.tokenExpirationTimer= setTimeout(() => {
            this.logout()
        },expirationDuration)
     }

     autoLogin() {
      const userData : {
          email : string,
          id:string,
          idLong:string,
          role:string,
          _token:string,
          _tokenExpirationDate:string;
      }=  JSON.parse(localStorage.getItem('userData'))
      if(!userData) {
          return;
      }
      const loadedUser = new UserStored(userData.email,userData.id,userData.idLong,userData.role,userData._token,new Date(userData._tokenExpirationDate))

      if(loadedUser.token) {
          this.user.next(loadedUser);
          const expirationDuration =new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          this.autoLogout(expirationDuration)
      }
     }
}