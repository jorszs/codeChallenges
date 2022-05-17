//TODO
function counts(teamA, teamB) {
	const initialMatchsCounts = [];
	const matchsCounts = teamB.reduce((previousValueB, currentValueB) => {
		let initialMatchCount = 0;
		//map A
		let matchCount = teamA.reduce(
			(previousValueA, currentValueA) =>
				currentValueA <= currentValueB ? ++previousValueA : previousValueA,
			initialMatchCount
		);
		return previousValueB.concat(matchCount);
	}, initialMatchsCounts);
	return matchsCounts;
}

(function main() {
	let teamA = [2, 10, 5, 4, 8];
	let teamB = [3, 1, 7, 8];
	let result = counts(teamA, teamB);
	console.log('🎉', result);
})();
