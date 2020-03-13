import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {ProcedureService} from '../../../../services/procedure.service';
import {ProcedureModel} from '../../../../models/procedure.model';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  myForm: FormGroup;
  inputProcedure = new FormControl();
  // opciones a seleccionar
  procedures: ProcedureModel[] = [];
  filteredOptions: Observable<string[]>[] = [];
  filteredProcedures: any = [];
  costTotal = 0;

  constructor(public procedureService: ProcedureService) {
    this.myForm = new FormGroup(
      {
        inputProcedure: this.inputProcedure,
        arrayCost: new FormArray([
          new FormGroup({
            typeCost: new FormControl(''),
            price: new FormControl(''),
          })
        ])
      }
    );
    this.procedureService.getAll().subscribe(
      response => {
        this.procedures = response;
      }
    );

    this.manageArrayCostControl(0);
    this.inputProcedure.valueChanges.subscribe(
      () => {
        (this.myForm.controls.arrayCost as FormArray).clear();
        // this.addNewCost();
      }
    );
  }

  ngOnInit() {
    this.filteredProcedures = this.inputProcedure.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => typeof value === 'string' ? value : value.type),
        map((filter: string) => {
          return filter ? this._filter(filter) : this.procedures.slice();
        })
      );
  }

  // metodo de filtrado
  private _filter(value: string): ProcedureModel[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.procedures.filter(procedure => procedure.type.toLowerCase().includes(filterValue));
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
    this.manageArrayCostControl(this.myForm.controls.arrayCost.controls.length - 1);
  }

  deleteCost(i: number) {
    // @ts-ignore
    if (this.myForm.get('arrayCost').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayCost as FormArray).removeAt(i);
      this.filteredOptions.splice(i, 1);
      this.calculateCost(false);
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
    arrayControl.at(index).valueChanges.subscribe(
      () => {
        this.calculateCost(true);
      }
    );
  }

  calculateCost(isSum: boolean) {
    if (isSum) {
      this.costTotal += 1;
    } else {
      this.costTotal -= 1;
    }
  }

  displayFn(procedure?: ProcedureModel): string | undefined {
    return procedure ? procedure.type : undefined;
  }
}
