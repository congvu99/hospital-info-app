import React, { ReactNode } from 'react';
import { useField } from 'formik';
import {
  AutoComplete,
  ComboBox,
  MultiColumnComboBox,
  DropDownList,
  MultiSelect,
} from '@progress/kendo-react-dropdowns';

interface DropdownInputProps {
  label: string;
  children: ReactNode;
  error?: string | boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({ label, children, error }) => (
  <div style={{ marginBottom: '20px' }}>
    <p>{label}</p>
    {children}
    {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
  </div>
);

interface FormikComponentProps {
  name: string;
  data: any[];
  placeholder?: string;
  columns?: { field: string; header: string }[];
  textField?: string;
  dataItemKey?: string;
}

export const FormikAutoComplete: React.FC<FormikComponentProps> = ({ name, data, placeholder }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <DropdownInput label="AutoComplete" error={meta.touched && meta.error}>
      <AutoComplete
        style={{ width: '300px' }}
        data={data}
        placeholder={placeholder}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      />
    </DropdownInput>
  );
};

export const FormikComboBox: React.FC<FormikComponentProps> = ({ name, data }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <DropdownInput label="ComboBox" error={meta.touched && meta.error}>
      <ComboBox
        style={{ width: '300px' }}
        data={data}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      />
    </DropdownInput>
  );
};

export const FormikMultiColumnComboBox: React.FC<FormikComponentProps> = ({ name, data, columns, textField }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <DropdownInput label="MultiColumnComboBox" error={meta.touched && meta.error}>
      <MultiColumnComboBox
        style={{ width: '300px' }}
        data={data}
        columns={columns || []}
        textField={textField}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      />
    </DropdownInput>
  );
};

export const FormikDropDownList: React.FC<FormikComponentProps> = ({ name, data }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <DropdownInput label="DropDownList" error={meta.touched && meta.error}>
      <DropDownList
        style={{ width: '300px' }}
        data={data}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      />
    </DropdownInput>
  );
};

export const FormikMultiSelect: React.FC<FormikComponentProps> = ({ name, data }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <DropdownInput label="MultiSelect" error={meta.touched && meta.error}>
      <MultiSelect
        style={{ width: '300px' }}
        data={data}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      />
    </DropdownInput>
  );
};