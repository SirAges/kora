const http = require('https');

const options = {
	method: 'GET',
	hostname: 'booking-com15.p.rapidapi.com',
	port: null,
	path: '/api/v1/attraction/getAttractionReviews?id=PR6K7ZswbGBs&page=1',
	headers: {
		'x-rapidapi-key': '90cb4e2e96msha4cf5c7cdd5d2aap14cbedjsna34c923d5eaa',
		'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();