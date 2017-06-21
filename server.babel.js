var fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');
try {
	const config = JSON.parse(babelrc);
	require('babel-register')(config);
} catch(err) {
	console.log(err);
	console.log('parse babelrc error');
}
