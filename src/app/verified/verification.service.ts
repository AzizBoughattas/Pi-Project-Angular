import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http : HttpClient) { }
  verifyEmail(token : string) {
    return this.http.get('http://localhost:8089/api/v1/users/email-verification?token='+token )
  }
}
