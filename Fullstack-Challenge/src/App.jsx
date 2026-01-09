import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './game.jsx'

function App() {
  const [current_page, set_current_page] = useState("home")
  const [difficulty, set_difficulty] = useState("medium")
  const [category, set_category] = useState("9")

  return (
    <>
      <header>
        <h1>Trivia Wars!</h1>
      </header>
      <main>
        {current_page === "home" && <IntroPage 
          set_current_page={set_current_page} 
          set_difficulty={set_difficulty} 
          category={category} 
          set_category={set_category}
          difficulty={difficulty}
          />}
        {current_page === "game" && <Game 
        difficulty={difficulty}
        category={category}
        set_current_page={set_current_page}
        />}

      </main>
    </>
  )
}


// this is the new feature that is a login form for the app!

function IntroPage({set_current_page, set_difficulty, difficulty, category, set_category}) {
  return ( 
  <div className="intro-container">
    <h3>About the game:</h3>
    <h4>This is a trivia game where contestants will be tested on their knowledge of obscure facts!</h4>
    <h4>Please select a difficulty, as well as your desired category of trivia. Then press "Start" to get right into the game!</h4>

    <div className="difficulty_selection">
      <h2>Choose your Difficulty!</h2>
      <select value={difficulty} onChange={(e) => set_difficulty(e.target.value)}>
        <option value={"easy"}>Easy</option>
        <option value={"medium"}>Medium</option>
        <option value={"hard"}>Hard</option>
      </select>
    </div>
    
    <div className="category_selection">
      <h2>Select a Category!</h2>
      <select value={category} onChange={(e) => set_category(e.target.value)}>
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Movies</option>
        <option value="15">Video Games</option>
        <option value="14">Television</option>
        <option value="17">Science and Nature</option>
      </select>
    </div>
    
    <button onClick={() => set_current_page("game")}>Start!</button>
  </div>
  )
}

export default App
