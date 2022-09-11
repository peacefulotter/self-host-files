
import { Controller, Get, HttpException, Query, UseFilters } from '@nestjs/common';
import { UploadedFile } from 'express-fileupload';
import { FileService } from './file.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';

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
                failed: ['File 1', 'File 3']
            }, 403 )
        }
    }
}