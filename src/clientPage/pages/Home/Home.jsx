import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../Card/Card";

export default function Home() {
  return (
    <div>
      <Carousel />
      <div class="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
      	<div class="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
					<ul>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Online Stores</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Segmentation</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Marketing CRM</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
					</ul>
					<ul>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Online Stores</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Segmentation</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
						<li>
							<a href="#" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
								<div class="font-semibold">Marketing CRM</div>
								<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="py-4 w-full">
				<Card />
			</div>
		</div>
  )
}