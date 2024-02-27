import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const AddProduct = () => {

    const queryClient = useQueryClient();

    const [state, setState] = useState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: ""

    });

    const mutation = useMutation({
        mutationFn: (newProduct) => axios.post("http://localhost:3000/products", newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state)
        const newData = { ...state, id: crypto.randomUUID().toString() };
        mutation.mutate(newData);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type == "number" ? event.target.valueAsNumber : event.target.value;
        setState({
            ...state,
            [name]: value
        });
    }

    if (mutation.isLoading) return <div>Submitting......</div>
    if (mutation.isError) return <div>Ann error occured....{mutation.error}</div>

    return (
        <div className='m-2 p-2 bg-gray-100 w-1/5 h-1/2'>
            <h2 className='flex flex-col'>Add Product</h2>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                {
                    (mutation.isSuccess) ? <span>Products Added</span> : ""
                }
                <input
                    type="text"
                    name='title'
                    value={state.title}
                    className='m-2 p-2 border rounded'
                    placeholder='Enter a product title'
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name='description'
                    value={state.description}
                    className='m-2 p-2 border rounded'
                    placeholder='Enter a product description'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name='price'
                    value={state.price}
                    className='m-2 p-2 border rounded'
                    placeholder='Enter a product price'
                    onChange={handleChange}
                />
                {/* <input
                    type="text"
                    value={state.rating}
                    className='m-2 p-2 border rounded'
                    placeholder='Enter a product rating'
                    onChange={handleChange}
                /> */}
                <input
                    type="text"
                    name='thumbnail'
                    value={state.thumbnail}
                    className='m-2 p-2 border rounded'
                    placeholder='Enter a product thumbnail'
                    onChange={handleChange}
                />
                <button type='submit'
                    className='bg-black m-auto text-white text-xl p-1 rounded-md'>Add</button>
            </form>
        </div>
    );
};

export default AddProduct;