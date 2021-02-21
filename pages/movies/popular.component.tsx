import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../../components/commons/error-boundary.component";
import Header from "../../components/commons/header.component";
import Loading from "../../components/commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { getPopularMovies } from "../../services";

const MovieList = lazy(() =>
  import("../../components/movies/list-movie.component")
);
const Navbar = lazy(() => import("../../components/commons/navbar.component"));

export interface PopularMoviePageProps {}
export interface PopularMoviePageState {
  movies: PartialMovieModel[];
}

export class PopularMoviePage extends Component<
  PopularMoviePageProps,
  PopularMoviePageState
> {
  state = {
    movies: []
  };

  constructor(props: PopularMoviePageProps) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    getPopularMovies()
      .then(({ results }) => results)
      .then(movies => this.setState({ movies }));
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
        </ErrorBoundary>
        <div className="m-5">
          <Header title="Popular Movies" action="View All" />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MovieList movies={this.state.movies} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default PopularMoviePage;
