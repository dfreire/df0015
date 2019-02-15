// @flow

type TemplateId = string;

type FieldType = 'text' | 'file' | TemplateId;
// | 'textarea'
// | 'number'
// | 'date'
// | 'link'
// | 'tags'
// | 'select'; // instead of radios/checkboxes

export type Field = {
  type: FieldType | 'list',
  key: string,
  label: string,
  listItemType?: FieldType,
  listItemCaptionKey?: string,
};

export type Template = {
  id: TemplateId,
  name: string,
  fields: Array<Field>,
};

export type Card = {
  id: string,
  templateId: TemplateId,
  values: {
    [fieldKey: string]: any,
  },
};
