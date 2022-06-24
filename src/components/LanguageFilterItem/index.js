// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, isActive, changeActiveStatus} = props

  const buttonStyle = isActive === eachItem.id ? 'active-button' : 'button'
  const onSelected = () => {
    const {id} = eachItem

    changeActiveStatus(id)
  }

  return (
    <li className="list-item">
      <button className={buttonStyle} type="button" onClick={onSelected}>
        {eachItem.language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
