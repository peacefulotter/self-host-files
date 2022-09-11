import axios from "axios"
import Requests from "./Requests"

export class FolderRequests extends Requests 
{
    constructor()
    {
        super('/folder/')
    }

    rename( 
        path: string, oldName: string, newName: string, 
        cb?: () => void, err?: () => void
    ) {
        this.get<string>('rename', { path, oldName, newName }, cb, err )
    }
}