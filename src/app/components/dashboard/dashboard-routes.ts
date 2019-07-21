import {Routes} from '@angular/router';
import {CotizacionComponent} from './pages/cotizacion/cotizacion.component';
import {NewTransactComponent} from './pages/new-transact/new-transact.component';
import {ExternalLinksComponent} from './pages/external-links/external-links.component';


export const DASHBOARD_ROUTES: Routes = [
  {path : 'budget', component: CotizacionComponent},
  {path : 'startTransact', component: NewTransactComponent},
  {path : 'external/:external', component: ExternalLinksComponent},
  {path : '**', pathMatch : 'full', redirectTo : 'budget'}
];
