
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import RFolder from './RFolder';
import RFile from './RFile';
import AddFolderBtn from './AddFolderBtn';

import './index.css'

const Directory = () => {

    const [ folders, setFolders ] = useState<string[]>([]);
    const [ files, setFiles ] = useState<string[]>([]);
    const { pathname } = useLocation();

    useEffect( () => {
        axios.get('/folder/read', { params: { path: pathname } } )
            .then( res => {
                if ( res.status !== 200 ) 
                    console.log('err', res)

                const { folders, files } = res.data;
                setFolders(folders)
                setFiles(files)
            } )
    }, [pathname] )

    const renameFolder = (i: number) => (newName: string) => {
        const temp = [...folders];
        temp[i] = newName;
        setFolders( temp )
    }

    return (
        <div className="directories">
            { folders.map( ( name, i) => 
                <RFolder key={`folder-${i}`} path={pathname} name={name} renameFolder={renameFolder(i)} />
            ) }
            <AddFolderBtn path={pathname} />
            <div className='w-full' />
            { files.length > 0 
                ? files.map( ( name, i ) => 
                    <RFile key={`file-${i}`} path={name}></RFile>
                ) : <p>This folder contains no files</p>
            }
        </div>
    )
}

export default Directory;