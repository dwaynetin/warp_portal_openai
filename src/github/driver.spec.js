'use strict'

const expect = require('chai').expect

const Driver = require('./driver')

describe('Create Repository', () => {
    let driver
    it('should create a repository to commit a github page', async() => {
        driver = new Driver()
        let response = await driver.createGithubPage("<html>HELLO WORLD</html>")
    })
})