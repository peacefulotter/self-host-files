import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilesRequests from "../requests/FilesReq";

import { DirectoryContent } from "../types";

const fillFalseArray = (length: number) => Array.from( { length }, () => false )

const useSelectMode = ( directory: DirectoryContent ) => {

    const [selecting, setSelecting] = useState<boolean>(false)
    const [selectedFiles, setSelectedFiles] = useState<boolean[]>([]);

    const { pathname } = useLocation()

    useEffect( () => {
        const newLength = directory.files.length
        if ( newLength === selectedFiles.length ) return;
        setSelectedFiles( fillFalseArray(newLength) )
    }, [directory] )

    const downloadSelected = () => {
        const tos = selectedFiles
            .filter( v => v )
            .map( (v, i) => pathname + directory.files[i] )
        FilesRequests.download(tos, () => 
            setSelectedFiles(fillFalseArray(directory.files.length)) 
        )
    }

    const toggleSelecting = () => setSelecting( prev => !prev )

    const toggleSelectFile = (i: number) => () => {
        const temp = [...selectedFiles];
        temp[i] = !temp[i];
        setSelectedFiles(temp)
    }

    return { selecting, selectedFiles, downloadSelected, toggleSelecting, toggleSelectFile };
}

export default useSelectMode;