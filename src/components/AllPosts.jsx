import React, { useState, useEffect } from "react";
import NewsFeed from "./NewsFeed";
import Loader from "react-loader-spinner";

const AllPosts = () => {
  const [length, setLength] = useState(null);
  const [data, setdata] = useState([]);
  const [like, setLike] = useState({});
  const [isopen, setIsopen] = useState(true);

  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setLength(data.length);
  };

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const handleLike = (id) =>
    setLike({
      ...like,
      [id]: { ...like[id], like: !like[id]?.like },
    });

  const removeItem = (id) => {
    isopen ? setdata(range(id, id)) : setdata(range(1, length));
  };

  useEffect(() => {
    getUsers();
    setdata(range(1, length));
  }, [length]);
  return length && data ? (
    <div className="newsFeed">
      {data.map((id) => (
        <NewsFeed
          key={`post-${id}`}
          id={id}
          saveMyLikes={(id) => handleLike(id)}
          likesArray={like}
          removeItem={removeItem}
          setIsopen={setIsopen}
          isopen={isopen}
        />
      ))}
    </div>
  ) : (
    <div className="center">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default AllPosts;
