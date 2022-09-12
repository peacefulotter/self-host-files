
import { Controller, Get, HttpException, Query, Res, UseFilters } from '@nestjs/common';
import { UploadedFile } from 'express-fileupload';
import { FileService } from './file.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Response } from 'express';

@Controller('file')
@UseFilters(new HttpExceptionFilter())
export class FileController 
{
    constructor(private readonly service: FileService) {}

    @Get('upload')
    async upload( @Query() query: { files: { 'file[]': UploadedFile | UploadedFile[] } } )
    {
        const files: UploadedFile | UploadedFile[] = query.files['file[]'];
        try {
            return await this.service.upload(files);
        }
        catch { 
            throw new HttpException( {
                msg: ['[template]', 'File 1 failed', 'File 3 failed']
            }, 403 )
        }
    }

    // @Get('download')
    // async download( @Query() query: { to: string }, @Res() res: Response )
    // {
    //     try {
    //         const { to } = query;
    //         return await this.service.download(to, res);
    //     }
    //     catch { 
    //         throw new HttpException( {
    //             msg: 'Download failed'
    //         }, 403 )
    //     }
    // }
}