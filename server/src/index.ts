
import express from "express";
import fileUpload, { UploadedFile } from 'express-fileupload';
import cors from 'cors';
import { readDirectory, saveFile } from "./files";

const PORT = process.env.PORT || 3001;
const app = express();

export const FOLDER_PATH = `${__dirname}/public/files/`

app.use( cors() );
app.use( express.static(FOLDER_PATH) );
app.use( express.urlencoded({extended: true}) )
app.use( express.json({type: ['application/json', 'text/plain']}) )
app.use( fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${FOLDER_PATH}temp`
}) );

app.get( '/', (req, res) => {
    return res.status(200).send("It's working");
} );

app.get('/repos', async (req, res, next) => {
    const { path } = req.query;
    console.log(path);
    readDirectory(FOLDER_PATH, path as string)
        .then( resp => res.json(resp) )
        .catch( next )
} )

app.post('/upload', async (req, res, next) => {
    const files: UploadedFile | UploadedFile[] = req.files['file[]'];
    const arrFiles = Array.isArray( files ) ? files : [ files ]

    Promise.all( arrFiles.map( saveFile(FOLDER_PATH) ) )
        .then( resp => res.json(resp) )
        .catch( next )
    }
)

app.use( (err: any, req: any, res: any, next: any) => {
    console.error('ERROR', err.stack);
    res.status(500).send(err.stack);
} );


app.listen( PORT, () => {
    console.log(`Server running on ${PORT}`);
} );