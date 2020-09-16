import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateMovie({setMovieList, movieList}) {
  const [movie, setMovie] = useState();
  const params = useParams();
  const history = useHistory();
  
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);
  
  const updateMovie = (e) => {
    const { name, value } = e.target;
    setMovie({...movie, [name]: value});
  }

  const submit = (e) => {
    e.preventDefault();
    // I was going to slice'n'dice,
    // but then I realized I could
    // map over movielist in state and
    // replace edited item with edit
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((res) => {
          console.log(res.data)
          setMovieList(movieList.map(movie => {
            return movie.id !== Number(res.data.id)
              ? movie
              : res.data // I had this as the local state at
                         // first, it worked, but could be buggy!
            })
          )
          history.push('/')
        })
        .catch((e) => console.log(e))
  }
  useEffect(() => {console.log('test')},[params.id])
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <form onSubmit={e => submit(e)} >
          <label>Title:&nbsp;
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={e => updateMovie(e)}
            />
          </label>
          <div className="movie-director">
            <label>Director:&nbsp;
              <input
                type="text"
                name="director"
                value={movie.director}
                onChange={e => updateMovie(e)}
              />
            </label>
          </div>
          <div className="movie-metascore">
            <label>Metascore:&nbsp;
              <input
                  type="number"
                  name="metascore"
                  value={movie.metascore}
                  onChange={e => updateMovie(e)}
              />
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
