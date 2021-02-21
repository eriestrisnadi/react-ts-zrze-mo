import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../../components/commons/error-boundary.component";
import Header from "../../components/commons/header.component";
import Loading from "../../components/commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { searchMovies } from "../../services";
import { parse } from "query-string";
import { withRouter } from "react-router-dom";

const MovieList = lazy(() =>
  import("../../components/movies/list-movie.component")
);
const Navbar = lazy(() => import("../../components/commons/navbar.component"));

export interface SearchMoviePageQuery {
  id: string;
}
export interface SearchMoviePageProps {
  location?: Location;
  history?: any;
}
export interface SearchMoviePageState {
  movies: PartialMovieModel[];
}

export class SearchMoviePage extends Component<
  SearchMoviePageProps,
  SearchMoviePageState
> {
  state = {
    movies: []
  };

  unlisten: Function;

  constructor(props: SearchMoviePageProps) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.fetchMovies();
    });

    this.fetchMovies();
  }

  fetchMovies() {
    const query = parse(this.props.location.search);

    searchMovies(query!.title as string)
      .then(({ results }) => results)
      .then(movies => this.setState({ movies }));
  }

  componentWillUnmount() {
    this.unlisten();
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
          <Header title="Search Movies" action="View All" />
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

export default withRouter(SearchMoviePage);
