import {React, useState} from "react";
import Comments from "./Comments";
import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";

export default function Rating({ user, product }){
  console.log(user)

  const comment = user?.commentList?.map((val, index) => {
    return (
      <div class="grid items-center" key={index}>
          <div className="inline-flex gap-4">
            <div class="flex-shrink-0">
                <div class="inline-block relative">
                  <div class="relative w-16 h-16 rounded-full overflow-hidden">
                    <img class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={val.user.image} alt="Profile picture" />
                    <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                  </div>
                  <svg class="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"/>
                  </svg>
                </div>
            </div> 
            <div className="grid">
              <p class="flex items-baseline">
                <span class="text-gray-600 font-bold">{val.user.fullName}</span>
              </p>
              <div class="flex items-center mt-1 text-yellow-300">
                {Array(5)
                .fill(0)
                .map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button bf"
                        key={index}
                        className={index <= val.rating ? "text-yellow-300" : "text-gray-400"}
                        value={val.rating}
                        checked={index === val.rating}
                      >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                      </button>
                    );
                  })}
                <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{val.rating} out of 5</p>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                title="February 8th, 2022">{<FormatDateTimeDislay date={user.createdAt} />}</time></p>
            </div>
          </div>
          <div className="pb-4">
            <p class="mt-1">{val.comment}</p>
          </div>
        </div>
    )
  })

  return (
    <>
      <Comments product={product} />
      <div class="w-full">
        {comment}
      </div>
    </>
	)
}