import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { store, persistor } from './store'

import './index.less'
import './mobile.less'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/700.css'
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
 
  const { worker } = await import('./mocks/browser');
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
enableMocking().then(() => {
  const container = document.getElementById('root')!
  const root = createRoot(container)
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
});