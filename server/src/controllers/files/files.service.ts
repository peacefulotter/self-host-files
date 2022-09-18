
import promises from 'fs/promises';
import AdmZip from 'adm-zip';
import { Response } from 'express';

import { FOLDER_PATH } from '../../constants';

export class FilesService 
{
    constructor() {}

    async download(tos: string[], res: Response) 
    {
        const zip = new AdmZip();
        tos.forEach( to => zip.addLocalFile(FOLDER_PATH + to) )
        const buffer: Buffer = zip.toBuffer();

        const file = "test.zip";
        res.writeHead( 200, {
            'Content-Disposition': `attachment; filename='${file}'`,
            'Content-Type': 'application/zip',
        } );
        return res.end(buffer)
    }

    async remove(tos: string[]) 
    {
        return await Promise.all( tos.map( to => promises.unlink(FOLDER_PATH + to) ))
    }
}