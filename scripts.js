  const songList = {
    1: "But I'm a constant headache, A tooth out of line, They try to make you regret it You tell 'em, 'No not this time.', I'm just a constant headache, A dead pet device, You hang me up unfinished with the better part of me no longer mine".split(', '),
    2: "Looking at your face in the dark, You don't even look that smart, Could never make it past that part and now I guess we never will, Looking for the keys to the truck, Your body's saying isn't that enough, Your brain is going i don't give a fuck, You treat it like a game of skill, But its more like a work of art, Or money in a christmas card, You think about it way too hard, I'm gonna stay with you until, You disappear into the crowd, I don't know what you tried to tell me, you know i think about it still".split(', ')
  };

  // INITIAL REDUX STATE
  const initialState = {
    currentSongId: null,
    songsById: {
      1: {
        title: "Constant Headache",
        artist: "Joyce Manor",
        songId: 1,
        songArray: songList[1],
        arrayPosition: 0,
      },
      2: {
        title: "Christmas Card",
        artist: "Joyce Manor",
        songId: 2,
        songArray: songList[2],
        arrayPosition: 0,
      }
    }
  };

  // REDUX REDUCERS
  const lyricChangeReducer = (state = initialState.songsById, action) => {
    let newArrayPosition;
    let newSongsByIdEntry;
    let newSongsByIdStateSlice;
    switch (action.type) {
      case 'NEXT_LYRIC':
        newArrayPosition = state[action.currentSongId].arrayPosition + 1;
        newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
          arrayPosition: newArrayPosition
        })
        newSongsByIdStateSlice = Object.assign({}, state, {
          [action.currentSongId]: newSongsByIdEntry
        });
        return newSongsByIdStateSlice;
      case 'RESTART_SONG':
        newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
          arrayPosition: 0
        })
        newSongsByIdStateSlice = Object.assign({}, state, {
          [action.currentSongId]: newSongsByIdEntry
        });
        return newSongsByIdStateSlice;
      default:
        return state;
    }
  }

  const songChangeReducer = (state = initialState.currentSongId, action) => {
    switch (action.type){
      case 'CHANGE_SONG':
        return action.newSelectedSongId
      default:
        return state;
    }
  }

  // JEST TESTS + SETUP
  const { expect } = window;

  expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

  expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
    1: {
      title: "Constant Headache",
      artist: "Joyce Manor",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Christmas Card",
      artist: "Joyce Manor",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 1,
    }
  });

  expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
    1: {
      title: "Constant Headache",
      artist: "Joyce Manor",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Christmas Card",
      artist: "Joyce Manor",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  });

  expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

  expect(songChangeReducer(initialState, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

  // REDUX STORE
  const { createStore } = Redux;
  const store = createStore(lyricChangeReducer);

  // RENDERING STATE IN DOM
  // const renderLyrics = () => {
  //   const lyricsDisplay = document.getElementById('lyrics');
  //   while (lyricsDisplay.firstChild) {
  //     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  //   }
  //   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  //   const renderedLine = document.createTextNode(currentLine);
  //   document.getElementById('lyrics').appendChild(renderedLine);
  // }
  //
  // window.onload = function() {
  //   renderLyrics();
  // }
  //
  // // CLICK LISTENER
  // const userClick = () => {
  //   if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
  //     store.dispatch({ type: 'RESTART_SONG' } );
  //   } else {
  //     store.dispatch({ type: 'NEXT_LYRIC' } );
  //   }
  // }
  //
  // // SUBSCRIBE TO REDUX STORE
  // store.subscribe(renderLyrics);
