
import { FC, useState } from 'react';
import { FcImageFile } from 'react-icons/fc';
import { Link } from 'react-router-dom';

interface IFile {
    path: string;
}

const RFile: FC<IFile> = ( { path } ) => {

    const [fallback, setFallback] = useState<boolean>(false)

    const src = `http://localhost:3001/${path}`

    const onError = () => setFallback(true);

    return (
        <Link to={path} className="repo-elt repo-elt-file">
            { fallback
                ? <FcImageFile style={{fontSize: '4em'}}/>
                : <img src={src} onError={onError}/>
            }
        </Link>
    )
}

export default RFile;