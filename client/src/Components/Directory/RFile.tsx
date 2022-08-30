
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IFile {
    path: string;
}

const RFile: FC<IFile> = ( { path } ) => {
    return (
        <Link to={path} className="repo-elt">
            <img src={`http://localhost:3001/${path}`}/>
        </Link>
    )
}

export default RFile;