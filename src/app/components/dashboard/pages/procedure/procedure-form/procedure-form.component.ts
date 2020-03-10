import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProcedureModel} from '../../../../../models/procedure.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProcedureService} from '../../../../../services/procedure.service';
import {MessageHelper} from '../../../../../Utils/MessageHelper';
import {messageErrorValidation} from '../../../../../Utils/ValidatorsHelper';

@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.css']
})
export class ProcedureFormComponent implements OnInit {
  form: FormGroup;
  private isEditable: any;
  private data: ProcedureModel;


  constructor(public route: ActivatedRoute, public procedureService: ProcedureService, public router: Router) {
    this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        user_coordinator_id: new FormControl(''),
        area_father_id: new FormControl(''),
      }
    );
    const id = Number(this.route.snapshot.params.id);

    if (id !== 0) {
      this.procedureService.getById(id)
        .subscribe(
          (response: ProcedureModel) => {
            this.data = response;
            this.isEditable = true;
            console.log(response);
            // this.form.get('name').setValue(this.data.name);
            // this.form.get('description').setValue(this.data.description);
            // this.form.get('user_coordinator_id').setValue(this.data.user_coordinator_id);
            // this.form.get('area_father_id').setValue(this.data.area_father_id);
          }
        );
    }
  }

  ngOnInit() {
  }

  OnSubmit() {
    if (!this.isEditable) {
      this.procedureService.add(this.form.value).subscribe(
        response => {
          MessageHelper.successMessage('Añadido', 'El área se añadio con exito');
          this.router.navigate(['../dashboard/area']);
        }, error => {
          MessageHelper.errorMessage('Ocurrio un error, intente de nuevamente');
          console.log(error);
        }
      );
    } else {
      this.procedureService.edit(this.form.value, this.data.id).subscribe(
        response => {
          MessageHelper.successMessage('Actualizado', 'El área se modifico con exito');
          this.router.navigate(['../dashboard/area']);
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
