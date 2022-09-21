
import { FiPlus } from 'react-icons/fi';
import { useExplorerCtx } from '../../../context/ExplorerCtx';

const AddFolderBtn = () => {

    const { createFolder } = useExplorerCtx();

    return (
        <div className='repo-elt repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75' onClick={createFolder}>
            <FiPlus className='repo-icon text-gray-500 text-3xl' />
        </div>
    )
}

export default AddFolderBtn;