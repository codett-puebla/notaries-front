import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html'
})
export class CotizacionComponent implements OnInit {
  myForm: FormGroup;
  inputTramite = new FormControl();
  // opciones a seleccionar
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  arrayCost: any = ['Honorario'];

  constructor() {
    this.myForm = new FormGroup(
      {
        inputTramite: this.inputTramite,
        arrayCost: new FormArray([
          new FormControl('')
        ])
      }
    )
    ;
  }

  ngOnInit() {
    this.filteredOptions = this.inputTramite.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // metodo de filtrado
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit() {
    console.log(this.myForm);
  }

  addNewCost() {
    console.log('añadiendo');
    (this.myForm.controls.arrayCost as FormArray).push(new FormControl());
  }

  deleteCost(i: number) {
    // @ts-ignore
    if (this.myForm.controls.arrayCost.controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayCost as FormArray).removeAt(i);
    }
  }
}
