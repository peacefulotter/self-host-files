import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Upload from './Components/Upload/Upload';
import Directory from './Components/Directory/Directory';

import './App.css';

const App = () => {

	const [tempFiles, setTempFiles] = useState<string[]>([])

	const clearTempFiles = () => setTempFiles([])

	return (
		<BrowserRouter>
			<div className="App">
				<Upload newUploadedFiles={setTempFiles} />
				<Directory uploadedFiles={tempFiles} clearUploadedFiles={clearTempFiles} />
			</div>
		</BrowserRouter>
	);
}

export default App;
