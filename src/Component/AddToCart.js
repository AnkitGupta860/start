import React, { useEffect } from "react";
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function AddToCart(){
    const [email,setEmail] = useState("");
    const [product,setProduct] = useState("");
    const [favIcon, setfavIcon] = useState(false);
    
    const productData = async () => {
        try{
        let result = await fetch(`http://localhost:8000/cart/${email}`);
        result = await result.json();
        console.log("result>>>>", result);
        setProduct(result);
        console.log("product",product);
        }
        catch(e){
            console.log(e);
        }
    }
    
    const handleRemoveCart = async (id) => {
        let result = await fetch(`http://localhost:8000/remove/${id}`,{
            mathod: 'Delete'
        });
        result = await result.json();
        if(result)
        {
            productData();
        }
    }


    
    const userEmail = localStorage.getItem('user');
    useEffect(() => {
        
        if (userEmail && typeof userEmail === 'string') {
            const parsedUserEmail = JSON.parse(userEmail);

            if (parsedUserEmail && parsedUserEmail.email) {
                setEmail(parsedUserEmail.email);
            }
        }
        

    },[])

    return(

        

        <div className="homeDiv">
            <button onClick={()=>{productData()}} className='buttonShow'>Show All My Cart Items</button>
            <div className='productContainer'>
            {Array.isArray(product) && product.length > 0 ? (
                product.map((item) => (
                    <div key={item._id} className='productCard'>
                <FavoriteBorderIcon className='fav' onClick={()=>{setfavIcon(!favIcon)}} style={{color: favIcon?'red':'black'}}/>
              <p>Product Name: {item.name}</p>
              <img src={item.productUrl} alt={`Product ${item.name}`} />
              <p>Price: {item.price}</p>
              <p>Category: {item.category}</p>
              <p>Company: {item.company}</p>
              <button className='updateButton RemoveFromCart' onClick={()=>{ handleRemoveCart(item._id) }}>Remove From Cart</button>
            </div>
          ))
        ) : (
          <p></p>
        )}
            </div>
        </div>
    )
}

export default AddToCart;