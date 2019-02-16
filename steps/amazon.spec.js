let {When, Then, Given} = require("cucumber");
let AppleWatchResult = 60000;
let otherWatch = 0; 
let chai = require('chai');
let expect  = chai.expect;
let watchName = "";
let pgp = require("pg-promise")(/*options*/);
let dbcon = require("../TestData/dbConnection.js");
let db = pgp(dbcon);
let query = require("../TestData/query.js");
let EC = protractor.ExpectedConditions;

Given('User navigates to {string}', function (string, next) {
    // Write code here that turns the phrase above into concrete actions
    browser.ignoreSynchronization = true;
    browser.get(string).then(next); 
  });


  Given('Enters the {string} into the search box', function (string, next) {
      browser.sleep(3000); 
      element(by.id("twotabsearchtextbox")).sendKeys(string).then(next);
      
  });


When('User clicks on search button', function (next) {
    // Write code here that turns the phrase above into concrete actions
    element(by.css("[class=nav-input][value='Go']")).click().then(next);
  });


Then('Number of search results should be displayed', function (next) {
    // Write code here that turns the phrase above into concrete actions
    element(by.id("s-result-count")).getText().then(text=>{
        let array = text.split(" ");        
        for(let i = 1; i < array.length; i++){
            if(isNaN(parseInt(array[i]))){
                continue;
            }else{
                array[i] = array[i].toString().replace(",", "");
               AppleWatchResult = parseInt(array[i]);
               break;
            }
        }
    }).then(next);
  });

  Then('Number of search results should be displayed and compared against the apple watch', function (next) {
    element(by.id("twotabsearchtextbox")).getAttribute("value").then(name=>{
        watchName = name;
    })
    element(by.id("s-result-count")).getText().then(text=>{
    let array = text.split(" ");        
        for(let i = 1; i < array.length; i++){
            if(isNaN(parseInt(array[i]))){
                continue;
            }else{
               array[i] = array[i].toString().replace(",", "");
               otherWatch = parseInt(array[i]);
               break;
            }
        }
            expect(AppleWatchResult).to.be.gt(otherWatch);
            console.log(`${watchName} : ${otherWatch}, Watch : ${AppleWatchResult}`);
       
    }).then(next);
});

Given('User clicks on sign in link', function (next) {
    element(by.css("#nav-tools a:nth-child(2)>:nth-child(1)")).getText().then(text=>{
        expect(text).to.equal("Hello, Sign in");
    })
    element(by.css("#nav-tools a:nth-child(2)>:nth-child(1)")).click().then(next);

  });


  Given('Enters {string} in username and {string} in password fields', function (string, string2, next) {
    element(by.id("ap_email")).sendKeys(string);
    element(by.name("password")).sendKeys(string2).then(next);
    
  });


  When('sign in button is clicked', function (next) {
    element(by.id("signInSubmit")).click().then(next);
  });


  Then('user\'s firstname {string} is displayed', function (string, next) {
    element(by.css("#nav-tools a:nth-child(2)>:nth-child(1)")).getText().then(text=>{
        text = text.split(" ");
        text = text[text.length-1];
        expect(text).to.equal(string);
    }).then(next);
  });


  When('The highest price sorting filter has been clicked', function (next) {
    let salary, arr;
    let name, priceTag;
    element(by.id("sort")).element(by.css("[value='price-desc-rank']")).click().then(()=>{
        browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element.all(by.css("#s-results-list-atf .sx-price.sx-price-large>span")).first());
    element.all(by.css("#s-results-list-atf .sx-price.sx-price-large>span")).first().getText().then(price=>{
        priceTag = parseInt(price.replace(",", ""));
    
  db.any(query.salary).then(result=>{
    arr = result;
  }).catch(err=>{
      console.log(err);
  }).then(()=>{
      arr.forEach(elem => {
        salary = parseInt(elem.salary);
        name = `${elem.first_name} ${elem.last_name}`;  
              if(priceTag < salary*0.05){
            console.log(name+" can afford "+priceTag+"$ watch with salary of "+salary);
        }
})
}); 
  })
  }).then(next);
})

  When('The highest price has been compared to Employee\'s salary', function () {
     
    // .then(()=>{
        
  
    //        console.log(`Price: ${price}, salary: ${salary}`);
    
    //     })
    //    })
    // }).catch(err=>{
    //     console.log(err);
    
});
  
