const puppeteer = require("puppeteer");

exports.handler = async (event) => {
    // Parse request body
    const { regno, password } = JSON.parse(event.body);

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
    });
    const page = await browser.newPage();

    try {
        // Navigate to ARMS Login Page
        await page.goto("https://arms.sse.saveetha.com/");
        await page.type("#txtUserName", regno);
        await page.type("#txtPassword", password);
        await page.click("#btnLogin");
        await page.waitForNavigation();

        // Navigate to My Courses
        await page.goto("https://arms.sse.saveetha.com/StudentPortal/MyCourse.aspx");

        // Extract Data from the Table
        const grades = await page.evaluate(() => {
            const rows = document.querySelectorAll("#tblGridViewComplete tr");
            return Array.from(rows).slice(1).map(row => {
                const cells = row.querySelectorAll("td");
                return {
                    courseCode: cells[1].innerText.trim(),
                    courseName: cells[2].innerText.trim(),
                    grade: cells[3].innerText.trim(),
                };
            });
        });

        await browser.close();
        return {
            statusCode: 200,
            body: JSON.stringify(grades),
        };

    } catch (error) {
        await browser.close();
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch grades" }),
        };
    }
};
