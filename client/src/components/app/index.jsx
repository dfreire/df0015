// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Formik, FieldArray as FormikFieldArray, Field as FormikField } from 'formik';
import { Form as AntdForm, Input, Button } from 'antd';
import { get } from 'lodash';

import type { Card, Template, FieldType } from '../../domain';

const { cards, templates } = require('./data.json');

const TextField = (props: { formikField: any }) => {
  return <Input {...props.formikField} />;
};

const FileField = (props: { formikField: any }) => {
  return <Link to={`/${props.formikField.value}`}>{props.formikField.value}</Link>;
};

const CardField = (props: { formikField: any }) => {
  const card = cards[props.formikField.value];
  const template = templates[card.templateId];
  const caption = get(card.values, template.captionKey, card.id);
  return <Link to={`/${card.id}`}>{caption}</Link>;
};

const renderField = (props: { type: FieldType, formikField: any }) => {
  const { type, formikField } = props;

  switch (type) {
    case 'text':
      return <TextField formikField={formikField} />;
    case 'file':
      return <FileField formikField={formikField} />;
    case 'card':
      return <CardField formikField={formikField} />;
    default:
      return <TextField formikField={formikField} />;
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
                                  renderField({ type: templateField.type, formikField })
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
                    render={({ field: formikField }) =>
                      renderField({ type: templateField.type, formikField })
                    }
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
  fetchId?: string,
  loading: boolean,
  card?: Card,
  template?: Template,
};

class Page extends React.PureComponent<Props, State> {
  state: State = {
    fetchId: undefined,
    loading: false,
    card: undefined,
    template: undefined,
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
      console.log('---');
      console.log('fetch', id);
      this.setState({
        fetchId: id,
        loading: true,
        card: undefined,
        template: undefined,
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
        this.setState({ loading: false });
      }, 1000);
    }
  };

  render() {
    const { loading, card, template } = this.state;

    return (
      <div>
        <Link to="/">TOP</Link> | <Link to="/xpto">xpto</Link>
        {loading && <p>Loading...</p>}
        {!loading && (card == null || template == null) && <p>Not Found</p>}
        {!loading && card != null && template != null && <Form card={card} template={template} />}
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
