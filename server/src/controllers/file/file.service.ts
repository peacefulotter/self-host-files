import fs from 'fs';
import { UploadedFile } from "express-fileupload";

import { SaveResponse } from "../../types";
import { FOLDER_PATH } from "../../constants";
import { Response } from 'express';

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

    // async download(to: string, res: Response) 
    // {
    //     const stream = fs.createReadStream(to);
    //     res.set( {
    //         'Content-Disposition': `attachment; filename='${to}'`,
    //         'Content-Type': 'application/pdf',
    //     });
    //     stream.pipe(res);
    // }
}