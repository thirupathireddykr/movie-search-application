import { Component } from "react";

import "./index.css";


class MovieCards extends Component {
    state = {dogimg : ""};

    componentDidMount() {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => this.setState({dogimg: data.message}));
    }

    render () {
        const {movie,query} = this.props
        const {dogimg} = this.state

        // Extracting the required information from the movie object
        const title = movie.title || query;
        const authorName = movie.author_alternative_name ? movie.author_alternative_name[0] : (movie.author_name ? movie.author_name[0] : 'Unknown Author');
        const firstPublishYear = movie.first_publish_year || 'Unknown Year';
        const firstSentence = movie.first_sentence ? movie.first_sentence[0] : 'No Summary Available';

        return (
            <div className="card">
                <img src={dogimg} alt="Random dog" className="movie-img" />
                <h2>{title}</h2>
                <p><span className="card-heading">Author:</span> {authorName}</p>
                <p><span className="card-heading">Published Year:</span> {firstPublishYear}</p>
                <p><span className="card-heading">First Sentence:</span> {firstSentence}</p>
            </div>
        );
    }
}

export default MovieCards;