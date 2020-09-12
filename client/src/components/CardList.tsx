import React from 'react'
import { Card } from '../Card'
import FloatingCard from './FloatingCard'

const CardList = (props: { cards: Array<Card> }) => (
  <section className="card-list">
    {props.cards.map((card: Card) => (
      <FloatingCard {...card} key={card.id} />
    ))}
  </section>
)

export default CardList
