import {React, useState} from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

export default function ProductImage({slides}) {
  console.log("slide", slides)
	const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    console.log(newIndex)
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const thumbnails = slides?.map((val, index) => {
    return (
      <li key={index} 
        onClick={() => goToSlide(index)}
        className={`w-full flex justify-center items-center cursor-pointer duration-300 ${currentIndex === index? "border-2 border-blue-400" : ""}`}>
        <img src={val} className="py-1"/>
      </li>
    )
  })

  return (
		<div className='max-md:h-[480px] h-full w-[350px] m-auto max-sm:py-2 relative group'>
			<div
				style={{ backgroundImage: `url(${slides[currentIndex]})` }}
				className='w-full md:h-[400px] max-md:h-[350px] bg-center bg-cover duration-700'
			/>
			<div className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 duration-500 hover:bg-gray-300 text-gray-500 hover:text-white cursor-pointer'>
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full duration-500 hover:bg-gray-300 p-2 text-gray-500 hover:text-white cursor-pointer'>
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>
			<div className='flex justify-center py-4'>
				<ul className="flex">
					{thumbnails}
				</ul>
			</div>
		</div>
	)
}