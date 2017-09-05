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
            
            //slowMo: 0, // this one works
            slowMo: 1000, // this one breaks
            
            //headless: false, // this causes a different error
            dumpio: true,
        });
        const page = await browser.newPage();
        
        console.log('going to: ' + serverUrl);
        await page.goto(serverUrl);
        
        //await page.screenshot('screenshots/homepage.png'); // this doesn't work either
        await page.screenshot({
            path: 'screenshots/homepage.png',
            omitBackground: false,
        });
        console.log('done screenshotting');
        
        browser.close();

    } catch (err) {
        console.error(err);
    }
}
