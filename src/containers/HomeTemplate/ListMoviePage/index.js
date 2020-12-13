import React, { Component } from "react";
import Movie from "./../../../components/Movie";
import Loader from "./../../../components/Loader";
import * as action from "./modules/action";
import { connect } from "react-redux";

class ListMoviePage extends Component {
  componentDidMount() {
    this.props.fetchListMovie();
  }

  renderHTML = () => {
    const { data } = this.props;
    if (data && data.length > 0) {
      return data.map((movie) => {
        return (
          <div key={movie.maPhim} className="col-md-3">
            <Movie movie={movie} />
          </div>
        );
      });
    }
  };

  render() {
    const { loading } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="container">
        <h3>ListMoviePage</h3>
        <div className="row">{this.renderHTML()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    data: state.listMovieReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(action.actListMovieApi());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMoviePage);
