import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../../components/commons/error-boundary.component";
import Header from "../../components/commons/header.component";
import Loading from "../../components/commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { getTopRatedMovies } from "../../services";

const MovieList = lazy(() =>
  import("../../components/movies/list-movie.component")
);
const Navbar = lazy(() => import("../../components/commons/navbar.component"));

export interface TopRatedMoviePageProps {}
export interface TopRatedMoviePageState {
  movies: PartialMovieModel[];
}

export class TopRatedMoviePage extends Component<
  TopRatedMoviePageProps,
  TopRatedMoviePageState
> {
  state = {
    movies: []
  };

  constructor(props: TopRatedMoviePageProps) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    getTopRatedMovies()
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
          <Header title="Top Rated Movies" action="View All" />
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

export default TopRatedMoviePage;
