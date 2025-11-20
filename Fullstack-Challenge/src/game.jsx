import { useState, useEffect, useRef } from 'react'
import './game.css'

export default function Game({difficulty, category, set_current_page}) {
    const [questions, set_questions] = useState([])
    const [loading, set_loading] = useState(true)
    const [current_question_index, set_current_question_index] = useState(0)
    const [selected_answer, set_selected_answer] = useState(null)
    const [score, set_score] = useState(0)
    const [game_over, set_game_over] = useState(false)
    const [time_left, set_time_left] = useState(30)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const url = `https://opentdb.com/api.php?amount=8&category=${category}&difficulty=${difficulty}&type=multiple`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                set_questions(data.results)
            }
            set_loading(false)
        })
        .catch(error => {
            console.error("Error while fetching questions:", error)
            set_loading(false)
        })
    }, [])

    const handleAnswerClick = (answer) => {
        if (selected_answer) return
        
        set_selected_answer(answer)
        
        if (answer === questions[current_question_index].correct_answer) {
            set_score(score + 1)
        }
    }

    const handleNextQuestion = () => {
        if (current_question_index + 1 < questions.length) {
            set_current_question_index(current_question_index + 1)
            set_selected_answer(null)
        } else {
            set_game_over(true)
        }
    }

    const handlePlayAgain = () => {
        set_current_page("home")
    }

    if (loading) {
        return <h2>Loading Questions...</h2>
    }

    if (questions.length === 0) {
        return <h2>No questions available. Try again!</h2>
    }

    if (game_over) {
        const percentage = Math.round((score / questions.length) * 100)
        return (
            <div className="game-over">
                <h1>Game Over!</h1>
                <h2>You got {score} out of {questions.length} correct</h2>
                <h2>Your score: {percentage}%</h2>
                {(score > 6) && <h2>Your skill level: Trivia Master!</h2>}
                {(score > 4 && score < 7) && <h2>Your skill level: Trivia Amateur</h2>}
                {(score < 5) && <h2>Your skill level: Trivia Novice</h2>}
                <button onClick={handlePlayAgain}>Play Again</button>
            </div>
        )
    }

    const decodeHTML = (html) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    const current_question = questions[current_question_index]
    const all_answers = [...current_question.incorrect_answers, current_question.correct_answer].sort()

    return (
        <div className="game-container">
            <h2>Question {current_question_index + 1} of {questions.length}</h2>
            <h3>{decodeHTML(current_question.question)}</h3>
            
            <div className="answers">
                {all_answers.map((answer, index) => {
                    let button_style = {}
                    
                    if (selected_answer) {
                        if (answer === current_question.correct_answer) {
                            button_style = { backgroundColor: '#4CAF50', color: 'white', borderColor: '#4CAF50' }
                        } else if (answer === selected_answer) {
                            button_style = { backgroundColor: '#f44336', color: 'white', borderColor: '#f44336' }
                        }
                    }
                    
                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(answer)}
                            style={button_style}
                            disabled={selected_answer !== null}
                        >
                            {decodeHTML(answer)}
                        </button>
                    )
                })}
            </div>
    
            {selected_answer && (
                <div className="feedback">
                    {selected_answer === current_question.correct_answer ? (
                        <p style={{color: '#4CAF50'}}>Correct! ✓</p>
                    ) : (
                        <p style={{color: '#f44336'}}>
                            Wrong! The correct answer was: {decodeHTML(current_question.correct_answer)}
                        </p>
                    )}
                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            )}
        </div>
    )
}