import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Directories from './Components/Directory';
import Upload from './Components/Upload';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Upload />
				<Directories />
			</div>
		</BrowserRouter>
	);
}

export default App;
