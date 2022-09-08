import fs, { readdir, stat } from 'fs'
import { promisify } from 'util';
const readdirAsync = promisify( readdir )
const statAsync = promisify( stat )
import { UploadedFile } from "express-fileupload";

import { SaveResponse } from './types';


export const saveFile = ( folder: string ) => ( file: UploadedFile ) => new Promise<SaveResponse>( (resolve, reject) => {
    const { name, md5 } = file;
    const saveAs = `${name}`; // _${md5}
    file.mv(folder + saveAs, (err) => {
        if ( err ) reject( err );
        else resolve( { name, saveAs } );
    });
} )

export const readDirectory = async ( folder: string, path: string ) => {
    const folders = []
    const files = []
    const currentPath = folder + path;
    const directory = await readdirAsync( currentPath )
    for ( const filename of directory )
    {
        const filePath = currentPath + '/' + filename;
        const stats = await statAsync(filePath)
        const isDirectory = stats.isDirectory()
        if ( isDirectory ) folders.push( filename )
        else files.push( filename )
    }
    return { folders, files };
}