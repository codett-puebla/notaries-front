import {Routes} from '@angular/router';
import {CotizacionComponent} from './pages/cotizacion/cotizacion.component';
import {NewTransactComponent} from './pages/new-transact/new-transact.component';
import {ExternalLinksComponent} from './pages/external-links/external-links.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {DocumentComponent} from './pages/document/document.component';
import {ProcedureComponent} from './pages/procedure/procedure.component';
import {ProcedureFormComponent} from './pages/procedure/procedure-form/procedure-form.component';
import {CostComponent} from './pages/cost/cost.component';
import {CostFormComponent} from './pages/cost/cost-form/cost-form.component';


export const DASHBOARD_ROUTES: Routes = [
  {path: 'budget', component: CotizacionComponent},
  {path: 'startTransact', component: NewTransactComponent},
  {path: 'external/:external', component: ExternalLinksComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'documents', component: DocumentComponent},
  {path: 'procedure', component: ProcedureComponent},
  {path: 'procedure-form/:id', component: ProcedureFormComponent},
  {path: 'cost', component: CostComponent},
  {path: 'cost-form/:id', component: CostFormComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'budget'}
];
