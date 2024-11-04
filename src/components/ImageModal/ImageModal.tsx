

import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../types"; 

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  const { urls, alt_description, likes, user } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      ariaHideApp={false}
    >
      <div className={css.content}>
        <div className={css.description}>
          <p>Description: {alt_description || "No description available"}</p>
          <p>Author: {user.name}</p>
          <p>Likes: {likes}</p>
        </div>
        <img
          src={urls.regular}
          alt={alt_description || "Image"}
          className={css.image}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
