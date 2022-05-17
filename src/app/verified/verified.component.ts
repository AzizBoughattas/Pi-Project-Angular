import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from './verification.service';

@Component({
  selector: 'verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {

  constructor(private route : ActivatedRoute,private verificationService : VerificationService) { }

  token:string=null
  error=true;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.token=params.token;
      console.log(this.token)
    })
    if(this.token){
    this.verificationService.verifyEmail(this.token).subscribe(()=> {
      this.error=false
    } , error =>{
      this.error=true
    })
  }
  }

}
