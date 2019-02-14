// @flow

type TemplateId = string;

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
  atomsType: AtomType | TemplateId,
};

type Template = {
  id: string,
  name: string,
  fields: Array<Field>,
};

type Lang = 'pt' | 'en' | 'de' | 'ja';

type Card = {
  id: string,
  templateId: string,
  title: string,
  values: { [lang: Lang]: { [fieldKey: string]: any } },
};
