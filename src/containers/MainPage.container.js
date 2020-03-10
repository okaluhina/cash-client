import { connect } from 'react-redux';
import MainPage from 'components/MainPage';
import Actions from 'store/main/actions';

const mapStateToProps = state => {
  return {
    info: state.main.info,
  };
};

const mapDispatchToProps = {
  loadInfo: Actions.Creators.loadInfoRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
