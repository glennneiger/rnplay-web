'use strict';

import assign from 'lodash/object/assign';
import omit from 'lodash/object/omit';

import { createStore, getActionIds } from '../utils/redux/';
import { editor } from '../actions/';
import makeFileTree from '../utils/makeFileTree';

const actions = getActionIds(editor);

const initialState = {
  app: {},
  newName: null,
  newBuildId: null,
  showHeader: true,
  fileBodies: {},
  fileTree: {},
  currentFile: 'index.ios.js',
  appSaveInProgress: false
};

export default createStore(initialState, {

  [`${actions.switchApp}`]: (state, { app }) => ({
    ...state,
    app,
    fileTree: makeFileTree(Object.keys(app.files))
  }),

  [`${actions.switchFile}`]: (state, { currentFile }) => ({
    ...state,
    currentFile
  }),

  [`${actions.toggleHeader}`]: (state, { show }) => ({
    ...state,
    showHeader: show
  }),

  [`${actions.updateName}`]: (state, { newName }) => ({
    ...state,
    newName
  }),

  [`${actions.updateBody}`]: (state, { filename, body }) => ({
    ...state,
    fileBodies: assign({}, state.fileBodies, {[filename]: body})
  }),

  [`${actions.updateBuildId}`]: (state, { newBuildId }) => ({
    ...state,
    newBuildId
  }),

  [`${actions.saveFile}-success`]: (state, { filename}) => ({
    ...state,
    fileBodies: assign({}, omit(state.fileBodies, filename))
  }),

  [`${actions.saveApp}`]: (state) => ({
    ...state,
    appSaveInProgress: true
  }),

  [`${actions.saveApp}-success`]: (state) => ({
    ...state,
    fileBodies: {},
    newBuildId: null,
    appSaveInProgress: false
  })

});