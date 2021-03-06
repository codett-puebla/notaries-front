import {Routes} from '@angular/router';
import {NewTransactComponent} from './pages/new-transact/new-transact.component';
import {ExternalLinksComponent} from './pages/external-links/external-links.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {DocumentComponent} from './pages/document/document.component';
import {ProcedureComponent} from './pages/procedure/procedure.component';
import {ProcedureFormComponent} from './pages/procedure/procedure-form/procedure-form.component';
import {CostComponent} from './pages/cost/cost.component';
import {CostFormComponent} from './pages/cost/cost-form/cost-form.component';
import {CatalogDocumentComponent} from './pages/catalog-document/catalog-document.component';
import {CatalogDocumentFormComponent} from './pages/catalog-document/catalog-document-form/catalog-document-form.component';
import {QuotationComponent} from './pages/quotation/quotation.component';
import {QuotationFormComponent} from './pages/quotation/quotation-form/quotation-form.component';
import {TransactionComponent} from './pages/transaction/transaction.component';


export const DASHBOARD_ROUTES: Routes = [
  {path: 'quotation', component: QuotationComponent},
  {path: 'quotation-form/:id', component: QuotationFormComponent},
  {path: 'startTransact/:id', component: NewTransactComponent},
  {path: 'external/:external', component: ExternalLinksComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'documents', component: DocumentComponent},
  {path: 'procedure', component: ProcedureComponent},
  {path: 'procedure-form/:id', component: ProcedureFormComponent},
  {path: 'cost', component: CostComponent},
  {path: 'cost-form/:id', component: CostFormComponent},
  {path: 'document', component: CatalogDocumentComponent},
  {path: 'document-form/:id', component: CatalogDocumentFormComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'quotation'}
];
