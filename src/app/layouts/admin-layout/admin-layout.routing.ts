import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserComponent } from 'app/user/user.component';
import { AuthComponent } from 'app/auth/auth.component';

import { AuthAdminGuard } from 'app/auth/auth-admin.guard';
import { PlansComponent } from 'app/plans/plans.component';
import { ProductsComponent } from 'app/products/products.component';
import { CommandsComponent } from 'app/commands/commands.component';
import { SubscriptionsComponent } from 'app/subscriptions/subscriptions.component';
import { HomeComponent } from 'app/home/home.component';
import { SubscribeComponent } from 'app/subscribe/subscribe.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { ShoppingComponent } from 'app/shopping/shopping.component';
import { ForgetPasswordComponent } from 'app/forget-password/forget-password.component';
import { ChangePasswordComponent } from 'app/change-password/change-password.component';
import { StatComponent } from 'app/stat/stat.component';
import { DisconnectGuard } from 'app/auth/disconnect.guard';
import { VerifiedComponent } from 'app/verified/verified.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
   
    { path: 'dashboard',      component: DashboardComponent },
    {path : 'auth' , component: AuthComponent,canActivate : [DisconnectGuard]},
    {path : 'home' , component: HomeComponent},
    {path : 'verification' , component: VerifiedComponent,canActivate : [DisconnectGuard]},
    {path : 'statistique' , component: StatComponent,canActivate : [AuthAdminGuard]},
    {path : 'forget-password' , component: ForgetPasswordComponent,canActivate : [DisconnectGuard]},
    {path : 'change-password' , component: ChangePasswordComponent,canActivate : [DisconnectGuard]},
    {path : 'shopping' , component: ShoppingComponent , canActivate : [AuthGuard]},
    {path : 'subscribe' , component: SubscribeComponent , canActivate : [AuthGuard]},
    { path: 'user',      component: UserComponent  ,canActivate : [AuthAdminGuard]  },
    { path: 'plans',      component: PlansComponent  ,canActivate : [AuthAdminGuard]  },
    { path: 'subscriptions',      component: SubscriptionsComponent  ,canActivate : [AuthAdminGuard]  },
    { path: 'products',      component: ProductsComponent  ,canActivate : [AuthAdminGuard]  },
    { path: 'commands',      component: CommandsComponent  ,canActivate : [AuthAdminGuard]  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    
];
