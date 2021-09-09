/// @ts-check
const path = require("path");
const child_process = require("child_process");
const assert = require("assert");
let port = 47841;
let runningChildren = new Set();

runTest().then(
  () => {
    console.log("\n\n✅ Next integration tests passed");
    process.exit(0);
  },
  (e) => {
    console.error("🤷‍♂️ Test failed because of ", e);
    process.exit(1);
  }
);

async function runTest() {
    console.log("📦 install puppeteer");
    await spawnAsync("npm", ["install"], { cwd: __dirname, stdio: "inherit" }).promise;
    console.log("🚀 test next <-> linaria integration");
    await launchExample(path.resolve(__dirname, "../examples/linaria"));
    console.log("🚀 test next <-> styled-component integration");
    await launchExample(path.resolve(__dirname, "../examples/styled-components"));
}

/** @param {string} url */
async function testExample(url) {
    
    console.log("💻 start browser and open nextjs app");
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
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
  const testPort = port++
  console.log(`🧹 remove ${path.join(cwd, 'node_modules')}`);
  await removeDir(path.join(cwd, '.next'));
  await removeDir(path.join(cwd, 'node_modules'));
  await removeDir(path.join(cwd, '.linaria-cache'));
  console.log("📦 install example dependencies");
  await spawnAsync("npm", ["install"], { cwd, stdio: "inherit" }).promise;
  console.log("🚀 build & launch nextjs");
  await spawnAsync("npm", ["run", "build"], { cwd, stdio: "inherit" }).promise;
  const {child: server, promise: serverClosed} = spawnAsync("npm", ["start", "--",  "-p", String(testPort)], { cwd, stdio: "inherit" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  await Promise.race([
    testExample(`http://localhost:${testPort}`),
    serverClosed
  ]);
  server.kill();
}

function removeDir(directory) {
  return new Promise((resolve) => {
    require("rimraf")(directory, () => {
        resolve();
    });
  });
}

function spawnAsync(command, args, options) {
  const child = child_process.spawn(command, args, options);
  runningChildren.add(child);
  return {child, promise: new Promise((resolve, reject) => {
    child.on("close", (code) => {
        runningChildren.delete(child);
      if (code) {
        reject(new Error(`${command} failed - exit code: ${code}`));
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