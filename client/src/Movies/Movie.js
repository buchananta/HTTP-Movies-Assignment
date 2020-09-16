import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        setMovieList(movieList.filter(movie => {
          return movie.id !== res.data
        }))
        history.push('/')
        console.log(res);
      })
  }
  const updateMovie = () => {
    // I was going to not have UpdateMovie
    // Fetch from the server, but I can't
    // directly pass props this way
    // I could, but it wants me to use
    // routes, instead of just loading
    // a different component :\
    // Oh well.
    history.push(`/update-movie/${params.id}`)
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={updateMovie}>
        Update
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete 
      </div>
    </div>
  );
}

export default Movie;
