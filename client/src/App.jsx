import { useEffect, useState } from 'react'
import { getVoteStatus } from './api/votesApi.js'
import Header from './components/Header/Header.jsx'
import Loader from './components/Loader/Loader.jsx'
import VoteForm from './components/VoteForm/VoteForm.jsx'
import VotesBoard from './components/VotesBoard/VotesBoard.jsx'

function App() {
  // null = still checking with the server
  const [hasVoted, setHasVoted] = useState(null)

  useEffect(() => {
    getVoteStatus()
      .then(({ voted }) => setHasVoted(voted))
      .catch(() => setHasVoted(false))
  }, [])

  return (
    <main className="app">
      <Header />
      {hasVoted === null && <Loader />}
      {hasVoted === false && <VoteForm onVoted={() => setHasVoted(true)} />}
      {hasVoted === true && <VotesBoard />}
    </main>
  )
}

export default App
