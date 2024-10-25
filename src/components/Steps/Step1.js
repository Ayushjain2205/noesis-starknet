import React, { useState } from "react";

const Step1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileFormats = ["pdf", "csv", "png", " ", "xls", "audio", "video"];

  return (
    <div className="flex flex-col gap-[20px]">
      <h4 className="text-[32px]">About</h4>
      <div className="form-control w-2/3 ">
        <label className="label">
          <span className="label-text text-[16px]">
            What would you like to call your dataset?
          </span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered input-primary focus:outline-none"
          value="Space Imagery: Hubble's Finest"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[16px]">Select Dataset Format:</span>
        </label>
        <div className="flex flex-row gap-[20px]">
          {fileFormats.map((format, index) => (
            <div
              key={index}
              onClick={() => setSelectedFile(format)}
              data-tip={format}
              className={`flex w-max rounded-xl p-2 ring ring-indigo-50 cursor-pointer tooltip ${
                selectedFile === format ? "bg-[#B8B8FF70]" : ""
              }`}
            >
              <img
                src={`/icons/types/${format}.svg`}
                className="h-[60px]"
                alt={format}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="form-control w-2/3 ">
        <label className="label">
          <span className="label-text text-[16px]">
            Which category does your dataset belong to?
          </span>
        </label>
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered input-primary focus:outline-none"
          value="Astronomy"
        />
      </div>
      <div className="form-control w-2/3 ">
        <label className="label">
          <span className="label-text text-[16px]">
            Give your dataset a brief description:
          </span>
        </label>
        <textarea
          className="textarea textarea-primary focus:outline-none"
          placeholder="Description"
          value="A mesmerizing dataset featuring some of the best images captured by the Hubble Space Telescope. Dive into the depths of space, explore distant galaxies, nebulae, and star clusters that offer a glimpse of the vastness of our universe."
        ></textarea>
      </div>
      <div className="form-control w-2/3 relative mb-[20px]">
        <label className="label">
          <span className="label-text text-[16px]">Set a price:</span>
        </label>
        <input
          type="number"
          placeholder="Add Price"
          value={180}
          className="input input-bordered input-primary focus:outline-none pl-[40px]"
        />
        <img
          src="/icons/coin.svg"
          className="h-[25px] absolute left-2 top-[58px] transform -translate-y-1/2"
          alt=""
        />
      </div>
    </div>
  );
};

export default Step1;
