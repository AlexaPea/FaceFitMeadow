import React from 'react';
import { View, Image } from 'react-native';

const Obstacles = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft}) => {

    return (
        <>
            <Image style={{
                position: 'absolute',
                width: obstacleWidth,
                height: 360,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
                zIndex: 90
            }}  source={require('../assets/game/tree1.png')}></Image>
            <Image style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
                zIndex: 90,
                //marginBottom:150
            }}
            source={require('../assets/game/tree2.png')}></Image>
        </>
    )
}

export default Obstacles