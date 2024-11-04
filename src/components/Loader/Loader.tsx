
import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
    <MagnifyingGlass
      height={80}
      width={80}
      color="#eb1563"
      ariaLabel="loading"
    />
  </div>
  );
};

export default Loader;
