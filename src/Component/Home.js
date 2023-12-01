import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

function Home() {
    const [product, setProduct] = useState("");
    const [email, setEmail] = useState("");
    const [product1, setProduct1] = useState("");
    const [fav, setFav] = useState("");

    const navigate = useNavigate('');
    const [favIcon, setfavIcon] = useState(false);
    const [cartName, setCartName] = useState("Add To Cart");


    const Product = useSelector((state) => {
        return state.product;
    })


    console.warn("getProduct>>>>>", product);
    const addDB = async (productDetails) => {
        try {
            const result = await fetch("http://localhost:8000/cart", {
                method: 'post',
                body: JSON.stringify({
                    name: productDetails.name,
                    email: productDetails.email,
                    price: productDetails.price,
                    category: productDetails.category,
                    productUrl: productDetails.productUrl,
                    company: productDetails.company
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }

            // console.log("Product added to the database:", productDetails);
        } catch (error) {
            console.error("Error adding to database:", error);
        }
    }


    const productData = async () => {
        try {
            let result = await fetch(`http://localhost:8000/Home/${email}`);
            result = await result.json();
            // console.log("result>>>>", result);
            setProduct(result);
            console.log("product", product);
        }
        catch (e) {
            console.log(e);
        }
    }


    const userEmail = localStorage.getItem('user');

    useEffect(() => {
        // productData();
        if (userEmail && typeof userEmail === 'string') {
            const parsedUserEmail = JSON.parse(userEmail);

            if (parsedUserEmail && parsedUserEmail.email) {
                setEmail(parsedUserEmail.email);
            }
        }

    }, [product])

    const handleUpdateClick = (id) => {
        navigate("/updateProduct", { state: { id } });
    }


    const handleCart = async (id) => {
        try {
            const result = await fetch(`http://localhost:8000/get/${id}`);
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }

            const productDetails = await result.json();
            await addDB(productDetails);
            setCartName("Added");
        } catch (error) {
            console.error("Error handling cart:", error);
        }
    }



    const handleFavourite = async (id) => {
        try {
            let res1 = await axios(`http://localhost:8000/favget/${id}`,{
                method: "get"
            });
            // const FavGet = await res1.text();
            const res = await res1.data;
            console.log("res1>>", res);
            // const favGetJson = FavGet ? JSON.parse(FavGet) : null;
    
            if (res.data === 'Records Found') {
                
                let res2 = await fetch(`http://localhost:8000/favdel/${id}`, {
                    method: 'Delete'
                });
                res2 = await res2.json();
                setProduct(prevProducts =>
                    prevProducts.map((item) =>
                        item._id === id ? { ...item, favourite: false } : item
                    )
                );
                console.log("Product removed from favorites:", res2);
            } else {
                const result = await fetch(`http://localhost:8000/get/${id}`);
                if (!result.ok) {
                    throw new Error(`HTTP error! Status: ${result.status}`);
                }
    
                const productDetails = await result.json();
    
                setProduct(prevProducts =>
                    prevProducts.map((item) =>
                        item._id === id ? { ...item, favourite: true } : item
                    )
                );
    
                await fetch("http://localhost:8000/favourite", {
                    method: 'post',
                    body: JSON.stringify({
                        name: productDetails.name,
                        email: productDetails.email,
                        price: productDetails.price,
                        category: productDetails.category,
                        productUrl: productDetails.productUrl,
                        company: productDetails.company,
                        favourite: true,
                        productId: productDetails._id
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
    
                console.log("Product added to favorites:", productDetails);
            }
        } catch (error) {
            console.error("Error handling favorite:", error);
        }
    };
    

    // console.log("item", product.favourite);



    return (
        <div className='homeDiv'>
            <button onClick={() => productData()} className='buttonShow'>Show All The Products</button>
            <div className='productContainer'>
                {Array.isArray(product) && product.length > 0 ? (
                    product.map((item) => (
                        <div key={item._id} className='productCard'>
                            <FavoriteBorderIcon className='fav' onClick={() => { handleFavourite(item._id) }} style={{ color: item.favourite ? 'red' : 'black' }} />
                            <p>Product Name: {item.name}</p>
                            <img src={item.productUrl} alt={`Product ${item.name}`} />
                            <p>Price: {item.price}</p>
                            <p>Category: {item.category}</p>
                            <p>Company: {item.company}</p>
                            <button onClick={() => handleUpdateClick(item._id)} className='updateButton'>
                                Update
                            </button>
                            <span><button className='updateButton' onClick={() => { handleCart(item._id) }}>{cartName}</button></span>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    )
}

export default Home;