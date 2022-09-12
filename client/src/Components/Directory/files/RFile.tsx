
import { FC, useEffect, useState } from 'react';
import FilesRequests from '../../../requests/FilesReq';
import FileIcon from '../../FileIcon';

interface IFile {
    path: string;
    name: string;
}

const RFile: FC<IFile> = ( { path, name } ) => {

    const [fallback, setFallback] = useState<boolean>(false)
    const [src, setSrc] = useState<string>('')

    const to = path + name;

    // TODO: improve -> use a react image library
    useEffect( () => {
        setFallback(false)
        // FIXME: dynamic url
        const src = `http://localhost:3001${to}`
        setSrc(src)
    }, [name] )

    const onError = () => setFallback(true);

    const extension = path.split('.').pop() || ''; 
    
    const onClick = () => {
        // FileRequests.download(to, name)
        FilesRequests.download([to, to, to])
    }

    return (
        <div className="repo-elt repo-elt-file truncate" onClick={onClick}>
            { fallback
                ? 
                    <>
                        <FileIcon extension={extension} size={4} />
                        <p className="text-xs truncate" style={{width: '100px'}}>{name}</p>
                    </>
                : <img src={src} onError={onError}/>
            }
        </div>
    )
}

export default RFile; 