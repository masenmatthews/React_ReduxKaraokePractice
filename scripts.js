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

  const rootReducer = this.Redux.combineReducers({
    currentSongId: songChangeReducer,
    songsById: lyricChangeReducer
  });

  // REDUX STORE
  const { createStore } = Redux;
  const store = createStore(rootReducer);

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

  expect(rootReducer(initialState, { type: null })).toEqual(initialState);

  expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
  expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));


  // RENDERING STATE IN DOM
  const renderLyrics = () => {
    const lyricsDisplay = document.getElementById('lyrics');
    while (lyricsDisplay.firstChild) {
      lyricsDisplay.removeChild(lyricsDisplay.firstChild);
    }

    if (store.getState().currentSongId) {
      const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
      document.getElementById('lyrics').appendChild(currentLine);
    } else {
      const selectSongMessage = document.createTextNode("Select a song from the menu above to sing along!");
      document.getElementById('lyrics').appendChild(selectSongMessage);
    }
  }

  const renderSongs = () => {
    console.log('renderSongs method successfully fired!');
    console.log(store.getState());
    const songsById = store.getState().songsById;
    for (const songKey in songsById) {
      const song = songsById[songKey]
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const em = document.createElement('em');
      const songTitle = document.createTextNode(song.title);
      const songArtist = document.createTextNode(' by ' + song.artist);
      em.appendChild(songTitle);
      h3.appendChild(em);
      h3.appendChild(songArtist);
      h3.addEventListener('click', function() {
        selectSong(song.songId);
      });
      li.appendChild(h3);
      document.getElementById('songs').appendChild(li);
    }
  }

  window.onload = function() {
    renderSongs();
    renderLyrics();
  }

  // CLICK LISTENER
  const userClick = () => {
    if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
      store.dispatch({ type: 'RESTART_SONG',
                       currentSongId: store.getState().currentSongId });
    } else {
      store.dispatch({ type: 'NEXT_LYRIC',
                       currentSongId: store.getState().currentSongId });
    }
  }

  const selectSong = (newSongId) => {
    let action;
    if (store.getState().currentSongId) {
      action = {
        type: 'RESTART_SONG',
        currentSongId: store.getState().currentSongId
      }
      store.dispatch(action);
    }
    action = {
      type: 'CHANGE_SONG',
      newSelectedSongId: newSongId
    }
    store.dispatch(action);
  }

  // SUBSCRIBE TO REDUX STORE
  store.subscribe(renderLyrics);
