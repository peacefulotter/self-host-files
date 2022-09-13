
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Folders from './Folders/Folders';
import Files from './Files/Files';

import FolderRequests from '../../requests/FolderReq';
import { DirectoryContent } from '../../types';

interface IExplorer {
    directory: DirectoryContent;
    setDirectory: React.Dispatch<React.SetStateAction<DirectoryContent>>;
    selecting: boolean;
    selectedFiles: boolean[];
    toggleSelectFile: (i: number) => () => void;
}

const Explorer: FC<IExplorer> = ( { directory, setDirectory, selecting, selectedFiles, toggleSelectFile } ) => {

    const { pathname } = useLocation();

    useEffect( () => {
        FolderRequests.read( pathname, setDirectory )        
    }, [pathname] )

    const { folders, files } = directory;

    const setFolders = (newFolders: string[]) => {
        const temp = { ...directory };
        directory['folders'] = newFolders;
        setDirectory(temp);
    }
    
    return (
        <div className="directories">
            <Folders folders={folders} setFolders={setFolders} selecting={selecting} toggleSelectFile={toggleSelectFile} path={pathname} />
            <div className='w-full' />
            <Files files={files} selectedFiles={selectedFiles} selecting={selecting} toggleSelectFile={toggleSelectFile} path={pathname} />
        </div>
    )
}

export default Explorer;