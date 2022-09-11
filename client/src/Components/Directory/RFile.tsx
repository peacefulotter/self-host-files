
import { FC, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FcAudioFile, FcFile, FcImageFile, FcVideoFile } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import FileIcon from '../FileIcon';

interface IFile {
    path: string;
    name: string;
}

const RFile: FC<IFile> = ( { path, name } ) => {

    const [fallback, setFallback] = useState<boolean>(false)
    const [src, setSrc] = useState<string>('')

    const to = path + (path.length > 1 ? '/' : '') + name;

    // TODO: improve -> use a react image library
    useEffect( () => {
        console.log('here');
        setFallback(false)
        const src = `http://localhost:3001${to}`
        setSrc(src)
    }, [name] )

    const onError = () => setFallback(true);

    const extension = path.split('.').pop() || '';    

    return (
        <Link to={to} className="repo-elt repo-elt-file truncate">
            { fallback
                ? 
                    <>
                        <FileIcon extension={extension} size={4} />
                        <p className="text-xs truncate" style={{width: '100px'}}>{name}</p>
                    </>
                : <img src={src} onError={onError}/>
            }
        </Link>
    )
}

export default RFile; 