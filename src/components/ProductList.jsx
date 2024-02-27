import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const retrieveProducts = async ({ queryKey }) => {
    //const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
    const response = await axios.get(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`);
    return response.data;
}


const ProductList = () => {

    const [page, setPage] = useState(1);

    const { data: productsData, error, isLoading } = useQuery({
        queryKey: ["products", { page }],
        queryFn: retrieveProducts
    })
    if (isLoading) return <div>Fetching products....</div>
    if (error) return <div>An error is occured: {error.message}</div>
    return (
        <div className="flex flex-col items-center justify-center w-3/5">
            <h2 className="text-3xl my-2">Product List</h2>
            <ul className="flex flex-wrap justify-center items-center">
                {
                    productsData.data && productsData.data.map((product) => (
                        <li
                            className="flex flex-col items-center rounded-sm m-2"
                            key={product.id}
                        >
                            <img
                                className="object-cover h-64 w-96 rounded-sm"
                                src={product.thumbnail}
                            />
                            <p
                                className="text-xl my-2">
                                {product.title}
                            </p>
                        </li>
                    ))
                }
            </ul>
            <div className="flex">
                {
                    productsData.prev && <button
                        className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
                        onClick={() => setPage(productsData.prev)}
                    >Prev</button>
                }
                {
                    productsData.next && <button
                        className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
                        onClick={() => setPage(productsData.next)}
                    >Next</button>
                }
            </div>
        </div>
    );
}

export default ProductList;