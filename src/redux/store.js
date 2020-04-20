import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, detail)

function detail(state = null, action, data) {
  switch (action.type) {
    case 'ADDSINGLE':
      return state = action.data
    case 'CLEAR':
      return state = null
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
