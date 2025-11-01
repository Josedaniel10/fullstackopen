const { test, describe, beforeEach, after } = require('node:test')
const assert = require('assert')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user.model')
const helper = require('./helper')
const { default: mongoose } = require('mongoose')
const API_USER = '/api/users'
const api = supertest(app)

describe('User API REST', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        for (let user of helper.initialUsers) {
            const saveUser = new User(user)
            await saveUser.save()
        }
    })

    test('Existing users are not created', async () => {
        const newUser = {
            username: "root 1",
            name: "root",
            password: "encoded"
        }

        const result = await api
            .post(API_USER)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /json/)
        
        const usersAtEnd = await helper.usersInDB()
        console.log(result.text)
        assert.strictEqual(result.text, '{"error":"The username already exists"}')
        assert.strictEqual(helper.initialUsers.length, usersAtEnd.length)
    })
})

after(async ()=> {
    await mongoose.connection.close()
})