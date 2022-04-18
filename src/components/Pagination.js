import React, { useEffect, useState, useLayoutEffect } from "react";
import cx from "classnames";

const Pagination = ({ pageNumber = 10, onPageChanged = () => null }) => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  useLayoutEffect(() => {
    onPageChanged(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    var val = [];
    for (var i = 1; i <= pageNumber; i++) {
      val.push(i);
    }
    setPages(val);
  }, []);

  const onClickIndex = (index) => {
    setSelectedPage(index);
  };

  const onClickPrevious = () => {
    if (selectedPage >= 2) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const onClickNext = () => {
    if (selectedPage < pageNumber) {
      setSelectedPage(selectedPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <div
        className={cx("pagination-button", { disable: selectedPage === 1 })}
        onClick={onClickPrevious}
      >
        Previous
      </div>

      <div className="page-numbers">
        {pages.map((p, i) => {
          return (
            <div
              className={cx("page-index", { selected: p === selectedPage })}
              key={"page-index" + p}
              onClick={() => {if (p === selectedPage) {
                  return
              } else {
                  onClickIndex(p);
                }
            }}
            >
              {p}
            </div>
          );
        })}
      </div>
      <div
        className={cx("pagination-button", {
          disable: selectedPage === pageNumber,
        })}
        onClick={onClickNext}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
