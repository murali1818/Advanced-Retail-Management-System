import React, { useState, useEffect } from 'react';

const InvoiceGenerator = () => {
    const [products, setProducts] = useState([{ name: '', quantity: 0, price: 0 }]);
    
    const addProduct = () => {
        setProducts([...products, { name: '', quantity: 0, price: 0 }]);
    };

    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const calculateTotal = () => {
        return products.reduce((total, product) => total + product.quantity * product.price, 0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addProduct();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleSubmit = () => {
        alert('Invoice submitted successfully!');
    };

    const handlePrint = () => {
        alert('Invoice printed successfully!');
    };

    return (
        <div className="p-4 md:p-8 lg:p-12">
            <h2 className="text-2xl font-semibold mb-4">Invoice Generator</h2>
            {products.map((product, index) => (
                <div key={index} className="mb-4 border-b border-gray-300 pb-4 flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
                        <div>
                            <label className="block text-sm font-medium">Product Name:</label>
                            <input type="text" value={product.name} onChange={(e) => updateProduct(index, 'name', e.target.value)} className="mt-1 p-2 border rounded-lg w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Quantity:</label>
                            <input type="number" value={product.quantity} onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value))} className="mt-1 p-2 border rounded-lg w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Price:</label>
                            <input type="number" value={product.price} onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value))} className="mt-1 p-2 border rounded-lg w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Total:</label>
                            <span>${product.quantity * product.price}</span>
                        </div>
                    </div>
                    <button type="button" onClick={() => removeProduct(index)} className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 ml-4">Remove</button>
                </div>
            ))}
            <div className="mt-8 flex justify-between">
                <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Submit</button>
                <button onClick={handlePrint} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Print</button>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold">Total Price: ${calculateTotal()}</h3>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
