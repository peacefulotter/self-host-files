
import { promises } from 'fs'

import { FOLDER_PATH, CREATE_FOLDER_MODE } from "../../constants";

export class FolderService 
{
    constructor() {}

    private getPath(path: string, name?: string) 
    {
        return FOLDER_PATH + path + (name || '');
    }

    async read(path: string)
    {    
        const folders = []
        const files = []
        const currentPath = this.getPath(path)
        console.log(currentPath);
        const directory = await promises.readdir( currentPath )
        for ( const filename of directory )
        {
            const filePath = currentPath + '/' + filename;
            const stats = await promises.stat(filePath)
            const isDirectory = stats.isDirectory()
            if ( isDirectory ) folders.push( filename )
            else files.push( filename )
        }
        return { folders, files };
    }

    async create(path: string, name: string) 
    {
        return await promises.mkdir( 
            this.getPath(path, name), 
            CREATE_FOLDER_MODE 
        )
    }

    async rename(path: string, oldName: string, newName: string)
    {
        console.log(path, oldName, newName);
        console.log(this.getPath(path, oldName), 
        this.getPath(path, newName) );
        
        return await promises.rename( 
            this.getPath(path, oldName), 
            this.getPath(path, newName) 
        )
    }
}