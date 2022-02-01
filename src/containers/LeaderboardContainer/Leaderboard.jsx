/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pages from "../../components/Pagination/Pages";
import nextarrow from "../../assets/images/nextarrow.svg";
import prevarrow from "../../assets/images/prevarrow.svg";
import Countdown from "../../components/CountDown/CountDown";
import Modals from "../../components/Modals/Modals";
import LeaderboardItems from "../../components/LeaderBoard/LeaderboardItems";
import "./Leaderboard.css";

function Leaderboard() {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const [disable, setDisable] = useState(true);
  console.log(open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFilename("");
  };
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);

  const [pageNumberLimit, setPageNumberLimit] = useState(8);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(8);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const getData = useSelector((state) => state.postTeam.people);
  console.log(getData);

  const pages = [];
  for (let i = 1; i <= Math.ceil(getData.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getData.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };
  const handleNext = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxpageNumberLimit) {
      setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrev = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxpageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNext} className="mx-1">
        &hellip;
      </li>
    );
  }
  let pageDecrementBtn = null;
  if (minpageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handlePrev} className="mx-1">
        &hellip;
      </li>
    );
  }
  const handlechangefile = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].name.split(".")[1].match(/^(java|js|go|py)$/)) {
        if (e.target.files[0].size > 47185920) {
          setDisable(true);
          console.log("file size is too big");
          setFilename("");
        } else {
          setDisable(false);
          setFilename(e.target.files[0].name);
        }
      } else {
        setDisable(true);
        console.log("file type not supported");
        setFilename("");
      }
    } else {
      setDisable(true);
      setFilename("");
    }
  };
  return (
    <div>
      <div className=" flex flex-col text-center text-white">
        <div className="flex flex-col">
          <h1
            className=" mt-14 text-xl 3xl:text-3xl 3xl:mt-20 2xl:text-3xl 2xl:mt-20"
            onClick={handleOpen}
          >
            {" "}
            Event Ends in
          </h1>
          <Modals
            open={open}
            onClose={handleClose}
            onchange={handlechangefile}
            filename={filename}
            btndis={disable}
          />
          <Countdown />
        </div>
        <div>
          {/* <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Team</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody> */}
          <div className="grid grid-cols-3 mx-40">
            <td className=" justify-start text-left text-xl 3xl:text-3xl 2xl:text-3xl py-2 3xl:py-4 2xl:py-4">
              Rank
            </td>
            <td className="justify-center text-center text-xl 3xl:text-3xl 2xl:text-3xl py-2 3xl:py-4 2xl:py-4">
              Team
            </td>
            <td className="justify-end text-right text-xl 3xl:text-3xl 2xl:text-3xl py-2 3xl:py-4 2xl:py-4">
              Score
            </td>
          </div>
          {currentItems.map((person) => (
            <LeaderboardItems person={person} />
          ))}
          {/* </tbody>
          </table> */}
        </div>
        <ul className="pageNumbers justify-end mt-10 mb-8 mx-40 position-ul pb-1">
          <li className="mx-1">
            <button onClick={handlePrev} disabled={currentPage === pages[0]}>
              <img src={prevarrow} alt="prev" />
            </button>
          </li>
          {pageDecrementBtn}
          <Pages
            pages={pages}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            onclick={handleClick}
            pageNumberLimit={pageNumberLimit}
            setPageNumberLimit={setPageNumberLimit}
            maxpageNumberLimit={maxpageNumberLimit}
            minpageNumberLimit={minpageNumberLimit}
          />
          {pageIncrementBtn}
          <li className="mx-1">
            <button
              onClick={handleNext}
              disabled={currentPage === pages[pages.length - 1]}
            >
              <img src={nextarrow} alt="next" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
