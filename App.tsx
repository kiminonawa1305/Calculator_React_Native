/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';


function App(): React.JSX.Element {
    const [match, setMatch] = useState("");
    const [display, setDisplay] = useState("");

    const split_match_by_brackets = (match: string): string => {
        for (let index = 0; index < match.length; index++) {
            if (match.at(index) === "(") {
                return split_match_by_brackets(match.substring(index + 1, match.length))
            } else if (match.at(index) === ")") {
                return match.substring(0, index);
            }
        }

        return "NaN"
    };

    const match_customer = (match: string) => {
        const token = match.replaceAll(" ", "");

        const array_match = token.split(/(\+|-)/);
        array_match.map((value, index) => {
            if (value.length > 2) {
                let split_token = value.split(/(\*|\/)/)
                array_match[index] = while_match(split_token)
            }
        });


        return while_match(array_match);
    }

    const while_match = (split_token: string[]) => {
        if (split_token.length % 2 === 0) return "NaN"

        while (split_token.length >= 3) {
            const [x, operator, y, ...remaining] = split_token;
            remaining.unshift(match_helper([x, operator, y]) as string);
            split_token = remaining;
        }

        return split_token[0]
    }

    const match_helper = (array_token: string[]) => {
        switch (array_token[1]) {
            case '+':
                return parseFloat(array_token[0]) + parseFloat(array_token[2])
            case '-':
                return parseFloat(array_token[0]) - parseFloat(array_token[2])
            case '*':
                return parseFloat(array_token[0]) * parseFloat(array_token[2])
            case '/': {
                if (array_token[2] === '0') return "Infinity"
                else return parseFloat(array_token[0]) / parseFloat(array_token[2])
            }
        }

        return "NaN"
    }

    const calculator = (match: string) => {
        match = match.replaceAll("%", " / 100");

        while (match.includes("(")) {
            if (!match.includes(")")) return "NaN"
            const sub_match = split_match_by_brackets(match);
            match = match.replace(`(${sub_match})`, match_customer(sub_match))
        }

        return match_customer(match)
    }

    const eventButtonInput = (text: string) => {
        setMatch(prevState => {
            const result = prevState + text;
            setDisplay(result.replaceAll("*", "x"))
            return result
        })
    }

    return (
        <View style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '100%'
        }}>
            <Text style={{
                backgroundColor: '#000',
                fontSize: 30,
                color: '#fff',
                textAlign: 'right',
                height: '20%'
            }}>{display}</Text>
            <View style={{
                height: '80%',
                flexDirection: 'row',
                flex: 1
            }}>
                <TouchableOpacity onPress={event => {
                    setMatch("");
                    setDisplay("")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>C</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    setMatch(prevState => {
                        let result = ";"
                        if (prevState.length == 0) result = "";
                        else result = prevState.substring(0, prevState.length - 1)

                        setDisplay(result.replaceAll("*", "x"));
                        return result;
                    });
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>AC</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    eventButtonInput("%")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>%</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => (eventButtonInput("/"))} style={styles.button}><Text style={{
                    color: '#000'
                }}>/</Text></TouchableOpacity>
            </View>
            <View style={{
                height: '80%',
                flexDirection: 'row',
                flex: 1
            }}>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("7")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>7</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("8")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>8</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("9")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>9</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("*")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>X</Text></TouchableOpacity>
            </View>
            <View style={{
                height: '80%',
                flexDirection: 'row',
                flex: 1
            }}>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("4")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("5")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("6")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("-")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>-</Text></TouchableOpacity>
            </View>
            <View style={{
                height: '80%',
                flexDirection: 'row',
                flex: 1
            }}>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("1")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("2")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("3")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("+")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>+</Text></TouchableOpacity>
            </View>
            <View style={{
                height: '80%',
                flexDirection: 'row',
                flex: 1
            }}>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("(")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>(</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput(")")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>)</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput("0")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>0</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    eventButtonInput(",")
                }} style={styles.button}><Text style={{
                    color: '#000'
                }}>,</Text></TouchableOpacity>
                <TouchableOpacity onPress={event => {
                    const result = calculator(match);
                    setMatch(result);
                    setDisplay(result)
                }} style={[styles.button, {
                    backgroundColor: "#e0aa47"
                }]}><Text style={{
                    color: '#000',
                }}>=</Text></TouchableOpacity>
            </View>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: '#000',
        borderColor: '#e0aa47',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 300,
        height: 100,
    }
});
