


import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useFileService from "../requests/useFileService";
import useFolderService from "../requests/useFolderService";

import { Explorer, FileOrFolder } from "../types";

interface ContextProps {
    // selection
    isSelecting: boolean;
    toggleSelect: () => void;
    toggleSelectExplorer: (i: number) => () => void;

    explorer: Explorer;
    upload: (files: File[], progress: (e: ProgressEvent) => void, cb: () => void, err: () => void) => void;
    renameFolder: (i: number) => (newName: string, err: () => void) => void;
    createFolder: () => void;
    removeOneFile: (name: string) => void;
    removeOneFolder: (name: string) => void;
    downloadOneFile: (name: string) => void;
    downloadOneFolder: (name: string) => void;
    downloadSelected: () => void;
    removeSelected: () => void;
}


const ExplorerContext = createContext({} as ContextProps);

export const ExplorerProvider = ({ children }: any) => {
    
    const [isSelecting, setIsSelecting] = useState<boolean>(false)
    const [explorer, setExplorer] = useState<FileOrFolder[]>([])

    const folderService = useFolderService();
    const fileService = useFileService();

    const { pathname } = useLocation()

    const toggleSelect = () => setIsSelecting( prev => !prev )

    const toggleSelectExplorer = (i: number) => () => {
        const temp = [...explorer];
        temp[i].selected = !temp[i].selected;
        setExplorer(temp);
    }

    useEffect( () => {
        folderService.read(pathname, setExplorer)
    }, [pathname] )

    const setSortedExlorer = ( cb: (prev: Explorer) => Explorer ) => 
        setExplorer( prev => cb(prev).sort( (a, b) => a.name.localeCompare(b.name) ) )

    // upload
    // TODO support upload folders
    const upload = (files: File[], progress: (e: ProgressEvent) => void, cb: () => void, err: () => void) => {
        const data = new FormData();
		data.append('pathname', pathname)
		files.forEach( file => data.append('files[]', file, file.name) )

        fileService.upload( data, 
            progress, 
            () => { 
                const filesExplorer = files.map( ({name}) => ({name, selected: false, type: 'file'} as FileOrFolder))
                setSortedExlorer( prev => [...prev, ...filesExplorer] )
                cb()
            },
            err
        )
    }

    // rename
    const renameFolder = (i: number) => folderService.rename(pathname, explorer[i].name, name => {
        const temp = [...explorer];
        temp[i].name = name;
        setSortedExlorer( _ => temp )
    } )
    
    // create
    const resolveName = (baseName: string, type: 'file' | 'folder') => {
        let name = baseName;
        let i = 1
        while ( explorer.some( v => v.name === name && v.type === type) ) {
            name = baseName + ` (${i++})`
        }
        return name;
    }

    const createFolder = () => {
        const name = resolveName('New folder', 'folder');
        folderService.create( pathname, name, () => {
            console.log('here');
            setSortedExlorer( prev => [...prev, { name, selected: false, type: 'folder' }] )
         } )
    }

    // remove
    const removeOne = (type: 'file' | 'folder') => (name: string) => 
        setExplorer( prev => prev.filter( v => v.name !== name || v.type !== type ) )
    const removeOneFile = fileService.removeOne(pathname, removeOne('file') );
    const removeOneFolder = folderService.removeOne(pathname, removeOne('folder') );
    const removeSelected = fileService.removeSelected( pathname, explorer, () => 
        setExplorer( prev => prev.filter( v => !v.selected ) )
	)

    // download
    const downloadOneFile = fileService.downloadOne(pathname)
    const downloadOneFolder = folderService.downloadOne(pathname)
    const downloadSelected = fileService.downloadMany(pathname, explorer.filter( v => v.selected ))

    return (
        <ExplorerContext.Provider value={{
            isSelecting,
            toggleSelect,
            toggleSelectExplorer,
            explorer,
            upload,
            renameFolder,
            removeOneFile,
            removeOneFolder,
            downloadOneFile,
            downloadOneFolder,
            downloadSelected,
            removeSelected,
            createFolder
        }}>
            {children}
        </ExplorerContext.Provider>
    );
};

export const useExplorerCtx = () => useContext(ExplorerContext);