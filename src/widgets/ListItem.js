import React from 'react'

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
            return (<li key={element.id}>{element.cityname}</li>)
    })

    return <ul>{elements}</ul>
    }
}

export default ListItem;