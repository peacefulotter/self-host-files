import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Menu from './Components/Menu/Menu';
import Upload from './Components/Upload/Upload';
import Directory from './Components/Directory/Directory';

import './App.css';
import './css/btn.css'

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Upload />
				<div className="directories-wrapper">
					<Menu />
					<Routes>
						<Route path="*" element={<Directory />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
