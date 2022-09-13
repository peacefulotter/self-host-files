
import { FC, useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import FileRequests from '../../../requests/FileReq';
import FilesRequests from '../../../requests/FilesReq';
import FileIcon from '../../FileIcon';

interface IFile {
    path: string;
    name: string;
    isSelected: boolean;
    selecting: boolean;
    toggleSelectFile: () => void;
}

const RFile: FC<IFile> = ( { path, name, isSelected, selecting, toggleSelectFile } ) => {

    const [fallback, setFallback] = useState<boolean>(false)
    const [src, setSrc] = useState<string>('')

    const to = path + name;

    // TODO: improve -> use a react image library
    // TODO: then -> make animate-fade-in work
    useEffect( () => {
        setFallback(false)
        // FIXME: dynamic url
        const src = `http://localhost:3001${to}`
        setSrc(src)
    }, [name] )

    const onError = () => setFallback(true);

    const extension = path.split('.').pop() || ''; 
    
    const onClick = () => selecting 
        ? toggleSelectFile()
        : FileRequests.download(to, name)

    return (
        <div className="repo-elt repo-elt-file truncate relative" onClick={onClick}>
            { fallback
                ? 
                    <>
                        <FileIcon extension={extension} size={4} />
                        <p className="text-xs truncate" style={{width: '100px'}}>{name}</p>
                    </>
                : <img src={src} onError={onError} />
            }
            { selecting && isSelected && 
                <div className='absolute inset-1 p-1 bg-palette-c-50 w-min h-min rounded shadow animate-fade-in'>
                    <FiCheckSquare className='text-3xl text-palette-d-500' />
                </div> 
            }
        </div>
    )
}

export default RFile; 