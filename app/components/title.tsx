import React from 'react'

type TitleProps={
  title:string,
  large?:boolean
}
const Title :React.FC<TitleProps>= ({title,large}) => {
  return (
    <h2 className={`text-neutral-600  p-2 ${large?"text-4xl":"text-2xl"} text-start `}>{title}</h2>
  )
}

export default Title