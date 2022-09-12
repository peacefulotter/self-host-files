

import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface SwalConfig {
    title: string;
    icon: SweetAlertIcon;
    target?: string;
    loading?: boolean;
    timer?: number;
}

export const fire = ( { title, icon, target, loading, timer }: SwalConfig ) => 
    MySwal.fire( {
        title: <p>{title}</p>,
        toast: true,
        target,
        icon,
        timer,
        showConfirmButton: false,
        showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
        },
        customClass: {
            container: 'swal-toast',
            popup: 'swal-popup'
        },
        willOpen: () => loading && MySwal.showLoading()
    } )


const alert = (icon: SweetAlertIcon) => (title: string) => 
    MySwal.fire( {
        title: <p>{title}</p>,
        toast: true,
        position: 'bottom-right',
        icon,
        timer: 2000,
        showConfirmButton: false,
    } )

export const alertError = alert('error')
export const alertWarning = alert('warning')
export const alertSuccess = alert('success')

