// @flow

type AtomType = 'text' | 'file' | 'card';
// | 'textarea'
// | 'number'
// | 'date'
// | 'link'
// | 'tags'
// | 'select'; // instead of radios/checkboxes

type ListType = 'list';

type TemplateId = string;

export type Field = {
  type: AtomType | ListType | TemplateId,
  key: string,
  label: string,
};

type ListField = Field & {
  type: ListType,
  atomsType: AtomType | TemplateId,
};

export type Template = {
  id: TemplateId,
  name: string,
  fields: Array<Field>,
};

type Lang = 'pt' | 'en' | 'de' | 'ja';

export type Card = {
  id: string,
  templateId: TemplateId,
  values: {
    [lang: Lang]: {
      [fieldKey: string]: any,
    },
  },
};
