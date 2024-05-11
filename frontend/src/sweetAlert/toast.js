import Swal from 'sweetalert2'
import './style.css'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});


export const SweetAlertToast = async (icon, text) => {
    await Toast.fire({
        icon: icon,
        title: text,
    })
}