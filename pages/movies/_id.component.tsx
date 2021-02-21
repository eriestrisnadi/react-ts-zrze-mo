import React, { Component, lazy, Suspense } from "react";
import { match } from "react-router-dom";
import ErrorBoundary from "../../components/commons/error-boundary.component";
import Loading from "../../components/commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { getDetailMovie } from "../../services";

const Navbar = lazy(() => import("../../components/commons/navbar.component"));

export interface MovieDetailPageParams {
  id: string;
}
export interface MovieDetailPageProps {
  match?: match<MovieDetailPageParams>;
}
export interface MovieDetailPageState {
  movie: PartialMovieModel;
}

export class MovieDetailPage extends Component<
  MovieDetailPageProps,
  MovieDetailPageState
> {
  state = {
    movie: undefined
  };

  constructor(props: MovieDetailPageProps) {
    super(props);

    this.state = { movie: undefined };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getDetailMovie(id).then(movie => this.setState({ movie }));
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
        </ErrorBoundary>
        <div>{!!this.state.movie ? this.state.movie.title : ""}</div>
      </div>
    );
  }
}

export default MovieDetailPage;
