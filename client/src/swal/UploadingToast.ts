import fire from "./swal";

const UploadingToast = {
    uploading: () => fire( { 
        loading: true, 
        title: 'Uploading...',
        icon: 'success',
        target: '#progress'
    } ),
    complete: () => fire( { 
        loading: false, 
        title: 'Complete', 
        icon: 'success',
        timer: 2000,
        target: '#progress'
    } ) ,
    error: () => fire( {
        loading: false, 
        title: 'Error', 
        icon: 'error',
        timer: 2000,
        target: '#progress'
    } )
}

export default UploadingToast;