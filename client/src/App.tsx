import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Upload from './Components/Upload';

import Directory from './Components/Directory';
import Path from './Components/Directory/Path';
import Menu from './Components/Directory/Menu';

import './App.css';
import './css/btn.css'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Upload />
				<div className="directories-wrapper">
					<div className="dir-header">
						<Path />
						<Menu />
					</div>
					<Routes>
						<Route path="*" element={<Directory />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
