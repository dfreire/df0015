// @flow
import React from 'react';
import { Form, Input } from 'antd';

import type { Card, Template, Field } from '../../domain';

const { cards, templates } = require('./data.json');
const card: Card = cards['c0'];
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

const ListField = (props: { field: Field, values: Array<any> }) => (
  <div>
    <p>{props.field.label}</p>
    <ul key={props.field.key}>
      {props.values.map(value => {
        const { listItemType, listItemCaptionKey } = props.field;
        switch (listItemType) {
          case 'text':
            return (
              <li key={value}>
                <a href={`/${value}`}>{value}</a>
              </li>
            );
          case 'file':
            return (
              <li key={value}>
                <a href={`/${value}`}>{value}</a>
              </li>
            );
          default:
            const itemCard = cards[value];
            const itemTemplate = templates[itemCard.templateId];
            const itemField = itemTemplate.fields.find(f => f.key === listItemCaptionKey);
            const itemCaption = itemCard.values[listItemCaptionKey];
            return (
              <li key={value}>
                <a href={`/${value}`}>{itemCaption}</a>
              </li>
            );
        }
      })}
    </ul>
  </div>
);

const App = () => (
  <div style={{ margin: 'auto', padding: 50, width: 600 }}>
    <Form layout="vertical">
      {template.fields.map(field => {
        const value = card.values[field.key];
        switch (field.type) {
          case 'text':
            return <TextField key={field.key} field={field} value={value} />;
          case 'file':
            return <FileField key={field.key} field={field} value={value} />;
          case 'list':
            return <ListField key={field.key} field={field} values={value} />;
          default:
            return <p key={field.key}>{field.type}</p>;
        }
      })}
    </Form>
  </div>
);

export default App;
