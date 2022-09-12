import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FileController } from './controllers/file/file.controller';
import { FileService } from './controllers/file/file.service';

import { FilesController } from './controllers/files/files.controller';
import { FilesService } from './controllers/files/files.service';

import { FolderController } from './controllers/folder/folder.controller';
import { FolderService } from './controllers/folder/folder.service';


@Module( {
	imports: [ ConfigModule.forRoot() ],
	controllers: [FolderController, FileController, FilesController],
	providers: [ConfigService, FolderService, FileService, FilesService],
} )

export class AppModule {}