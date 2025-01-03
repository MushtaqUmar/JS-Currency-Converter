//currency Converter free API (github-fawazahma0 /currency-api) - we copy link 
// Endpoin :- used to snd request to in fetch() api.
const BASE_URL = "https://v6.exchangerate-api.com/v6/fe8a6fa101e42455d42ed8bf/latest/USD"; // USD : This API provides conversions in mentioned countries w.r.t 1USD (if we select other fromCurrencyCOde , then w.r.t that country values will be listed)
                                                                                 // ^^  FromcurrencyCode (change them as user chooses from dropdown below sNo 3)

                                                                           
// use in sNo1
 const dropdowns = document.querySelectorAll(".dropdown select"); // only 2 <select> are in .dropdown class(i.e., From & To)
 // used in sNo 2
const btn = document.querySelector("button");
// used in sNo 3
const fromCurr = document.querySelector(".from select");  // from waala <select> dega
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// SNo 1 : Add all country conversions as options in <Select> (from & to) 
for(let select of dropdowns){ 
for(let currCode in countryList) { //MUST READ: for-in (bcz objects-> key-value pair are there) Access countryList in script1.js file (JavaScript files in the same folder can access each other without using import/export statements, as long as they are included in the same HTML file in the correct order)
    // Step 1, step 2, step 3 for adding all countries as options
    let newOption = document.createElement("option"); // sTEP 1creating new element <option>
    newOption.innerHTML = currCode;  // STEP 1:  <option>currCode(IND)</option>
    newOption.value = currCode;

    //STEP 2:  <option value="USD/INR etc"></option> 
    // other task i.e, other then (step 1,2,3):- For making ' USD and INR ' as initial option for From & To 
    if (select.name === 'from' && currCode === 'USD'){ // 'from' waale <select> k andr jab currCode='USD' aajaye
        newOption.selected = "selected";  // make it selected (i.e., <option selected> USD </option>)
    }else if(select.name === 'to' && currCode === 'INR'){
        newOption.selected = "selected";  // 
    }
    // step 3 for adding options in both <select> 
    select.append(newOption);  //STEP 3: This appends the child element to the select element
    }; // inner loop

    // for updating flag as country gets updated
    select.addEventListener("change",(evt) => {   // as we 'change' (change is event here like click)
        updateFlag(evt.target); // evt.target : gives  such <Select> element where 'change' event occurs (i.e.,<select  name='from'>  OR <select  name='to'>)
    })

};



// SNo 2: for updating flag w.r.t country  (countryCode e.g: IN, US etc)
const updateFlag = (element) => { // element = such select where change evenet occurs(above passed)
    // 1. get currencycode selected from dropdown (which would be value of <select> where change event occured)
    let currCode = element.value;
    // 2. we need countryCode (e.g IN, US) which can be used in step 3 below 
    let countryCode = countryList[currCode];  // from script1.js file
    // 3.use this countryCode in 'src' of <img> VV  by making newSrc for updating flag (by changing countryCode of src used in html <img>)
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    //             ^^ : `  ` : backlit char

    // Access img element and update src
    let img = element.parentElement.querySelector("img"); // element(actually <select> where change occured) and img element is outside to it inside its parent element(<div class="select-container">...</div>)
    img.src = newSrc; // img ka src
}



// ACTUAL CALCULATION (fromCurrency <> toCurrency) : for SNo 3 and last addEventListner below
const updateExchangeRate = async () => { // Making it async func bcz we need to use await below (call api to fetch data -> async work)
    // get amount input by user as input
    let input  = document.querySelector(".amount input"); // gives <input> of parent class amount
    let amount = input.value;

    // condition: if amount input is -ve or nothing as input, then make amount value= 1- like default)
    if(amount === "" || amount < 0) {
        input.value = 1;  // to show in <input> field on browser
        amount = 1; // do calculation for it 
    }

    // endpoint of api:- creating newURL from BASIC_URL(above api) for conversion of selected country(countryCodes) by changing currencyCode at the end of BASE_URL
    let newUrl = `https://v6.exchangerate-api.com/v6/fe8a6fa101e42455d42ed8bf/latest/${fromCurr.value}`; 
                                                                                    //    fromCurr ^^ is <select name="from"> element fetched at beg but we need its value(selected from dropdown)                                                                           
    // get data from newURL (actually conversion) using fetch() {GET HTTP verb/method}
    let response = await fetch(newUrl); // fetch() return promise
    // console.log(response);
    let data  = await response.json(); // Another promise but usable data in json format.
   // console.log(data);    // for checking pattern of result (accordingly we retriev data below
    let rate = data.conversion_rates[`${toCurr.value}`];  // ye dega 'aik fromCurrValue' kita 'toCurrValue' k barabar hota hai
              //    ^^ this conversion_rates is seen when we console 'data' above and accordingly fetch the rate wrt fromCurr selected
   let finalAmount = amount * rate;    // hamay input amount ka nikalna hai joh aik ka kitna hota hai * with amount kitna enter kiya user ne
   
   // To display on browser
   msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
                  // e.g: 1 USD = 85.82... INR 
    
}



// sNo 3 : calling updateExchangeRate() doing actual work above
btn.addEventListener("click",  (event) =>{   // on click button do work below (display result)
    event.preventDefault();  //stop default behavior of btn (here inside form) like prevent referesh form on click(submitting form) ) 

    updateExchangeRate(); // <- call to method which does calculation above 
});



// when you load page (initially) , do calculation of default amount and default selected currencies
window.addEventListener("load", () =>{
    // call to method which does calculation above 
    updateExchangeRate();
});