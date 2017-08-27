const puppeteer = require('puppeteer');
const {spawn} = require('child_process');

// start the dev server
const server = spawn('npm', ['start']);
let serverUrl = null;

server.stdout.on('data', function (data) {
    const out = data.toString();
    console.log(out);
    if (out.includes('Project is running at')) {
		serverUrl = out.slice(out.search(/https?:\/\//));
	}
	if (out.includes('webpack: Compiled successfully.')) {
		console.log('running the puppeteer tests');
		newUserViewsHomepage();
    }
});

async function newUserViewsHomepage() {
    try {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            slowMo: 1000,
            dumpio: true,
        });
        const page = await browser.newPage();
        await page.goto(serverUrl);
        await page.screenshot('screenshots/homepage.png');
        /*await page.screenshot({
            path: 'screenshots/homepage.png',
            omitBackground: false,
        });*/
        console.log('done puppeting');
        browser.close();

    } catch (err) {
        console.error(err);
    }
}
