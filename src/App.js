import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CodeArea } from './pages/codeArea';
import { HomePage } from './pages/home';
import { CodebaseProvider } from './Providers/CodebaseProvider';
import { ModeProvider } from './Providers/ModeProvider';

function App() {
	return (
		<ModeProvider>
			<CodebaseProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						{/* <Route path="/happyCoding/:fileId/:folderId" element={<CodeArea/>} /> */}
						<Route path="/happyCoding" element={<CodeArea/>} />
					</Routes>
				</BrowserRouter>
			</CodebaseProvider>
		</ModeProvider>
	);
}

export default App;
