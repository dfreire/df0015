// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Formik, FieldArray as FormikFieldArray, Field as FormikField } from 'formik';
import { Form as AntdForm, Input, Button } from 'antd';
import { get } from 'lodash';

import type { Card, Template, Field } from '../../domain';

const { cards, templates } = require('./data.json');

const TextField = (props: { templateField: Field, formikField: any }) => {
  return <Input {...props.formikField} />;
};

const FileField = (props: { templateField: Field, formikField: any }) => {
  return <Link to={`/${props.formikField.value}`}>{props.formikField.value}</Link>;
};

const CardField = (props: { templateField: Field, formikField: any }) => {
  const card = cards[props.formikField.value];
  const displayKey = get(props, 'templateField.card.displayKey', 'id');
  const displayValue = get(card.values, displayKey, card.id);
  return <Link to={`/${card.id}`}>{displayValue}</Link>;
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

const Form = (props: { card: Card, template: Template }) => {
  const { card, template } = props;
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

type Props = {
  match: {
    params: {
      id: string,
    },
  },
};

type State = {
  card?: Card,
  template?: Template,
  fetchId?: string,
  loading: boolean,
  notFound: boolean,
};

class Page extends React.PureComponent<Props, State> {
  state: State = {
    card: undefined,
    template: undefined,
    fetchId: undefined,
    loading: false,
    notFound: false,
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update = () => {
    const id = get(this.props, 'match.params.id', 'index');
    const { fetchId } = this.state;

    if (id !== fetchId) {
      console.log('fetch', id);
      this.setState({
        card: undefined,
        template: undefined,
        fetchId: id,
        loading: true,
        notFound: false,
      });

      setTimeout(() => {
        const card: Card = cards[id];
        if (card != null) {
          const template: Template = templates[card.templateId];
          if (template != null) {
            this.setState({ loading: false, card, template });
            return;
          }
        }
        this.setState({ loading: false, notFound: true });
      }, 1000);
    }
  };

  render() {
    const { card, template, loading, notFound } = this.state;

    return (
      <div>
        <Link to="/">TOP</Link> | <Link to="/xpto">xpto</Link>
        {notFound && <p>Not Found</p>}
        {loading && <p>Loading...</p>}
        {card != null && template != null && <Form card={card} template={template} />}
      </div>
    );
  }
}

const App = () => (
  <Router>
    <Switch>
      <Route path="/:id" component={Page} exact />
      <Route component={Page} />
    </Switch>
  </Router>
);

export default App;
