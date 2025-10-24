import Swal from 'sweetalert2';

export const toast = ({ icon, title, message }) => {
  Swal.fire({
    icon,
    title,
    text: message,
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#0072CE'
  });
};

export const errorAlert = ({
  message = 'Ha ocurrido un error inesperado.',
  confirmButtonText = 'Ok',
  allowEscapeKey = true,
  allowOutsideClick = true
}) => {
  const formattedMessage = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
  Swal.fire({
    icon: 'error',
    title: '¡Error!',
    html: formattedMessage,
    confirmButtonText,
    confirmButtonColor: '#0072CE',
    allowEscapeKey,
    allowOutsideClick
  });
};

export const confirmAlert = async ({ icon, title, message }) => {
  const result = await Swal.fire({
    icon,
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0072CE',
    cancelButtonColor: '#002855'
  });

  return result.isConfirmed;
};

export const infoAlert = ({ icon, title, message, confirmButtonText = 'Ok' }) => {
  Swal.fire({
    icon,
    title,
    text: message ?? '',
    confirmButtonText,
    confirmButtonColor: '#0072CE'
  });
};
