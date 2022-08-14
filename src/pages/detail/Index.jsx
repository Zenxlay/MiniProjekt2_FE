import "./detail.scss";
import api from "../../config/api";
import decode_jwt from "jwt-decode";
import { AiFillStar } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import Loading from "../../components/Atom/Loading";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Star from "../../components/components-detail/Star";
import Video from "../../components/components-detail/Video";
import Button from "../../components/components-detail/Button";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Comment from "../../components/components-detail/Comment";
import Casting from "../..//components/components-detail/Casting";
import TextEditor from "../../components/components-detail/TextEditor";
import IsLogin from "../../components/Molekul/isLogin/IsLogin";
import Input from "../../components/Atom/Input";
import ValidasiError from "../../components/Atom/ValidasiError";

const Detail = () => {
  // state user
  const token = localStorage.getItem("token");
  const [dataUser, setDataUser] = useState("");
  const [decode, setDecode] = useState("");
  // state movies
  const [dataMovies, setDataMovies] = useState("");
  const [genres, setGenres] = useState([]);
  const [dataCasting, setDataCasting] = useState([]);
  const [idMovies, setIdMovies] = useState("");
  const [linkYt, setLinkYt] = useState("");
  const [dataTrailer, setdataTrailer] = useState([]);
  const arrCasting = dataCasting.slice(0, 3).map((el) => {
    return el.name;
  });
  const casting = arrCasting.join(", ");

  // state my list
  const [dataMyList, setDataMyList] = useState("");

  // state review
  const [dataComment, setDataComment] = useState([]);
  const [oneDataComment, setOneDataComment] = useState("");
  const [title, setTitle] = useState("");
  const [tahun, setTahun] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  // option state
  const [isMyList, setIsMyList] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [validasiError, setValidasiError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const moviesId = params.get("moviesId");
    const tvId = params.get("tvId");
    if (moviesId) {
      getMovies(moviesId);
      getCasting(moviesId);
      getTrailer(moviesId);
    } else {
      getTv(tvId);
      getCastingTv(tvId);
      getTrailerTv(tvId);
    }
    if (token) {
      const decode = decode_jwt(token);
      setDecode(decode);
      setIsLogin(true);
      getOneUser(decode.id);
      setIdMovies(moviesId);
      getAllComment(moviesId);
      getOneMyList(decode.id, moviesId);
      getOneReviwed(moviesId);
      getOneComment(moviesId);
    } else {
      setIsLogin(false);
    }
  }, []);

  // ===================================================== function user

  const getOneUser = async (id) => {
    const result = await api.getOneUser(id);
    if (result) {
      setDataUser(result.data);
    }
  };
  // ===================================================== function movies

  const getMovies = async (params) => {
    const result = await api.getDetail(params);
    if (result) {
      setDataMovies(result.data);
      setGenres(result.data.genres);
      setTahun(result.data.release_date.slice(0, 4));
    }
  };

  const getTv = async (params) => {
    const result = await api.getOneTv(params);
    if (result) {
      setDataMovies(result.data);
      setGenres(result.data.genres);
      setTahun(result.data.last_air_date.slice(0, 4));
    }
  };

  const getCasting = async (id) => {
    const result = await api.getCasting(id);
    if (result) {
      setDataCasting(result.data.cast.slice(0, 12));
    }
  };

  const getTrailer = async (id) => {
    const result = await api.getTrailer(id);
    if (result) {
      setdataTrailer(result.data.results);
      setLinkYt(result.data.results[0].key);
    }
  };

  const getCastingTv = async (id) => {
    const result = await api.getCastingTv(id);
    if (result) {
      setDataCasting(result.data.cast.slice(0, 10));
    }
  };
  const getTrailerTv = async (id) => {
    const result = await api.getTrailerTv(id);
    if (result) {
      setdataTrailer(result.data.results);
    }
  };

  // ===================================================== function mylist

  const getOneMyList = async (userId, moviesId) => {
    const result = await api.getOneMyList(userId, moviesId);
    setDataMyList(result.data);
    if (result.data.length > 0) {
      setIsMyList(false);
    } else {
      setIsMyList(true);
    }
  };

  const saveMyList = async () => {
    if (isLogin) {
      setLoading(true);
      const data = {
        moviesId: dataMovies.id,
        image: dataMovies.backdrop_path,
        title: dataMovies.original_title || dataMovies.name,
        genre: genres[0].name,
        overview: dataMovies.overview,
        date: tahun,
        rating: dataMovies.vote_average,
        duration: `${
          dataMovies.runtime || dataMovies.episode_run_time
        } minutes`,
        casting: casting,
      };
      const result = await api.createMyList(data, decode.id);
      if (result) {
        const resultData = await api.getOneMyList(decode.id, dataMovies.id);
        setDataMyList(resultData.data);
        setLoading(false);
        setIsMyList(true);
      }
    } else {
      setIsPopUp(true);
    }
  };

  const dontSaveMyList = async () => {
    setLoading(true);
    const result = await api.deleteMyList(dataMyList.id);
    if (result) {
      const resultDataMyList = await api.getOneMyList(decode.id, dataMovies.id);
      setDataMyList(resultDataMyList.data);
      setLoading(false);
      setIsMyList(false);
    }
  };

  // ===================================================== function reviewed

  const getAllComment = async (filmId) => {
    const result = await api.getAllComment();
    if (result) {
      setDataComment(
        result.data.filter((el) => el.moviesId === parseInt(filmId))
      );
    }
  };

  const getOneReviwed = async (moviesId) => {
    const result = await api.getOneReviwed(decode.id, moviesId);
    if (result.data === null) {
      setIsReviewed(false);
    } else {
      setIsReviewed(true);
    }
  };

  const getOneComment = async (moviesId) => {
    const result = await api.getOneComment(moviesId, decode.id);
    setOneDataComment(result.data);
    setTitle(result.data.title);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 0) {
      if (isLogin) {
        setLoading(true);

        if (!isReviewed) {
          const result = await api.createComment(
            dataUser,
            idMovies,
            title,
            text,
            decode.id,
            rating
          );

          if (result) {
            const resultDataComment = await api.getAllComment();
            setDataComment(
              resultDataComment.data.filter(
                (el) => el.moviesId === parseInt(idMovies)
              )
            );

            const datas = {
              moviesId: dataMovies.id,
              image: dataMovies.backdrop_path,
              title: dataMovies.original_title || dataMovies.name,
              duration: `${
                dataMovies.runtine || dataMovies.episode_run_time
              } minutes`,
              genre: genres[0].name,
              overview: dataMovies.overview,
              date: tahun,
              rating: dataMovies.vote_average,
              casting: casting,
            };
            const results = await api.createReviewed(datas, decode.id);
            const resultDataReviewed = await api.getOneComment(
              dataMovies.id,
              decode.id
            );
            setOneDataComment(resultDataReviewed.data);
            setIsReviewed(true);
            setLoading(false);
          }
        } else {
          const data = {
            userId: decode.id,
            moviesId: dataMovies.id,
            reviewId: oneDataComment.id,
            image: dataUser.image,
            fullname: dataUser.fullname,
            title: title,
            text: text,
            rating: rating,
          };
          const resultUpdate = await api.updateComment(data);
          if (resultUpdate) {
            const resultDataComment = await api.getOneComment(
              dataMovies.id,
              decode.id
            );
            setOneDataComment(resultDataComment.data);
            setLoading(false);
            setIsReviewed(true);
            setIsUpdate(false);
            const resultGetAllComment = await api.getAllComment();
            if (resultGetAllComment) {
              setDataComment(
                resultGetAllComment.data.filter(
                  (el) => el.moviesId === dataMovies.id
                )
              );
            }
          }
        }
        setValidasiError(false);
      } else {
        setIsPopUp(true);
      }
    } else {
      setValidasiError(true);
    }
  };

  const loadMore = () => {
    setIsLoadMore(!isLoadMore);
  };

  return (
    <>
      {isPopUp && <IsLogin isPopUp={setIsPopUp} />}
      <Navbar />
      {loading && <Loading />}
      <div className="container-detail">
        <div className="bg-img">
          <img
            src={`https://image.tmdb.org/t/p/w500${dataMovies.backdrop_path}`}
            className="img"
          />
          <div className="overlay"></div>
        </div>
        {/*start Profil film */}
        <div className="detail-profil">
          <div className="detail-img">
            <img
              src={`https://image.tmdb.org/t/p/w500${dataMovies.poster_path}`}
              alt="img"
              className="img"
            />
          </div>
          <div className="detail-judul">
            <h1>{dataMovies.original_title || dataMovies.name}</h1>
            <p>{`${tahun} |  ${
              dataMovies.runtime || dataMovies.episode_run_time
            } minutes`}</p>
            <p>Starting : {casting || "-"}</p>
            <p>
              Genre :
              {genres.map((el) => {
                return <span key={el.id}> {el.name}, </span>;
              })}
            </p>
            <div className="action">
              <a
                href={`https://www.youtube.com/watch?v=${linkYt}`}
                target={"_blank"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>
                  <MdSlowMotionVideo className="icon" />
                  WATCH TRAILER
                </p>
              </a>
              {isMyList === true ? (
                <p onClick={dontSaveMyList} className="aktif">
                  <BsFillBookmarkFill className="icon" />
                  SAVE TO MY LIST
                </p>
              ) : (
                <p onClick={saveMyList}>
                  <BsBookmark className="icon" />
                  SAVE TO MY LIST
                </p>
              )}
            </div>
          </div>
        </div>
        {/*end Profil film */}
        <div className="content-detail">
          {/* Start description */}
          <div className="description">
            <div className="text-description">
              <h1>Description</h1>
              <p>{dataMovies.overview}</p>
            </div>

            <div className="rating-description">
              <p className="rating-text">Rating</p>
              <p className="rating-number">
                <AiFillStar className="icon" />
                {dataMovies.vote_average} / 10
              </p>
            </div>
          </div>
          {/* end description */}

          {/* start trailer */}
          <div className="videos-trailer">
            <h1>Videos & Trailer</h1>
            <div className="videos">
              {dataTrailer.slice(0, 3).map((item) => {
                return <Video key={item.id} data={item} />;
              })}
            </div>
          </div>
          {/* end trailer */}
          {/* start Casting */}
          <div className="detail-casting">
            <h1>Casting</h1>
            <div className="castings">
              {dataCasting.map((el) => {
                return <Casting key={el.id} data={el} />;
              })}
            </div>
          </div>
          {/* end Casting */}

          {/* start write and review */}
          <div className="container-write">
            {isReviewed ? (
              isUpdate ? (
                <>
                  <h1>Write Your Review</h1>
                  <div className="write-rating">
                    <h3>Rating</h3>
                    <div className="stars">
                      <Star change={setRating} value={oneDataComment.rating} />
                    </div>
                  </div>
                  <form onSubmit={onSubmit}>
                    <div className="title-write">
                      <label htmlFor="title">Title</label>
                      <input
                        value={title}
                        type="text"
                        id="title"
                        placeholder="Write your title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {validasiError && (
                        <ValidasiError label="Tittle is required" />
                      )}
                    </div>
                    <div className="write-review">
                      <h3>Review</h3>
                      <TextEditor
                        setText={setText}
                        value={oneDataComment.text_comment}
                      />
                      <div className="button">
                        <Button classButton={"secondary"} label="Submit" />
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h1>Your Review</h1>
                  <Comment
                    data={oneDataComment}
                    isEdit={true}
                    bg={"rgb(221, 254, 176)"}
                    setIsUpdate={setIsUpdate}
                  />
                </>
              )
            ) : (
              <>
                <h1>Write Your Review</h1>
                <div className="write-rating">
                  <h3>Rating</h3>
                  <div className="stars">
                    <Star change={setRating} />
                  </div>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="title-write">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Write your title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {validasiError && (
                      <ValidasiError label="Tittle is required" />
                    )}
                  </div>
                  <div className="write-review">
                    <h3>Review</h3>
                    <TextEditor setText={setText} />
                    <div className="button">
                      <Button classButton={"secondary"} label="Submit" />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* end write and review */}

          {/* start comment */}
          <div className="detail-comment">
            <h3 className="title">Comment</h3>
            {dataComment.length <= 0 && <p className="no-comment">No Review</p>}
            {isLoadMore
              ? dataComment.slice(0, 3).map((el) => {
                  return <Comment key={el.id} data={el} />;
                })
              : dataComment.map((el) => {
                  return <Comment key={el.id} data={el} img={dataUser.image} />;
                })}

            {dataComment.length > 3 &&
              (isLoadMore ? (
                <div className="button">
                  <Button
                    label={"Load More"}
                    classButton={"primary"}
                    click={loadMore}
                  />
                </div>
              ) : (
                <div className="button">
                  <Button
                    label={"Less More"}
                    classButton={"primary"}
                    click={loadMore}
                  />
                </div>
              ))}
          </div>
          {/* end comment */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Detail;
