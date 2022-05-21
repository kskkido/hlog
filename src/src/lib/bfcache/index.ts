export const disable = (w: Window) => {
  w.onpageshow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      w.location.reload();
    }
  };
  w.onbeforeunload = () => {};
  w.onunload = () => {};
};
