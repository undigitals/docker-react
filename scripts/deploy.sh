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

