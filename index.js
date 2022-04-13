const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replace-template');

///////////////// FILES
/*
// Blocking, synchronous code
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
const textOut = `This is what we know about the avocado: ${textIn} \nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);

console.log('file written');
// Unblocking, asynchronous code
fs.readFile('./txt/start.txt', 'utf-8', (err, dataOne) => {
    if (err) return console.log(err);
	fs.readFile(`./txt/${dataOne}.txt`, 'utf-8', (err, dataTwo) => {
		if (err) return console.log(err);
		console.log(dataTwo);
		fs.readFile('./txt/append.txt', 'utf-8', (err, dataThree) => {
            if (err) return console.log(err);
			console.log(dataThree);

			fs.writeFile(
                './txt/final.txt',
				`${dataTwo}\n${dataThree}`,
				'utf-8',
				(err) => {
                    if (err) return console.log(err);
					console.log('Your file has been written!');
				}
                );
            });
        });
});
console.log('Will read file!');
*/
///////////////// SERVER

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const jsonDataObj = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// Overview Page
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-type': 'text/html' });

		const cardsHTML = jsonDataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join('');

		const output = tempOverview.replace('{%PRODUCTCARDS%}', cardsHTML);

		res.end(output);

		// Product Page
	} else if (pathname === '/product') {
		res.writeHead(200, { 'Content-type': 'text/html' });
		const product = jsonDataObj[query.id];
		// console.log(product);
		// console.log(tempProduct);
		const output = replaceTemplate(tempProduct, product);
		res.end(output);

		// API
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(jsonData);

		// Not Found
	} else {
		// console.log(query);
		res.writeHead(404, {
			'Content-type': 'text-html',
		});
		res.end('<h1>Page not found!</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('listening on port 8000');
});
