import React, { useEffect } from "react";
import Movie from "components/Movie";
import Loader from "components/Loader";
import { actListMovieApi } from "containers/HomeTemplate/ListMoviePage/modules/action";
import { connect } from "react-redux";

function HomePage(props) {
  useEffect(() => {
    props.fetchListMovie();
  }, []);

  const renderHTML = () => {
    const { data, loading } = props;
    if (loading) return <Loader />;
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

  return (
    <div className="container">
      <h3>ListMoviePage</h3>
      <div className="row">{renderHTML()}</div>
    </div>
  );
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
      dispatch(actListMovieApi());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
