import { BrowserRouter } from 'react-router-dom';

import Upload from './Components/Upload/Upload';
import Directory from './Components/Directory/Directory';

import './App.css';
import './css/btn.css'

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Upload />
				<Directory />
			</div>
		</BrowserRouter>
	);
}

export default App;
