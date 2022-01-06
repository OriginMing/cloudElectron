import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomButton = ({text,colorClass,icon,onBtnClick})=>{
    return (
        <button
        type='button'
        className={`btn btn-clock no-border ${colorClass}`}
        onClick={onBtnClick}
        > 
   <FontAwesomeIcon
   size='lg'
   icon={icon}
   />
   {text}
        </button>
    )
}
export default BottomButton