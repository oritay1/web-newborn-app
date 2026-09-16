import Header from './components/Header/Header.jsx'
import VoteForm from './components/VoteForm/VoteForm.jsx'
import VotesBoard from './components/VotesBoard/VotesBoard.jsx'

function App() {
  // TODO: switch between VoteForm and VotesBoard based on the voter status
  const hasVoted = false

  return (
    <main className="app">
      <Header />
      {hasVoted ? <VotesBoard /> : <VoteForm />}
    </main>
  )
}

export default App
