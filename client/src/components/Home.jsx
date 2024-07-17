import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const navItems = [
        { name: "Billing", imageUrl: "https://th.bing.com/th/id/OIP.JRNM4WKfX9XgTku5kQatBgHaE6?rs=1&pid=ImgDetMain", link: "/billing" },
        { name: "Price Analysis", imageUrl: "https://th.bing.com/th/id/OIP.CUfJQ99t_3c6090WyBnz6QHaDh?rs=1&pid=ImgDetMain", link: "/price-analysis" },
        { name: "Wholesalers", imageUrl: "https://cdn.shopify.com/s/files/1/1795/5419/files/570x400_Wholesale.jpg", link: "/wholesalers" },
        { name: "Trending Products", imageUrl: "https://th.bing.com/th/id/OIP.8uBciaVnWPhj3BqjYmH7wgAAAA?rs=1&pid=ImgDetMain", link: "/trending-products" },
        { name: "Forecasting", imageUrl: "https://learn.g2.com/hubfs/iStock-1165053279.jpg", link: "/forecasting" },
        { name: "Products", imageUrl: "https://th.bing.com/th/id/OIP.QSaVPNz2OoqbkFVcY8unnAHaEK?rs=1&pid=ImgDetMain", link: "/allproducts" }
    ];

    return (
        <div className="flex flex-col items-center justify-center p-14 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full max-w-screen-xl">
                {navItems.map((item, index) => (
                    <Link 
                        key={index} 
                        to={item.link}
                        className="relative border rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '250px' }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h2 className="text-white text-2xl font-bold">{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
