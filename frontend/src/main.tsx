import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from "@apollo/client"
import { client } from './utils/apolloClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </>
)
