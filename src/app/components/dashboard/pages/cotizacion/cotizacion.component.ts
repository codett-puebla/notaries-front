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
  filteredOptions: Observable<string[]>[] = [];
  filteredTramites: any = [];
  costTotal = 0;

  constructor() {
    this.myForm = new FormGroup(
      {
        inputTramite: this.inputTramite,
        arrayCost: new FormArray([
          new FormGroup({
            typeCost: new FormControl(''),
            price: new FormControl(''),
          })
        ])
      }
    )
    ;
    this.manageArrayCostControl(0);
  }

  ngOnInit() {
    this.filteredTramites = this.inputTramite.valueChanges
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
    (this.myForm.controls.arrayCost as FormArray).push(
      new FormGroup({
        typeCost: new FormControl(''),
        price: new FormControl(''),
      })
    );
    // @ts-ignore
    this.manageArrayCostControl(this.myForm.get('arrayCost').controls.length - 1);
  }

  deleteCost(i: number) {
    // @ts-ignore
    if (this.myForm.get('arrayCost').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayCost as FormArray).removeAt(i);
      this.filteredOptions.splice(i, 1);
    }
  }

  manageArrayCostControl(index: number) {
    const arrayControl = this.myForm.get('arrayCost') as FormArray;
    // @ts-ignore
    this.filteredOptions[index] = arrayControl.at(index).controls.typeCost.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => {
          return this._filter(value);
        })
      );

  }

  calculateCost() {
    this.costTotal += 1;
  }
}
