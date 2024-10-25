import React, { useState } from "react";
import Layout from "../components/Layout";
import ImageAnnotator from "../components/Custom/ImageAnnotator";
import toast from "react-hot-toast";
import LabelCard from "../components/UI/LabelCard";
import datasetDetails from "../utils/datasets"; // Ensure this path matches your file structure

const Label = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://www.webbikeworld.com/wp-content/uploads/2014/03/Rear.jpg",
    "https://img.freepik.com/premium-photo/motorcycles-cars-road-costa-smeralda-sardinia-island-italy-summer-motorcyclist-driving-scooter-highway-europe-view-moped-motorway_250132-18181.jpg",
    "https://cdn.pixabay.com/video/2019/09/26/27260-362770008_tiny.jpg",
    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/11/highway-ap-1669716096.jpg",
  ];

  const notify = () => {
    toast((t) => (
      <div className="flex flex-row items-center gap-[5px]">
        ✅ You earned <b>2 coins</b>
        <img className="h-[25px]" src="/icons/coin.svg" alt="coin" />
      </div>
    ));
    nextImage();
  };

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Layout>
      <div className="flex gap-[200px]">
        <div className="flex flex-col gap-[25px]">
          {datasetDetails.map((dataset, index) => (
            <LabelCard
              key={index}
              type={dataset.type}
              title={dataset.title}
              fileCount={dataset.fileCount}
              coins={dataset.coins}
            />
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-2/3 gap-[10px] items-center mb-[20px]">
            <img className="h-[40px]" src="/icons/types/image.svg" alt="type" />
            <p className="text-[16px] font-[500]">
              Cars and bikes on road images
            </p>
            <div className="flex flex-row gap-[5px] items-center ml-auto">
              <img className="h-[40px]" src="/icons/coin.svg" alt="coin" />
              <span className="text-[20px] font-[800]">2</span>
            </div>
          </div>
          <div role="alert" className="alert w-2/3 bg-[#00000000] border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-primary shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Label all the cars and bikes in the images</span>
            <div>
              <button className="btn btn-sm btn-primary">View Sample</button>
            </div>
          </div>
          <div className="mt-[20px]">
            <ImageAnnotator
              key={images[imageIndex]}
              imageUrl={images[imageIndex]}
            />
          </div>

          <div className="flex flex-row mt-[550px] ml-[150px] w-[500px] justify-between">
            <button onClick={prevImage}>
              <img className="h-[60px]" src="/icons/arrow.svg" alt="Previous" />
            </button>
            <button
              className=" h-[60px] text-[20px] w-[150px] bg-green-500 bg-opacity-70 font-[500] rounded-xl"
              onClick={notify}
            >
              Submit
            </button>
            <button onClick={nextImage}>
              <img
                className="h-[60px] rotate-180"
                src="/icons/arrow.svg"
                alt="Next"
              />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Label;
