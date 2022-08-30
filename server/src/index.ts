
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

app.get('/repos', async (req, res) => {
    const { path } = req.query;
    console.log(path);
    const content = await readDirectory(FOLDER_PATH, path as string)
    res.json(content)
} )

app.post('/upload', async (req, res) => {

    console.log(req.files);
    const files: UploadedFile | UploadedFile[] = req.files['file[]'];
    console.log(files);

    if ( Array.isArray(files) )
    {
        const resps = await Promise.all( files.map( saveFile(FOLDER_PATH) ) )
        resps.forEach( (r, i) => console.log(i, r) );
        res.json( resps )
    }
    else
    {
        const resp = await saveFile( FOLDER_PATH )( files )
        console.log(resp);
        res.json( [ resp ] )
    }
})

app.listen( PORT, () => {
    console.log(`Server running on ${PORT}`);
} );