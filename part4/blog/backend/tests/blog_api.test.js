const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog.model.js')
const helper = require('./helper.js');
const mongoose = require('mongoose');
const URL_API = '/api/blogs';

const api = supertest(app);
let authToken;

describe('When there is initially some blogs saved', () => {
    beforeEach(async () => {
       authToken = await helper.tokenForTestUser()
       const user = await helper.getUserFromToken(authToken)
       await helper.setupTestBlogs(user)
    })
    test('returned all blogs', async () => {
        await api
            .get(URL_API)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsEnd = await helper.blogsInDB()
        assert.strictEqual(blogsEnd.length, helper.initialBlogs.length)})

    test('The blogs identifier property is called id', async () => {
        const blogs = await helper.blogsInDB()
        assert(blogs[0].id)
    })

    describe('Addition of a new blog', async () => {
        test('Make a post request correctly', async () => {
            const newPost = {
                title: "Learn React",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 4,
            }

            // const authToken = await helper.tokenForTestUser()

            await api
                .post(URL_API)
                .set('Authorization', authToken)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsEnd = await helper.blogsInDB()
            const titles = blogsEnd.map(b => b.title)
            assert.strictEqual(blogsEnd.length, helper.initialBlogs.length + 1)
            assert(titles.includes(newPost.title))
        })

        test('When there are no likes the default value is 0', async () => {
            const newPost = {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "https://reactpatterns.com/"
            }

            // const authToken = await helper.tokenForTestUser()

            await api
                .post(URL_API)
                .set('Authorization', authToken)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.blogsInDB()
            assert(blogs[blogs.length - 1].likes === 0)
        })
        test('When the title or url property is missing, the status is 400', async () => {
            const newPost = {
                title: "",
                author: "Michael Chan",
                url: "",
                likes: 10
            }

            // const authToken = await helper.tokenForTestUser()

            await api
                .post(URL_API)
                .set('Authorization', authToken)
                .send(newPost)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.blogsInDB()
            assert.strictEqual(blogs.length, helper.initialBlogs.length)
        })
    })
    describe('deletion of a blog', () => {
        test('succeeds with status code 200 if id is valid', async () => {
            const blogsStart = await helper.blogsInDB();
            const firstBlog = blogsStart[0];

            await api
                .delete(`${URL_API}/${firstBlog.id}`)
                .set('Authorization', authToken)
                .expect(200)

            const blogsEnd = await helper.blogsInDB();
            const titles = blogsEnd.map(b => b.title)
            assert(!titles.includes(firstBlog.title))
            assert.strictEqual(blogsEnd.length, helper.initialBlogs.length - 1)
        })
    })
    /* describe('Update of a blog', () => {
        test('Likes update a blog', async () => {
            const blogsStart = await helper.blogsInDB()
            const firstBlogID = blogsStart[0].id;

            const changesBlog = {
                title: 'New title',
                author: 'New author',
                url: 'http://newurl.com',
                likes: 10
            }

            await api
                .put(`${URL_API}/${firstBlogID}`)
                .send(changesBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsEnd = await helper.blogsInDB()
            assert.deepStrictEqual(blogsEnd[0].title, changesBlog.title)
            assert.strictEqual(blogsEnd[0].likes, changesBlog.likes)
        })
    }) */

})


after(async () => {
    await mongoose.connection.close()
})