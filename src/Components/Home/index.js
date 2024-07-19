import { Component } from "react";
import { TailSpin } from "react-loader-spinner";

import "./index.css";
import MovieCards from "../MovieCards";

class Home extends Component {
  state = {
    query: "",
    movies: [],
    error: "",
    loader: false,
  };

  handlingSearch = async () => {
    const { query } = this.state;
    if (query === "") {
      return this.setState({ error: "Please enter a movie name" });
    }
    this.setState({ error: "", loader: true });

    try {
      const responce = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await responce.json();
      this.setState({ movies: data.docs, loader: false });
    } catch {
      this.setState({ error: "Something went wrong", loader: false });
    }
  };

  handleSearchInput = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { query, movies, error, loader } = this.state;

    return (
      <div>
        <div className="Header">
          <h1 className="heading">Movie Search application</h1>
        </div>
        <div className="container">
          <input
            placeholder="search for movie"
            value={query}
            type="search"
            onChange={this.handleSearchInput}
            className="search-input"
          />
          <button className="search-btn" onClick={this.handlingSearch}>
            Search
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}

        {loader ? (
          <div className="loader">
            <TailSpin color="#353738" height={80} width={80} />
          </div>
        ) : (
          <div className="movie-card">
            {movies.map((movie, index) => (
              <MovieCards key={index} movie={movie} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
