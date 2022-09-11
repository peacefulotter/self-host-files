

import { Controller, Get, HttpException, HttpStatus, Query, UseFilters } from '@nestjs/common';
import { FolderService } from './folder.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('folder')
@UseFilters(new HttpExceptionFilter())
export class FolderController 
{
    constructor(private readonly service: FolderService) {}

    @Get('read')
    async read( @Query() query: { path: string } )
    {
        const { path } = query;
        try {
            return await this.service.read( path )
        }
        catch {
            throw new HttpException('read failed', HttpStatus.NOT_FOUND )
        }
    }

    @Get('create')
    async create( @Query() query: { path: string, name: string } )
    {
        try {
            const { path, name } = query;
            return await this.service.create(path, name);
        } 
        catch (e) {
            throw new HttpException('create failed', 403)
        }
    }

    @Get('rename')
    async rename( @Query() query: { path: string, oldName: string, newName: string } )
    {
        try {
            const { path, oldName, newName } = query;
            return await this.service.rename(path, oldName, newName);
        } 
        catch (e) {
            throw new HttpException('rename failed', 403)
        }
    }
}