import React, { useEffect, useState, useLayoutEffect } from "react";
import cx from "classnames";

const MAX_PAGES = 10;

const Pagination = ({
  totalPages = 10,
  selectedPage = 1,
  onPageChanged = () => null,
}) => {
  const [pages, setPages] = useState([]);

  const [localPages, setLocalPages] = useState(1);

  useEffect(() => {
    setLocalPages(Math.min(MAX_PAGES, totalPages));
  }, [totalPages]);

  useLayoutEffect(() => {
    var val = [];
    for (var i = 1; i <= localPages; i++) {
      val.push(i);
    }
    setPages(val);
  }, [localPages]);

  const onClickIndex = (index) => {
    onPageChanged(index);
  };

  const onClickPrevious = () => {
    if (selectedPage >= 2) {
      onPageChanged(selectedPage - 1);
    }
  };

  const onClickNext = () => {
    if (selectedPage < localPages) {
      onPageChanged(selectedPage + 1);
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
              onClick={() => {
                if (p === selectedPage) {
                  return;
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
          disable: selectedPage === localPages,
        })}
        onClick={onClickNext}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
