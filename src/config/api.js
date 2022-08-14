import axios from "axios";
import Notify from "../components/Atom/Notify";

const url = axios.create({
  baseURL: "http://localhost:3001/",
});

export default {
  //==========================================================================================
  //============================================= users ======================================
  //==========================================================================================
  signUp: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post(`sign_up`, {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          Notify.succes("Login succes");
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post(`login`, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          Notify.succes(response.data.message);
          resolve(true);
        })
        .catch((err) => {
          Notify.error(err.response.data.message);
          reject(false);
        });
    });
  },
  getOneUser: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_one_user/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      if (data.password.length > 0) {
        url
          .put(`update_user/${id}`, {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
          })
          .then((response) => {
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      } else {
        url
          .put(`update_user/${id}`, {
            fullName: data.fullName,
            email: data.email,
          })
          .then((response) => {
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  },

  updateAvatar: (data, id) => {
    return new Promise((resolve, reject) => {
      const formdata = new FormData();
      formdata.append("image", data);
      url
        .put(`upload_avatar/${id}`, formdata, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((ress) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  //==========================================================================================
  //============================================= movies =====================================
  //==========================================================================================
  getMovies: (genreId, page) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_movies/${genreId}/${page}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getGenre: () => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_genre`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getTop: () => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_top`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_detail/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getOneTv: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getOneTv/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getCasting: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_casting/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getTrailer: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_trailer/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getSearch: (query) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_search/${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getTvSeries: (page) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_tvSeries/${page}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  getCastingTv: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_casting_tv/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  getTrailerTv: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_trailer_tv/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  //==========================================================================================
  //============================================= my list ====================================
  //==========================================================================================

  createMyList: (data, userId) => {
    return new Promise((resolve, reject) => {
      url
        .post(`create_mylist`, {
          moviesId: data.moviesId,
          image: data.image,
          userId: userId,
          title: data.title,
          genre: data.genre,
          overview: data.overview,
          date: data.date,
          rating: data.rating,
          duration: data.duration,
          casting: data.casting,
        })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err.response.message);
          reject(false);
        });
    });
  },
  deleteMyList: (listId) => {
    return new Promise((resolve, reject) => {
      url
        .delete(`delete_mylist/${listId}`)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err.response.message);
          reject(false);
        });
    });
  },

  getOneMyList: (userId, moviesId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`/get_one_mylist?userId=${userId}&moviesId=${moviesId}`)
        .then((ress) => {
          resolve(ress.data);
        })
        .catch((err) => {
          console.log(err.response.message);
          reject(false);
        });
    });
  },

  //===========================================================================================
  //============================================= reviewed ====================================
  //===========================================================================================
  createReviewed: (data, userId) => {
    return new Promise((resolve, reject) => {
      url
        .post(`create_reviewed`, {
          moviesId: data.moviesId,
          image: data.image,
          userId: userId,
          title: data.title,
          duration: data.duration,
          genre: data.genre,
          overview: data.overview,
          date: data.date,
          rating: data.rating,
          casting: data.casting,
        })
        .then(() => {
          resolve(true);
        })

        .catch((err) => {
          reject(false);
        });
    });
  },

  getOneReviwed: (userId, moviesId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`/get_one_reviewed?userId=${userId}&moviesId=${moviesId}`)
        .then((ress) => {
          resolve(ress.data);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  //==========================================================================================
  //============================================ comment =====================================
  //==========================================================================================

  createComment: (data, idMovies, title, text, userId, rating) => {
    return new Promise((resolve, reject) => {
      url
        .post(`create_comment`, {
          userId: userId,
          image: data.image,
          nama: data.fullName,
          moviesId: idMovies,
          title: title,
          text_comment: text,
          rating: rating,
        })
        .then((response) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  updateComment: (data) => {
    return new Promise((resolve, reject) => {
      url
        .put(`/update_comment/${data.reviewId}`, {
          image: data.image,
          nama: data.fullName,
          title: data.title,
          text_comment: data.text,
          rating: data.rating,
        })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      url
        .delete(`/delete_comment/${id}`)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },

  getAllComment: () => {
    return new Promise((resolve, reject) => {
      url
        .get(`getAllComment`)
        .then((ress) => {
          resolve(ress.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          reject(false);
        });
    });
  },

  getOneComment: (moviesId, userId) => {
    return new Promise((resolve, reject) => {
      url
        .get(`get_one_comment?userId=${userId}&moviesId=${moviesId}`)
        .then((ress) => {
          resolve(ress.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          reject(false);
        });
    });
  },
};
