import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { FilmContext } from "../../../context/FilmContext.jsx";
import { UserContext } from "../../../context/UserContext.jsx";
import Film from "../../components/film/film.jsx";
import { FaCircleXmark } from "react-icons/fa6";
import Pagination from "../../components/pagination/pagination.jsx";

const Home = () => {
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useContext(AuthContext);
  const { filmsSelected, setFilmsSelected, films, fetchFilms, filmsCount } =
    useContext(FilmContext);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const { addToRubriques } = useContext(UserContext);

  useEffect(() => {
    fetchFilms({ page });
  }, [page]);

  const handleAddFavoris = async (event, oneFilm) => {
    event.preventDefault();
    try {
      addToRubriques(oneFilm, "favoris");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAVoir = async (event, oneFilm) => {
    event.preventDefault();
    try {
      addToRubriques(oneFilm, "aVoir");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddVues = async (event, filmId) => {
    event.preventDefault();
    try {
      addToRubriques(filmId, "dejaVu");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleSynopsis = (filmId) => {
    setSelectedFilm(selectedFilm === filmId ? null : filmId);
  };

  const handleCloseSearch = () => {
    setFilmsSelected([]);
  };

  const numberOfFilms = filmsCount;
  const numberOfPages = Math.ceil(numberOfFilms / 20);

  return (
    <div className="px-14 py-2 min-h-screen">
      <main>
        {/* Affichage du film recherché */}
        {filmsSelected.length > 0 && (
          <div className="flex justify-between my-5">
            <h2 className="text-3xl font-bold border-b-2 border-red inline-block">
              Film recherché
            </h2>
            <button onClick={handleCloseSearch}>
              <FaCircleXmark className="text-4xl" />
            </button>
          </div>
        )}
        <div className="flex flex-wrap justify-center">
          {filmsSelected.length > 0 &&
            filmsSelected.map((filmSelected) => (
              <div
                className={
                  selectedFilm == filmSelected._id
                    ? "bg-gray bg-opacity-5 rounded-md p-5 m-3 w-full"
                    : "bg-gray bg-opacity-5 rounded-md p-5 m-3 hover:scale-105"
                }
                key={filmSelected._id}
              >
                <Film
                  oneFilm={filmSelected}
                  selectedFilm={selectedFilm}
                  handleAddAVoir={handleAddAVoir}
                  handleAddFavoris={handleAddFavoris}
                  handleAddVues={handleAddVues}
                  handleToggleSynopsis={handleToggleSynopsis}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            ))}
        </div>

        {/* Affichage de tous les films */}
        <h2 className="text-3xl font-bold border-b-2 border-red inline-block my-5">
          Tous les films
        </h2>
        {
          <div className="flex flex-wrap justify-center">
            {films.map((oneFilm) => (
              <div
                className={
                  selectedFilm == oneFilm._id
                    ? "bg-gray bg-opacity-5 rounded-md p-5 m-3 w-full"
                    : "bg-gray bg-opacity-5 rounded-md p-5 m-3 hover:scale-105"
                }
                key={oneFilm._id}
              >
                <Film
                  oneFilm={oneFilm}
                  selectedFilm={selectedFilm}
                  handleAddAVoir={handleAddAVoir}
                  handleAddFavoris={handleAddFavoris}
                  handleAddVues={handleAddVues}
                  handleToggleSynopsis={handleToggleSynopsis}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            ))}
          </div>
        }

        {/* pagination */}
        {films.length !== 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              numberOfPages={numberOfPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
