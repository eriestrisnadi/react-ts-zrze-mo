import React, { Component, lazy, Suspense } from "react";
import { match } from "react-router-dom";
import CardMovie from "../../components/movies/card-movie.component";
import { bucket } from "../../constants/bucket.config";
import { PartialMovieModel } from "../../models/movie";
import { getDetailMovie } from "../../services";

export interface MovieDetailPageParams {
  id: string;
}
export interface MovieDetailPageProps {
  match?: match<MovieDetailPageParams>;
}
export interface MovieDetailPageState {
  movie: PartialMovieModel;
  loading: boolean;
}

export class MovieDetailPage extends Component<
  MovieDetailPageProps,
  MovieDetailPageState
> {
  state: MovieDetailPageState = {
    movie: {},
    loading: true
  };

  constructor(props: MovieDetailPageProps) {
    super(props);

    this.state = { movie: {}, loading: true };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getDetailMovie(id).then(movie => this.setState({ movie, loading: false }));
  }

  render() {
    if (!!this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!!!this.state.loading && !!!this.state.movie) {
      return <div>Not Found</div>;
    }

    return (
      <div>
        <div
          className="bg-cover bg-no-repeat h-64"
          style={{
            backgroundImage: `url(${bucket + this.state.movie.backdrop_path})`,
            backgroundPosition: "50% 35%"
          }}
        />
        <div className="md:px-24 md:mx-24 mx-2.5 px-2.5 my-5 flex flex-col md:flex-row gap-5">
          <div>
            <CardMovie className="hidden md:block" movie={this.state.movie} />
            <div className="flex flex-row gap-2">
              <div
                className="bg-blue-500 capitalize font-semibold mt-2 px-5 py-1.5 rounded-lg text-white flex-grow flex flex-row gap-2"
                role="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fillOpacity="0.01"
                  />
                  <path
                    d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>Play</div>
              </div>

              <div
                className="bg-red-500 capitalize font-semibold mt-2 px-5 py-1.5 rounded-lg text-white"
                role="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fillOpacity="0.01"
                  />
                  <path
                    d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>{this.state.movie.overview}</div>
        </div>
      </div>
    );
  }
}

export default MovieDetailPage;
