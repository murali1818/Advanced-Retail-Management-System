import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Products = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const analysisType = pathParts[1];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get('http://localhost:8000/myproduct', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-14 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full max-w-screen-xl">
                {products.map((product, index) => (
                    <Link 
                        key={index} 
                        to={`/${analysisType}/product/${product._id}`}
                        className="relative border rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h2 className="text-white text-2xl font-bold">{product.productname}</h2>
                        </div>
                    </Link>
                ))}
                
            </div>
        </div>
    );
};

export default Products;
