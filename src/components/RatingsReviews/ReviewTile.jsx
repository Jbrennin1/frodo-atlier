import React, { useState } from 'react'
import StarsWidget from './StarsWidget'
import Report from '../QuestionsAnswers/ReportButton.jsx'
import CarouselPhoto from './CarouselPhoto.jsx'
import format from 'date-fns/format'
import { sendHelpful, sendHurtful } from './reviewsapi.js'

export default function ReviewTile({ review, setPhoto }) {

  const [helpful, setHelpful] = useState(false)
  const clippedReview = review.body.slice(0, 251)
  const restReview = review.body.slice(251)
  const [showMore, setShowMore] = useState(!!restReview)
  const [showLess, setShowLess] = useState(false)
  const [report, setReport] = useState('Report')
  const [helpfulLabel, setHelpfulLabel] = useState('Yes')

  const handleShowMore = (evt) => {
    setShowMore(false)
    setShowLess(true)
  }

  const handleShowLess = (evt) => {
    setShowMore(true)
    setShowLess(false)
  }

  const handleHelpful = (evt) => {
      sendHelpful(review.review_id)
      .then(res => {
        if (res.data !== 'Feedback already recieved'){
          console.log(res)
          setHelpful(true)
          setHelpfulLabel('Thank you!')
        }
      })
      .catch(err => console.log(err))

  }
  const handleHurtful = (evt) => {
    sendHurtful(review.review_id)
    .then(res => setReport(res.data))
    .catch(err => console.log(err.data))
  }
  console.log(review)

   if(review.photos[0] === null) {
    console.log('nulllll')
     review.photos = [{url: ''}]
   }
  return (
    <div className="border-b-2 border-l-2" title="review-tile">
      <div className="flex justify-between px-5 pt-5">
        <div>
          <StarsWidget rating={review.rating} />
        </div>
        <div>{review.reviewer_name}, {review.date}</div>
      </div>
      <div className="px-5 py-5 font-bold text-2xl">{review.summary}</div>
      <div className="px-5 pb-5">
        <span>
          {!showMore ? clippedReview + restReview : clippedReview}{showMore && restReview && '...'}
        </span>
        {showMore && <span className="float-right hover:text-cyan-800 cursor-pointer" onClick={handleShowMore}>Show more</span>}
        {showLess && <span className="float-right hover:text-cyan-800 cursor-pointer" onClick={handleShowLess}>Show less</span>}
      </div>
      <div className="px-5">
        {review.recommend && <div className="flex justify-left w-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" className="w-min mt-2 dark:fill-slate-200"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" /></svg>
          <span className="pl-3 mt-1 text-s pb-5">I recommend this product</span></div>}
      </div>
      <div>
        {review.response && <div className="pb-5">
          <div className="ml-5 mr-5 bg-slate-200 dark:bg-zinc-600 ">
            <div className="px-3 py-3 font-bold">Response from the seller:</div>
            <div className="pl-3 pb-3">{review.response}</div>
          </div>
        </div>}
      </div>
      <div>
        {review.photos.length > 0 && <div className="pb-5 px-5 carousel">
          {review.photos.map(photo => {
          return (<CarouselPhoto src={photo.url} setPhoto={setPhoto} key={photo.id} setDelButton={() => {}}/>)})}
        </div>}
      </div>
      <div className="px-5 pb-5">
        <small>
          Helpful?{ }
          <span className="cursor-pointer underline pl-1" onClick={handleHelpful}>
            {helpfulLabel} ({ helpful ? review.helpfulness + 1 : review.helpfulness })
          </span>
          {' '}|
          <span className="cursor-pointer underline pl-1" onClick={handleHurtful}>
            {report}
          </span>
        </small>
      </div>
    </div>
  )
}