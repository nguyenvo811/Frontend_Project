import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar/SideBar";

export default function Layout() {
    return (
        <div className="">
            <Header />
            <SideBar />
            <div className="text-ellipsis flex items-start pt-16 max-md:pt-12">
                <div className="relative h-full w-full bg-gray-50 dark:bg-gray-900">
                    <div className="px-4 pt-6 max-md:pt-0">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}   