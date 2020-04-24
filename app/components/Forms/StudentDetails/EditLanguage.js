import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import styles from '../user-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { storeLanguage } from 'dan-actions/studentProfileActions';
import { competencyOption, languageOption } from 'dan-api/apps/profileOption';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class EditLanguage extends React.Component {
  handleChange = (event, id) => {
    const { languageInfo, addInfo, } = this.props;
    const MapLanguageInfo = languageInfo.toJS();
    const newLanguageArr = MapLanguageInfo.map((item, index) => {
      if (index == id) {
        return {
          ...item,
          [event.target.name]: event.target.value
        }
      }
      else {
        return { ...item }
      }
    })
    addInfo({ ...this.props, languageInfo: newLanguageArr });
  };

  render() {
    const { classes, id, languageInfo } = this.props;

    const MapLanguageInfo = languageInfo.toJS();
    const { language, competency } = MapLanguageInfo[id];

    return (
      <section className={classes.pageFormWrap}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-language"
            >
              Language
              </InputLabel>
            <Select
              placeholder="select-language"
              value={language}
              name="language"
              required
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {languageOption.map((item, index) => (
                item.length > 0 &&
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="select-competency"
            >
              Language Competency
              </InputLabel>
            <Select
              placeholder="select-competency"
              value={competency}
              name="competency"
              required
              onChange={e => this.handleChange(e, id)}
              MenuProps={MenuProps}
            >
              {competencyOption.map((item, index) => (
                item.length > 0 &&
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

      </section >
    );
  }
}

const reducerStudent = 'studentProfile';

EditLanguage.propTypes = {
  classes: PropTypes.object.isRequired,
  languageInfo: PropTypes.object.isRequired,
  oldLanguageInfo: PropTypes.object.isRequired,
  addInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  languageInfo: state.getIn([reducerStudent, 'languageInfo']),
  oldLanguageInfo: state.getIn([reducerStudent, 'oldLanguageInfo'])
});

const mapDispatchToProps = dispatch => ({
  addInfo: bindActionCreators(storeLanguage, dispatch)
});

const EditLanguageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLanguage);

export default withStyles(styles)(EditLanguageMapped);
