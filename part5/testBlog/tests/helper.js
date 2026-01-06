const loginWith = async (page, username, password) => {
  await page.locator("#input-username").fill(username);
  await page.locator("#input-password").fill(password);
  await page.getByRole("button", { name: "Submit" }).click();
};

const createNewBlog = async (page, data) => {
  await page.getByRole("button", { name: "Create new blog" }).click();
  await page.locator("#input-title").fill(data.title);
  await page.locator("#input-author").fill(data.author);
  await page.locator("#input-url").fill(data.url);
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText(data.title).waitFor()
}

module.exports = { loginWith, createNewBlog };
