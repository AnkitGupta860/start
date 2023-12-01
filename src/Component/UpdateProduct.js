import React from "react"
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";


const UpdateProduct = () => {
    const [productName, setProductName] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productCategory, setProductCategory] = React.useState("");
    const [productCompany, setProductCompany] = React.useState("");
    const [productUrl, setProductUrl] = React.useState("");
    const [error, setError] = React.useState(false);
    // const params = useParams();
    const navigate = useNavigate('');
    const location = useLocation('');
    // console.log(location.state);
    const id = location.state;
    console.log("type",typeof(id));

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:8000/get/${id.id}`);
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }
            result = await result.json();
            // console.warn("getProduct>>>>>",result);
            setProductName(result.name);
            setProductPrice(result.price);
            setProductCategory(result.category);
            setProductUrl(result.productUrl);
            setProductCompany(result.company);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }
    

    const addProduct = () => {
        if (!productName || !productPrice || !productCategory || !productCompany || !productUrl) {
            setError(true);
            return false;
        }
    }

    const handleUpdateProduct = async () => {
        addProduct();
        console.warn(productName,productPrice,productCategory,productUrl,productCompany);
        let result = await fetch(`http://localhost:8000/update/${id.id}`,{
            method: "put",
            body: JSON.stringify({ name: productName, price: productPrice, category: productCategory, productUrl: productUrl,  comapany: productCompany }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.warn("handleUpdate>>>",result);
        navigate('/');
    } 

    return(
        <div className="addProduct">
            <h1>Update Product</h1>
            <input onChange={(e) => setProductName(e.target.value)} value={productName}
                type="text" className="inputBox" placeholder="Enter Product Name"></input>
            {error && !productName && <span className="invalid-input">Enter valid Name</span>}
            <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice}
                type="text" className="inputBox" placeholder="Enter Product Price"></input>
            {error && !productPrice && <span className="invalid-input">Enter valid price</span>}
            <input onChange={(e) => setProductCategory(e.target.value)} value={productCategory}
                type="text" className="inputBox" placeholder="Enter Product Category"></input>
            {error && !productCategory && <span className="invalid-input">Enter valid category</span>}
            <input onChange={(e) => setProductUrl(e.target.value)} value ={productUrl}
                type="text" className="inputBox" placeholder="Enter Product Url"></input>
            {error && !productUrl && <span className="invalid-input">Enter valid Url</span>}
            <input onChange={(e) => setProductCompany(e.target.value)} value={productCompany}
                type="text" className="inputBox" placeholder="Enter Product Company"></input>
            {error && !productCompany && <span className="invalid-input">Enter valid company</span>}
            <button onClick={()=>{ handleUpdateProduct();}} className="appButton">Update</button>
        </div>
    )
}

export default UpdateProduct;