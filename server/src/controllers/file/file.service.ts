import { UploadedFile } from "express-fileupload";

import { SaveResponse } from "../../types";
import { FOLDER_PATH } from "../../constants";

export class FileService 
{
    constructor() {}

    saveFile = ( file: UploadedFile ) => new Promise<SaveResponse>( (resolve, reject) => {
        const { name, md5 } = file;
        const saveAs = `${name}`; // _${md5}
        file.mv(FOLDER_PATH + saveAs, (err) => {
            if ( err ) reject( err );
            else resolve( { name, saveAs } );
        });
    } )

    async upload(files: UploadedFile | UploadedFile[] ): Promise<SaveResponse[]> 
    {
        // TODO: Promise.all separate
        const arr = Array.isArray( files ) ? files : [ files ]
        return await Promise.all( arr.map( this.saveFile ) )
    }
}