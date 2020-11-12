import React,{useState,useEffect} from 'react'
import '../styles.css'

import Base from './Base'
import Card from './Card'
import { listProducts } from "../admin/helper/adminapicall";

// import { API } from '../backend.js'

export default function Home(){

        const [products, setProducts] = useState([]);
        const [error,setError]=useState("")
      
        const preload = () => {
          listProducts().then(data => {
            if (data.error) {
              setError(data.error)
            } else {
              setProducts(data.products);
              setError("")
            }
          });
        };
      
        useEffect(() => {
          preload();
        }, []);

    return(
        <Base title="Home Page" description = "Grab your favourite tee soon!!">
             <div className="row text-center">
            {products.map((prod,index)=>{
                return(
                        <div key={index} className="col-4">
                            <Card product={prod}/>
                        </div>
                )
            })}
             </div>
            
        </Base>

    )
}