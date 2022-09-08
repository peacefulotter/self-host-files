

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const fire = ( loading: boolean, title: string, timer?: number ) => () => 
    MySwal.fire( {
        title: <p>{title}</p>,
        toast: true,
        target: '#progress',
        icon: 'success',
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

const useToast = () => {
    const trigger = fire( true, 'Uploading...' )
    const complete = fire( false, 'Complete', 2000 ) 
    return { trigger, complete };
}

export default useToast;