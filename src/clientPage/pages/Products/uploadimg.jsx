import React, {useState, useEffect} from 'react';
import { uploadImage } from '../../../assets/Library/uploadFile';
import axios from 'axios';
import { getProducts } from '../../../api/apiServices';

const Uploadimg = () => {
    const [file, setFile] = useState(null);
    const [listUrl, setListUrl] = useState([]);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [getData, setGetData] = useState("")
    const handleSubmit = async () => {
    
        const data = {
            productName: productName,
            description: description,
            price: price,
            category: category,
            quantity: quantity,
            image: []
        }
        for (let index = 0; index < file.length; index++) {
            const element = file[index];
            const upfile = await uploadImage(element);
            data.image.push(upfile.data);
            setListUrl(val=>[...val, upfile.data])
            
        }

       
        console.log(data)
        return await axios.post("http://localhost:8081/products/addproduct", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getProducts()
        .then(res => {setGetData(res.data)
        console.log("sss", res.data)})
        .catch(err => console.log(err))
    }, [])
    const a = [1,2,3]
    const printData = Object.values(getData).map((val, index) => {
        
        return (
            <div key={index}>
                <p>{val.productName}</p>
                {val.image?.map((img)=>{
                    return (<img className=' max-w-sm' src={img} />)
                })}
            </div>
        )
    })

    return (
        <div className='pt-10'>
            <input type='file' multiple onChange={(e) => setFile(e.target.files)}/>
            <input type='text' onChange={(e) => setDescription(e.target.value)}/>
            <input type='text' onChange={(e) => setProductName(e.target.value)}/>
            <input type='text' onChange={(e) => setPrice(e.target.value)}/>
            <h1>quantity</h1>
            <input type='text' onChange={(e) => setQuantity(e.target.value)}/>
            <h1>category</h1>
            <input type='text' onChange={(e) => setCategory(e.target.value)}/>
            <button onClick={handleSubmit}>confirm</button>
            {printData}
        </div>
    );
}

export default Uploadimg;
