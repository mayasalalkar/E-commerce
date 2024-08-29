import './AdminPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stock: ''
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createProduct(product);

            if (response.status === 201) {
                setSuccess('Product Added Successfully');
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    imageUrl: '',
                    category: '',
                    stock: ''
                });
            }
        } catch (error) {
            setError('Error Adding Product. Please Try Again.');
        }
    };

    return (
        <div className='admin-page'>
            <h2>Add New Product</h2>

            {success && <p className='success-message'>{success}</p>}
            {error && <p className='error-message'>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Product Name:</label>
                    <input
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <input
                        type='text'
                        name='description'
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='imageUrl'>Image URL:</label>
                    <input
                        type='text'
                        name='imageUrl'
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='category'>Category:</label>
                    <input
                        type='text'
                        name='category'
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='stock'>Stock:</label>
                    <input
                        type='number'
                        name='stock'
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type='submit'>Add Product</button>
            </form>
        </div>
    );
};

export default AdminPage;
