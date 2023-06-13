import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';


const Cards = [
    "😃",
    "🤢",
    "👽",
    "💀",
    "🤖",
    "😶‍🌫️",
]

const JuegoMemoria = ({ navigation }) => {

    const [board, setBoard] = useState(() => Shuffle([...Cards, ...Cards]))
    const [selectCards, setSelectCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (selectCards.length < 2) return;
        if (board[selectCards[0]] === board[selectCards[1]]) {
            setMatchedCards([...matchedCards, ...selectCards]);
            setSelectCards([])
        } else {
            const timeoutId = setTimeout(() => setSelectCards([]), 800)
            return () => clearImmediate(timeoutId)
        }
    }, [selectCards])



    const handleTapCard = (index) => {
        if (selectCards.length >= 2 || selectCards.includes(index)) return;
        setSelectCards([...selectCards, index])
        setScore(score + 1)
    }

    const didPlayerWin = () => matchedCards.length === board.length

    const resetGame = () => {
        setMatchedCards([])
        setSelectCards([])
        setScore(0)
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttomBack}>
                <AntDesign name='arrowleft' size={30} style={{ color: 'black' }} onPress={() => { navigation.goBack() }} />
            </View>
            <Text style={styles.title}>{didPlayerWin() ? 'felicitaciones' : 'Memoria'}</Text>
            <Text style={styles.title}>Score: {score}</Text>
            <View style={styles.board}>
                {board.map((card, index) => {
                    const isTurnedOver = selectCards.includes(index) || matchedCards.includes(index);
                    return (
                        <Card
                            key={index}
                            isTurnedOver={isTurnedOver}
                            onPress={() => handleTapCard(index)}
                        >
                            {card}
                        </Card>
                    )
                })}
            </View>
            {didPlayerWin() && (
                <Button onPress={resetGame} title='reset' />
            )}
        </View>
    )
}

export default JuegoMemoria

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: '900'
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20
    },
    buttomBack: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 30,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const Shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }

    return array
}