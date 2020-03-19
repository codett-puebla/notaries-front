import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {ProcedureService} from '../../../../../services/procedure.service';
import {ProcedureModel} from '../../../../../models/procedure.model';
import {CostService} from '../../../../../services/cost.service';
import {CostModel} from '../../../../../models/cost.model';
import {messageErrorValidation} from '../../../../../Utils/ValidatorsHelper';
import {QuotationService} from '../../../../../services/quotation.service';
import {MessageHelper} from '../../../../../Utils/MessageHelper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cotizacion-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.css']
})
export class QuotationFormComponent implements OnInit {
  myForm: FormGroup;
  inputProcedure = new FormControl('', Validators.required);
  // opciones a seleccionar
  procedures: ProcedureModel[] = [];
  filteredCost: any[] = [];
  filteredProcedures: any = [];
  costTotal = 0;
  costs: CostModel[] = [];

  constructor(public procedureService: ProcedureService, public costService: CostService,
              public quotationService: QuotationService, public router: Router
  ) {
    this.myForm = new FormGroup(
      {
        procedure_id: this.inputProcedure,
        folio: new FormControl('', Validators.required),
        costs: new FormArray([
          new FormGroup({
            cost: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
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
    this.myForm.value.idCompany = 1;
    this.myForm.value.procedure_id = this.myForm.value.procedure_id.id;
    console.log(this.myForm.value);
    this.quotationService.add(this.myForm.value).subscribe(
      response => {
        MessageHelper.successMessage('Añadido', 'Se genero cotización con exito');
        this.router.navigate(['../dashboard/quotation']);
      }, error => {
        MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
        console.log(error);
      }
    );
  }

  addNewCost() {
    console.log('añadiendo');
    (this.myForm.controls.costs as FormArray).push(
      new FormGroup({
        cost: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
      })
    );
    // @ts-ignore
    this.manageArrayCostControl(this.myForm.controls.costs.controls.length - 1);
  }

  deleteCost(i: number) {
    // @ts-ignore
    if (this.myForm.get('costs').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.costs as FormArray).removeAt(i);
      this.filteredCost.splice(i, 1);
    }
  }

  manageArrayCostControl(index: number) {
    const arrayControl = this.myForm.get('costs') as FormArray;
    // @ts-ignore
    this.filteredCost[index] = arrayControl.at(index).controls.cost.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((filter: string) => {
          return filter ? this._filterCost(filter) : this.costs.slice();
        })
      );
    arrayControl.at(index).get('price').valueChanges.subscribe(
      () => {
        this.costTotal = 0;
        for (const control of arrayControl.controls) {
          this.costTotal += Number(control.get('price').value);
        }
      }
    );
  }

  displayFnProcedure(procedure?: ProcedureModel): string | undefined {
    return procedure ? procedure.type : undefined;
  }

  displayFnCost(costModel?: CostModel): string | undefined {
    return costModel ? costModel.name : undefined;
  }

  getMessageError(attrName: string) {
    return messageErrorValidation(this.myForm, attrName);
  }
}
