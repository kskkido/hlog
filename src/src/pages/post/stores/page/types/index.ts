import * as states from 'states';

export type State = {
  brightness: states.brightness.types.State;
  menu: states.menu.types.State;
  cursor: states.cursor.types.State;
  history: states.history.types.State;
  scene: states.scene.types.State;
  scroll: states.scroll.types.State;
  animations: states.animations.types.State;
};
