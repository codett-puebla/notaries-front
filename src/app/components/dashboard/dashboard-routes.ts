import {Routes} from '@angular/router';
import {CotizacionComponent} from './pages/cotizacion/cotizacion.component';


export const DASHBOARD_ROUTES: Routes = [
  {path : 'budget', component: CotizacionComponent},
  {path : '**', pathMatch : 'full', redirectTo : 'budget'}
];
