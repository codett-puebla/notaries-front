import {NgModule} from '@angular/core';
import {CotizacionComponent} from './cotizacion/cotizacion.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [CotizacionComponent],
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
    CommonModule
  ]
})
export class MaterialModule {
}
