/// @ts-check
const fs = require("fs");
const child_process = require("child_process");

async function run () {
    await spawnAsync("npm", ["install"], { cwd: __dirname, stdio: "inherit" }).promise;
    await spawnAsync("npm", ["run", "build"], { cwd: __dirname, stdio: "inherit" }).promise;
    await spawnAsync("npm", ["run", "export"], { cwd: __dirname, stdio: "inherit" }).promise;
    fs.writeFileSync(__dirname + '/out/CNAME', 'css-variable.js.org');
}

run();
function spawnAsync(command, args, options) {
    const child = child_process.spawn(command, args, options);
    return {child, promise: new Promise((resolve, reject) => {
      child.on("close", (code) => {
        if (code) {
          reject(new Error(`${command} failed - exit code: ${code}`));
        } else {
          resolve();
        }
      });
    })};
  }
