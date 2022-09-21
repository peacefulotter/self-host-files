import { BrowserRouter } from 'react-router-dom';

import Upload from './Components/Upload/Upload';
import Directory from './Components/Directory/Directory';

import './tailwind.css';
import './App.css';
import { ExplorerProvider } from './context/ExplorerCtx';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<ExplorerProvider>
					<Upload />
					<Directory />
				</ExplorerProvider>
			</div>
		</BrowserRouter>
	);
}

export default App;
