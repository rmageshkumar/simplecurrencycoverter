//import { currencyCodes } from "./currency-codes";
const apiKey = "3d0931d113effa559bfb8957888"; // Dummy API Key please repalce with your own
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromCurrency = document.getElementById("from-currency-select");
const toCurrency = document.getElementById("to-currency-select");

currencyCodes.forEach((currency) => {
  let option = document.createElement("option");
  option.textContent = currency;
  option.value = currency;
  fromCurrency.appendChild(option);
});

currencyCodes.forEach((currency) => {
  let option = document.createElement("option");
  option.textContent = currency;
  option.value = currency;
  toCurrency.appendChild(option);
});

fromCurrency.value = "USD";
toCurrency.value = "GBP";

let covertCurrency = () => {
  const amount = document.getElementById("amount").value;
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - Unable to fetch data`);
      }
      return response.json();
    })
    .then((data) => {
      let fromExchangeRate = data.conversion_rates[fromCurrencyValue];
      let toExchangeRate = data.conversion_rates[toCurrencyValue];

      if (!fromExchangeRate || !toExchangeRate) {
        throw new Error("Invalid currency code selected");
      }

      const covertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      console.log("Converted Amount", covertedAmount);
      document.getElementById(
        "result"
      ).innerHTML = `${amount} ${fromCurrencyValue} = ${covertedAmount.toFixed(
        2
      )} ${toCurrencyValue}`;
      const conversionRate = covertedAmount.toFixed(2) / amount;
      console.log("Conversion Rate", conversionRate);
      document.getElementById(
        "conversion-rate"
      ).innerHTML = `1 ${fromCurrencyValue} = ${conversionRate.toFixed(
        2
      )} ${toCurrencyValue}`;
    }).catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while converting currencies. Please try again.");
    });
  // alert('all good');
};

document.querySelector("#convert").addEventListener("click", covertCurrency);
