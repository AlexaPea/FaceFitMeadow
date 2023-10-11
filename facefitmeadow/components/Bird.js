import React from 'react';
import { View, Image } from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 208
    const birdHeight = 131

    return (
    
            <Image style={{
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
            zIndex: 90
            }}
            source={require('../assets/game/player.png')}
            />
      
    )
}

export default Bird