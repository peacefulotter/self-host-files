
import { FC, useEffect, useState } from 'react';
import { FiCheckSquare, FiDownload, FiTrash2 } from 'react-icons/fi';

import FileRequests from '../../../requests/FileReq';
import FileIcon from '../../FileIcon';
import FileBtn from './FileBtn';

interface IFile {
    path: string;
    name: string;
    isSelected: boolean;
    selecting: boolean;
    toggleSelectFile: (name: string) => void;
}

const RFile: FC<IFile> = ( { path, name, isSelected, selecting, toggleSelectFile } ) => {

    const [fallback, setFallback] = useState<boolean>(false)
    const [src, setSrc] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)

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
        setLoaded(false)
    }, [name] )

    const onError = () => {
        setFallback(true);
        setLoaded(true);
    }
    const onLoad = () => setLoaded(true)

    const extension = path.split('.').pop() || ''; 
    
    const onClick = () => selecting 
        ? toggleSelectFile(name)
        : null // TODO: show image big

    const onDownloadClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        FileRequests.download(to, name)
    }

    const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        FileRequests.remove(to, name)
    }

    return (
        <div 
            className="repo-elt repo-elt-file truncate relative transition-opacity duration-500" 
            style={ { opacity: loaded ? 1 : 0 } }
            onClick={onClick} 
            onMouseOver={onMouseOver} 
            onMouseOut={onMouseOut}
        >
            { fallback
                ? 
                    <>
                        <FileIcon extension={extension} size={4} />
                        <p className="text-xs text-center truncate" style={{width: '100px'}}>{name}</p>
                    </>
                : <img 
                    loading='lazy'
                    src={src}  
                    onError={onError} 
                    onLoad={onLoad} />
            }
            <FileBtn 
                className='inset-1 w-min h-min bg-green-50'
                iconClassName='text-green-500' 
                Icon={FiCheckSquare}  
                display={selecting && isSelected} />
            <FileBtn 
                className='bottom-1 right-1 bg-blue-100 [&:hover>*]:text-blue-600' 
                Icon={FiDownload} 
                iconClassName='text-blue-500 scale-90' 
                display={!selecting && hover} 
                onClick={onDownloadClick} />
            <FileBtn 
                className='top-1 right-1 bg-red-100 [&:hover>*]:text-red-600' 
                Icon={FiTrash2} 
                iconClassName='text-red-500' 
                display={!selecting && hover} 
                onClick={onDeleteClick} />
        </div>
    )
}

export default RFile; 