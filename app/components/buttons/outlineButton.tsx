type ButtonProps={
    label:string ,
    onClick?:()=>void;
    disable?:boolean;
    type?:"submit"|"button"
}
const OutlineButton:React.FC<ButtonProps> = ({label,onClick,disable,type}) => {
  return (
    <div>
      <button onClick={onClick} type={type} className="p-2 rounded-xl text-center w-full border-2 border-green-500 hover:bg-green-950 text-white ">{label}</button>
    </div>
  )
}

export default OutlineButton