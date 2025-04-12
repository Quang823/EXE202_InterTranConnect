import React from "react";

const IMAGES = {
  logo: "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744350674/Logo-removebg-preview_ujkxvl.png",
  loginIllustration:
    "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744374180/premium_photo-1666997726532-33f671ca24c8_vygn2b.avif",
  clientAvatar1:
    "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270065/TIME-Studio-headshot-3-elements_qhvu8q_Circle_kqpkz1.jpg",
  clientAvatar2:
    "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270066/portrait-photography_1661_umiqms_Circle_f7orkt.jpg",
  talentAvatar1:
    "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744269752/Ban-sao-cua-Anh-Profile.04-scaled_vuvqel_Circle_rdve2p.jpg",
  talentAvatar2:
    "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270074/Anh-CV-chuyen-nghiep-min-1.jpg_exzc9m_Circle_miymix.webp",
  placeholder: "https://via.placeholder.com/150",
};

const Image = ({ src, className = "", alt = "", ...props }) => {
  const imageSrc = IMAGES[src] || src;

  if (!imageSrc) {
    console.warn(
      `Image source "${src}" not found in IMAGES. Using placeholder instead.`
    );
    return (
      <img
        src={IMAGES.placeholder}
        className={className}
        alt={alt || "Placeholder Image"}
        loading="lazy"
        {...props}
      />
    );
  }

  return (
    <img
      src={imageSrc}
      className={className}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
