  const songList = {
    1: "But I'm a constant headache, A tooth out of line, They try to make you regret it You tell 'em, 'No not this time.', I'm just a constant headache, A dead pet device, You hang me up unfinished with the better part of me no longer mine".split(', '),
    2: "Looking at your face in the dark, You don't even look that smart, Could never make it past that part and now I guess we never will, Looking for the keys to the truck, Your body's saying isn't that enough, Your brain is going i don't give a fuck, You treat it like a game of skill, But its more like a work of art, Or money in a christmas card, You think about it way too hard, I'm gonna stay with you until, You disappear into the crowd, I don't know what you tried to tell me, you know i think about it still".split(', '),
  );

  // INITIAL REDUX STATE
  const initialState = {
    songLyricsArray: songLyricsArray,
    arrayPosition: 0,
  }

  // REDUX REDUCER
  const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case 'ACTION_ONE':
        // any necessary logic
        newState = {
          firstStateItem: state.firstStateItem,
          secondStateItem: state.secondStateItem,
          stateItemBeingChanged: action.newUpdatedStateValue,
        }
        return newState;
      case 'ACTION_TWO':
        // any necessary logic
        newState = {
          firstStateItem: state.firstStateItem,
          secondStateItem: state.secondStateItem,
          stateItemBeingChanged: action.differentUpdatedStateValue,
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

  expect(reducer({
      songLyricsArray: songLyricsArray,
      arrayPosition: 1,
    },
    { type: 'RESTART_SONG' })
  ).toEqual(initialState);

  // REDUX STORE
  const { createStore } = Redux;
  const store = createStore(reducer);

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
    if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
      store.dispatch({ type: 'RESTART_SONG' } );
    } else {
      store.dispatch({ type: 'NEXT_LYRIC' } );
    }
  }

  // SUBSCRIBE TO REDUX STORE
  store.subscribe(renderLyrics);
