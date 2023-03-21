import React, {useState,useEffect} from 'react'
import axios from 'axios'
import QuestionList from './QuestionList'

const QuestionsAnswers = () => {
    const [questions, setQuestions] = useState([])
    const [productName, setProductName] = useState([])

    useEffect(() => {
        getQuestions()
    },[])

    useEffect(() => {
        getProductName()
    },[])

    let productId = window.location.pathname.slice(1) || 37311;
    
    const getProductName = () => {
        axios.get(`http://localhost:3000/product/${productId}`)
        .then(response => {
            // console.log('DATA RECEIVED FROM PRODUCTNAME: ', response.data.name)
            setProductName(response.data.name)
        })
        .catch(err => {
            console.log('Error on getQuestions: ', err )
        })
    }

    const getQuestions = () => {
        axios.get('http://localhost:3000/questions', { params: { productId } })
        .then(response => {
            setQuestions(response.data.results)
            // console.log('DATA RECEIVED FROM GETQUESTIONS: ', response.data.results)
        })
        .catch(err => {
            console.log('Error on getQuestions: ', err )
        })
    }

    return (
        <div className="flex-column w-full border-2" style={{ margin: '0 auto', maxWidth: '1150px', marginBottom: '100px', marginTop: '100px',}}>
            <b>QUESTIONS & ANSWERS</b>
            <QuestionList questions={questions} setQuestions={setQuestions} productId={productId} productName={productName} getQuestions={getQuestions}/>

        </div>
    )
}

export default QuestionsAnswers;