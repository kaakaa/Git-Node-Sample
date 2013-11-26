var http = require('http'),
	server = http.createServer();


function exec(req, res) {
	var sys = require('sys');
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) {
		sys.puts(stdout)
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(stdout);
		res.end();
	};
	exec("git status", puts)
}

server.on('request', exec);

server.listen(3000);