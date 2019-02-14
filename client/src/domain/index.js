// @flow

type TemplateId = string;

type AtomType = 'text' | 'file' | TemplateId;
// | 'textarea'
// | 'number'
// | 'date'
// | 'link'
// | 'tags'
// | 'select'; // instead of radios/checkboxes

type ListType = 'list';

export type Field = {
  type: AtomType | ListType,
  atomsType?: AtomType,
  key: string,
  label: string,
};

export type Template = {
  id: TemplateId,
  name: string,
  fields: Array<Field>,
  captionKey: string,
};

export type Card = {
  id: string,
  templateId: TemplateId,
  values: {
    [fieldKey: string]: any,
  },
};
