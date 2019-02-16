let {Before, After} = require('cucumber');

Before(function(){
    browser.manage().window().maximize();
});

After(function(){
    console.log("Test completed");
})