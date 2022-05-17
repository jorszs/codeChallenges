'use strict';
const fs = require('fs');

process.stdin.resume();

process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
	inputString += inputStdin;
});

process.stdin.on('end', function () {
	inputString = inputString.split('\n');

	main();
});

function readLine() {
	return inputString[currentLine++];
}

//TODO
function inventoryList() {
	return {
		add(name) {
			writeInFile(name);
		},
		remove(name) {
			removeOfFile(name);
		},
		getList() {
			readFileData(fileData => console.log(fileData.toString()));
		},
	};
}

function readFileData(onRead) {
	fs.readFile('output.txt', 'utf-8', (err, fileData) => {
		if (err) {
			console.log('error');
		} else if (fileData) {
			onRead(fileData);
		}
	});
}

function writeInFile(name) {
	return new Promise((resolve, reject) => {
		function addName(fileData) {
			let newFileData = '';
			if (fileData) {
				let words = fileData.split(',');
				if (words.some(w => w === name) || words.length == 10) return;
				words.push(name);
				newFileData = words.toString();
			} else newFileData = name;

			fs.writeFileSync('./output.txt', newFileData);
		}
		readFileData(addName);
		resolve();
	});
}

function removeOfFile(name) {
	function removeName(fileData) {
		let words = fileData.split(',');
		let newWords = words.filter(w => w != name);
		let newFileData = newWords.toString();
		fs.writeFileSync('./output.txt', newFileData);
	}
	readFileData(removeName);
}

function main() {
	const obj = inventoryList();
	const operationCount = parseInt(readLine().trim());

	const mapFunction = {
		add: name => {
			obj.add(name);
		},
		remove: name => obj.remove(name),
		getList: () => obj.getList(),
	};

	for (let i = 1; i <= operationCount; i++) {
		const operationInfo = readLine().trim().split(' ');
		let operation = operationInfo[0];
		let value = operationInfo[1];
		//TODO
		operation == 'getList'
			? mapFunction[operation]()
			: mapFunction[operation](value);
		setTimeout(() => {}, 2000);
	}
}
