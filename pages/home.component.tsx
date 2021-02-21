import React, { Component, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/commons/error-boundary.component";
import Loading from "../components/commons/loading.component";
import Header from "../components/commons/header.component";
import { PartialMovieModel } from "../models/movie";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../services";

const MovieList = lazy(() =>
  import("../components/movies/list-movie.component")
);
const Navbar = lazy(() => import("../components/commons/navbar.component"));

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
      <div>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
        </ErrorBoundary>
        <div className="m-5">
          <Header
            title="Top Rated Movies"
            action={
              <Link
                className="text-xs text-gray-600 font-semibold"
                to="/movies/top-rated"
              >
                View All
              </Link>
            }
          />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MovieList movies={this.state.topRated} limit={6} />
            </Suspense>
          </ErrorBoundary>

          <Header
            title="Popular Movies"
            action={
              <Link
                className="text-xs text-gray-600 font-semibold"
                to="/movies/top-popular"
              >
                View All
              </Link>
            }
          />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MovieList movies={this.state.popular} limit={6} />
            </Suspense>
          </ErrorBoundary>

          <Header
            title="Upcoming Movies"
            action={
              <Link
                className="text-xs text-gray-600 font-semibold"
                to="/movies/top-upcoming"
              >
                View All
              </Link>
            }
          />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MovieList movies={this.state.upcoming} limit={6} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default HomePage;
