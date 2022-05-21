import * as lib from 'lib';

export type Actor = {
  main: lib.element.types.HTMLElement;
  menu: lib.element.types.HTMLElement;
  menuTrigger: lib.element.types.HTMLElement;
  brightnessTrigger: lib.element.types.HTMLElement;
  cursor: lib.element.types.HTMLElement;
  header: lib.element.types.HTMLElement;
  footer: lib.element.types.HTMLElement;
  title: lib.element.types.HTMLElement;
  posts: ReadonlyArray<lib.element.types.HTMLElement>;
};
