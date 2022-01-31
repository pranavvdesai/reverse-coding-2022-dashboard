/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import linux from "../../assets/images/linux.svg";
import mac from "../../assets/images/mac.svg";
import windows from "../../assets/images/windows.svg";
import download from "../../assets/images/download.svg";
import run from "../../assets/images/run.svg";
import upload from "../../assets/images/upload.svg";

import "./ide.css";

const Questions = () => {
  const [active, setActive] = useState({
    windowsImage: true,
    linuxImage: false,
    macImage: false,
  });

  return (
    <div className="ide mx-auto">
      <div className="flex flex-col gap-9 ">
        <div className="px-8 py-8 bg-color ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam sit
          arcu vitae. Nisi, metus, adipiscing sit rhoncus sed. Massa,
          scelerisque vel hac velLorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nunc diam sit arcu vitae. Nisi, metus, adipiscing sit
          rhoncus sed. Massa, scelerisque vel hac vel.
          <div
            className="download-container mt-2 exec"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              overflow: "hidden",
              height: "40px",
              width: "190px",
              marginRight: "1.2rem",
            }}
          >
            <span
              onClick={() => {
                setActive({
                  windowsImage: true,
                  linuxImage: false,
                  macImage: false,
                });
              }}
            >
              <img
                src={windows}
                alt="windows"
                className="icon h-5"
                style={{
                  cursor: "pointer",
                  marginLeft: "24px",
                  opacity: active.windowsImage ? "1" : "0.5",
                }}
              />
            </span>
            <span
              onClick={() => {
                setActive({
                  windowsImage: false,
                  linuxImage: true,
                  macImage: false,
                });
              }}
            >
              <img
                src={linux}
                alt="linux"
                className="icon h-5"
                style={{
                  cursor: "pointer",
                  opacity: active.linuxImage ? "1" : "0.5",
                }}
              />
            </span>
            <span
              onClick={() => {
                setActive({
                  windowsImage: false,
                  linuxImage: false,
                  macImage: true,
                });
              }}
            >
              <img
                src={mac}
                alt="mac"
                className="icon h-5"
                h
                style={{
                  cursor: "pointer",
                  opacity: active.macImage ? "1" : "0.5",
                }}
              />
            </span>
            <span
              onClick={() => {
                setActive({
                  windowsImage: true,
                  linuxImage: false,
                  macImage: false,
                });
              }}
              className="icon download"
              style={{
                marginRight: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "2.75rem",
                cursor: "pointer",
                // opacity: active. ? "1" : "0.5",
              }}
            >
              <img className="h-5" src={download} alt="download" />
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-9 ">
          <div className="px-5 py-5 bg-color relative test-case">
            01Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam
            sit arcu vitae. Nisi, metus, adipiscing sit rhoncus sed. Massa,
            scelerisque vel hac velLorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc diam sit arcu vitae. Nisi, metus, adipiscing
            sit rhoncus sed. Massa, scelerisque vel hac vel. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc diam sit arcu vitae.
            Nisi, metus, adipiscing sit rhoncus sed. Massa, scelerisque vel hac
            vel.
            <div className="flex absolute bottom-0 mb-4">
              <Link to="/">
                <div className="upload-btn text-white flex">
                  Upload
                  <img className="ml-2 h-6" src={upload} alt="upload" />
                </div>
              </Link>
              <div className=" ml-10 text-white font-700 text-xl">
                Points: <br />
                25/100{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="flex flex-row gap-7">
              <div>
                <div className="bg-color pl-6 pt-6  input relative">
                  Input
                  <br />
                  <textarea className="text-area" />
                  <div className="flex ">
                    <Link to="/">
                      <div className="run-btn absolute bottom-0 mb-4 text-white  flex">
                        <img src={run} alt="run" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-color pl-6 pt-6 output">Output</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
