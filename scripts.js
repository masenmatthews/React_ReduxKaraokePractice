  const songLyricsArray = "But I'm a constant headache, a tooth out of line They try to make you regret it You tell 'em, 'No, not this time.' I'm just a constant headache, a dead pet device You hang me up unfinished With the better part of me no longer mine".split(', ');

  // INITIAL REDUX STATE
  const initialState = {
    songLyricsArray: songLyricsArray,
    arrayPosition: 0,
  }

  // REDUX REDUCER
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEXT_LYRIC':
        let newArrayPosition = state.arrayPosition + 1;
        let newState = {
          songLyricsArray: state.songLyricsArray,
          arrayPosition: newArrayPosition,
        }
        return newState;
      default:
        return state;
    }
  }

  // JEST TESTS + SETUP
  const { expect } = window;

  expect(reducer(initialState, { type: null })).toEqual(initialState);

  expect(reducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
    songLyricsArray: songLyricsArray,
    arrayPosition: 1
  });

  // REDUX STORE
  const { createStore } = Redux;
  const store = createStore(reducer);
  console.log(store.getState());

  // RENDERING STATE IN DOM
  const renderLyrics = () => {
    const lyricsDisplay = document.getElementById('lyrics');
    while (lyricsDisplay.firstChild) {
      lyricsDisplay.removeChild(lyricsDisplay.firstChild);
    }
    const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
    const renderedLine = document.createTextNode(currentLine);
    document.getElementById('lyrics').appendChild(renderedLine);
  }

  window.onload = function() {
    renderLyrics();
  }

  // CLICK LISTENER
  const userClick = () => {
    console.log('click');
    store.dispatch({ type: 'NEXT_LYRIC'} );
  }

  // SUBSCRIBE TO REDUX STORE
  store.subscribe(renderLyrics);
