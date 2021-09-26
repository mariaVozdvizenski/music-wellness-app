import React from 'react';
import MoodButton from './MoodButton';

class MoodList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ul className="mood-list">
            <MoodButton id="1" name="Happy"></MoodButton>
            <MoodButton id="2" name="Nostalgic"></MoodButton>
            <MoodButton id="3" name="Calm"></MoodButton>
            <MoodButton id="4" name="Focused"></MoodButton>
            <MoodButton id="5" name="Powerful"></MoodButton>
            <MoodButton id="6" name="Energetic"></MoodButton>
        </ul>
    }
}

export default MoodList