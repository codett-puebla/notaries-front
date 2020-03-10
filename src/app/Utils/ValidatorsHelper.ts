import {FormGroup} from '@angular/forms';

export function ValidatorPasswords(password: string, confirmPassword: string): any {
  return (formGroup: FormGroup) => {
    const controlPassword = formGroup.controls[password];
    const controlPasswordConfirm = formGroup.controls[confirmPassword];
    // tslint:disable-next-line:max-line-length
    if ((controlPassword.value !== null && controlPasswordConfirm.value !== null) && (!controlPasswordConfirm.invalid || !controlPassword.invalid)) {
      // controlPassword.setErrors(null);
      controlPasswordConfirm.setErrors(null);
      if (controlPassword.value !== controlPasswordConfirm.value) {
        // controlPassword.setErrors({notEqualsMails: true});
        controlPasswordConfirm.setErrors({notEqualsMails: true});
      }
    }
  };
}


export function messageErrorValidation(form: FormGroup, attrName: string) {
  const control = form.get(attrName);
  return control.hasError('required') ? '* Requerido' :
    control.hasError('minlength') ? `Minimo de Caracteres: ${control.errors.minlength.requiredLength}` :
      control.hasError('maxlength') ? `Máximo de Caracteres: ${control.errors.maxlength.requiredLength}` :
        control.hasError('email') ? 'Debe de ingresar un correo valido' :
          control.hasError('notEqualsMails') ? 'La contraseña no coincide' :
            '';
}
