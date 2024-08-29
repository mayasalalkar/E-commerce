import {Link}from"react-router-dom";
import './ProductCard.css' 




const productCard =({product})=>{
    return(
        <div className="product-card">
            <Link to ={`/product/${product._id}`}>
            <img src={product.imageurl} alt={product.name}className='product-image'/>
            </Link>
            <div className="product-info">
                <h3>{product.name}</h3>
               
                <p>${product.price}</p>
            </div>
        </div>
    );
    };
    export default  productCard;

