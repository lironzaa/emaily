//SurveyNew shows SurveyForm and SurveyFormReview
import React from 'react';
import { reduxForm } from 'redux-form';
//מקבילה לפונקציית הקונקט
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveryNew extends React.Component {
  state = { showFormReview: false };
  //משמש כדי לדפדף בין העמוד הזה לעמוד הריויו, כאשר יהיה טרו נציג את עמוד הריויו
  //משתמשים בסטייט ברמת הקומפוננט (מפורט בקבצים)

  //יציג או את הפורם או את הריויו פורם
  renderContect() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />;
    }
    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
  }

  render() {
    return (
      <div>
        {this.renderContect()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
  //החיבור פה לרידקספורם על מנת להוסיף את דיסטרוי און אנמאונט אשר בברירת המחדל
  //פועל וכאשר נצא מעמוד לכל עמוד אחר חוץ לנקסט ננקה את הנתונים של הטופס
  //ללא ההוספה של זה פרטי הטופס לא יתנקו במעבר בין עמודים בכלל
})(SurveryNew);
//מקביל לחיבור של הקונקט