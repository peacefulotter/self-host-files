
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Folders from './folders/Folders';
import Files from './files/Files';

import './index.css'
import FolderRequests from '../../requests/FolderReq';

const Directory = () => {

    const [ folders, setFolders ] = useState<string[]>([]);
    const [ files, setFiles ] = useState<string[]>([]);
    const { pathname } = useLocation();

    useEffect( () => {
        FolderRequests.read( pathname, ( { folders, files } ) => {
            setFolders(folders)
            setFiles(files)
        } )        
    }, [pathname] )

    
    return (
        <div className="directories">
            <Folders folders={folders} setFolders={setFolders} path={pathname} />
            <div className='w-full' />
            <Files files={files} path={pathname} />
        </div>
    )
}

export default Directory;