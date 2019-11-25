var emPg = {}
var emI = require('../assets/emInfo')
module.exports = {
    beforeEach: browser => {
        emPg = browser.page.emPage()
        emPg.navigate()
    },
    after: browser => {
        emPg.end()
    },
    // 'Testing the add employee feature': browser => {           
    //     emPg
    //         .addNewEm()
    //         .editNewEm(emI[0])
    // },
    'Testing the ability to edit an employees': browser => {
        emPg
    },
    'Testing the cancel feature': browser => {
        emPg
            .cancelEm('@emNew',emI[2])
    },
    'Testing the delete employee feature': browser => {
        emPg
    },
    'Testing the search feature': browser => {
        emPg
            .searchEm('Hello')
            .clearSEm()
    },
    'Checking the employee IDs': browser => {
        emPg
            .checkIDEm()
    }
}