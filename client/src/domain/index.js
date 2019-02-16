// @flow

type FieldType = 'text' | 'file' | 'card';

type TemplateId = string;

export type Field = {
  label: string,
  type: FieldType,
  key: string,
  isList?: boolean,
  cardTemplateId?: string,
  cardFieldKey?: string,
};

export type Template = {
  id: TemplateId,
  name: string,
  fields: Array<Field>,
};

export type Card = {
  id: string,
  templateId: TemplateId,
  values: { [key: string]: any },
};
