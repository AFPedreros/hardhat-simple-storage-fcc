const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "2"
        const transactionResponse = await simpleStorage.store(expectedValue)
        transactionResponse.wait()

        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
    })
    it("Should add the name of a person with his favorite number", async function () {
        const expectedValue = "14"
        const name = "Felipe"
        const transactionResponse = await simpleStorage.addPerson(
            name,
            expectedValue
        )
        transactionResponse.wait()

        const favoriteNumber = await simpleStorage.nameToFavoriteNumber(name)
        assert.equal(favoriteNumber, expectedValue)
    })
})
