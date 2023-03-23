import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NewReviewModal from './components/RatingsReviews/NewReviewModal.jsx'
import FullSizePhoto from './components/RatingsReviews/FullSizePhoto.jsx'
import './index.css'
import AddAnswer from './components/QuestionsAnswers/AddAnswerButton.jsx'

ReactDOM.createRoot(document.getElementById('NewReviewModal')).render(
  <NewReviewModal />
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)