// @flow
import React from 'react';
import { Form, Input } from 'antd';

import type { Card, Template, Field } from '../../domain';

const lang = 'pt';
const { cards, templates } = require('./data.json');
const card: Card = cards['1'];
const template: Template = templates[card.templateId];

const TextField = (props: { field: Field, value: any }) => (
  <Form.Item key={props.field.key} label={props.field.label}>
    <Input placeholder="placeholder" value={props.value} />
  </Form.Item>
);

const FileField = (props: { field: Field, value: any }) => (
  <Form.Item key={props.field.key} label={props.field.label}>
    <a href="#">{props.value}</a>
  </Form.Item>
);

const CardField = (props: { field: Field }) => <p key={props.field.key}>{props.field.label}</p>;

const ListField = (props: { field: Field }) => <p key={props.field.key}>{props.field.label}</p>;

const App = () => (
  <div style={{ margin: 'auto', padding: 50, width: 600 }}>
    <p>{JSON.stringify(template)}</p>
    <p>{JSON.stringify(card)}</p>
    <Form layout="vertical">
      {template.fields.map(field => {
        const value = card.values[lang][field.key];
        switch (field.type) {
          case 'text':
            return <TextField key={field.key} field={field} value={value} />;
          case 'file':
            return <FileField key={field.key} field={field} value={value} />;
          case 'card':
            return <CardField key={field.key} field={field} />;
          case 'list':
            return <ListField key={field.key} field={field} />;
          default:
            return <p key={field.key}>{field.type}</p>;
        }
      })}
    </Form>
  </div>
);

export default App;
