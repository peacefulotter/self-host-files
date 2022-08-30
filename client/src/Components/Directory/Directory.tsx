
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import RFolder from './RFolder';
import RFile from './RFile';
import Path from './Path';

import './index.css'

interface Repo {
    path: string;
    isDirectory: boolean;
}

const Directories = () => {

    const [ repos, setRepos ] = useState<Repo[]>([]);
    const location = useLocation();

    useEffect( () => {
        axios
            .get('/repos', { params: { path: location.pathname } } )
            .then( res => res.status === 200 
                ? setRepos(res.data as Repo[])
                : console.log('err', res)
            )
    }, [location] )

    return (
        <div className="directories-wrapper">
            <Path />
            <div className="directories">
                { repos.map( ( { isDirectory, path }, i) => 
                    isDirectory 
                        ? <RFolder key={`folder-${i}`} path={path}></RFolder>
                        : <RFile key={`file-${i}`} path={path}></RFile>
                ) }
            </div>
        </div>
    )
}

export default Directories;