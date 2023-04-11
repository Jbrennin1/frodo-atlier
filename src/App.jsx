import { useState, useEffect } from 'react'
import Overview from './components/Overview/Overview.jsx'
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx'
import Banner from './Banner.jsx'

function App() {
  const [theme, setTheme] = useState('light')
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
      setTheme('dark')
      document.getElementById('themetoggle').checked = false
    }
  }, [])

  const handleOverviewClick = (e) => {
    console.log('Overview')
    console.log('Clicked: ', e.target)
    console.log('at: ', new Date(Date.now()).toString())
  }

  const handleQuestionsAnswersClick = (e) => {
    console.log('Questions & Answers')
    console.log('Clicked: ', e.target)
    console.log('at: ', new Date(Date.now()).toString())
  }

  const handleRatingsReviewsClick = (e) => {
    console.log('Ratings & Reviews')
    console.log('Clicked: ', e.target)
    console.log('at: ', new Date(Date.now()).toString())
  }

  return (
    <div className={theme}>
      <div className='bg-white text-zinc-900 dark:text-slate-200 dark:bg-zinc-800'>
        <Banner setTheme={setTheme} theme={theme} cartItems={cartItems}/>
        <div className='mx-auto w-11/12 overflow-auto'>
          <div onClick={handleOverviewClick}>
            {/*<Overview setCartItems={setCartItems}/> */}
          </div>
          <div onClick={handleQuestionsAnswersClick}>
            {/*<QuestionsAnswers />*/}
          </div>
          <div onClick={handleRatingsReviewsClick}>
            <RatingsReviews />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
