import {React, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import slug from "../../../resources/slug";
import { addToCart, getProducts } from "../../../api/apiServices";

export default function Card() {
	const navigate = useNavigate();
	const [listProduct, setListProduct] = useState([]);
	const [rating, setRating] = useState([])

	useEffect(() => {
		getProducts()
			.then(res => {
				setListProduct(res.data.data.findProduct)
				setRating(res.data.data.findComment)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])

	const [showMore, setShowMore] = 
		useState({
			itemsToShow: 10,
	})

	const handleShowMore = () => {
		if (showMore.itemsToShow < listProduct.length) {
			setShowMore({itemsToShow: 10 + showMore.itemsToShow})
		} else {
			setShowMore({itemsToShow: 10})
		}
	}

	const handleClickDetails = (val) => {
		navigate({
			pathname: slug.DETAIL, 
			search: `?_id=${val._id}`
		})
	}

	const handleAddToCart = (id, number) => {
		console.log(id)
		addToCart(id, number)
		.then(res => {console.log(res)})
		.then(err => console.log(err))
	}

	const listRating = (product) => {
		const productRating = rating.find(p => p.product === product)
		return productRating?.subRating? productRating?.subRating.toFixed(1) : 0
	}

	const listData = listProduct.slice(0, showMore.itemsToShow)?.map((val, index) => {
		return (
			<div key={index} id={val._id} class="relative flex w-[250px] max-sm:w-[190px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md duration-500 transform sm:hover:-translate-y-2 sm:hover:shadow-xl">
				<a class="relative mx-3 mt-3 flex justify-center h-[200px] overflow-hidden rounded-xl" onClick={() => handleClickDetails(val)}>
					<img class="object-cover" src={val.image} alt="product image" />
					{
						val.onSale === 0?
							null 
							:
							<span class={`absolute top-0 left-0 m-2 rounded-full bg-gray-900 opacity-50 px-2 text-center text-sm font-medium text-white ${val.onSale === "" ? "hidden" : ""}`}>{val.onSale}% OFF</span>
					}	
				</a>
				<div class="mt-4 px-5 pb-5 cursor-pointer" >
					<a onClick={() => handleClickDetails(val)}>
						<h5 class="text-sm font-bold tracking-tight text-slate-900">{val.productName}</h5>
						<div class="flex items-center">
						{Array(5)
                  .fill(0)
                  .map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button bf"
                        key={index}
                        className={index <= listRating(val._id) ? "text-yellow-300" : "text-gray-400"}
                        value={listRating(val._id)}
                        checked={index === listRating(val._id)}
                      >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                      </button>
                    );
              })}
							<span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{listRating(val._id)}</span>
						</div>
					</a>
					<div onClick={() => handleClickDetails(val)}
						class="cursor-pointer mt-2 mb-5 flex items-center justify-between">
						<p className="max-sm:grid">
							<span class="text-xl font-bold text-red-400">{val.onSale === "" ? <FormatPrice price={val.price}/> : <FormatPrice price={val.price * (100 - val.onSale) / 100}/>}</span>
							<span class="text-sm sm:pl-2 text-slate-900 line-through">{val.onSale !== 0 ? <FormatPrice price={val.price}/> : ""}</span>
						</p>
					</div>
					<a onClick={() => handleAddToCart(val._id, 1)}
					 	class="cursor-pointer flex items-center justify-center rounded-md bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
						<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						Add to cart 
					</a>	
				</div>
			</div>
		)
	})

	return (
		<div className="w-full mx-auto">
			<div className="grid lg:grid-cols-5 md:grid-cols-3 max-md:grid-cols-3 max-sm:gap-1 gap-4 max-sm:grid-cols-2">
				{listData}
			</div>
			<div className="flex justify-center items-center duration-700">
				{
					listProduct.length > 10 ?
						<button type="button" className="rounded-md bg-gray-200 px-5 py-2.5 my-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={() => handleShowMore()}>
							{
								showMore.itemsToShow < listProduct.length ? 
								<svg class="animate-bounce w-6 h-6 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
									<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
								</svg> 
								: 
								"Show less"
							}
						</button>
					: null
				}
			</div>
		</div>
  )
}