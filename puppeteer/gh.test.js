let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });


  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "body > div.logged-out.env-production.page-responsive > div.application-main > main > div.js-build-in.position-relative.overflow-hidden.section-team-hero.build-in-animate > div.position-relative.position-md-absolute.top-md-0.right-md-0.bottom-md-0.left-md-0.z-1 > div > div > div > div > a";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 6000);
});


describe("Titles other pages", () => {
  
  test("Should find the title on /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 6000);

  test("Should find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div.position-relative.z-1.container-xl.mx-auto.px-3.pt-6.py-md-12.height-full.d-flex.flex-column.flex-justify-center";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 6000);

  test("Should find the title on /enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = "#hero-section-brand-heading";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The AI-powered");
  }, 6000);
});