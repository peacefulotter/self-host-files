import { FC } from "react";
import { Table } from "flowbite-react";
import { HiOutlineX } from "react-icons/hi";
import FileImg from "./FileImg";

interface IFileList {
    files: File[] | undefined;
    remFile: (i: number) => void;
}

const FileElt = ( { index, file, remFile }: { index: number, file: File, remFile: (i: number) => void } ) => {
    
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 mb-8">
            <Table.Cell className="ml-5">
                {index}
            </Table.Cell>
            <Table.Cell>
               <FileImg file={file} />
            </Table.Cell>
            <Table.Cell className="ml-5 mr-5 text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden" style={{color: '#333', maxWidth: '13vw'}}>
                {file.name}
            </Table.Cell>
            <Table.Cell>
                <HiOutlineX type="button" className="cursor-pointer font-medium rounded-lg text-xl text-center inline-flex dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700" onClick={() => remFile(index)} />
            </Table.Cell>
        </Table.Row>
    )
}

const FileList: FC<IFileList> = ( { files, remFile } ) => {
    if ( files === undefined )
        return <div className='text-normal text-base text-gray-600'>No file selected</div>
    
    return (
        <div style={{height: '90vh', overflow: 'scroll', paddingBottom: '200px'}}>
            <Table>
                <Table.Body className="divide-y">
                    { files.map( (file, i) => 
                        <FileElt key={`filename-${i}`} index={i} file={file} remFile={remFile} />
                    ) }
                </Table.Body> 
            </Table>
        </div>
    ) 
}

export default FileList;