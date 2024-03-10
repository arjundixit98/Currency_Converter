const dropdowns = document.querySelectorAll(".dropdown select");
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');



const addFlags = () => {
    
    //console.log(dropdown);
    for(let select of dropdowns)
    {
      for(currCode in countryList)
      {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(currCode==='USD' && select.name==='from')
        {
          newOption.selected = 'selected';
        }

        else if(currCode==='INR' && select.name==='to')
        {
          newOption.selected = 'selected';
        }
        select.append(newOption);

      }
      select.addEventListener('change',(evt)=> {
        updateFlag(evt.target);
      })
     
    }
}

const updateFlag = (element) => {
  //console.log(element);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
  //console.log(img);
}
const updateExchangeRate = async () => {
  let amount = document.querySelector('form input');
  let amtVal = amount.value;
  if(amtVal === "" || amtVal <1)
  {
    amtVal=1;
    amount.value=1;
  }
  //console.log(amtVal);
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  const URL = `${BASE_URL}/${from}.json`;
  //console.log(URL);
  let response = await fetch(URL);
  
  let data = await response.json();
  let rate = data[from][to];

  let finalAmount = (amtVal * rate).toFixed(3);
  msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
};

addFlags();

btn.addEventListener('click',  (evt)=> {
  evt.preventDefault();
  updateExchangeRate();

});

window.addEventListener("load",()=> {
  updateExchangeRate();
});

