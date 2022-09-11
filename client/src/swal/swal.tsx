

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

const fire = ( { title, icon, target, loading, timer }: SwalConfig ) => 
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

export default fire;
