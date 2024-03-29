import React, { Component, lazy, Suspense } from 'react';
import ErrorBoundary from '../../components/commons/error-boundary.component';
import Header from '../../components/commons/header.component';
import Loading from '../../components/commons/loading.component';
import { PartialMovieModel } from '../../models/movie';
import { searchMovies } from '../../services';
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';

const MovieList = lazy(() =>
  import('../../components/movies/list-movie.component')
);
const Navbar = lazy(() => import('../../components/commons/navbar.component'));

export interface SearchMoviePageQuery {
  id: string;
}
export interface SearchMoviePageProps {
  location?: Location;
  history?: any;
}
export interface SearchMoviePageState {
  movies: PartialMovieModel[];
  query: string;
}

export class SearchMoviePage extends Component<
  SearchMoviePageProps,
  SearchMoviePageState
> {
  state = {
    movies: [],
    query: ''
  };

  unlisten: Function;
  forceAbort: boolean = false;

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.fetchMovies();
    });

    this.fetchMovies();
  }

  fetchMovies() {
    const query = parse(this.props.location.search);
    const params = { ...query };

    delete params.title;

    searchMovies(query!.title as string, params)
      .then(({ results }) => results)
      .then(movies => !this.forceAbort && this.setState({ movies }));
  }

  componentWillUnmount() {
    this.forceAbort = true;
    this.unlisten();
  }

  render() {
    return (
      <div className="m-5">
        <Header title="Search Movies" />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <MovieList movies={this.state.movies} />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

export default withRouter(SearchMoviePage);
