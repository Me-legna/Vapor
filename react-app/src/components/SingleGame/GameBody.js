// import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addToCart } from "../../store/cart"
import { authenticate } from "../../store/session"
import { useModal } from "../../context/Modal"
import './SingleGame.css'
import AddedToLibrary from "../Cart/AddedToLibrary"
import { useEffect } from "react"

function GameBody() {
    const singleGame = useSelector(state => state.games.singleGame)
    const user = useSelector(state => state.session.user)
    const inLibrary = user && user.games_owned.find(game => game.id === singleGame.id)
    const inCart = user && user.cart.items.find(game => game.id === singleGame.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalContent } = useModal()

    console.log('inLibrary', inLibrary)
    console.log('inCart', inCart)


    useEffect(()=> {
        dispatch(authenticate())
    }, [dispatch])

    useEffect(()=> {
    },[inLibrary, inCart])

    async function addGame(e, gameId) {
        e.preventDefault()
        if(user){
            await dispatch(addToCart(gameId))
            await dispatch(authenticate())
            if(singleGame.price === 0){
                setModalContent(<AddedToLibrary />)
            }else{
                history.push('/cart')
            }
        }else{
            history.push('/login')
        }
    }

    return (
        <div className="game-body-comp-container">
            <div className="game-body-left">
                <div>
                    {inLibrary
                        ?
                        <div className="game_owned_banner">
                            <div className="game_owned_container">
                                <div className="game_owned_flag">

                                </div>
                                <div className="game_owned_message">
                                    {singleGame.title} is already in your Vapor library
                                </div>

                            </div>
                        </div>
                        :
                        <div className="buy_game_container">
                            <h1>Buy {singleGame.title}</h1>
                            <div className="purchase_action_container">
                                <div className="purchase_button_container">
                                    <div className="purchase_btn_price">${singleGame.price}</div>
                                    <button className="btn_addtocart" onClick={(e) => addGame(e, singleGame.id)}>
                                        {singleGame.price === 0
                                            ? "Add to Library"
                                            : inCart
                                                ? "In Cart"
                                                : "Add to Cart"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <br />
                <br />
                <br />
                <div>
                    <h2>ABOUT THIS GAME</h2>
                    {singleGame.about}
                </div>
                <br />
                <br />
                <br />
                {/* <div>
                        <h2>MATURE CONTENT DESCRIPTION</h2>
                    </div> */}
                <div>
                    <h2>SYSTEM REQUIREMENTS </h2>
                    <div>
                        {singleGame.systems?.map((system, idx) => (
                            <div className="system_requirement_tag" key={system + idx}>{system}</div>
                        ))}
                    </div>
                </div>
                {/* <div>
                        <h2>MORE LIKE THIS</h2>
                        <div>
                            genre.games?
                        </div>
                    </div> */}
            </div>
            {/* <div className="game-body-right">

                </div> */}
        </div>
    )
}

export default GameBody
