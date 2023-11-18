/* 
Filename: ComplexCode.js 
Description: This code simulates a complex financial portfolio management system.
*/

// Import required libraries
const axios = require('axios');
const moment = require('moment');

// Constants
const API_KEY = 'SECRET_API_KEY';
const BASE_URL = 'https://api.example.com/financialdata';

// Class for managing the portfolio
class PortfolioManager {
    constructor(name) {
        this.name = name;
        this.portfolio = [];
    }

    async fetchFinancialData() {
        try {
            const res = await axios.get(`${BASE_URL}/stocks`, {
                params: {
                    apiKey: API_KEY,
                    symbols: this.portfolio.join(','),
                    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                }
            });

            return res.data;
        } catch (error) {
            console.error('Error fetching financial data:', error.message);
            throw error;
        }
    }

    calculateReturns() {
        let returns = 0;

        for (const stock of this.portfolio) {
            const buyPrice = stock.buyPrice;
            const currentPrice = stock.currentPrice;
            const quantity = stock.quantity;

            returns += (currentPrice - buyPrice) * quantity;
        }

        return returns;
    }

    async rebalancePortfolio() {
        try {
            const financialData = await this.fetchFinancialData();

            for (const stock of this.portfolio) {
                const symbol = stock.symbol;

                if (financialData[symbol]) {
                    const currentPrice = financialData[symbol].currentPrice;
                    const recommendedPercentage = financialData[symbol].recommendedPercentage;
                    const currentPercentage = stock.quantity * currentPrice / this.calculatePortfolioValue();

                    if (currentPercentage < recommendedPercentage) {
                        const buyQuantity = Math.floor((recommendedPercentage * this.calculatePortfolioValue()) / currentPrice) - stock.quantity;

                        console.log(`Buying ${buyQuantity} shares of ${symbol} at $${currentPrice}`);

                        stock.quantity += buyQuantity;
                    } else if (currentPercentage > recommendedPercentage) {
                        const sellQuantity = stock.quantity - Math.floor((recommendedPercentage * this.calculatePortfolioValue()) / currentPrice);

                        console.log(`Selling ${sellQuantity} shares of ${symbol} at $${currentPrice}`);

                        stock.quantity -= sellQuantity;
                    }
                }
            }
        } catch (error) {
            console.error('Error rebalancing portfolio:', error.message);
            throw error;
        }
    }

    calculatePortfolioValue() {
        let value = 0;

        for (const stock of this.portfolio) {
            const currentPrice = stock.currentPrice;
            const quantity = stock.quantity;

            value += currentPrice * quantity;
        }

        return value;
    }
}

// Usage example
const myPortfolio = new PortfolioManager('My Awesome Portfolio');

myPortfolio.portfolio = [
    { symbol: 'AAPL', buyPrice: 150, currentPrice: 180, quantity: 10 },
    { symbol: 'GOOGL', buyPrice: 2500, currentPrice: 3000, quantity: 5 },
    { symbol: 'AMZN', buyPrice: 3000, currentPrice: 3500, quantity: 8 },
];

console.log(`Current portfolio value: $${myPortfolio.calculatePortfolioValue().toFixed(2)}`);
console.log(`Total returns: $${myPortfolio.calculateReturns().toFixed(2)}`);

await myPortfolio.rebalancePortfolio();

console.log('Rebalanced portfolio:');
console.log(myPortfolio.portfolio);

console.log(`Updated portfolio value: $${myPortfolio.calculatePortfolioValue().toFixed(2)}`);
console.log(`Updated total returns: $${myPortfolio.calculateReturns().toFixed(2)}`);