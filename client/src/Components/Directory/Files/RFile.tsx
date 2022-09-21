
import { FC, useEffect, useState } from 'react';
import { FiCheckSquare, FiDownload, FiTrash2 } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useExplorerCtx } from '../../../context/ExplorerCtx';

import { FileOrFolder } from '../../../types';
import FileIcon from '../../FileIcon';
import FileBtn from './FileBtn';

interface IFile {
    file: FileOrFolder;
    i: number;
}

const RFile: FC<IFile> = ( { file, i } ) => {

    const { name, selected } = file;

    const [fallback, setFallback] = useState<boolean>(false)
    const [src, setSrc] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)

    const [hover, setHover] = useState<boolean>(false);
    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false)
    
    const { isSelecting, toggleSelectExplorer, downloadOneFile, removeOneFile } = useExplorerCtx();
    const { pathname } = useLocation();

    // TODO: improve -> use a react image library
    // TODO: then -> make animate-fade-in work
    useEffect( () => {
        setFallback(false)
        // FIXME: dynamic url
        const to = pathname + name;
        const src = `http://localhost:3001${to}`
        setSrc(src)
        setLoaded(false)
    }, [name] )

    const onError = () => {
        setFallback(true);
        setLoaded(true);
    }
    const onLoad = () => setLoaded(true)

    const extension = pathname.split('.').pop() || ''; 
    
    const onClick = () => isSelecting 
        ? toggleSelectExplorer(i)()
        : null // TODO: show image big

    const onDownloadClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        downloadOneFile(name)
    }

    const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        removeOneFile(name)
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
                display={isSelecting && selected} />
            <FileBtn 
                className='bottom-1 right-1 bg-blue-100 [&:hover>*]:text-blue-600' 
                Icon={FiDownload} 
                iconClassName='text-blue-500 scale-90' 
                display={!isSelecting && hover} 
                onClick={onDownloadClick} />
            <FileBtn 
                className='top-1 right-1 bg-red-100 [&:hover>*]:text-red-600' 
                Icon={FiTrash2} 
                iconClassName='text-red-500' 
                display={!isSelecting && hover} 
                onClick={onDeleteClick} />
        </div>
    )
}

export default RFile; 