var http = require('http'),
	server = http.createServer(),
	fs = require('fs');


function commit(req, res) {
	fs.appendFileSync('data.txt', 'commit!\n');

	var sys = require('sys');
	var spawn = require('child_process').spawn;

	var add = spawn('git',['add','.']);
	add.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	})
	add.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	})
	add.on('exit', function(data) {
		console.log('exit code: ' + data);
	})

	var commit = spawn('git',['commit','-m','"commit!"']);
	commit.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	})
	commit.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	})
	commit.on('exit', function(data) {
		console.log('exit code: ' + data);
	})

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("commit ok\n");
	res.end();
}

server.on('request', commit);

server.listen(3000);