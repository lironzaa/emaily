//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
//reduxForm מקביל לפונקציית הקונקט
//Field נותן את היכולת להציג כל אינפוט שמתאים לטפסים
//ניתן לחבר את השדה החדש שיצרנו לפילד ובכך לקבל את כל הפונקציונליות שלו לשדה שלנו
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    //יוצר שדה עבור כל אובייקט
    return _.map(formFields, ({ label, name }) => {
      return <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}>
      </Field>
    })
  }

  render() {
    return (
      //הנדל סבמיט הוא פונקציה אשר מועברת לנו מרידקס פורם ונוספת לנו כפרופ
      //אליה נעביר איזה פונקציה תרוץ כאשר היוזר ילחץ על הסמביט
      //און סרבי סבמיט הופכת את הסטייט שלנו לטרו ומציגה את הריויו פורם
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button
            className="teal btn-flat right white-text"
            type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  //כדי למנוע הפעלת הפונקציה על אנדיפנייד מועבר סטרינג ריק בהתחלה

  //בודק תקלה של כל שדה ומוסיף הערת שגיאה
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

//מקביל לחיבור של רידקס לקומפוננט רגיל
export default reduxForm({
  validate,
  //מבקש ולידציה
  form: 'surveyForm',
  //פורם יהיה השם של האובייקט אשר ישמור את המידע של הטופס ברידקס סטור
  //ישמש אותנו בטופס הריויו כדי להציג את המידע
  destroyOnUnmount: false
  //הנתונים לא ימחקו במעבר עמוד
})(SurveyForm);