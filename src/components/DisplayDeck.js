import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";


const DisplayDeck = () => {

    const INITIAL_STATE = []
    const [deck, setDeck] = useState()
    const [cards, setCards] = useState(INITIAL_STATE)
    const [timer, setTimer] = useState(false);
    const timerRef = useRef(null);

    useEffect(function fetchDeckId() {
        async function getDeckId() {
            const res = await axios.get("http://deckofcardsapi.com/api/deck/new/");
            setDeck(res.data)
        }
       getDeckId()
    },[setDeck])


    useEffect(function drawNewCard() {
        async function fetchCard() {

            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`);

            const card = res.data.cards[0];

            setCards(c => [...c, {
               code: card.code,
               img: card.image
            }]);


            if(card.remaining === 0) {
                alert("There are no more cards")
            }
           
        }

        if(timer && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await fetchCard()
             }, 1000)
        }


        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null
        }
    }, [setCards, timer, deck.deck_id])
 


    const toggle = () => {
        setTimer(timer => !timer)
    }
 

    return (
        <div>
        
         <button onClick={toggle}>Draw Card</button>
        {cards.map(card => <Card img={card.img} key={card.code} code={card.code}/>)}
        </div>
    )
}

export default DisplayDeck