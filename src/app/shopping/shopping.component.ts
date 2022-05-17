import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandsService } from 'app/commands/commands.service';
import { CommandsClient } from 'app/models/commands-client';
import { Products } from 'app/models/products';
import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor(private productService : ProductsService, private commandService : CommandsService) { }
  error = null 
  products : Products[]
  product : Products;
  command : CommandsClient
  shoppingForm : FormGroup
  shoppingForms : FormGroup
  
  
  
  ngOnInit(): void {

    let productsToBuy = new FormArray([])
    this.shoppingForm = new FormGroup ({
      'card' : new FormControl(null,[Validators.pattern("^[0-9]{9}$"),Validators.required,]),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'name' : new FormControl(null,Validators.required),
      'code' : new FormControl(null,[Validators.required,Validators.pattern("^[0-9]{4}$")]),
      'products' : productsToBuy
    }) 

    this.productService.getProducts().subscribe((data)=> {
    
      this.products = data
      this.products.forEach(element => {
       if( element.quantity<=0 ) {
         this.products.splice(this.products.indexOf(element))
       }
      });
    } , error => {
      this.error = "An unknown error happened"
    })
    
  }

  onHandleError(){
    this.error = null
  }

  onSubmit() {
    if(this.shoppingForm.valid){
    this.command = this.shoppingForm.value
    console.log(this.command.products.length)
    if(this.command.products.length){
    const userData : {
      email : string,
      id:string,
      role:string,
      _token:string,
      _tokenExpirationDate:string;
  }=  JSON.parse(localStorage.getItem('userData'))
    this.commandService.addCommands(userData.id,this.command).subscribe((data)=> {
      
      this.shoppingForm.reset();
      console.log(this.command)
      window.location.reload()
      
    } , error => {
      this.error = error.error.message
    })
    
    this.shoppingForm.reset();
    
    } else {
      this.error="you must choose a product"
    }
  }
    
  }

  get controls() { // a getter! 
    return (<FormArray>this.shoppingForm.get('products')).controls; }
  
    onAddIngredients(){
     (<FormArray>this.shoppingForm.get('products')).push(
       new FormGroup({
         'title' : new FormControl(null,Validators.required),
         'quantity' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
       })
     )
    }

    onDeleteIngredient(index : number){
      (<FormArray> this.shoppingForm.get('products')).removeAt(index);
     }

     onReset() {
       this.ngOnInit()
     }
     
}
