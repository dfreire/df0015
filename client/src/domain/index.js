// @flow

export type FieldType = 'text' | 'file' | 'card';

export type Template = {
  id: string,
  name: string,
  fields: Array<{
    key: string,
    type: FieldType,
    label: string,
    isList?: boolean,
    card?: {
      templateId: string,
      canSelect?: boolean,
      canCreate?: boolean,
      canRemove?: boolean,
    },
  }>,
  captionKey: string,
};

export type Card = {
  id: string,
  templateId: string,
  values: { [key: string]: any },
};
