const userClick = () => {
  const songLyricsArray = "But I'm a constant headache, a tooth out of line They try to make you regret it You tell 'em, 'No, not this time.' I'm just a constant headache, a dead pet device You hang me up unfinished With the better part of me no longer mine".split(', ');

  // INITIAL REDUX STATE
  const initialState = {
    songLyricsArray: songLyricsArray,
    arrayPosition: 0,
  }

  // REDUCER WILL GO HERE

  // JEST TESTS + SETUP WILL GO HERE

  // REDUX STORE
  const { createStore } = Redux;
  const store = createStore(reducer);
  console.log(store.getState());

  // CLICK LISTENER
  const userClick = () => {
    console.log('click');
  }
