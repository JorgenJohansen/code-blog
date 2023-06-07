import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LIST_VIEW_ICONS = ['list','border-all']

const FilteringMenu = ({onChange, filter}) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

  return (
    <>
    {domLoaded && (
        <div className='filtering-menu mb-2'>
    <FontAwesomeIcon
        className='clickable hoverable'
        size="2x"
        icon={LIST_VIEW_ICONS[filter.view.list]}
        onClick={() => {
        onChange('view', {list: +!filter.view.list});}}></FontAwesomeIcon>
    </div>)}
    </>
  )
}

export default FilteringMenu