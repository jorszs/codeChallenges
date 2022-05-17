import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
	let objeto = {
		realy: 'really',
		wierd: 'weird',
		Alcol: 'alcohol',
		canbio: 'Cambio',
		corason: 'corazón',
	};

	const [value, setValue] = useState('');
	const [words, setWords] = useState([]);
	const handleChange = e => {
		let newValue = e.target.value;
		if (e.keyCode === 32) {
			let listAux = e.target.value.split(' ');
			let endWord = listAux[listAux.length - 1];
			console.log('end: ', endWord);
			if (objeto[endWord]) {
				listAux[listAux.length - 1] = objeto[endWord];
				newValue = listAux.join(' ');
			}
		}
		setValue(newValue);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<textarea
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={handleChange}
				>
					Hola mundo...
				</textarea>
			</header>
		</div>
	);
}

export default App;
