import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-transact',
  templateUrl: './new-transact.component.html',
  styleUrls: ['./new-transact.component.css']
})
export class NewTransactComponent implements OnInit {
  myForm: FormGroup;
  step = 0;
  options = ['One', 'Two', 'Three'];
  private filteredCotizacion: any = [];
  private inputCotizacion = new FormControl();
  filteredOptions: Observable<string[]>[] = [];

  constructor() {
    this.myForm = new FormGroup(
      {
        inputCotizacion: this.inputCotizacion,
        arrayUser: new FormArray([
          new FormGroup({
            name: new FormControl(''),
            lastNameFather: new FormControl(''),
            lastNameMother: new FormControl(''),
          })
        ]),
        arrayDocuments: new FormArray([
          new FormGroup({
            typeDocument: new FormControl(''),
            original: new FormControl(''),
            copy: new FormControl(''),
          })
        ])
      }
    );

    this.manageArrayCostControl(0);
  }

  ngOnInit() {
    this.filteredCotizacion = this.inputCotizacion.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addUser() {
    (this.myForm.controls.arrayUser as FormArray).push(
      new FormGroup({
        name: new FormControl(''),
        lastNameFather: new FormControl(''),
        lastNameMother: new FormControl(''),
      })
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

  deleteUser(i: number) {
    // @ts-ignore
    if (this.myForm.get('arrayUser').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayUser as FormArray).removeAt(i);
    }
  }

  manageArrayCostControl(index: number) {
    const arrayControl = this.myForm.get('arrayDocuments') as FormArray;
    // @ts-ignore
    this.filteredOptions[index] = arrayControl.at(index).controls.typeDocument.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => {
          return this._filter(value);
        })
      );
  }

  addNewDocument() {
    (this.myForm.controls.arrayDocuments as FormArray).push(
      new FormGroup({
        typeDocument: new FormControl(''),
        original: new FormControl(''),
        copy: new FormControl(''),
      })
    );
    // @ts-ignore
    this.manageArrayCostControl(this.myForm.controls.arrayDocuments.controls.length - 1);
  }

  deleteDocument(i: number) {
    // @ts-ignore
    if (this.myForm.get('arrayDocuments').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayDocuments as FormArray).removeAt(i);
      this.filteredOptions.splice(i, 1);
    }
  }
}
