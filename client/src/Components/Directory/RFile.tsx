
import { FC, useState } from 'react';
import { IconType } from 'react-icons';
import { FcAudioFile, FcFile, FcImageFile, FcVideoFile } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import FileIcon from '../FileIcon';

interface IFile {
    path: string;
}

const RFile: FC<IFile> = ( { path } ) => {

    const [fallback, setFallback] = useState<boolean>(false)

    const src = `http://localhost:3001/${path}`

    const onError = () => setFallback(true);

    const extension = path.split('.').pop() || '';    

    return (
        <Link to={path} className="repo-elt repo-elt-file truncate">
            { fallback
                ? 
                    <>
                        <FileIcon extension={extension} size={4} />
                        <p className="text-xs truncate" style={{width: '100px'}}>{ path }</p>
                    </>
                : <img src={src} onError={onError}/>
            }
        </Link>
    )
}

export default RFile; 