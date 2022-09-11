import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FileController } from './controllers/file/file.controller';
import { FileService } from './controllers/file/file.service';

import { FolderController } from './controllers/folder/folder.controller';
import { FolderService } from './controllers/folder/folder.service';



@Module( {
	imports: [
		ConfigModule.forRoot(), 
	],
	controllers: [FolderController, FileController],
	providers: [ConfigService, FolderService, FileService],
} )

export class AppModule {}