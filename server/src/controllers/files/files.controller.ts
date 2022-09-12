
import { Controller, Get, HttpException, Query, Res, UseFilters } from '@nestjs/common';
import { FilesService } from './files.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Response } from 'express';

@Controller('files')
@UseFilters(new HttpExceptionFilter())
export class FilesController 
{
    constructor(private readonly service: FilesService) {}

    @Get('download')
    async download( @Query() query: { tos: string[] }, @Res() res: Response )
    {
        console.log(query.tos);
        try {
            const { tos } = query;
            return await this.service.download(tos, res);
        }
        catch (e) {
            console.log(e);
            throw new HttpException( {
                msg: 'Download files failed'
            }, 403 )
        }
    }
}