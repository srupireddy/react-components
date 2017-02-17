import React from 'react'

import ListItemlStyle from './ListItem.scss';

class ListItem extends React.Component {
    constructor(props){
        super(props)
    }
    render() {

        let cards = [
            {'cityname': 'Chennai', 'id': 1},
            {'cityname': 'Mumbai', 'id': 2},
            {'cityname': 'Pune', 'id': 3}
        ];

        let elements = cards.map((element) => {
            return (<li key={element.id}><a href="">{element.cityname}</a></li>)
    })

    return       <div className={ListItemlStyle.ListContainerBlock}>
                       <ul className={ListItemlStyle.ListContainer}>{elements}</ul>
                 </div>
    }
}

export default ListItem;