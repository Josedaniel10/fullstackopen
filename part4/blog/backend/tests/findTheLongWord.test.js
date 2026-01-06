const { test, describe } = require('node:test');
const assert = require('node:assert');

const findTheLongWord = require('../utils/list_helper.js').findTheLongWord;

describe('find the long word', () => {
    test('If there is only one word it returns it', () => {
        assert.strictEqual(findTheLongWord(['yeah']), 'yeah')
    })

    test('Returns the longest word', () => {
        assert.strictEqual(
            findTheLongWord(['php', 'javascript', 'python', 'java']),
            'javascript'
        )
    })

    test('If there are several with the same size, the first one is returned', () => {
        assert.strictEqual(
            findTheLongWord(['meat', 'mail', 'node', 'java']),
            'meat'
        )
    })

})