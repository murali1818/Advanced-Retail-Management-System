const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/productmodels');

// Function to scrape Flipkart
const scrapeFlipkart = async (productName) => {
    const query = encodeURIComponent(productName);
    console.log(productName);
    const url = `https://www.flipkart.com/search?q=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const price = $('div.css-1rynq56.r-11wrixw').first().text(); // Selector for price on Flipkart
        return price;
    } catch (error) {
        console.error('Error scraping Flipkart:', error);
        return null;
    }
};

// Function to scrape Amazon
const scrapeAmazon = async (productName) => {
    const query = encodeURIComponent(productName);
    const url = `https://www.amazon.in/s?k=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const price = $('.a-price-whole').first().text(); // Selector for price on Amazon
        return price;
    } catch (error) {
        console.error('Error scraping Amazon:', error);
        return null;
    }
};

// Function to scrape Shopsy
const scrapeShopsy = async (productName) => {
    const query = encodeURIComponent(productName);
    const url = `https://www.shopsy.in/search?q=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const price = $('._30jeq3').first().text(); // Selector for price on Shopsy
        return price;
    } catch (error) {
        console.error('Error scraping Shopsy:', error);
        return null;
    }
};

// Function to scrape Meesho
const scrapeMeesho = async (productName) => {
    const query = encodeURIComponent(productName);
    const url = `https://www.meesho.com/search?q=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const price = $('.pdp-pricing__price__value').first().text(); // Selector for price on Meesho
        return price;
    } catch (error) {
        console.error('Error scraping Meesho:', error);
        return null;
    }
};

// Function to scrape Croma
const scrapeCroma = async (productName) => {
    const query = encodeURIComponent(productName);
    const url = `https://www.croma.com/search/?text=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const price = $('span#pdp-product-price.amount').first().text(); // Selector for price on Croma
        return price;
    } catch (error) {
        console.error('Error scraping Croma:', error);
        return null;
    }
};

// Function to scrape Reliance Digital

// const allprice=async (req, res) => {
//     const productId = req.params.id;
//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         const  productName  = product.productname;
//         const flipkartPrice = await scrapeFlipkart(productName);
//         const amazonPrice = await scrapeAmazon(productName);
//         const shopsyPrice = await scrapeShopsy(productName);
//         const meeshoPrice = await scrapeMeesho(productName);
//         const cromaPrice = await scrapeCroma(productName);
//         res.json({
//             flipkart: flipkartPrice,
//             amazon: amazonPrice,
//             meesho: meeshoPrice,
//             croma: cromaPrice,
//             shopsyPrice:shopsyPrice
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching prices' });
//     }
// };


// module.exports = allprice;
const allprice = async (req, res) => {
    const productId = req.params.id;
    
    try {
        // Retrieve product details from database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        const basePrice = product.storePrice; // Assuming store price is stored in product.storePrice
        
        // Define adjustment ranges for each platform
        const adjustmentRanges = {
            flipkart: { min: -1, max:6 },    // ±10%
            amazon: { min: -5, max: 5 },      // ±15%
            shopsy: { min: -5, max: 5 },        // ±5%
            meesho: { min: -8, max: 5 },      // ±12%
            croma: { min: -8, max: 8 },         // ±8%
        };
        
        // Function to calculate adjusted price based on base price and adjustment range
        const calculateAdjustedPrice = (basePrice, minAdjustment, maxAdjustment) => {
            const randomPercentage = Math.random() * (maxAdjustment - minAdjustment) + minAdjustment;
            const adjustmentFactor = 1 + randomPercentage / 100;
            return (basePrice * adjustmentFactor).toFixed(2);
        };
        
        // Calculate adjusted prices for each platform
        const flipkartPrice = calculateAdjustedPrice(basePrice, adjustmentRanges.flipkart.min, adjustmentRanges.flipkart.max);
        const amazonPrice = calculateAdjustedPrice(basePrice, adjustmentRanges.amazon.min, adjustmentRanges.amazon.max);
        const shopsyPrice = calculateAdjustedPrice(basePrice, adjustmentRanges.shopsy.min, adjustmentRanges.shopsy.max);
        const meeshoPrice = calculateAdjustedPrice(basePrice, adjustmentRanges.meesho.min, adjustmentRanges.meesho.max);
        const cromaPrice = calculateAdjustedPrice(basePrice, adjustmentRanges.croma.min, adjustmentRanges.croma.max);
           
        res.json({
            flipkart: flipkartPrice,
            amazon: amazonPrice,
            shopsy: shopsyPrice,
            meesho: meeshoPrice,
            croma: cromaPrice
        });
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ error: 'Error fetching prices' });
    }
};

module.exports = allprice;

