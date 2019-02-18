// @flow
import React from 'react';
import { get } from 'lodash';
import { Formik, FieldArray as FormikFieldArray, Field as FormikField } from 'formik';
import { Form as AntdForm, Input, Button } from 'antd';

import type { Card, Template, Field } from '../../domain';

const { cards, templates } = require('./data.json');

const TextField = (props: { templateField: Field, formikField: any }) => {
  return <Input {...props.formikField} />;
};

const FileField = (props: { templateField: Field, formikField: any }) => {
  return <a href={`${props.formikField.value}`}>{props.formikField.value}</a>;
};

const CardField = (props: { templateField: Field, formikField: any }) => {
  const card = cards[props.formikField.value];
  const displayKey = get(props, 'templateField.card.displayKey', 'id');
  const displayValue = get(card.values, displayKey, card.id);
  return <a href={`${card.id}`}>{displayValue}</a>;
};

const renderField = (props: { templateField: Field, formikField: any }) => {
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
        onSubmit={(values, formikBag) => {
          console.log('onSubmit', { values, formikBag });
        }}
        onReset={(values, formikBag) => {
          console.log('onReset', { values, formikBag });
        }}
        render={formikProps => (
          <AntdForm
            layout="vertical"
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
          >
            {console.log('Formik values', formikProps.values)}
            {template.fields.map(templateField => {
              if (templateField.isList) {
                return (
                  <AntdForm.Item key={templateField.key} label={templateField.label}>
                    <FormikFieldArray
                      name={templateField.key}
                      render={arrayHelpers => (
                        <ul>
                          {formikProps.values[templateField.key].map((value, index) => (
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
            <AntdForm.Item>
              <Button type="primary" htmlType="submit" disabled={false}>
                Save
              </Button>
            </AntdForm.Item>
            <AntdForm.Item>
              <Button type="secondary" htmlType="reset" disabled={false}>
                Cancel
              </Button>
            </AntdForm.Item>
          </AntdForm>
        )}
      />
    </div>
  );
};

export default App;
