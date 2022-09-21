
import AdmZip from 'adm-zip';
import { Response } from 'express';
import promises from 'fs/promises';

import { Explorer } from '../../types';
import { FOLDER_PATH } from '../../constants';

export class FileService 
{
    constructor() {}

    remove = (pathname: string, file: string) => promises.unlink(FOLDER_PATH + pathname + file)

    async removeOne(pathname: string, file: string) {
        return await this.remove(pathname, file)
    }

    async downloadMany(pathname: string, explorer: Explorer, res: Response) 
    {
        const zip = new AdmZip();
        console.error('FOLDER NOT SUPPORTED')
        explorer.forEach( fn => zip.addLocalFile(FOLDER_PATH + pathname + fn) )
        const buffer: Buffer = zip.toBuffer();

        const file = "test.zip";
        res.writeHead( 200, {
            'Content-Disposition': `attachment; filename='${file}'`,
            'Content-Type': 'application/zip',
        } );
        return res.end(buffer)
    }

    async removeMany(pathname: string, files: string[], folders: string[]) 
    {
        return await Promise.all( 
            files.map( file => this.remove(pathname, file) )
        )
    }
}