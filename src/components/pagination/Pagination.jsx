import React, { useEffect, useState } from "react";
import "./Pagination.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classNames from "classnames";

const Pagination = ({ setPage, page, setLoading, scroll }) => {
  const [noPage, setNoPage] = useState("noPage");

  useEffect(() => {
    if (page > 1) {
      setNoPage("");
    } else {
      setNoPage("noPage");
    }
  }, [page]);

  const backHandler = () => {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
      scroll();

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const nextHandler = () => {
    setPage(page + 1);
    setLoading(true);
    scroll();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="pagination">
      <IoIosArrowBack
        className={classNames("back", noPage)}
        onClick={backHandler}
      />
      <p>{page}</p>
      <IoIosArrowForward className="next" onClick={nextHandler} />
    </div>
  );
};

export default Pagination;
