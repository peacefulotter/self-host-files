import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilesRequests from "../requests/FilesReq";

import { DirectoryContent } from "../types";

export const UNSELECTED = undefined;

const fillFalseArray = (length: number) => Array.from( { length }, () => UNSELECTED )

const useSelectMode = ( directory: DirectoryContent, removeCallback: (selectedFiles: (string | undefined)[]) => void ) => {

    const [selecting, setSelecting] = useState<boolean>(false)
    const [selectedFiles, setSelectedFiles] = useState<(string | undefined)[]>([]);

    const { pathname } = useLocation()

    const resetSelectedFiles = () => setSelectedFiles(fillFalseArray(directory.files.length))

    useEffect( () => {
        const newLength = directory.files.length
        if ( newLength === selectedFiles.length ) return;
        resetSelectedFiles()
    }, [directory] )

    const getSelected = ()  => selectedFiles.filter( v => v !== UNSELECTED ) as string[]

    const toggleSelectFile = (i: number) => (name: string) => {
        const temp = [...selectedFiles];
        temp[i] = temp[i] !== UNSELECTED ? UNSELECTED : name;
        setSelectedFiles(temp)
    }

    const menuFunctions = { 
        removeSelected:   () => FilesRequests.remove(pathname, getSelected(), () => { 
            resetSelectedFiles(); 
            removeCallback(selectedFiles) 
        } ), 
        downloadSelected: () => FilesRequests.download(pathname, getSelected()), 
        toggleSelecting:  () => setSelecting( prev => !prev )
    }

    return { selecting, selectedFiles, menuFunctions, toggleSelectFile };
}

export default useSelectMode;