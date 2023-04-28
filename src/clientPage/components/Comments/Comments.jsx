import {React, useState} from "react";

export default function Comments() {
	const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const StarRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button bf"
              key={index}
              className={index <=((rating && hover) || hover) ? "text-yellow-300" : "text-gray-400"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
							onDoubleClick={() => {
							setRating(0);
							setHover(0);
							}}
            >
              <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </button>
          );
        })}
      </div>
    );
  };
	return (
		<div className="border-t-2">
			<div className="inline-flex gap-4 pt-4">
				<div class="flex-shrink-0">
					<div class="inline-block relative">
						<div class="relative w-16 h-16 rounded-full overflow-hidden">
							<img class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="https://picsum.photos/id/646/200/200" alt="Profile picture" />
							<div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
						</div>
						<svg class="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"/>
						</svg>
					</div>
				</div> 
				<div className="grid">
					<p class="flex items-baseline">
						<span class="text-gray-600 font-bold">Mary T.</span>
						<span class="ml-2 text-green-600 text-xs">Verified Buyer</span>
					</p>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
						title="February 8th, 2022">Feb. 8, 2022</time></p>
				</div>
			</div>
			<StarRating />
			<div class="flex w-full items-center justify-center ">
				<form class="mb-6 w-full grid">
					<div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
							<label for="comment" class="sr-only">Your comment</label>
							<textarea id="comment" rows="6"
								class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
								placeholder="Write a comment..." required></textarea>
					</div>
					<div className="flex justify-end items-center">
						<button type="submit"
							class="py-2.5 px-4 text-xs font-medium text-center text-white bg-teal-500 rounded-lg focus:ring-4 focus:ring-primary-400 hover:bg-primary-300">
							Post comment
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}