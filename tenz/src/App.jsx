import React from "react"
import { nanoid } from 'nanoid'
import Tex from "./tex"
import Confetti from "react-confetti"



export default function App(){


  const[dice, setdice]=React.useState(Gen())

  const[tenzie,settenzie]=React.useState(false)



  React.useEffect(() =>{
    const totalheld =dice.every(die => die.isHeld)
    const firstvalue=dice[0].value
    const totalvalue =dice.every(die =>die.value===firstvalue)
    if(totalheld && totalvalue){
      settenzie(true)
    }
  },[dice])

  function julius() {
     return{
        
        
      value: Math.ceil(Math.random()*6),
      id:nanoid(),
      isHeld:false,
      
     }
  }

  
 function Gen(){
    const GenArray=[]
    for(let i=0; i<10; i++){
      GenArray.push(julius())
    }
    return GenArray
 }
 

 
       function Roll(id){

        if(!tenzie){

          setdice(oldDice => oldDice.map(die =>{
             return  die.isHeld ? die :julius()
          }))
        }else{

          settenzie(false)
          setdice(Gen())
        }
       }
       
       function Hold(id){
       setdice(oldDice => oldDice.map(die =>{
         return die.id === id ?{...die, isHeld:!die.isHeld} :
         die
        }))
    

       }

  const diceshown =dice.map(die => <Tex   
    value={die.value} 
     key={die.id}
     isHeld={die.isHeld}
    holdDice={() => Hold(die.id)}
   />)

    


  return (
    <main>
      {tenzie && <Confetti />}
      {tenzie && <p>You won</p>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
      {diceshown}
      </div>
      <button className="roll-dice" onClick={Roll}>{tenzie ? "New Game":"Roll"}</button>

    </main>
  )

}