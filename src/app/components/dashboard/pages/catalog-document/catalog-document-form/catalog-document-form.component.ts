import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '../../../../../Utils/MessageHelper';
import {messageErrorValidation} from '../../../../../Utils/ValidatorsHelper';
import {DocumentService} from '../../../../../services/document.service';
import {DocumentModel} from '../../../../../models/document.model';

@Component({
  selector: 'app-catalog-document-form',
  templateUrl: './catalog-document-form.component.html',
  styleUrls: ['./catalog-document-form.component.css']
})
export class CatalogDocumentFormComponent implements OnInit {
  form: FormGroup;
  private isEditable: any;
  private data: DocumentModel;


  constructor(public route: ActivatedRoute, public documentService: DocumentService, public router: Router) {
    this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
      }
    );
    const id = Number(this.route.snapshot.params.id);

    if (id !== 0) {
      this.documentService.getById(id)
        .subscribe(
          (response: DocumentModel) => {
            this.data = response;
            this.isEditable = true;
            console.log(response);
            this.form.get('name').setValue(this.data.name);
            this.form.get('description').setValue(this.data.description);
          }
        );
    }
  }

  ngOnInit() {
  }

  OnSubmit() {
    // TODO eliminar despues de que la autenticacion este lista
    this.form.value.idUser = 1;
    this.form.value.idCompany = 1;
    if (!this.isEditable) {
      this.documentService.add(this.form.value).subscribe(
        response => {
          MessageHelper.successMessage('Añadido', 'El trámite se añadio con exito');
          this.router.navigate(['../dashboard/document']);
        }, error => {
          MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
          console.log(error);
        }
      );
    } else {
      this.documentService.edit(this.form.value, this.data.id).subscribe(
        response => {
          MessageHelper.successMessage('Actualizado', 'El trámite se modifico con exito');
          this.router.navigate(['../dashboard/document']);
        }, error => {
          MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
        }
      );
    }
  }

  getMessageError(attrName: string) {
    return messageErrorValidation(this.form, attrName);
  }

  getMessageButton() {
    return this.isEditable ? 'Actualizar' : 'Guardar';
  }
}
