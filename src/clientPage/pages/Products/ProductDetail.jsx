import { React, useEffect, useState} from "react";
import ProductImage from "./ProductImage";
import Rating from "../../components/Comments/Rating";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { useLocation } from "react-router-dom";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import queryString from "query-string";
import { addToCart, searchProduct, addToWishLish } from "../../../api/apiServices";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductDetail() {
  const [fav, setFav] = useState(false);
  const [product, setProduct] = useState({})
  const location = useLocation();
  const proID = queryString.parse(location.search);

  useEffect(() => {
    window.scrollTo({top:0, behavior: 'smooth'});
    searchProduct(proID._id)
    .then(res => {
      console.log(res.data.data)
      setProduct(res.data.data)
    })
  }, [])

  const slides = [
    "https://kontakt.az/wp-content/uploads/2022/09/iPhone-14-128-GB-Blue-1_png.webp",
    "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889.jpg",
    "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-bac-thumb-600x600.jpg",
    "https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-thumb-do-600x600.jpg",
  ]

  const handleAddToCart = (id, number) => {
		console.log(id)
		addToCart(id, number).then(res => {console.log(res)}).then(err => console.log(err))
	}

  const handleAddToWishLish = async (id, isLiked) => {
    addToWishLish(id, isLiked)
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  console.log(product.image)
  
  return (
    <div class="m-auto py-4 pt-10 relative">
      <div class="bg-white rounded-lg border">
        <div class="max-w-screen-xl px-6 py-4 mx-auto">
          <div class="grid lg:grid-cols-2 max-sm:grid justify-center items-center">
            <ProductImage slides={slides} slide={product.image} />
            <div class="max-md:pb-6 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product?.category?.categoryName}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.productName}</h1>
              <div class="flex mb-4">
                <div class="flex items-center text-yellow-300">
                  <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <span class="text-gray-500 ml-3 underline cursor-pointer hover:text-gray-900">1 Reviews</span>
                </div>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">{product.description}</p>
              <div class="flex justify-center items-center md:pb-4">
                <p className="grid">
                  <span class="title-font font-medium text-md text-gray-900 line-through"><FormatPrice price={product.price}/></span>
                  <span class="title-font font-medium text-2xl text-gray-900">{product.onSale === "" ? <FormatPrice price={product.price}/> : <FormatPrice price={product.price * (100 - product.onSale) / 100}/>}</span>
                </p>
                <button 
                  onClick={() => handleAddToCart(product._id, 1)}
                  class="flex ml-auto text-white transition-none bg-teal-500 hover:bg-teal-600 sm:mt-0 sm:w-auto sm:flex-shrink-0 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to cart</button>
                <span 
                  // onClick={() => handleAddToWishLish(product._id, setFav(!fav))}
                  
                  className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4">
                  <FavoriteBorderIcon />
                </span>
              </div>
            </div>
          </div>
          <Rating />
        </div>
      </div>
    </div>
  )
}