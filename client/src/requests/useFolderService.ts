
import useRequestsService from "./useRequestsService"

import { alertError } from "../swal/swal"
import { FileOrFolder } from "../types"


export default () => {
    
    const service = useRequestsService('/folder/')

    const read = (pathname: string, cb: (data: FileOrFolder[]) => void) => {
        service.get( 'read', { pathname }, cb )
    }

    const create = (pathname: string, name: string, cb: () => void ) => {
        service.get( 'create', { pathname, name }, cb )
    }

    const rename = (pathname: string, oldName: string, cb: (newName: string) => void) => (newName: string, err: () => void) => {
        service.get<string>( 'rename', { pathname, oldName, newName }, () => cb(newName), () => {
            err()
            alertError('rename folder failed')
        } )
    }

    const removeOne = (pathname: string, cb: (name: string) => void) => (name: string) => {
        service.get('remove', { pathname, name }, () => cb(name), () => alertError('remove folder failed') )
    }
    // same as many files
    // TODO: recursive search in folders -> zip
    const downloadOne = (pathname: string) => (name: string) => {
        throw new Error('TODO')
        service.get('download', { pathname, name }, undefined, () => alertError('download folder failed') )
    }

    return { read, create, rename, removeOne, downloadOne }
}