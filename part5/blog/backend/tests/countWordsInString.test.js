const { test, describe } = require('node:test');
const assert = require('node:assert');

const countWordsInString = require('../utils/list_helper.js').countWordsInString;


describe('count words in string', ()=> {
    test('If the word is found in isolation, 1 is returned', ()=> {
        assert.strictEqual(
            countWordsInString('node', 'node'),
            1
        )
    })

    test('If you find a word, you count it and keep searching', ()=> {
        assert.strictEqual(
            countWordsInString('world', 'The world of the world is a beautiful world'),
            3
        )
    })

    test('If you look for lyrics, it also counts them', ()=> {
        assert.strictEqual(
            countWordsInString('e', 'He needs three green apples'),
            8
        )
    })

    test('If it is not found, it returns 0', ()=> {
        assert.strictEqual(
            countWordsInString('last', 'I am reading a new book'),
            0
        )
    })
})
