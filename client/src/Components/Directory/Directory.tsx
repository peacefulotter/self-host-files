
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import RFolder from './RFolder';
import RFile from './RFile';

import './index.css'

const Directory = () => {

    const [ folders, setFolders ] = useState<string[]>([]);
    const [ files, setFiles ] = useState<string[]>([]);
    const { pathname } = useLocation();

    useEffect( () => {
        axios.get('/repos', { params: { path: pathname } } )
            .then( res => {
                if ( res.status !== 200 ) 
                    console.log('err', res)

                const { folders, files } = res.data;
                setFolders(folders)
                setFiles(files)
            } )
    }, [pathname] )

    return (
        <div className="directories">
            { folders.map( ( name, i) => 
                <RFolder key={`folder-${i}`} path={name}></RFolder>
            ) }
            <div className='w-full' />
            { files.map( ( name, i ) => 
                <RFile key={`file-${i}`} path={name}></RFile>
            ) }
        </div>
    )
}

export default Directory;