import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const Step2 = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li
      className="flex flex-row items-center gap-[10px] mt-[2px]"
      key={file.path}
    >
      <img src="/icons/file-uploaded.svg" className="h-[30px]" alt="" />
      {file.path} - {file.size} bytes
    </li>
  ));

  const [generatingImages, setGeneratingImages] = useState(false);
  const [generatedImagesCount, setGeneratedImagesCount] = useState(0);
  const totalImagesToGenerate = 5;

  const imageUrls = [
    "https://static.independent.co.uk/2023/11/07/13/Europe-Space_Telescope_40671.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycWE0ys4bXEEO9hpVJCh1tvEO7G6h1lTNWw&usqp=CAU",
    "https://cdn.sci.news/images/enlarge11/image_12338e-NGC-685.jpg",
    "https://ichef.bbci.co.uk/news/480/cpsprodpb/3666/production/_127262931_weic2216a.jpg.webp",
    "https://images.news9live.com/wp-content/uploads/2024/02/Hubble-NGC-1841.jpg",
  ];

  const handleGenerate = () => {
    setGeneratingImages(true);
    setGeneratedImagesCount(0); // Reset the generated images count

    // Simulate image generation with a delay
    const generateImages = async () => {
      for (let i = 0; i < totalImagesToGenerate; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setGeneratedImagesCount((prevCount) => prevCount + 1);
      }
      setGeneratingImages(false);
    };

    generateImages();
  };

  const handleRegenerate = () => {
    setGeneratedImagesCount(0); // Reset the generated images count
    handleGenerate();
  };

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div
        {...getRootProps({
          className:
            "dropzone flex flex-col items-center justify-center border border-dashed border-[#9381FF] rounded-xl h-[250px] w-[800px]",
        })}
      >
        <input {...getInputProps()} />
        <img src="/icons/file-upload.svg" className="h-[50px]" alt="" />
        {!acceptedFiles.length > 0 ? (
          <p>Drag 'n' drop some files here, or click to select files</p>
        ) : (
          <ul className="mt-[20px]">{files}</ul>
        )}
      </div>

      <div className="form-control w-[800px] ">
        <label className="label">
          <span className="flex flex-row gap-[7px] label-text text-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.41805 5.68841C1.11612 5.57679 0.802352 5.48898 0.479004 5.4272C0.455264 5.42268 0.431472 5.41829 0.407627 5.41403C0.191598 5.37548 0.191598 5.06561 0.407627 5.02707C0.431472 5.0228 0.455264 5.01841 0.479004 5.01389C0.802352 4.95212 1.11612 4.8643 1.41805 4.75268C1.59875 4.68588 1.77521 4.61057 1.94695 4.52719C3.1363 3.94987 4.09949 2.98667 4.67684 1.79732C4.7602 1.62558 4.83554 1.44912 4.90231 1.26843C5.01393 0.966489 5.10174 0.652724 5.16352 0.329376C5.16804 0.305636 5.17243 0.281845 5.17669 0.258C5.21524 0.0419705 5.52511 0.0419705 5.56365 0.258C5.56792 0.281845 5.57231 0.305636 5.57683 0.329376C5.63861 0.652724 5.72642 0.966489 5.83804 1.26843C5.90484 1.44912 5.98015 1.62558 6.06354 1.79732C6.64085 2.98667 7.60405 3.94987 8.79341 4.52719C8.96515 4.61057 9.1416 4.68588 9.32229 4.75268C9.62424 4.8643 9.93799 4.95212 10.2614 5.01389C10.2851 5.01841 10.3089 5.0228 10.3327 5.02707C10.5488 5.06561 10.5488 5.37548 10.3327 5.41403C10.3089 5.41829 10.2851 5.42268 10.2614 5.4272C9.93799 5.48898 9.62424 5.57679 9.32229 5.68841C9.1416 5.75522 8.96515 5.83052 8.79341 5.91391C7.60405 6.49123 6.64085 7.45442 6.06354 8.64379C5.98015 8.81553 5.90484 8.99198 5.83804 9.17266C5.72642 9.47461 5.63861 9.78837 5.57683 10.1117C5.57231 10.1354 5.56792 10.1593 5.56365 10.1831C5.52511 10.3991 5.21524 10.3991 5.17669 10.1831C5.17243 10.1593 5.16804 10.1354 5.16352 10.1117C5.10174 9.78837 5.01393 9.47461 4.90231 9.17266C4.83554 8.99198 4.7602 8.81553 4.67684 8.64379C4.09949 7.45442 3.1363 6.49123 1.94695 5.91391C1.77521 5.83052 1.59875 5.75522 1.41805 5.68841ZM8.63672 13.3649C8.42555 13.3079 8.21145 13.258 7.99464 13.2153C7.96074 13.2086 7.92681 13.2022 7.89282 13.1958L7.88251 13.1939L7.86857 13.1914C7.84712 13.1874 7.82356 13.1832 7.77646 13.1748L7.76 13.1719C7.41452 13.1065 7.41452 12.6118 7.76 12.5464L7.77646 12.5435C7.82356 12.535 7.84712 12.5308 7.86857 12.5269L7.88251 12.5244L7.89282 12.5225C7.92681 12.5161 7.96074 12.5096 7.99461 12.503C8.21141 12.4603 8.42555 12.4103 8.63672 12.3534C8.81709 12.3048 8.99533 12.2511 9.17127 12.1925C12.0178 11.2436 14.2577 9.00369 15.2066 6.15717C15.2652 5.98123 15.3189 5.80299 15.3675 5.62259C15.4244 5.41145 15.4744 5.19731 15.5171 4.98051C15.5237 4.94664 15.5302 4.91271 15.5366 4.87872L15.5385 4.86841L15.541 4.85447C15.5449 4.83327 15.5491 4.81001 15.5573 4.76395L15.5576 4.76236L15.5605 4.7459C15.6259 4.40042 16.1206 4.40042 16.186 4.7459L16.1889 4.76236C16.1973 4.80946 16.2015 4.83302 16.2055 4.85447L16.208 4.86841L16.2099 4.87872C16.2163 4.91271 16.2227 4.94664 16.2294 4.98051C16.2721 5.19735 16.322 5.41145 16.379 5.62259C16.4276 5.80299 16.4813 5.98123 16.5399 6.15717C17.4888 9.00369 19.7287 11.2436 22.5752 12.1925C22.7512 12.2511 22.9294 12.3048 23.1098 12.3534C23.3209 12.4103 23.5351 12.4603 23.7519 12.503C23.7858 12.5096 23.8197 12.5161 23.8537 12.5225L23.864 12.5244L23.8779 12.5269C23.8994 12.5308 23.9229 12.535 23.97 12.5435L23.9865 12.5464C24.332 12.6118 24.332 13.1065 23.9865 13.1719L23.97 13.1748L23.9202 13.1837L23.8779 13.1914L23.864 13.1939L23.8537 13.1958C23.8197 13.2022 23.7858 13.2086 23.7519 13.2153C23.5351 13.258 23.3209 13.3079 23.1098 13.3649C22.9294 13.4135 22.7512 13.4672 22.5752 13.5258C19.7287 14.4747 17.4888 16.7146 16.5399 19.5611C16.4813 19.7371 16.4276 19.9153 16.379 20.0957C16.322 20.3068 16.2721 20.521 16.2294 20.7378C16.2227 20.7717 16.2163 20.8056 16.2099 20.8396L16.208 20.8499L16.2055 20.8638L16.1998 20.8952L16.1893 20.9541L16.186 20.9724C16.1206 21.3179 15.6259 21.3179 15.5605 20.9724L15.5576 20.9559C15.5492 20.9089 15.5449 20.8852 15.541 20.8638L15.5385 20.8499L15.5366 20.8396C15.5302 20.8056 15.5237 20.7717 15.5171 20.7378C15.4744 20.5209 15.4244 20.3068 15.3675 20.0957C15.3189 19.9153 15.2652 19.7371 15.2066 19.5611C14.2577 16.7146 12.0178 14.4747 9.17127 13.5258C8.99533 13.4672 8.81709 13.4135 8.63672 13.3649ZM3.8724 19.9917C4.23552 20.0611 4.57948 20.1825 4.89636 20.3479C5.03732 20.4215 5.17291 20.5037 5.30241 20.5941C5.6633 20.8456 5.97709 21.1595 6.22872 21.5203C6.31901 21.6499 6.40132 21.7855 6.47487 21.9264C6.64031 22.2433 6.76167 22.5873 6.83102 22.9504C6.83389 22.9654 6.83669 22.9804 6.83936 22.9954C6.86371 23.1319 7.05942 23.1319 7.08377 22.9954C7.08644 22.9804 7.08921 22.9654 7.09207 22.9504C7.16146 22.5873 7.28281 22.2433 7.44822 21.9264C7.52181 21.7855 7.60411 21.6499 7.69441 21.5203C7.946 21.1595 8.25982 20.8456 8.62072 20.5941C8.75022 20.5037 8.88581 20.4215 9.02674 20.3479C9.34365 20.1825 9.6876 20.0611 10.0507 19.9917C10.0657 19.9889 10.0807 19.9861 10.0958 19.9834C10.2322 19.9591 10.2322 19.7633 10.0958 19.739C10.0807 19.7363 10.0657 19.7335 10.0507 19.7307C9.6876 19.6613 9.34365 19.5399 9.02674 19.3745C8.88581 19.3009 8.75022 19.2187 8.62072 19.1283C8.25982 18.8767 7.946 18.5629 7.69441 18.2021C7.60411 18.0725 7.52181 17.9369 7.44822 17.796C7.28281 17.4791 7.16146 17.1351 7.09207 16.772C7.08921 16.757 7.08644 16.742 7.08377 16.7269C7.05942 16.5905 6.86371 16.5905 6.83936 16.7269C6.83669 16.742 6.83389 16.757 6.83102 16.772C6.76167 17.1351 6.64031 17.4791 6.47487 17.796C6.40132 17.9369 6.31901 18.0725 6.22872 18.2021C5.97709 18.5629 5.6633 18.8767 5.30241 19.1283C5.17291 19.2187 5.03732 19.3009 4.89636 19.3745C4.57948 19.5399 4.23552 19.6613 3.8724 19.7307C3.85741 19.7335 3.84239 19.7363 3.8273 19.739C3.69089 19.7633 3.69089 19.9591 3.8273 19.9834C3.84239 19.9861 3.85741 19.9889 3.8724 19.9917Z"
                fill="#9481FF"
              />
            </svg>
            Generate Data
          </span>
        </label>
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered input-primary focus:outline-none"
          value="Image of space objects captured by a space telescope"
        />
      </div>
      <div className="form-control w-[800px] ">
        <label className="label">
          <span className="label-text text-[16px]">Quantity</span>
        </label>
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered input-primary focus:outline-none"
          value="5"
        />
      </div>
      <div className="flex flex-row w-[800px] gap-[10px]">
        {[...Array(generatedImagesCount)].map((_, index) => (
          <img
            key={index}
            className="h-[150px] w-[150px]"
            src={imageUrls[index % imageUrls.length]}
            alt=""
          />
        ))}
        {generatingImages && (
          <img
            className="h-[150px] w-[150px]"
            src="/animation/loader.svg"
            alt=""
          />
        )}
      </div>

      <div className="navigation-buttons flex flex-row gap-[50px] w-[800px]">
        <button
          className="btn btn-outline btn-primary rounded-xl"
          onClick={
            generatedImagesCount === totalImagesToGenerate
              ? handleRegenerate
              : handleGenerate
          }
          disabled={generatingImages}
        >
          {generatedImagesCount === totalImagesToGenerate
            ? "Regenerate"
            : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default Step2;
