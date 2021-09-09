/// @ts-check
const path = require("path");
const child_process = require("child_process");
const assert = require("assert");
const port = 47841;
let runningChildren = new Set();

runTest().then(
  () => {
    console.log("✅ Next integration tests passed");
    process.exit(0);
  },
  (e) => {
    console.error(e);
    process.exit(1);
  }
);

async function runTest() {
    console.log("🚀 install puppeteer");
    await spawnAsync("npm", ["install"], { cwd: __dirname, stdio: "inherit" }).promise;
    console.log("🚀 test next <-> linaria integration");
    await launchExample(path.resolve(__dirname, "../examples/linaria"));
    console.log("🚀 test next <-> styled-component integration");
    await launchExample(path.resolve(__dirname, "../examples/styled-components"));
}

async function testExample() {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`, {
      waitUntil: 'networkidle2',
    });
    const {fontSize,color} = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.querySelector("h1"));
        return {
            fontSize: styles.fontSize,
            color: styles.color,
        };
    });

    assert(fontSize, '12px');
    assert(color, 'rgb(255, 165, 0)');

    console.log("✅ fontSize and color match");

    await browser.close();
}

/** @param {string} cwd */
async function launchExample(cwd) {
  await spawnAsync("npx", ["--yes", "rimraf", ".next"], { cwd, stdio: "inherit" }).promise;
  await spawnAsync("npx", ["--yes", "rimraf", "node_modules"], { cwd, stdio: "inherit" }).promise;
  await spawnAsync("npm", ["install"], { cwd, stdio: "inherit" }).promise;
  await spawnAsync("npm", ["run", "build"], { cwd, stdio: "inherit" }).promise;
  const {child: server, promise: serverClosed} = spawnAsync("npm", ["start", "--",  "-p", String(port)], { cwd, stdio: "inherit" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  await Promise.race([
    testExample(),
    serverClosed
  ]);
  server.kill();
  await serverClosed;
}

function spawnAsync(command, args, options) {
  const child = child_process.spawn(command, args, options);
  runningChildren.add(child);
  return {child, promise: new Promise((resolve, reject) => {
    child.on("close", (code) => {
        runningChildren.delete(child);
      if (code !== 0) {
        reject(code);
      } else {
        resolve();
      }
    });
  })};
}

process.stdin.resume();
function exitHandler(exitCode) {
    Array.from(runningChildren).forEach((child) => {
        child.kill();
    });
    process.exit(exitCode || 0);
}
process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null));
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));
process.on('uncaughtException', exitHandler.bind(null));