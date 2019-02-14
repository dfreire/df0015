// @flow

type AtomType = 'text' | 'card';
// | 'textarea'
// | 'number'
// | 'date'
// | 'link'
// | 'file'
// | 'tags'
// | 'select'; // instead of radios/checkboxes

type ListType = 'list';

type Field = {
  type: AtomType | ListType,
  key: string,
  label: string,
};

type ListField = Field & {
  type: ListType,
  atomsType: AtomType,
};

type Template = {
  id: string,
  name: string,
  fields: Array<Field>,
};

type Card = {
  id: string,
  templateId: string,
  title: string,
  values: { [fieldKey: string]: any },
};
