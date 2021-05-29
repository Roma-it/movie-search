import React, { useState, useEffect, useRef } from "react";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const input = useRef("");
  console.log("Peliculas: " + movies);
  console.log(input);
  console.log("Total Pages: " + totalPages);
  console.log("Pagina: " + page);
  console.log("Keyword: " + keyword);

  const apiKey = "b48eb1d6";

  const setKeywordValue = function () {
    setKeyword(input.current.value);
    // if (page === 1) {
    //   setPage(0);
    // }
    // console.log("Pase por setKeyword");
  };
  useEffect(async () => {
    console.log("entre al use effect");
    if (keyword) {
      if (page != 0) {
        const res = await fetch(
          `http://www.omdbapi.com/?s=${keyword.trim()}&apikey=${apiKey}&page=${page}`
        );
        const data = await res.json();
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
          //setPage(0);
        }
      }
    }
    // } else {
    //   setPage(0);
    // }
  }, [page]);
  useEffect(async () => {
    console.log("entre al use effect keyword");
    if (keyword) {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${keyword.trim()}&apikey=${apiKey}&page=${page}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
        setPage(1);
      } else {
        setMovies([]);
      }
    } else {
      setMovies([]);
    }
  }, [keyword]);
  // const getNewDataBack = async (e) => {
  //   console.log("Entre a GET NEW DATA BACK");
  //   await setPage(page - 1);
  //   console.log("Pagina en consulta previous " + page);
  //   const res = await fetch(
  //     `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}&page=${page}`
  //   );
  //   console.log(
  //     "Consulta realizada " +
  //       `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}&page=${page}`
  //   );
  //   const data = await res.json();
  //   console.log(data);
  //   if (data.Search) {
  //     setMovies(data.Search);
  //     setPage(page - 1);
  //   } else {
  //     setMovies([]);
  //   }
  // };
  // const getNewData = async (e) => {
  //   console.log("Entre a GET NEW DATA");
  //   const res = await fetch(
  //     `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}&page=${page}`
  //   );
  //   const data = await res.json();
  //   console.log(data);
  //   if (data.Search) {
  //     setMovies(data.Search);
  //     setPage(page + 1);
  //   } else {
  //     setMovies([]);
  //   }
  // };
  // const getData = async (e) => {
  //   console.log("Entre a GET DATA");
  //   if (keyword) {
  //     const res = await fetch(
  //       `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     if (data.Search) {
  //       setMovies(data.Search);
  //       console.log("Hice SET MOVIES");
  //       setTotalPages(Math.ceil(data.totalResults / 10));
  //       console.log("Hice SET TOTAL PAGES");
  //     } else {
  //       setMovies([]);
  //     }
  //   }
  // };
  // console.log("llegue a antes del return");
  return (
    <div className="container-fluid">
      {apiKey !== "" ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setKeyword("");
                  input.current.value = "";
                }}
              >
                <div className="form-group">
                  <label htmlFor="">Buscar por título:</label>
                  <input
                    ref={input}
                    type="text"
                    className="form-control"
                    onChange={setKeywordValue}
                    defaultValue=""
                  />
                </div>
                <button className="btn btn-info">Clear Search</button>
              </form>

              <button
                onClick={() => page > 1 && setPage(page - 1)}
                className="btn btn-info mt-2 mr-2"
              >
                Previous Page
              </button>
              <button
                onClick={() => page < totalPages && setPage(page + 1)}
                className="btn btn-info mt-2"
              >
                Next Page
              </button>
              {movies.length > 0 && (
                <p className="mt-3">{`Pagina ${page} de ${totalPages}`}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {keyword}</h2>
            </div>
            {/* Listado de películas */}
            {movies.length > 0 &&
              movies.map((movie, i) => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                          {movie.Title}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            src={movie.Poster}
                            alt={movie.Title}
                            style={{
                              width: "90%",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p>{movie.Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {movies.length === 0 && (
            <div className="alert alert-warning text-center">
              No se encontraron películas
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-danger text-center my-4 fs-2">
          Eyyyy... ¿PUSISTE TU APIKEY?
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
