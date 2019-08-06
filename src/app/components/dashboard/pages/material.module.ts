import {NgModule} from '@angular/core';
import {CotizacionComponent} from './cotizacion/cotizacion.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NewTransactComponent} from './new-transact/new-transact.component';
import {ExternalLinksComponent} from './external-links/external-links.component';
import {DomseguroPipe} from '../../../pipes/domseguro.pipe';
import {CalendarComponent} from './calendar/calendar.component';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {HeaderCalendarComponent} from './calendar/header-calendar/header-calendar.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import {ContextMenuModule} from 'ngx-contextmenu';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    CotizacionComponent,
    NewTransactComponent,
    ExternalLinksComponent,
    DomseguroPipe,
    CalendarComponent,
    HeaderCalendarComponent
  ],
  exports: [
    CotizacionComponent,
    NewTransactComponent,
    ExternalLinksComponent,
    DomseguroPipe,
    CalendarComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatIconModule,
    DragAndDropModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ContextMenuModule,
  ]
})
export class MaterialModule {
}
