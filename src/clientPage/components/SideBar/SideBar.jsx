import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiSearch,
    HiUsers,
    HiLightBulb,
    HiTag
  } from "react-icons/hi";
  
export default function SideBar() {
    const location = useLocation();
    const data = [
        {
            icon: <HiChartPie size='1.3rem'/>,
            label: "Dashboard",
            path: "/"
        }, 
        {
            icon: <HiTag size='1.3rem'/>,
            label: "Tags",
            path: "/tags"
        },
        {
            icon: <HiLightBulb size='1.4rem'/>,
            label: "Ideas",
            path: "/ideas"
        }, 
        {
            icon: <HiUsers size='1.2rem'/>,
            label: "User list",
            path: "/users/list"
        }
    ]

    const sideBarHeading = data.map((val, index) => {
        return (
            <li 
            data-drawer-hide="logo-sidebar"
            key={index}
                className={ 
                    val.path === location.pathname 
                    ? "bg-gray-100 dark:bg-gray-700" 
                    : ""
                }>
                <Link to={val.path}>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            { val.icon }
                        </svg>
                        <span className="ml-3">{ val.label }</span>
                    </a>
                </Link>
            </li>
        )
    }) 

    return( 
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 m h-screen pt-20 transition-transform md:invisible -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2">
                    {sideBarHeading}
                </ul>
            </div>
        </aside>
    )
}