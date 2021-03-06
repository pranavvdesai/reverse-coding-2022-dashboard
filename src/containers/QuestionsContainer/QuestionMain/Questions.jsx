/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import Ques from "../../../components/Questions/Ques";
import Pages from "../../../components/Pagination/Pages";
import nextarrow from "../../../assets/images/nextarrow.svg";
import prevarrow from "../../../assets/images/prevarrow.svg";
import { clearAll, setRemove } from "../../../redux/PostJudge/postJudgeActions";

import "./Questions.css";

function Questions() {
  const getData = useSelector((state) => state.postJudge.getAssigned);
  const getDisable = useSelector((state) => state.postJudge.disable);
  const loading = useSelector((state) => state.postJudge.loading);

  const dispatch = useDispatch();
  // console.log("getDataBefore", getData);
  const getJudgePoints = useSelector((state) => state.postJudge.judgePoints);
  const postJudgePoints = useSelector((state) => state.postJudge.judgeMain);
  // console.log("GETJUDGEMAIN", postJudgePoints);
  console.log("getJudgePoints", getJudgePoints);
  console.log("getData", getData);
  for (let i = 0; i < getData.length; i++) {
    for (let j = 0; j < getJudgePoints.length; j++) {
      if (getData[i].id === getJudgePoints[j].problem_id) {
        console.log("getData[i].id", getData[i].id);
        console.log("getJudgePoints[j].id", getJudgePoints[j].problem_id);
        getData[i] = {
          ...getData[i],
          truepoints: getJudgePoints[j].points,
          // pointsJudgeMain:
          //   getJudgeMain.points === null
          //     ? "-"
          //     : getJudgeMain.points[i].points === null
          //     ? "-"
          //     : getJudgeMain.points[i].points,
          // getJudgeMain[i].points === undefined ? "-" : getJudgeMain[i].points,
        };
        console.log("getData[i]", getData[i]);
      }
    }
  }
  // console.log("getDataAfter", getData);
  const [input, setInput] = useState(false);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(1);

  const [pageNumberLimit, setPageNumberLimit] = useState(8);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(8);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(getData.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getData.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems);
  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
    setInput(true);
    dispatch(clearAll());
    dispatch(setRemove(false));
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
  // console.log("getdata length", getData.length);
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Hold up!..."
      styles={{
        wrapper: {
          height: "100vh",
        },
      }}
    >
      <div
        className={
          getData.length > 0 ? "md:ml-64 2xl:ml-80 3xl:ml-100" : "hidden"
        }
      >
        <div
          className={
            getDisable
              ? "flex justify-center mb-8 pt-8 getcursorDisable"
              : "flex justify-center mb-8 pt-8"
          }
        >
          <ul
            className={
              getDisable
                ? "pageNumbersquestion justify-end pb-1 text-white getDisable"
                : "pageNumbersquestion justify-end pb-1 text-white"
            }
          >
            <div className="mx-1">
              <button onClick={handlePrev} disabled={currentPage === pages[0]}>
                <img src={prevarrow} alt="prev" />
              </button>
            </div>
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
            <div className="mx-1">
              <button
                onClick={handleNext}
                disabled={currentPage === pages[pages.length - 1]}
              >
                <img src={nextarrow} alt="next" />
              </button>
            </div>
          </ul>
        </div>

        {currentItems.map((data) => (
          <Ques
            data={data}
            input={input}
            postJudgePoints={
              postJudgePoints.points === null ? "-" : postJudgePoints.points
            }
          />
        ))}
      </div>
      <div className={getData.length === 0 ? "block" : "hidden"}>
        <div className="centre pt-64 2xl:pt-96">
          <p className="nil purple px-12 py-20 2xl:py-24 2xl:px-16 3xl:px-20 3xl:py-28 rounded-4xl text-3xl 2xl:text-4xl 3xl:text-5xl md:ml-64 2xl:ml-80 3xl:ml-100">
            Please select questions from the roulette
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Questions;
