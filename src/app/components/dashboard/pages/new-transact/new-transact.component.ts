import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {DocumentService} from '../../../../services/document.service';
import {DocumentModel} from '../../../../models/document.model';
import {TransactionService} from '../../../../services/transaction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '../../../../Utils/MessageHelper';

@Component({
  selector: 'app-new-transact',
  templateUrl: './new-transact.component.html',
  styleUrls: ['./new-transact.component.css']
})
export class NewTransactComponent implements OnInit {
  myForm: FormGroup;
  step = 0;
  documents: DocumentModel[] = [];
  filteredDocuments: any[] = [];

  constructor(
    public documentService: DocumentService, public transactionService: TransactionService,
    public route: ActivatedRoute, public router: Router
  ) {
    this.myForm = new FormGroup(
      {
        granters: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            lastNameFather: new FormControl('', Validators.required),
            lastNameMother: new FormControl('', Validators.required),
          })
        ]),
        documents: new FormArray([
          new FormGroup({
            typeDocument: new FormControl('', Validators.required),
            original: new FormControl(false),
            copy: new FormControl(false),
          })
        ])
      }
    );

    this.documentService.getAll().subscribe(
      response => {
        this.documents = response;
      }
    );

    this.manageArrayCostControl(0);
  }

  ngOnInit() {
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
  private _filter(value: string): DocumentModel[] {
    const filterValue = value.toLowerCase();
    return this.documents.filter(document => document.name.toLowerCase().includes(filterValue));
  }

  submit() {
    this.myForm.value.quotation_id = Number(this.route.snapshot.params.id);
    this.myForm.value.idCompany = 1;
    console.log(this.myForm.value);
    this.transactionService.add(this.myForm.value).subscribe(
      response => {
        MessageHelper.successMessage('Éxito', 'El trámite se ha iniciado');
        this.router.navigate(['../dashboard/transaction']);
      }, error => {
        MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
        console.log(error);
      }
    );
  }

  deleteUser(i: number) {
    // @ts-ignore
    if (this.myForm.get('arrayUser').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.arrayUser as FormArray).removeAt(i);
    }
  }

  manageArrayCostControl(index: number) {
    const arrayControl = this.myForm.get('documents') as FormArray;
    // @ts-ignore
    this.filteredDocuments[index] = arrayControl.at(index).controls.typeDocument.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((value: any) => {
          return this._filter(value);
        })
      );
  }

  addNewDocument() {
    (this.myForm.controls.documents as FormArray).push(
      new FormGroup({
        typeDocument: new FormControl(''),
        original: new FormControl(''),
        copy: new FormControl(''),
      })
    );
    // @ts-ignore
    this.manageArrayCostControl(this.myForm.controls.documents.controls.length - 1);
  }

  deleteDocument(i: number) {
    // @ts-ignore
    if (this.myForm.get('documents').controls.length > 1) {
      console.log('eliminando');
      (this.myForm.controls.documents as FormArray).removeAt(i);
      this.filteredDocuments.splice(i, 1);
    }
  }
}
