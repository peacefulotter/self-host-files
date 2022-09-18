
import promises from 'fs/promises';

import { FOLDER_PATH } from '../../constants';

export class FileService 
{
    constructor() {}

    // async download(to: string, res: Response) 
    // {
    //     const stream = fs.createReadStream(to);
    //     res.set( {
    //         'Content-Disposition': `attachment; filename='${to}'`,
    //         'Content-Type': 'application/pdf',
    //     });
    //     stream.pipe(res);
    // }

    async remove(to: string)
    {
        return await promises.unlink(FOLDER_PATH + to)
    }
}