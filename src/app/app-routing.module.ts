import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DASHBOARD_ROUTES} from './components/dashboard/dashboard-routes';

const APP_ROUTES: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'dashboard', component: DashboardComponent, children : DASHBOARD_ROUTES},
  {path : '**', pathMatch : 'full', redirectTo : 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
