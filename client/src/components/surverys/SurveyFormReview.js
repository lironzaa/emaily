//surveyFormReview show users thier form for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
//משתמש לראוטינג אחרי ביצוע פעולה כמו שליחת טופס, נותן נגישות לאובייקט היסטורי
import * as actions from '../../actions';

//און קנסל משנה את הסטייט לפאלס ומחזיר אותנו לסרבי פורם
//פורםוליוס אנו מקבלים מרידוקס סטור בפונקציית המפס או סטייט
//סבמיטסרבי האקשן קריאטור שיצרנו לשליחת הסקר לשרת
//היסטורי האובייקט שקיבלנו מויט ראוטר לבצע ראוטינג באקשן קריאטור עצמו
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  //איטרציה על כל שדה ששמרנו בהגדרות כדי ליצור לו אינפוט להצגה, הערך עצמו מגיע מפורם וליוס
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5>Please confirm your entires</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      //ישנה את הסטייס לפאלס יחזיר אותנו לטופס עצמו
      >
        Back
      </button>
      <button
        //האקשן כריאטור שלנו, יקבל את הערכים ואת אובייקט ההיסטוריה
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text btn-flat right">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
  //שליפה של הנתונים מהסטייט פורם זה המקור של הטפסים, סורביפורם זה השם שבחרו לו בטופס הקודם
}

//חיבור של withRuter בנוסף למפס סטייט טו פרופס
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));