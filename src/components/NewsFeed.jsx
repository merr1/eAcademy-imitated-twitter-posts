import React, { useRef, useState, useEffect } from "react";
import Userdata from "./Userdata";
import more from "./image/menu.svg";
import like from "./image/heart.svg";
import liked from "./image/liked.svg";
import coment from "./image/speech-bubble.svg";

const NewsFeed = ({
  id,
  saveMyLikes,
  likesArray,
  removeItem,
  setIsopen,
  isopen,
}) => {
  const { post, user, comments, photo, allDataIsReceived } = Userdata(id);

  const [mores, setMores] = useState(false);
  const [coments, setComents] = useState(false);
  const moresRef = useRef(null);
  const commentRef = useRef(null);

  const moreFunction = () => {
    mores ? setMores(false) : setMores(true);
  };

  const comFunction = () => {
    coments === false ? setComents(true) : setComents(false);
  };
  const handleLike = (id) => saveMyLikes(id);
  const handleOnClick = (e) => {
    if (
      coments &&
      commentRef.current &&
      !commentRef.current.contains(e.target)
    ) {
      setComents(false);
    }
    if (mores && moresRef.current && !moresRef.current.contains(e.target)) {
      setMores(false);
    }
  };
  const close = () => {
    isopen ? setIsopen(false) : setIsopen(true);
    removeItem(id);
  };

  useEffect(() => {
    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  });
  return (
    allDataIsReceived && (
      <div className="newsFeed" id={"post" + id}>
        <div className="post">
          <div className="userPhoto">
            <div className="profile">{user.name[0]}</div>
          </div>
          <div className="postContent">
            <div className="userName">
              <div>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
              {!mores ? (
                <div className="moreContainer" onClick={moreFunction}>
                  <img className="more" src={more} alt="more icon" />
                </div>
              ) : (
                <div className="option" ref={moresRef}>
                  <div className="likeContainer">
                    <img
                      className="like"
                      alt="like"
                      onClick={() => handleLike(post.id)}
                      src={likesArray[post.id]?.like ? liked : like}
                    />
                  </div>
                  <div className="single_post" onClick={close}>
                    see post
                  </div>
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            <div className="photoContainer">
              <img src={photo.url} alt={photo.title} />
            </div>
            <div className="icons">
              <div className="comentcontainer" onClick={() => comFunction()}>
                <img className="coment" alt="coment icon" src={coment} />
              </div>
              <div className="likeContainer">
                <div>
                  <img
                    className="like"
                    alt="like"
                    onClick={() => handleLike(post.id)}
                    src={likesArray[post.id]?.like ? liked : like}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${coments ? "background" : ""}`}></div>
        {coments && (
          <div className="comment" ref={commentRef}>
            {comments.map((comment, id) => (
              <div key={id}>
                <div className="user">
                  <div className="profile">{comment.email[0]}</div>
                  <span>{comment.email}</span>
                </div>

                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default NewsFeed;