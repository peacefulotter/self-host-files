
import { FC } from 'react';
import { FcFolder } from 'react-icons/fc'
import { Link } from 'react-router-dom';

interface IFolder {
    path: string;
}

const RFolder: FC<IFolder> = ( { path } ) => {
    return (
        <Link to={path} className="repo-elt repo-elt-folder">
            <FcFolder className='repo-icon'/>
            <div className="elt-name">{path}</div>
        </Link>
    )
}

export default RFolder;