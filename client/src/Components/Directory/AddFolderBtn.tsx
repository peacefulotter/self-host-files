
import axios from 'axios';
import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props {
    path: string;
}

const AddFolderBtn: FC<Props> = ( { path } ) => {

    const createFolder = () => {
        const name = 'New folder'
        axios.get('/folder/create', { params: { path, name } } )
            .then( (res) => {
                console.log(res);
            })
    }

    return (
        <div className='repo-elt repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75' onClick={createFolder}>
            <FiPlus className='repo-icon text-gray-500 text-3xl' />
        </div>
    )
}

export default AddFolderBtn;