import {NgModule} from '@angular/core';
import {CotizacionComponent} from './cotizacion/cotizacion.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { NewTransactComponent } from './new-transact/new-transact.component';
import { ExternalLinksComponent } from './external-links/external-links.component';
import {DomseguroPipe} from '../../../pipes/domseguro.pipe';

@NgModule({
  declarations: [
    CotizacionComponent,
    NewTransactComponent,
    ExternalLinksComponent,
    DomseguroPipe
  ],
  exports: [
    CotizacionComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ]
})
export class MaterialModule {
}
