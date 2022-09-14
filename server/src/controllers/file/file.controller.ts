
import { Controller, Post, UploadedFiles, UseFilters, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileService } from './file.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { FOLDER_PATH } from '../../constants';

@Controller('file')
@UseFilters(new HttpExceptionFilter())
export class FileController 
{
    constructor(private readonly service: FileService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files[]', undefined, {
        storage: diskStorage( {
            destination: (req, _, callback) => {
                const destination = FOLDER_PATH + req.body.pathname
                callback(null, destination)
            },
            filename: (_, file, callback) => {
                callback(null, file.originalname)
            },
        } ) 
    } ) )
    async upload( @UploadedFiles() files: Array<Express.Multer.File> )
    {
        return { status: 200, msg: 'ok' }
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