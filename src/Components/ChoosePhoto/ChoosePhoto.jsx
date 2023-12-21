import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./ChoosePhoto.css";

const ChoosePhoto = ({ onFileChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    onFileChange(file);

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  return (
    <div className="upload mx-auto">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Selected"
          className="user-icon text-center mx-auto rounded-full"
          style={{ width: "80px", height: "80px" }}
        />
      ) : (
        <FaCamera className="user-icon text-center mx-auto" size={80} />
      )}

      <div className="round flex items-center justify-center">
        <input
          type="file"
          className=""
          onChange={handleFileChange}
          accept="image/*"
        />
        <FaCamera className="text-white" />
      </div>
    </div>
  );
};

export default ChoosePhoto;
