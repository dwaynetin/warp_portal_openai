'use strict'

const expect = require('chai').expect

const Driver = require('./driver')

describe('Create Response', () => {
    let driver
    it('should provide a response for the website inquiry', async() => {
        driver = new Driver()
        let response = await driver.getWebsite("e-Commerce")
        expect(response).to.be.not.equal(null)
        console.log(response.text.length)
    })
})