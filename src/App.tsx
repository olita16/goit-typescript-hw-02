
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import { Image } from "./types";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "05TZIXUxamP4moDw44XLVh1oCepSyL-MdpSIIl8RJEo";


const fetchImagesFromApi = async (
  searchQuery: string,
  page: number
): Promise<Image[]> => {
  const response = await fetch(
    `${API_URL}?query=${searchQuery}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images.");
  }

  const data = await response.json();
  if (data.results.length === 0) {
    throw new Error("No results found.");
  }

  return data.results;
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const newImages = await fetchImagesFromApi(query, page);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message, {
            className: "toast-error",
          });
        } else {
          toast.error("An unknown error occurred.", {
            className: "toast-error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </div>
  );
};

export default App;
