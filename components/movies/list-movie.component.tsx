import React, { Component, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../commons/error-boundary.component";
import Loading from "../commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { take } from "../../utils";

const CardMovie = lazy(() => import("./card-movie.component"));

export interface ListMovieProps {
  movies?: PartialMovieModel[];
  limit?: number;
}
export interface ListMovieState {}

export class ListMovie extends Component<ListMovieProps, ListMovieState> {
  static defaultProps = {
    movies: [],
    limit: 0
  };

  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {take(
              this.props.movies,
              this.props.limit > 0 ? this.props.limit : this.props.movies.length
            ).map(movie => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <CardMovie {...{ movie }} />
              </Link>
            ))}
          </div>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default ListMovie;
