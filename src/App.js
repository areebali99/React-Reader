import React, { Component, useState, useRef } from "react";
import { ReactReader } from "react-reader";
import Demo_Url from "./ebook English Before the Storm Book - Preview.epub"

const storage = global.localStorage || null;

const App = () => {
  const [page, setPage] = useState("");
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };
  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactReader
          locationChanged={locationChanged}
          url={Demo_Url}
          getRendition={(rendition) => (renditionRef.current = rendition)}
          tocChanged={(toc) => (tocRef.current = toc)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          left: "1rem",
          textAlign: "center",
          zIndex: 1
        }}
      >
        {page}
      </div>
    </>
  );
};
export default App;
