# Currency Converter
### Use: https://mushtaqumar.github.io/JS-Currency-Converter/

#### Project Overview:
This is a Currency Converter web application built using HTML, CSS, and JavaScript.
The application leverages two APIs to provide a seamless user experience:-

1) Flags API: Dynamically updates the flags of the selected countries based on the country code.
     -> "https://flagsapi.com/"
   
3) Exchange Rates API: Fetches the real-time exchange rates for currency conversion using the fetch() method based on currency-code of respective countries.
       -> Endpoint for fetch api used:- `https://v6.exchangerate-api.com/v6/fe8a6fa101e42455d42ed8bf/latest/${currencyCode}`

#### Features:-
-> User-friendly interface with a clean and responsive design.

-> Dropdown menus to select "From" and "To" currencies with country flags displayed dynamically.

-> Automatically updates the exchange rate and computes the converted amount in real time.

-> Displays conversion results interactively.

#### Core Functionality:
-> Flags API: Uses country codes to fetch and display corresponding flags.

-> Exchange Rates API: Retrieves the current exchange rates between the selected currencies.

-> Built-in logic to handle currency codes and dynamically populate dropdowns using JavaScript.

#### Tech Stack:

-> HTML & CSS: Structure and styling for the interface.
-> JavaScript: Dynamic updates, API integration, and interaction handling.
