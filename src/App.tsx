import './App.css'
import MainBody from './components/body/main_body/MainBody'
import HeaderBar from './components/header/HeaderBar'
import { DictionaryProvider } from './services/DictionaryStore'



function App() {

  return (
    <DictionaryProvider>
      <HeaderBar />
      <MainBody />
    </DictionaryProvider>
      
  )
}

export default App
