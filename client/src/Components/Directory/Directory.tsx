
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import RFolder from './RFolder';
import RFile from './RFile';
import Path from './Path';
import Menu from './Menu';

import './index.css'


interface Repo {
    path: string;
    isDirectory: boolean;
}

const Directory = () => {

    const [ repos, setRepos ] = useState<Repo[]>([]);
    const { pathname } = useLocation();

    useEffect( () => {
        axios
            .get('/repos', { params: { path: pathname } } )
            .then( res => res.status === 200 
                ? setRepos(res.data as Repo[])
                : console.log('err', res)
            )
    }, [] )

    return (
        <div className="directories">
            { repos.map( ( { isDirectory, path }, i) => 
                isDirectory 
                    ? <RFolder key={`folder-${i}`} path={path}></RFolder>
                    : <RFile key={`file-${i}`} path={path}></RFile>
            ) }
        </div>
    )
}

export default Directory;