import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../components/commons/error-boundary.component";
import Header from "../components/commons/header.component";
import Loading from "../components/commons/loading.component";
import { PartialMovieModel } from "../models/movie";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../services";

const MovieList = lazy(() =>
  import("../components/movies/list-movie.component")
);

export interface HomePageProps {}
export interface HomePageState {
  topRated: PartialMovieModel[];
  popular: PartialMovieModel[];
  upcoming: PartialMovieModel[];
}

export class HomePage extends Component<HomePageProps, HomePageState> {
  state = {
    topRated: [],
    popular: [],
    upcoming: []
  };

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      topRated: [],
      popular: [],
      upcoming: []
    };
  }

  componentDidMount() {
    getTopRatedMovies()
      .then(({ results }) => results)
      .then(topRated => this.setState({ topRated }));

    getPopularMovies()
      .then(({ results }) => results)
      .then(popular => this.setState({ popular }));

    getUpcomingMovies()
      .then(({ results }) => results)
      .then(upcoming => this.setState({ upcoming }));
  }

  render() {
    return (
      <div className="m-5">
        <Header title="Top Rated Movies" action="View All" />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <MovieList movies={this.state.topRated} limit={5} />
          </Suspense>
        </ErrorBoundary>

        <Header title="Popular Movies" action="View All" />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <MovieList movies={this.state.popular} limit={5} />
          </Suspense>
        </ErrorBoundary>

        <Header title="Upcoming Movies" action="View All" />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <MovieList movies={this.state.upcoming} limit={5} />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

export default HomePage;
