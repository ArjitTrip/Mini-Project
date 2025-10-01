const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('Convert-btn'); // Match HTML ID exactly
const result = document.getElementById('result');

const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

// Load currency options into dropdowns
async function loadCurrencies() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.text = currency;
            fromCurrency.add(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.text = currency;
            toCurrency.add(option2);
        });

        // Set default selected currencies
        fromCurrency.value = "USD";
        toCurrency.value = "INR"; // You can change this default
    } catch (error) {
        console.error("Error loading currencies:", error);
        result.innerText = "Failed to load currency data.";
    }
}

loadCurrencies();

// Perform conversion on button click
convertBtn.addEventListener('click', async () => {
    const amountValue = parseFloat(amount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amountValue) || amountValue <= 0) {
        result.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        const rate = data.rates[to];

        if (!rate) {
            result.innerText = "Invalid currency selected.";
            return;
        }

        const convertedAmount = (amountValue * rate).toFixed(2);
        result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error("Error during conversion:", error);
        result.innerText = "Conversion failed. Please try again.";
    }
});
