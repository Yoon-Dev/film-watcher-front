import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, detail)

function detail(state = {general: null, src: null, lasts: null}, action, data) {
  switch (action.type) {
    case 'ADDSINGLE':
      return state = {general: action.data, src: state.src, lasts: state.lasts}
    case 'ADDSRC':
      return state = {general: state.general, src: action.data, lasts: state.lasts}
    case 'ADDLAST':
      return state = {general: state.general, src: state.src, lasts: action.data}
    case 'CLEAR':
      return state = {general: null, src: null, lasts: null}
    default:
      return state
  }
}


// export let store = createStore(detail)
export let store = createStore(persistedReducer)
export let persistor = persistStore(store)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
