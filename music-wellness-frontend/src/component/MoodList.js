import React from 'react';
import MoodButton from './MoodButton';
import MoodService from '../service/MoodService'

class MoodList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            moods: [],
            error: false
        };
    }

    componentDidMount() {
        MoodService.getAllMoods().then(data => {
            this.setState({moods: data})
        }).catch(error => {
            this.setState({error: true})
        })
    }
    

    render() {
        return <ul className="mood-list">
            {
                this.state.moods.map((mood, i) => <MoodButton id={mood.id} name={mood.moodName} key={mood.id}></MoodButton>)
            }
        </ul>
    }
}

export default MoodList