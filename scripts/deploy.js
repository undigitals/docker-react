var Client = require("ssh2").Client;

var conn = new Client();
conn
  .on("ready", function() {
    console.log("Client :: ready");
    conn.shell(function(err, stream) {
      if (err) throw err;
      stream
        .on("close", function() {
          console.log("Stream :: close");
          conn.end();
        })
        .on("data", function(data) {
          console.log("STDOUT: " + data);
        })
        .stderr.on("data", function(data) {
          console.log("STDERR: " + data);
        });
      stream.end("ls -l\nexit\n");
    });
  })
  .connect({
    host: "159.65.1.178",
    port: 22,
    username: "root",
    privateKey: require("fs").readFileSync(
      "/Users/umeednegmatullayev/.ssh/id_rsa"
    )
  });

// example output:
// Client :: ready
// STDOUT: Last login: Sun Jun 15 09:37:21 2014 from 192.168.100.100
//
// STDOUT: ls -l
// exit
//
// STDOUT: frylock@athf:~$ ls -l
//
// STDOUT: total 8
//
// STDOUT: drwxr-xr-x 2 frylock frylock 4096 Nov 18  2012 mydir
//
// STDOUT: -rw-r--r-- 1 frylock frylock   25 Apr 11  2013 test.txt
//
// STDOUT: frylock@athf:~$ exit
//
// STDOUT: logout
//
// Stream :: close
