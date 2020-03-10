import Swal from 'sweetalert2';

export class MessageHelper {
  static errorMessage(message: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      text: message,
    });
  }

  static infoMessage(message: string) {
    Swal.fire({
      title: 'Información',
      type: 'info',
      text: message
    });
  }

  static successMessage(title: string, message: string) {
    Swal.fire({
      title,
      text: message,
      type: 'success'
    });
  }

  static deleteMessage(id: number, callback: any, text: string = 'Se eliminara de manera permanente') {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        callback(id);
      }
    });
  }

  static decisionMessage(title: string, body: string, callback: any) {
    Swal.fire({
      title,
      text: body,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        callback();
      }
    });
  }

  static getInstanceSwal() {
    return Swal;
  }
}
