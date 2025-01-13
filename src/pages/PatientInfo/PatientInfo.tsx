import React from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {FormikAutoComplete, FormikDropDownList, FormikMultiSelect} from "../../components/common/dropdown/DropdownInput";
import {FormikDatePicker} from "../../components/common/dateInput/DateInput";

const PatientInfo: React.FC = () => {
    const sports = [
        'Baseball',
        'Basketball',
        'Cricket',
        'Field Hockey',
        'Football',
        'Table Tennis',
        'Tennis',
        'Volleyball'
    ];

    const validationSchema = Yup.object({
        autoComplete: Yup.string().required('This field is required'),
        dropDownList: Yup.string().required('This field is required'),
        multiSelect: Yup.array().min(1, 'Select at least one option'),
        date: Yup.date().required('This field is required'),
    });
  return (
      <div className={"container"}>
          <Formik
              initialValues={{
                  autoComplete: '',
                  dropDownList: '',
                  multiSelect: [],
                  date:''
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
              }}
          >
              {() => (
                  <Form>
                      <FormikAutoComplete name="autoComplete" data={sports} placeholder="Your favorite sport"/>
                      <FormikDropDownList name="dropDownList" data={sports} placeholder="Your favorite sport"/>
                      <FormikMultiSelect name="multiSelect" data={sports} placeholder="Your favorite sport"/>

                      <FormikDatePicker name="date" label="Select Date" placeholder="MM/DD/YYYY" />

                      <button type="submit" className={"btn btn-primary"} style={{marginTop: '20px'}}>
                          Submit
                      </button>
                  </Form>
              )}
          </Formik>
      </div>
  );
};

export default PatientInfo;
