import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import SignInAndSignUpPage from "./SignInAndSignUpPage";
import { decodeJwt, getProducts, searchProducts, viewProfile } from "../../api/apiServices";
import slug from "../../resources/slug";
import logo from "../../assets/logo.png";
import WishListModal from "../pages/WishListModal";
import EditProfileModal from "../pages/EditProfileModal";


export default function Header() {
  
  const ref = useRef();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [profile, setProfile] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);
  const handleShow = () => setShowSearch(!showSearch);
  const [products, setProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [openFavModal, setOpenFavModal] = useState(false);

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }, [ref, handler]
    );
  }

  const handleFav = () => {
    setOpenFavModal(true)
  }

  useOnClickOutside(ref, () => setShowSearch(false)); 

  const subNavBarData = [
    {
      label: "Smart Phone",
      path: "/smart-phone"
    },
    {
      label: "Laptop",
      path: "/laptop"
    },
    {
      label: "Tablet",
      path: "/tablet"
    },
    {
      label: "Watch",
      path: "/watch"
    },
    {
      label: "",
      path: ""
    },
    {
      label: "",
      path: ""
    },
    {
      label: "",
      path: ""
    },
    {
      label: "",
      path: ""
    },
  ]

  const handleLogOut = () => {
    localStorage.clear();
    setIsSignIn(false)
  }

  useEffect(() => {
    if(decodeJwt()){
      viewProfile(decodeJwt().id)
        .then(res => {
          console.log(res.data.data)
          setProfile(res.data.data)
          setIsSignIn(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
    getProducts()
    .then(res => {
      console.log(res.data.data)
      setProduct(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  
  return (
    <div className="fixed top-0 z-50 w-full">
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <img src={logo} className="h-8 mr-3" alt="E-Smart Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">E-Smart</span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-between">
                <div className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <Link to='/cart'><FaShoppingCart size='1.5rem'/></Link>
                </div>
                <div className="ml-4">
                <WishListModal open={openFavModal} onClose={() => setOpenFavModal(false)}/>
                <EditProfileModal open={openModal} onClose={() => setOpenModal(false)} data={profile} setData={setProfile} />
                  { !isSignIn?
                    <SignInAndSignUpPage />
                    :
                    <>
                      <div>
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full object-cover object-center" src={profile.image}/>
                        </button>
                      </div>
                      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                        <div className="px-4 py-3" role="none">
                          <p className="text-sm text-gray-900 dark:text-white" role="none">
                            {profile.fullName}
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            {profile.email}
                          </p>
                        </div>
                        <ul className="py-1" role="none">
                          {
                            profile.role === "Admin" ? 
                            <li>
                              <a onClick={() => navigate("/products")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Admin Page</a>
                            </li> 
                            : 
                            <>
                              <li>
                                <a onClick={() => navigate('/orders')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Order Check</a>
                              </li>
                              <li>
                                <a onClick={() => setOpenFavModal(true)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Favorite list</a>
                              </li>
                            </>
                          }      
                          <li>
                            <a onClick={() => setOpenModal(true)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Edit profile</a>
                          </li>
                          <li>
                            <a onClick={() => handleLogOut()}
                              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                          </li>
                        </ul>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav class={`z-50 bg-gray-50 dark:bg-gray-700 ${showSearch? "border-b-none" : "border-b"} justify-center flex max-md:hidden`}>
        <div class="max-w-screen-xl px-4 py-4 mx-auto">
          <div class="flex items-center">
            <ul class="items-center flex flex-row font-medium mt-0  space-x-8 text-sm">
              <li>
                <a onClick={() => navigate("/")} class="cursor-pointer text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">Mobile</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">Tablet</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">Speaker</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">Smart Watch</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">Laptop</a>
              </li>
              <li>
                <a href="#" class="cursor-pointer text-gray-900 dark:text-white hover:underline">TV</a>
              </li>
              <li>                
                <FaSearch onClick={handleShow} className='cursor-pointer text-gray-400 hover:text-gray-500' size='1rem'/>
              </li>
            </ul>
          </div>
        </div> 
      </nav>
        <div ref={ref} className={`relative flex border-t-none border-b z-50 bg-gray-50 dark:bg-gray-700 justify-center ${showSearch? "" : "hidden"}`}>
          <div className="max-w-screen-xl px-4 py-2 mx-auto"> 
            <SearchBar placeholder={"Search Flowbite"} onClose={() => setShowSearch(false)} data={products}/>
          </div>
        </div>
    </div>
  )
}


const SearchBar = function({ placeholder, data, onClose }) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.productName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleClickDetails = useCallback(async(val) => {
		navigate({
			pathname: slug .DETAIL, 
			search: `?_id=${val._id}`
		})
	})
 
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearch = (val) => {
    setWordEntered(val.productName)
    onClose()
    clearInput()
  }

  // search

  const [word, setWord] = useState("");

  const search = () => {
    searchProducts()
    .then(res => {
      console.log(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const showData = filteredData.length !== 0 && (
    <div className="absolute w-[100%] rounded-md mt-2 flex-wrap overflow-x-auto bg-white border py-2 mx-auto">
      {filteredData.slice(0, 15).map((val, index) => {
        return (
          <div key={index} onClick={() => {return handleSearch(val), handleClickDetails(val)}}
            className="cursor-pointer font-normal py-1 flex hover:bg-gray-100">
            <button class="px-4 pl-2 text-sm sm:mt-0 sm:w-auto sm:flex-shrink-0">
                <FaSearch className='cursor-pointer text-gray-400' size='1rem'/>
            </button>
            <p>
              <a className="text-gray-500 overflow-hidden scroll-m-0">
                {val.productName}
              </a>
            </p>
          </div>
        )
      })}
    </div>
  )
   

  return (
    <div id="searchBar" name="searchBar" className={`relative flex dark:bg-gray-700 z-50 bg-gray-50 dark:bg-gray-700 justify-center`}>
      <div className="mx-auto"> 
        <div className="font-normal border bg-white border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center">
          <button class="w-full pl-2 text-sm sm:mt-0 sm:w-auto sm:flex-shrink-0">
            <FaSearch className='cursor-pointer text-gray-400 hover:text-gray-500' size='1rem'/>
          </button>
          <input
            type="text"
            id="search"
            value={wordEntered}
            placeholder={placeholder}
            onChange={handleFilter}
            class="sm:w-[400px] md:h-[40px] rounded-md border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm"
          />
          <button onClick={() => search({search: "i"})} type="submit" class="px-2 pl-2 items-center">
            <AiOutlineClose size="1rem" id="clearBtn" className={`text-gray-400 hover:text-gray-500 ${!wordEntered.length ? "hidden" : ""}`} onClick={clearInput} />
          </button>
        </div>
        {showData}
      </div>
    </div>
  );
}