
import React from "react";
import css from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const { urls, alt_description } = image;

  return (
    <li className={css.card} onClick={onClick}>
      <img
        src={urls.small}
        alt={alt_description || "Image"}
        className={css.ImageCardItem}
      />
    </li>
  );
};

export default ImageCard;
