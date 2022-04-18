import React, { useContext } from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import Pagination from "./Pagination";
import { PhotoContext } from "../context/PhotoContext";

const Gallery = (props) => {
  const { perPage, currPage, onPageChanged } = useContext(PhotoContext);

  const PageChanged = (index) => {
    // console.log(perPage);
    onPageChanged({ perPage, currPage: index });
  };

  const results = props.data;
  let images;
  let noImages;
  // map variables to each item in fetched image array and return image component
  if (results.length > 0) {
    images = results.map((image) => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      return <Image url={url} key={id} alt={title} />;
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <Pagination onPageChanged={PageChanged} />
      <ul>{images}</ul>
      {noImages}
    </div>
  );
};

export default Gallery;
