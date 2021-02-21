import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../commons/error-boundary.component";
import Loading from "../commons/loading.component";
import { PartialMovieModel } from "../../models/movie";
import { bucket } from "../../constants/bucket.config";

const Card = lazy(() => import("../commons/card.component"));

export interface CardMovieProps {
  movie: PartialMovieModel;
  className?: string;
}
export interface CardMovieState {}

export class CardMovie extends Component<CardMovieProps, CardMovieState> {
  static defaultProps = {
    className: null
  };

  render() {
    return (
      <ErrorBoundary type="card">
        <Suspense fallback={<Loading />}>
          <Card {...{ className: this.props.className }}>
            <img
              src={bucket + this.props.movie.poster_path}
              className="rounded-xl"
            />
            <div className="absolute bottom-0 text-white w-full p-2 bg-opacity-50 bg-black rounded-b-xl">
              {this.props.movie.title}
            </div>
          </Card>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default CardMovie;
