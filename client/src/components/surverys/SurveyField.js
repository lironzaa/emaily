// SurveyField contains logic to render a single label and text input
import React from 'react';

//מטה משמש אותנו לולדציות
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: '5px' }} {...input} ></input>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
//העברה של כל האיונט אנדלרס כמו און צאנג און סאבמיט לאינפוט עצמו...