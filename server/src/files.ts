import fs, { readdir, stat } from 'fs'
import { promisify } from 'util';
const readdirAsync = promisify( readdir )
const statAsync = promisify( stat )
import { UploadedFile } from "express-fileupload";

interface SaveResponse {
    name: string;
    saveAs: string;
}

export const saveFile = ( folder: string ) => ( file: UploadedFile ) => new Promise<SaveResponse>( (resolve, reject) => {
    const { name, md5 } = file;
    const saveAs = `${name}`; // _${md5}
    file.mv(folder + saveAs, (err) => {
        if ( err ) reject( err );
        else resolve( { name, saveAs } );
    });
} )

export const readDirectory =  async ( folder: string, path: string ) => {
    const res = []
    try 
    {
        const currentPath = folder + path;
        const files = await readdirAsync( currentPath )
        for ( const filename of files )
        {
            const filePath = currentPath + '/' + filename;
            const stats = await statAsync(filePath)
            const isDirectory = stats.isDirectory()
            res.push( { path: filename, isDirectory } )
        }
    }
    catch {
        console.log('Directory not found');
    }
    return res;
}