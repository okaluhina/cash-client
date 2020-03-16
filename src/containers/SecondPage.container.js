import { connect } from 'react-redux';
import SecondPage from 'components/SecondPage';
import Actions from 'store/main/actions';

const mapStateToProps = state => {
  return {
    second: state.main.second,
  };
};

const mapDispatchToProps = {
  loadSecond: Actions.Creators.loadSecondRequest,
  saveSecond: Actions.Creators.saveSecondRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage);
