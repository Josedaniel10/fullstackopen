const { expect, test, beforeEach, describe } = require("@playwright/test");
const { loginWith, createNewBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3002/api/testing/reset");
    await request.post("http://localhost:3002/api/users", {
      data: {
        name: "Cilia",
        username: "cilia",
        password: "123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Login")).toBeVisible();
    await expect(page.locator("#input-username")).toBeVisible();
    await expect(page.locator("#input-password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "cilia", "123");
      await expect(page.getByText("Cilia logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "elena", "123");
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "cilia", "123");
      await expect(page.getByText("Cilia logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await createNewBlog(page, {
        title: "Blog created by a playwright",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });
      await expect(
        page.getByRole("heading", { name: "Blog created by a playwright" })
      ).toBeVisible();
      await expect(page.getByText("Blog successfully created")).toBeVisible();
    });

    test("You can like a blog", async ({ page }) => {
      await createNewBlog(page, {
        title: "Blog created by a playwright",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

     test("You can delete a blog", async ({ page }) => {
      await createNewBlog(page, {
        title: "Blog created by a playwright",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });
      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", async (dialog) => {
        console.log(`Mensaje del diálogo: ${dialog.message()}`);
        await dialog.accept();
      });
      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.getByText("Blog successfully deleted")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Blog created by a playwright" })
      ).not.toBeVisible();
    });

    test("Blogs are organized according to their number of likes", async ({
      page,
    }) => {
      await createNewBlog(page, {
        title: "First blog",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });

      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText('likes 1').waitFor()
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText('likes 2').waitFor()
      await page.getByRole("button", { name: "hide" }).click();

      await createNewBlog(page, {
        title: "Second blog",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });

      await page.getByRole("button", { name: "view" }).nth(1).click();
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText('likes 1').waitFor()
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText('likes 2').waitFor()
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText('likes 3').waitFor()
      await page.getByRole("button", { name: "hide" }).click();

      await expect(
        page.locator(".list-blog .blog-item:first-child .title h4")
      ).toHaveText("Second blog - Cilia");
    });
  });

  describe("when there are multiple logins", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3002/api/users", {
        data: {
          name: "Joel",
          username: "joel",
          password: "123",
        },
      });
    });

    test("Only the blog owner can see the delete button", async ({ page }) => {
      await loginWith(page, "joel", "123");
      await createNewBlog(page, {
        title: "Blog created by a playwright",
        author: "Cilia",
        url: "http://ciliaweb.com",
      });

      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "cilia", "123");
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByText("Blog created by a playwright")
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
  });
});
