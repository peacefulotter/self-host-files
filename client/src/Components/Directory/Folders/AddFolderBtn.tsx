
import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import FolderRequests from '../../../requests/FolderReq';

interface Props {
    folders: string[];
    addFolder: (name: string) => void;
    path: string;
}

const AddFolderBtn: FC<Props> = ( { folders, addFolder, path } ) => {

    const resolveName = () => {
        const baseName = 'New folder'
        let name = baseName;
        let i = 1
        while ( folders.includes(name) ) {
            name = baseName + ` (${i++})`
        }
        return name;
    }

    const createFolder = () => {
        const name = resolveName();
        FolderRequests.create( path, name, () => {
            console.log('here');
            addFolder(name)
         } )
    }

    return (
        <div className='repo-elt repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75' onClick={createFolder}>
            <FiPlus className='repo-icon text-gray-500 text-3xl' />
        </div>
    )
}

export default AddFolderBtn;