import React,{useState,useEffect} from 'react'
import '../styles.css'

import Base from './Base'
import Card from './Card'
import { getAllProducts } from "./helper/coreapicalls";

// import { API } from '../backend.js'

export default function Home(){

        const [products, setProducts] = useState([]);
        const [error,setError]=useState(false)
      
        const preloadProducts = () => {
          getAllProducts().then(data => {
            if (data.error) {
              setError(data.error)
            } else {
              setProducts(data.products);
              setError("")
            }
          });
        };
      
        useEffect(() => {
          preloadProducts();
        }, []);

    return(
        <Base title="Home Page" description = "Grab your favourite tee soon!!">
             <div className="row text-center">
              <div className = "row">
                {products.map((prod,index)=>{
                  return(
                    <div key={index} className="col-4 mb-4">
                      <Card product={prod}/>
                    </div>
                  )
                })}
              </div>
             </div>
        </Base>

    )
}