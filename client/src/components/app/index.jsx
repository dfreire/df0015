// @flow
import React from 'react';
import { Formik, Field as FormikField, FieldArray as FormikFieldArray } from 'formik';
import { Form as AntdForm, Input as AntdInput } from 'antd';

import type { Card, Template, Field } from '../../domain';

const { cards, templates } = require('./data.json');

const TextField = (props: { templateField: Field, formikField: any }) => {
  return <AntdInput {...props.formikField} />;
};

const FileField = (props: { templateField: Field, formikField: any }) => {
  return <a href={`${props.formikField.value}`}>{props.formikField.value}</a>;
};

const CardField = (props: { templateField: Field, formikField: any }) => {
  const card = cards[props.formikField.value];
  return <a href={`${card.id}`}>{card.values[props.templateField.cardFieldKey]}</a>;
};

const renderField = (props: { templateField: Field, formikField: any }) => {
  // console.log('renderField', props.templateField, props.formikField);
  switch (props.templateField.type) {
    case 'text':
      return <TextField {...props} />;
    case 'file':
      return <FileField {...props} />;
    case 'card':
      return <CardField {...props} />;
    default:
      return <TextField {...props} />;
  }
};

const App = () => {
  const card: Card = cards['c-news-item-1'];
  const template: Template = templates[card.templateId];

  return (
    <div style={{ margin: 'auto', padding: 50, width: 600 }}>
      <Formik
        initialValues={card.values}
        render={({ values }) => (
          <AntdForm layout="vertical">
            {console.log('Formik values', values)}
            {template.fields.map(templateField => {
              if (templateField.isList) {
                return (
                  <AntdForm.Item key={templateField.key} label={templateField.label}>
                    <FormikFieldArray
                      name={templateField.key}
                      render={arrayHelpers => (
                        <ul>
                          {values[templateField.key].map((value, index) => (
                            <li key={`${templateField.key}.${index}`}>
                              <FormikField
                                name={`${templateField.key}.${index}`}
                                render={({ field: formikField }) =>
                                  renderField({ templateField, formikField })
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    />
                  </AntdForm.Item>
                );
              }
              return (
                <AntdForm.Item key={templateField.key} label={templateField.label}>
                  <FormikField
                    name={templateField.key}
                    render={({ field: formikField }) => renderField({ templateField, formikField })}
                  />
                </AntdForm.Item>
              );
            })}
          </AntdForm>
        )}
      />
    </div>
  );
};

export default App;
