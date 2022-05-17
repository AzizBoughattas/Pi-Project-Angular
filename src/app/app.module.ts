import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PlansComponent } from './plans/plans.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProductsComponent } from './products/products.component';
import { CommandsComponent } from './commands/commands.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {DataTablesModule} from 'angular-datatables';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatComponent } from './stat/stat.component';
import { VerifiedComponent } from './verified/verified.component';







@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    DataTablesModule,
    NgApexchartsModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    PlansComponent,
    SubscriptionsComponent,
    ProductsComponent,
    CommandsComponent,
    HomeComponent,
    SubscribeComponent,
    ShoppingComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    StatComponent,
    VerifiedComponent
  ],
  providers: [{provide : HTTP_INTERCEPTORS , useClass : AuthInterceptorService, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
