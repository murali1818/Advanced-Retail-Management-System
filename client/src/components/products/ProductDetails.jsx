/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [competitorsPrices, setCompetitorsPrices] = useState(null);
  //const [wholesellers, setwholesellers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const analysisType = pathParts[1];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details
        const token = Cookies.get('token');
        const productResponse = await axios.get(`http://localhost:8000/getproduct/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(productResponse.data.product);
        setProduct(productResponse.data.product);
        

        // Fetch competitors' prices
        if (analysisType === 'price-analysis'){
        const competitorsResponse = await axios.get(`http://localhost:8000/getprice/${id}`);
        setCompetitorsPrices(competitorsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const wholesalers = [
    { name: 'Globalsources', url: 'https://www.globalsources.com/searchList/products?keyWord=', logo: 'https://s.globalsources.com/IMAGES//website/image/home/ic_logo_gs.svg' },
    { name: 'ebay', url: 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=', logo: 'https://th.bing.com/th/id/R.1a5ef8096a24048b03a92d337630a89e?rik=PZz8TcD%2bWGXBhQ&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f12%2fEbay-Logo-PNG.png&ehk=UIgG%2fbPePvzfsQmJlPOZkgY%2fcGl8wQOb8dFMYnYvluQ%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'industrybuying', url: 'https://www.industrybuying.com/search/?q=', logo: 'https://www.industrybuying.com/static/images/industry-buying-white-logo.png' },
    { name: 'indiamart', url: 'https://dir.indiamart.com/search.mp?ss=', logo: 'https://digitalmarketingdeal.com/blog/wp-content/uploads/2023/12/download-15.png' },
    { name: 'tradeindia', url: 'https://www.tradeindia.com/search.html?keyword=', logo: 'https://digitalmarketingdeal.com/blog/wp-content/uploads/2023/12/download-20.jpg' },
    { name: 'exportersindia', url: 'https://www.exportersindia.com/search.php?srch_catg_ty=Prod&term=', logo: 'https://th.bing.com/th/id/OIP.dMpPKsoqO3psuxCmfuC9NAHaCD?w=332&h=95&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
   
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {product && (
                <div className="bg-gray-200 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <img src={product.image} alt={product.productname} className="max-w-full h-auto rounded-lg mb-4"  style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '250px' ,width:"400px" }} />

                        </div>
                        <div className="w-full md:w-1/2 sm:pl-4">
                            <h2 className="text-2xl font-bold mb-4">{product.productname}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <p className="text-gray-700 mb-2">Category: {product.category}</p>
                            <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
                            <p className="text-gray-700 mb-2">Manufacturer: {product.manufacturer}</p>
                            <div className="flex items-center">
                                <p className="text-2xl font-bold text-gray-900 mr-2">₹{product.storePrice.toLocaleString()}</p>
                                
                            </div>
                            <p className="text-gray-700 mb-2">Available Sizes: {product.size}</p>
                            <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
                        </div>
                    </div>
                </div>
            )}
      {analysisType === 'price-analysis' && competitorsPrices && (
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Competitors' Prices</h3>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span className="font-semibold">Flipkart:</span>
              <span>₹{competitorsPrices.flipkart}</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="font-semibold">Amazon:</span>
              <span>₹{competitorsPrices.amazon}</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="font-semibold">Shopsy:</span>
              <span>₹{competitorsPrices.shopsy}</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="font-semibold">Meesho:</span>
              <span>₹{competitorsPrices.meesho}</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="font-semibold">Croma:</span>
              <span>₹{competitorsPrices.croma}</span>
            </li>
          </ul>
        </div>
      )}
       {analysisType === 'wholesalers' && (
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Wholesalers</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wholesalers.map((wholesaler, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 transition"  >
                <a href={`${wholesaler.url}${product.productname}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <img src={wholesaler.logo} alt={wholesaler.name} className="w-10 h-10 mr-4" />
                  <span className="text-black-500 font-bold hover:underline">{wholesaler.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
