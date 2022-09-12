import Requests from "./Requests"

const prefix = '/folder/'

const FolderRequests = 
{
    read: (path: string, cb: (data: { folders: string[], files: string[] }) => void) => {
        Requests.get( prefix, 'read', { path }, cb )
    },

    create: (path: string, name: string, cb: () => void ) => {
        Requests.get(prefix, 'create', { path, name }, cb)
    },

    rename: ( 
        path: string, oldName: string, newName: string, 
        cb?: () => void, err?: () => void
    ) => {
        Requests.get<string>(prefix, 'rename', { path, oldName, newName }, cb, err )
    }
}

export default FolderRequests;