import React, { useContext } from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import Pagination from "./Pagination";
import PageSizeSelection from "./PageSizeSelection";
import { PhotoContext } from "../context/PhotoContext";

const Gallery = (props) => {
  const { perPage, currPage, totalPages, onPageChanged, changePerPage } =
    useContext(PhotoContext);

  const PageChanged = (index) => {
    onPageChanged(index);
  };
  const handlePageAmount = (selectedOption) => {
    changePerPage(selectedOption)
  }
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
      <div className="pageOptions-containter">
        <PageSizeSelection handlePageAmount={handlePageAmount} />
        <Pagination
          totalPages={totalPages}
          onPageChanged={PageChanged}
          selectedPage={currPage}
        />
      </div>
      
      <ul>{images}</ul>
      {noImages}
    </div>
  );
};

export default Gallery;
