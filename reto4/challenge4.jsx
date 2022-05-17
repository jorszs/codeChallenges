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

/*
 * Complete the 'processLogs' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY logs
 *  2. INTEGER threshold
 */
function processLogs(logs, threshold) {
	let transactionsObj = {};
	let userIds = [];

	logs.map((log, index) => {
		let listAux = log.split(' ');
		if (!transactionsObj[listAux[0]]) {
			transactionsObj[listAux[0]] = 0;
		}
		if (!transactionsObj[listAux[1]]) {
			transactionsObj[listAux[1]] = 0;
		}
		transactionsObj[listAux[0]] = transactionsObj[listAux[0]] + 1;
		if (listAux[0] != listAux[1]) {
			transactionsObj[listAux[1]] = transactionsObj[listAux[1]] + 1;
		}
	});
	for (let t in transactionsObj) {
		if (parseInt(transactionsObj[t]) >= parseInt(threshold)) {
			userIds.push(parseInt(t));
		}
	}
	return userIds.sort();
}

function writeInFile(data) {
	fs.writeFileSync('./logs.txt', data);
}

function main() {
	const logsCount = parseInt(readLine().trim(), 10);
	let logs = [];
	for (let i = 0; i < logsCount; i++) {
		const logsItem = readLine();
		logs.push(logsItem);
	}
	const threshold = parseInt(readLine().trim(), 10);
	const result = processLogs(logs, threshold);
	console.log(result);
	writeInFile(result.join('\n') + '\n');
}
