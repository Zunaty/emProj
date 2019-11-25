var emCommands = {
    //A lazy wait
    wait:  function(data){
        this
            .waitForElementVisible(data)
        return this
    },
    //Waits on an employee in the list
    waitEm: function(data){
        this
            .api.useXpath()
        this
            .waitForElementVisible(`${data}`)
            .api.useCss()
        return this
    },
    //Clicks on an employee name in the list
    clickEm: function(data){
        this
            .api.useXpath()
        this
            .click(`//li[text()="${data}"]`)
            .api.useCss()
        return this
    },
    //Clicks the add employee button, then clicks new employee created
    addNewEm: function(){
        this
            .wait('@emAdd')
            .click('@emAdd')
            .wait('@emNew')
            .click('@emNew')
        return this
    },
    //Clears the current employee information
    clearEm: function(){
        this
            .wait('@infoCardEm')
            .clearValue('@nameInput')
            .pause(100)
            .clearValue('@phoneInput')
            .pause(100)
            .clearValue('@emailInput')
            .pause(100)
            .clearValue('@titleInput')
        return this
    },
    //Edits the new employee created
    editNewEm: function(data){
        this
            .wait('@emNew')
            .click('@emNew')
            .clearEm('@emNew')
            .setValue('@nameInput',data.name)
            .setValue('@phoneInput',data.phone)
            .setValue('@emailInput',data.email)
            .setValue('@titleInput',data.title)
            .click('@saveBtn')
            .pause(1000)
            .waitEm(data.name)
            .clickEm(data.name)
            .verify.valueContains('@nameInput',data.name)
            .verify.valueContains('@phoneInput',data.phone)
            .verify.valueContains('@emailInput',data.email)
            .verify.valueContains('@titleInput',data.title)
        return this
    },
    //Edits the employee we just created
    editOldEm: function(data1,data2){
        this
            .waitEm(data1.name)
            .clickEm(data1.name)
            .clearEm()
            .setValue('@nameInput',data2.name)
            .setValue('@phoneInput',data2.phone)
            .setValue('@emailInput',data2.email)
            .setValue('@titleInput',data2.title)
            .clickEm('@saveBtn')
            .waitEm(data2.name)
            .clickEm(data2.name)
            .verify.valueContains('@nameInput',data2.name)
            .verify.valueContains('@phoneInput',data2.phone)
            .verify.valueContains('@emailInput',data2.email)
            .verify.valueContains('@titleInput',data2.title)
        return this
    },
    //Cancel the imformation input for an employee
    cancelEm: function(data1,data2){
        var namInp = {}
        var phnInp = {}
        var emlInp = {}
        var ttlInp = {}
        this
            .waitEm(data1)
            .clickEm(data1)
            .getValue('@nameInput',function(data){
                namInp = String(data.text)
            })
            .getValue('@phoneInput',function(data){
                phnInp = String(data.value)
            })
            .getValue('@emailInput',function(data){
                emlInp = String(data.value)
            })
            .getValue('@titleInput',function(data){
                ttlInp = String(data.value)
            })
            .clearEm()
            .setValue('@nameInput',data2.name)
            .setValue('@phoneInput',data2.phone)
            .setValue('@emailInput',data2.email)
            .setValue('@titleInput',data2.title)
            .verify.valueContains('@nameInput',data2.name)
            .verify.valueContains('@phoneInput',data2.phone)
            .verify.valueContains('@emailInput',data2.email)
            .verify.valueContains('@titleInput',data2.title)
            .click('@cancelBtn')
            .pause(300)
            .verify.valueContains('@nameInput',namInp)
            .verify.valueContains('@phoneInput',phnInp)
            .verify.valueContains('@emailInput',emlInp)
            .verify.valueContains('@titleInput',ttlInp)
        return this
    },
    //Deletes an employee from the list
    // deleteEm: function(data1){
    //     var self = {}
    //     this
    //         .wait('#root')
    //         .getText('@emNew',function (data2){
    //             var whereEm = String(data.value)
    //             if(whereEm == 'New Employee'){
    //                 self
    //                     .expect.element('@emNew').text.contains(data1)
    //                 self
    //                     .click('@deleteBtn')
    //                     .api.acceptAlert()
    //             }else{
    //                 self
    //                     .expect.element('@emNew').not.text.contains(data1)
    //             }
    //         })
    //     return this
    // },
    //Searches for stuff
    searchEm: function (data){
        this
            .wait('@searchInput')
            .setValue('@searchInput',data)
            .verify.containsText('@listEm',data)
        return this
    },
    //Clears the stuff in the search bar
    clearSEm: function(){
        this
            .wait('@searchClear')
            .click('@searchClear')
        return this
    },
    //Checking for an employee
    checkEm: function(){
        
    },
    //Checking the ID of an employee
    checkIDEm: function() {
        var self = this
        this
            .getText('#employeeID', function (data) {
                var idEm = Number(data.value.slice(3))
                self
                    .verify.ok(idEm > 0, `ID (${idEm}) is a positive number.`)
                    .verify.ok(idEm % 1 === 0, `ID (${idEm}) is a whole number.`)
            })
        return this
    },
}
module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [emCommands],
    elements: {
        //Search feature selectors
        searchInput: '[name="searchBox"]',
        searchClear: '[name="clearSearch]',
        //These are the button selectors inside info box
        saveBtn: '[#saveBtn]',
        cancelBtn: '[name="cancel"]',
        deleteBtn: 'button[name="delete"]',
        //These are the input fields for info box
        nameInput: '[name="nameEntry"]',
        phoneInput: '[name="phoneEntry"]',
        emailInput: '[name="emailEntry"]',
        titleInput: '[name="titleEntry"]',
        //Add Employee button and New employee 
        emAdd: '[name="addEmployee"]',
        emNew: {
            selector: '//li[text()="New Employee"]',
            locateStrategy: 'xpath'
        },
        //This selector is for the list as a whole
        listEm: '[class="listContainer"]',
        //This selector is for the info card as a whole
        infoCardEm: '[class="infoCard"]',
    }
}