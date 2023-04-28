import {React, useState} from "react";
import Comments from "./Comments";
import a from "../../../assets/a.jpg"

export default function Rating(){
  return (
    <>
      <Comments />
      <div class="w-full">
        <div class="grid items-center">
          <div className="inline-flex gap-4">
            <div class="flex-shrink-0">
                <div class="inline-block relative">
                  <div class="relative w-16 h-16 rounded-full overflow-hidden">
                    <img class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={a} alt="Profile picture" />
                    <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                  </div>
                  <svg class="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"/>
                  </svg>
                </div>
            </div> 
            <div className="grid">
              <p class="flex items-baseline">
                <span class="text-gray-600 font-bold">Nguyen Vo</span>
                {/* <span class="ml-2 text-green-600 text-xs">Verified Buyer</span> */}
              </p>
              <div class="flex items-center mt-1 text-yellow-300">
                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">5 out of 5</p>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                title="February 8th, 2022">Apr. 27, 2023</time></p>
            </div>
          </div>
          <div className="pb-4">
            {/* <span class="font-bold">Sapien consequat eleifend!</span> */}
            <p class="mt-1">Nice product!</p>
          </div>
          {/* <div class="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
            <div class="flex items-center space-x-4">
              <button type="button"
                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Reply
              </button>
            </div>
            <div class="flex items-center">
              <button class="flex items-center ml-6">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
                <span class="ml-2">56</span>
              </button>
              <button class="flex items-center ml-4">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
                <span class="ml-2">10</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
	)
}