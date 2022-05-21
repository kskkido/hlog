import * as lib from 'lib';

export type Actor = {
  menu: lib.element.types.HTMLElement;
  menuTrigger: lib.element.types.HTMLElement;
  breadcrumbs: lib.element.types.HTMLElement;
  brightnessTrigger: lib.element.types.HTMLElement;
  cursor: lib.element.types.HTMLElement;
  header: lib.element.types.HTMLElement;
  footer: lib.element.types.HTMLElement;
  title: lib.element.types.HTMLElement;
  postList: lib.element.types.HTMLElement;
  postFilter: lib.element.types.HTMLElement;
};
