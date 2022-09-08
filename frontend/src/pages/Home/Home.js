import axios from "axios";
import "./Home.css";
import React, { useEffect, useState } from "react";
import Board from "../../components/BoardCard/BoardCard";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import CreateNewBoard from "../../components/board/CreateNewBoard";

const BOARD_LIST_API = "http://localhost:8089/api/boards";

function Home() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get(BOARD_LIST_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBoards(res.data);
      })
      .catch(({ response: { status } }) => {
        if (status === 401) {
          navigate("/signin");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderBoards = () => {
    if (loading) {
      return (
        <>
          <button className="buttonForNavigation">
            <Board loading />
          </button>
          <button className="buttonForNavigation">
            <Board loading />
          </button>
          <button className="buttonForNavigation">
            <Board loading />
          </button>
          <button className="buttonForNavigation">
            <Board loading />
          </button>
          <button className="buttonForNavigation">
            <Board loading />
          </button>
        </>
      );
    }

    return boards.map((board) => (
      <button
        className="buttonForNavigation"
        onClick={() => navigate(`/board/${board.id}`)}
        key={board.id}
      >
        <Board board={board} />
      </button>
    ));
  };

  return (
    <div className="body-home">
      <Header></Header>
      <div className="section-1">
        <div>
          <span className="icon-boards-title">
            <img
              src={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABAADcDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAEGBAUHAgP/xAAsEAABAwMCBAUEAwAAAAAAAAABAAIDBAURBhIHMUFRExchcbEyVWGTYqHR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABwRAQEBAQACAwAAAAAAAAAAAAABEQIhMQMSQf/aAAwDAQACEQMRAD8A7aiIqginBUICIiAiIgKv64v7tPWN9RCAamR3hw55A9z7KwKn8UrVJcdNmaEZdRu8Vw/jjBV5zZqX00tHoG43emZcLzeahtbKPEa36tmfj2CzdG3a6W6/y6Yvkxne1u6nmJySAM8z6kEd+xWVaOIllmtsb7hO6nqmsAkjLCdxHUYWp0zK/VWvZb9HGY6Sjj2R7uZyCB8uK6ebL9mfH46SiIuTYiIg+dTPFS08tRUPDIoml73HoB6lcwijunEe4yvfM+jssD8NYOv+u+FbuIzap+kqxlHG97iW+IGDJ2ZySqdp7iNa7LZqa3tt8zjC3D3NkaNzupXTiXNntnq+cq3waA03FEGOoTKcfXJI7P8ARVev2h57KXXjSlRPFNAN5gBySBzx39jzXvzatv26o/axT5tW37dUftYrJ8kTeVl0ZqNmo7SJyGtqYzsmY3lnuPwVv1zLhpO6s1VdqygppIrbO0uIPJrtwIGR6dXcl01Y7mVrm7BERZUU5PdQiCcnumT3UIglQiICIiD/2Q=="
              }
              className={`image ${loading ? "skeleton img" : ""}`}
            />
            <h3
              className={`boards-page-board-section-header-name ${
                loading ? "skeleton title" : ""
              }`}
            >
              Your boards
            </h3>
          </span>
          <div className="renderBoards">
            {renderBoards()}
            <div className={`${loading ? "skeleton img" : ""}`}>
              <CreateNewBoard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
