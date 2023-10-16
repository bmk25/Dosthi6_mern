import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { getReacts, reactPost } from "../../functions/post";
import Comments from "./Comments";
import { colors } from "@mui/material";
export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const [showComment, setShowComments] = useState(false);
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostReacts();
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);

    // console.log(res.reacts);
    // console.log(res.check);
    // console.log(res.total);
    // if we write useState() values inside the function it shows indefined to see the result better outside the function
  };
  
  // console.log(check);
  // console.log(reacts);
  // console.log(total);

  // const reactsmap = reacts.map(
  //     (reaction) =>

  //         // console.log(reaction.count);
  //         console.log(reaction)

  //       )
  // console.log(reactsmap)

  const reactHandler = async (react) => {
    reactPost(post._id, react, user.token);
    if (check === react) {
      setCheck();
      let index = reacts.findIndex((x) => x.react === check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(react);
      let index = reacts.findIndex((x) => x.react == react);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
        console.log(reacts);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
  };

  // ! alternative way for getttng the reacts

  // useEffect(() => {
  //   // Call getReacts when the component mounts or when postId or userToken changes
  //   getReacts(post._id, user.token)
  //     .then((data) => {
  //       // Handle the data you received from getReacts
  //       setReacts(data);
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occurred during the request
  //       console.error('Error fetching reacts:', error);
  //     });
  // }, [post]);

  // ! end

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  // console.log(comments);

  const showmore = () => {
    setCount((prev) => (prev = prev + 3));
  };

  return (
    <div
      className={`post ${isInView ? "animate-slide-in" : ""}`}
      style={{ width: `${profile && "100%"}` }}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              {/* . <Public color="#828387" /> */}
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
                reacts
                  .sort((a, b) => {
                    return b.count - a.count;
                  })
                .slice(0, 3)
                .map(
                  (reaction) =>
                    reaction.count > 0 && (
                      <img src={`/reacts/${reaction.react}.svg`} alt="" />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>

      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => {
            reactHandler(check ? check : "like");
          }}
        >
          {/* for checking the check value  */}
          {console.log(check)}
          {check ? (
            <img
              src={`/reacts/${check}.svg`}
              alt="real"
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `${
                check === "Angry" || check === "Love"
                  ? "#ff794d"
                  : check === "Haha" || check === "Wow" || check === "Sad"
                  ? "#a7a21b"
                  : check === "Like"
                  ? "#8080ff"
                  : ""
              }`,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div
          className="post_action hover1"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>

      <div className="comments_wrap">
        <div className="comments_order"></div>
        {showComment && (
          <>
            <CreateComment
              user={user}
              postId={post._id}
              setComments={setComments}
              setCount={setCount}
            />
            {comments &&
              comments
                .sort((a, b) => {
                  return new Date(b.commentAt) - new Date(a.commentAt);
                })
                .slice(0, count)
                .map((comment, i) => <Comments comments={comment} key={i} />)}
            {count < comments.length && (
              <div className="view_comments" onClick={() => showmore()}>
                view more commens
              </div>
            )}
          </>
        )}
      </div>

      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
}
