var http = require('http'),
	server = http.createServer(),
	fs = require('fs');


function commit(req, res) {
	fs.appendFileSync('data.txt', 'commit!\n');
	console.log('append!');
	var sys = require('sys');
	var exec = require('child_process').exec;
	var out = [];
	function puts(error, stdout, stderr) {
		sys.puts(stdout)
	};
	exec("git init", puts);
	console.log('git!');
	exec("git add .", puts);
	console.log('add!');
	exec("git commit -m 'commit'", puts);
	console.log('commit!');

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("commit ok\n");
	res.end();
}

server.on('request', commit);

server.listen(3000);