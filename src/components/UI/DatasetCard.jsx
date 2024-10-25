import React, { useState } from "react";
import Loader from "../Custom/Loader";
const DatasetCard = ({
  type,
  title,
  category,
  cleaned,
  labelled,
  description,
  price,
}) => {
  const images = [
    "https://www.webbikeworld.com/wp-content/uploads/2014/03/Rear.jpg",
    "https://img.freepik.com/premium-photo/motorcycles-cars-road-costa-smeralda-sardinia-island-italy-summer-motorcyclist-driving-scooter-highway-europe-view-moped-motorway_250132-18181.jpg",
    "https://cdn.pixabay.com/video/2019/09/26/27260-362770008_tiny.jpg",
    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/11/highway-ap-1669716096.jpg",
  ];

  const [showLoader, setShowLoader] = useState(false);

  const truncateDescription = (text, maxLength = 140) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const handleBuyClick = () => {
    setShowLoader(true);
    // Simulate a delay to show the loader
    setTimeout(() => {
      setShowLoader(false);
      // Add your logic for the buy operation here
    }, 5000); // Adjust the delay time as needed
  };

  return (
    <div
      className="relative flex flex-col gap-[10px] rounded-xl bg-white p-4 ring ring-indigo-50 w-[300px] h-[300px] group cursor-pointer"
      onClick={() => document.getElementById("my_modal_2").showModal()}
    >
      <div className="absolute inset-0 rounded-xl bg-secondary bg-opacity-0 group-hover:bg-opacity-25 transition-opacity duration-300 ease-in-out"></div>

      <div className="flex row items-center gap-[5px] h-[50px]">
        <img
          className="h-[40px] w-[40px]"
          src={`/icons/types/${type}.svg`}
          alt={type}
        />
        <p className="font-semibold text-[16px] leading-[25px]">{title}</p>
      </div>
      <div className="flex mt-[70px]">
        <div
          className={`flex flex-row justify-center w-[100px] rounded-xl border bg-indigo-500 bg-opacity-50 px-3 py-1.5 text-[10px] font-bold uppercase text-white`}
        >
          {category}
        </div>
        {cleaned && (
          <div className="flex flex-row justify-center w-[75px] rounded-xl border bg-green-500 bg-opacity-50 px-3 py-1.5 text-[10px] font-bold uppercase text-white">
            Cleaned
          </div>
        )}
        {labelled && (
          <div className="flex flex-row justify-center w-[75px] rounded-xl border bg-green-500 bg-opacity-50 px-3 py-1.5 text-[10px] font-bold uppercase text-white">
            Labelled
          </div>
        )}
      </div>
      <p className="text-[14px] text-opacity-60">
        {truncateDescription(description)}
      </p>
      <div className="absolute bottom-0 left-0 right-0 flex flex-row gap-[10px] items-center bg-indigo-500 px-4 py-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <img className="h-[36px] w-[36px]" src="/icons/coin.svg" alt="" />
        <span className="font-bold text-[22px] text-white">
          {new Intl.NumberFormat("en-US").format(price)}
        </span>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box h-[650px] min-w-[800px] relative flex flex-col gap-[10px] rounded-xl bg-white p-4 ring ring-indigo-50">
          <div className="flex row items-center gap-[5px] ">
            <img
              className="h-[96px] w-[96px]"
              src="/icons/types/video.svg"
              alt=""
            />
            <p className="font-semibold text-[32px] leading-[42px]">
              Cars and bikes on road images
            </p>
          </div>
          <div className="flex">
            <div className="flex flex-row justify-center w-[75px] rounded-xl border bg-primary px-3 py-1.5 text-[10px] font-bold uppercase text-white">
              10 Files
            </div>
            <div className="flex flex-row justify-center w-[100px] rounded-xl border bg-indigo-500 bg-opacity-50 px-3 py-1.5 text-[10px] font-bold uppercase text-white">
              Technology
            </div>
            <div className="flex flex-row justify-center w-[75px] rounded-xl border bg-green-500 bg-opacity-50 px-3 py-1.5 text-[10px] font-bold uppercase text-white">
              Cleaned
            </div>
          </div>
          <p>
            This dataset is a comprehensive collection of images capturing cars
            and bikes on various roads. It is designed for use in computer
            vision projects, traffic analysis studies, and development of
            autonomous vehicle systems. With images sourced from urban,
            suburban, and rural settings, it offers wide applicability for
            segmentation, object detection, and machine learning projects
            focusing on vehicular movement and traffic conditions.
          </p>
          <p className="font-[600] text-[16px] ">Sample files</p>
          <div className="carousel my-[20px] ">
            {images.map((image, index) => (
              <div key={index} className="carousel-item">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button
            className="mt-auto btn btn-block btn-primary btn-outline text-[16px]"
            onClick={handleBuyClick}
          >
            Buy for 1200{" "}
            <img className="h-[36px]" src="/icons/coin.svg" alt="" />{" "}
          </button>
          {showLoader && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-10">
              <Loader />
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DatasetCard;
