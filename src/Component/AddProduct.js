import React,{useEffect} from "react"
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AdddProduct} from "../store/slices/productSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
    const [productName, setProductName] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productCategory, setProductCategory] = React.useState("");
    const [productCompany, setProductCompany] = React.useState("");
    const [productUrl, setProductUrl] = React.useState("");
    const [refresh, setRefresh] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [favourite,setFavourite] = React.useState(false);
    const [error, setError] = React.useState(false);

    const addProduct = () => {
        if (!productName || !productPrice || !productCategory || !productCompany || !productUrl) {
            setError(true);
            return false;
        }
    }

    const userEmail = localStorage.getItem('user');
    // console.log("ankit.........",userEmail.email);
    // console.log("piysfdhgjfhgd.....",typeof(userEmail));


    const dispatch = useDispatch('');
    
    useEffect(()=>{
        // setEmail(localStorage.getItem(user.email));
        if (userEmail && typeof userEmail === 'string') {
            const parsedUserEmail = JSON.parse(userEmail);
    
            if (parsedUserEmail && parsedUserEmail.email) {
                setEmail(parsedUserEmail.email);
                // console.log(email);"
            }
        }
        if(refresh)
        {
            setProductName("");
            setProductPrice("");
            setProductCategory("");
            setProductUrl("");
            setProductCompany("");
        }
        setRefresh(false);
    },[refresh]);
    
    const data = useSelector((state)=> {
        const p = state.users[0]
        return p
    });
    // console.log("data>>>>",data);
    
    // console.log(data);
    
    
    
    
    
    const handleAddProduct = async () => {
        
        dispatch(AdddProduct({ name: productName, email:email, price: productPrice, category: productCategory, productUrl: productUrl, comapany: productCompany , favourite: favourite}));

        addProduct()
        // console.warn(" Data :::::::::::::>>>>", productName, productPrice, productCategory, productCompany);
        // let userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:8000/addProduct", {
            method: 'post',
            body: JSON.stringify({ name: productName, email:email, price: productPrice, category: productCategory, productUrl: productUrl, comapany: productCompany , favourite: favourite}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if(result)
        {
            setRefresh(true);
        }
        result = await result.json();
        console.warn("add>>>>>>>>>",result);
    }


    return (
        <div className="addProduct">
            <h1> Add Product</h1>
            <input onChange={(e) => setProductName(e.target.value)} value={productName}
                type="text" className="inputBox" placeholder="Enter Product Name"></input>
            {error && !productName && <span className="invalid-input">Enter valid Name</span>}
            <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice}
                type="text" className="inputBox" placeholder="Enter Product Price"></input>
            {error && !productPrice && <span className="invalid-input">Enter valid price</span>}
            <input onChange={(e) => setProductCategory(e.target.value)} value={productCategory}
                type="text" className="inputBox" placeholder="Enter Product Category"></input>
            {error && !productCategory && <span className="invalid-input">Enter valid category</span>}
            <input onChange={(e) => setProductUrl(e.target.value)} value={productUrl}
                type="text" name="name" className="inputBox" placeholder="Enter The Product Url"></input>
            {error && !productUrl && <span className="invalid-input">Enter valid url</span>}
            <input onChange={(e) => setProductCompany(e.target.value)} value={productCompany}
                type="text" className="inputBox" placeholder="Enter Product Company"></input>
            {error && !productCompany && <span className="invalid-input">Enter valid company</span>}
            <button onClick={handleAddProduct} className="appButton" type='button'>Add Product</button>
        </div>
    )
}

export default AddProduct;