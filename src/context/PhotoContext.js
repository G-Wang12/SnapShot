import React, { createContext, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(20);
  const [currPage, setCurrPage] = useState(1);
  const [currQuery, setCurrQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useLayoutEffect(() => {
    fetchData();
  }, [perPage, currPage, currQuery]);

  const onPageChanged = ({ perPage, currPage }) => {
    setCurrPage(currPage);
    setPerPage(perPage);
  };

  const runSearch = (query) => {
    setCurrQuery(query);
  };

  const fetchData = () => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${currQuery}&per_page=${perPage}&page=${currPage}&format=json&nojsoncallback=1`
      )
      .then((response) => {
        setImages(response.data.photos.photo);
        setLoading(false);
        setTotalPages(response.data.photos.pages);
      })
      .catch((error) => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };
  return (
    <PhotoContext.Provider
      value={{
        images,
        loading,
        runSearch,
        perPage,
        currPage,
        totalPages,
        onPageChanged,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
