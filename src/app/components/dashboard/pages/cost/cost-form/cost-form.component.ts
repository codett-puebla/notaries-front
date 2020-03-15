import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '../../../../../Utils/MessageHelper';
import {messageErrorValidation} from '../../../../../Utils/ValidatorsHelper';
import {CostService} from '../../../../../services/cost.service';
import {CostModel} from '../../../../../models/cost.model';

@Component({
  selector: 'app-cost-form',
  templateUrl: './cost-form.component.html',
  styleUrls: ['./cost-form.component.css']
})
export class CostFormComponent implements OnInit {
  form: FormGroup;
  private isEditable: any;
  private data: CostModel;


  constructor(public route: ActivatedRoute, public costService: CostService, public router: Router) {
    this.form = new FormGroup({
        name: new FormControl('', Validators.required),
      }
    );
    const id = Number(this.route.snapshot.params.id);

    if (id !== 0) {
      this.costService.getById(id)
        .subscribe(
          (response: CostModel) => {
            this.data = response;
            this.isEditable = true;
            console.log(response);
            this.form.get('name').setValue(this.data.name);
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
      this.costService.add(this.form.value).subscribe(
        response => {
          MessageHelper.successMessage('Añadido', 'El trámite se añadio con exito');
          this.router.navigate(['../dashboard/cost']);
        }, error => {
          MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
          console.log(error);
        }
      );
    } else {
      this.costService.edit(this.form.value, this.data.id).subscribe(
        response => {
          MessageHelper.successMessage('Actualizado', 'El trámite se modifico con exito');
          this.router.navigate(['../dashboard/cost']);
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
