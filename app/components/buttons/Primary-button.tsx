type ButtonProps={
    label:string ,
    onClick?:()=>void;
    disable?:boolean;
    type?:"submit"|"button"
}
const PrimaryButton:React.FC<ButtonProps> = ({label,onClick,disable,type}) => {
  return (
    <div>
      <button onClick={onClick} type={type} className="p-2 rounded-xl text-center w-full bg-green-500 text-white ">{label}</button>
    </div>
  )
}

export default PrimaryButton