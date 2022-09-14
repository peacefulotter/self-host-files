
import { FC, useEffect, useState } from 'react';
import { FiCheckSquare, FiDownload } from 'react-icons/fi';
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

    const [hover, setHover] = useState<boolean>(false);
    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false)

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
        : null // TODO: show image big

    const onDownloadClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        FileRequests.download(to, name)
    }

    return (
        <div className="repo-elt repo-elt-file truncate relative" onClick={onClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
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
            { !selecting && hover && 
                 <div 
                    className='absolute p-1 bottom-1 right-1 bg-gray-50 [&:hover>*]:text-gray-900 [&:hover>*]:scale-100 transition-colors rounded shadow animate-fade-in'
                    onClick={onDownloadClick}
                >
                    <FiDownload className='text-3xl text-gray-700 scale-90' />
                </div> 
            }
        </div>
    )
}

export default RFile; 