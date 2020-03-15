import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {ProcedureService} from '../../../../services/procedure.service';
import {ProcedureModel} from '../../../../models/procedure.model';
import {CostService} from '../../../../services/cost.service';
import {CostModel} from '../../../../models/cost.model';

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
  filteredCost: any[] = [];
  filteredProcedures: any = [];
  costTotal = 0;
  costs: CostModel[] = [];

  constructor(public procedureService: ProcedureService, public costService: CostService) {
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
    this.costService.getAll().subscribe(
      response => {
        console.log(response);
        this.costs = response;
      }
    );

    this.manageArrayCostControl(0);
  }

  ngOnInit() {
    this.filteredProcedures = this.inputProcedure.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => typeof value === 'string' ? value : value.type),
        map((filter: string) => {
          return filter ? this._filterProcedure(filter) : this.procedures.slice();
        })
      );
  }

  // metodo de filtrado
  private _filterProcedure(value: string): ProcedureModel[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.procedures.filter(procedure => procedure.type.toLowerCase().includes(filterValue));
  }

  private _filterCost(value: string): CostModel[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.costs.filter(costs => costs.name.toLowerCase().includes(filterValue));
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
      this.filteredCost.splice(i, 1);
      this.calculateCost(false);
    }
  }

  manageArrayCostControl(index: number) {
    const arrayControl = this.myForm.get('arrayCost') as FormArray;
    // @ts-ignore
    this.filteredCost[index] = arrayControl.at(index).controls.typeCost.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((filter: string) => {
          return filter ? this._filterCost(filter) : this.costs.slice();
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

  displayFnProcedure(procedure?: ProcedureModel): string | undefined {
    return procedure ? procedure.type : undefined;
  }

  displayFnCost(costModel?: CostModel): string | undefined {
    return costModel ? costModel.name : undefined;
  }
}
