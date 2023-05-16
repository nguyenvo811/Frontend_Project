import React, { useEffect, useState } from "react";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { viewCart, deleteProductFromCart, addToCart, createOrder, decodeJwt, viewProfile, deleteCart } from "../../../api/apiServices";
import isEmail from "validator/lib/isEmail";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    if(decodeJwt()){
      console.log(decodeJwt().id)
      viewProfile(decodeJwt().id)
      .then(res => {
        console.log(res.data.data)
        setUser(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })

      viewCart()
      .then(res => {
        console.log(res.data.data)
        setProducts(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      return null
    }
  }, [])

  const handleRemoveProduct = async (id) => {
    deleteProductFromCart(id)
      .then(() => {
        setProducts(oldProducts => ({...oldProducts, cartItem: oldProducts.cartItem.filter(p => p.product._id != id)}));
      })
      .catch(error => {
        console.log(error)
      })
  }

  const upadateQuantity = (id, quantity, number) =>{
    const totalQuantity = quantity + number
    if(totalQuantity < 1){
      deleteProductFromCart(id)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      addToCart(id, number)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const [newAddress, setNewAddress] = useState("")
  const [note, setNote] = useState("")

  const [error, setError] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    note: ""
  });

  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setUser({...user, [name]: value})
    setError({...error, [name]: ""})
  }

  const handleNewAddress = (e) => {
    setNewAddress(e.target.value)
    setError({address: ""})
  }

  const handleNote = (e) => {
    setNote(e.target.value)
    setError({note: ""})
  }

  const validateAll = () => {
    let msg = {}
    if (user.email === "") {
      msg.email = "Email field is required!"
    } else if (!isEmail(user.email)) {
      msg.email = "Invalid email!"
		} if (user.fullName === "") {
      msg.fullName = "Full Name field is required!"
    } if (user.phoneNumber === "") {
      msg.phoneNumber = "Phone Number field is required!"
    } if (newAddress === "") {
      msg.address = "Address field is required!"
    } if (note === "") {
      msg.note = "Note field is required!"
    } 
    
    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const clearState = () => {
    setError({
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      note: ""
    })
  }

  const handleOrer = async () =>{
    const isValid = validateAll()
    if (isValid){
      const data = {
        user: user._id,
        orderDetail: products.cartItem,
        subTotal: products.subTotal,
        address: newAddress,
        note: note,
        status: "Preparing"
      }
      console.log(data)
      createOrder(data)
      .then(res => {
        console.log(res.data.data)
        deleteCart(products._id)
        .then(res => {
          clearState()
          console.log(res.data.data)
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }


  const productsCart = products?.cartItem?.map((val, index) => {
    return (
      <div key={index} class="pb-6 mb-2 border-b border-gray-400">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[160px] w-[200px] max-sm:w-[300px]" >
            <img className="w-full h-full object-cover rounded-lg" src={val.product.image} />
          </div> 
          <div className="grid w-full md:grid-cols-3 gap-2 break-all justify-between md:items-center">
            <div>
              <h2 className="max-sm:hidden">Product Name</h2>
              <span className="text-gray-700 max-sm:font-bold max-sm:text-lg">{val.product.productName}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Color</h2>
              <span className="text-gray-700">Describe in note</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Version</h2>
              <span className="text-gray-700">Describe in note</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Price</h2>
              <strong className="text-gray-700">{val.product.onSale === "" ? <FormatPrice price={val.product.price}/> : <FormatPrice price={val.product.price * (100 - val.product.onSale) / 100}/>}</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Status</h2>
              <strong className="text-gray-700">{val.product.quantity - val.quantity} products left</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Quantity</h2>
              <div className="md:mt-1 flex w-[90px] text-lg rounded-md border border-gray-400">
                <button 
                  className="h-6 w-6 leading-6 text-gray-900 transition hover:opacity-75"
                  type="button" 
                  onClick={() => upadateQuantity(val.product._id, val.quantity, -1)}>-</button>
                <input 
                  id="quantity"
                  className="h-6 w-10 border-r border-l border-gray-400 text-center [-moz-appearance:_textfield] md:text-sm max-sm:text-xs [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  type="numer"
                  onChange={e => (e.target.value)}
                  value={val.quantity}
                  />
                <button 
                  className="h-6 w-6 leading-6 text-gray-600 transition hover:opacity-75"
                  type="button" 
                  onClick={() => upadateQuantity(val.product._id, val.quantity, 1)}>+</button>
              </div>
            </div>
          </div>
          <IconButton
                aria-label="close"
                onClick={() => handleRemoveProduct(val.product._id)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </div>
      </div>
    )
  })
    

  return (
    <div className="m-auto py-4 pt-10 relative">
      <div class="bg-white rounded-lg border">
        <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2">
            <div class="py-8 border-b border-gray-400 lg:order-last lg:border-b-0 lg:border-l lg:py-16 lg:pl-10">
              <div class="block text-teal-600 lg:hidden">
              </div>

              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-900">Order's Information</h2>
                <span class="block w-10 h-1 bg-teal-500 rounded"></span>
                <div>
                  <form class="w-full">
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                        <div className="md:col-span-5">
                          <label htmlFor="fullName" className="font-medium text-gray-900">Full Name</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              name="fullName" 
                              id="fullName"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Your name"
                              value={user.fullName}
                              onChange={handleChangeInput}
                              />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.fullName}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="email" className="font-medium text-gray-900">Email Address</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="email" 
                              name="email" 
                              id="email" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="email@domain.com" 
                              value={user.email}
                              onChange={handleChangeInput}
                              />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.email}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="phoneNumber" className="font-medium text-gray-900">Phone number</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="text" 
                              name="phoneNumber" 
                              id="phoneNumber" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="+84123456789" 
                              value={user.phoneNumber}
                              onChange={handleChangeInput}
                              />                     
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.phoneNumber}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="address" className="font-medium text-gray-900">Address</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="text" 
                              name="address" 
                              id="address" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Address/Ward/District/City/Province" 
                              value={newAddress}
                              onChange={handleNewAddress}
                              />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.address}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="note" className="font-medium text-gray-900">Note</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <textarea
                              type="text" 
                              name="note" 
                              id="note" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Please describe your product color and version here!" 
                              value={note}
                              onChange={handleNote}
                              />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="md:col-span-5 mt-4 text-right">
                    <div class="inline-flex items-end">
                      <button 
                        onClick={() => handleOrer()}
                        class="w-full px-6 py-3 mt-1 text-sm font-bold tracking-wide text-white uppercase transition-none bg-teal-500 rounded hover:bg-teal-600 sm:mt-0 sm:w-auto sm:flex-shrink-0">Purchase</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-8 lg:py-16 lg:pr-10">
              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-900">Your Cart</h2>
                <span class="block w-10 h-1 bg-teal-500 rounded"></span>
                  {productsCart}
                <div class="grid justify-end items-center">
                  <span class="title-font font-medium text-2xl text-red-300">Total: <FormatPrice price={products.subTotal}/></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   