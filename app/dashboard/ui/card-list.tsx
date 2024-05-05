import React from 'react'
import Card from './card'
import { cardsData } from '@/utils/placeholder-data'

const CardList = () => {
  return (
    <div className='grid gap-6 grid-col-12 md:grid-cols-3  '>
        {
            cardsData.map((card:any)=>{
                return <Card key={card.id} item={card}/>
            })
        }
    </div>
  )
}

export default CardList