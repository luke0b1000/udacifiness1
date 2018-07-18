import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import UdaciSliders from "./UdaciSliders";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    );
}

export default class AddEntry extends Component {
    state = {
        run: 20,
        bike: 10,
        swim: 50,
        sleep: 0,
        eat: 0
    };
    increment = metric => {
        const { max, step } = getMetricMetaInfo(metric);

        this.setState(state => {
            const count = state[metric] + step;
            return {
                [metric]: count > max ? max : count
            };
        });
    };
    decrement = metric => {
        this.setState(state => {
            const count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                [metric]: count < 0 ? 0 : count
            };
        });
    };
    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }));
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state; // { 'bike': 10, ....} basically object

        // Update Redux

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }));

        // Navigate to home screen

        // Save to 'DB'
        submitEntry({ key, entry });

        // Clear local notification such as your reminder
    };
    reset = () => {
        const key = timeToString();

        // Update Redux

        // Route to home

        // Update the DB
        removeEntry(key);
    };
    render() {
        const metaInfo = getMetricMetaInfo();

        // this.props.alreadyLogged = true;
        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name="ios-happy-outline" size={100} />
                    <Text>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            );
        }

        return (
            <View>
                <DateHeader date={new Date().toLocaleDateString()} />
                <Text>{JSON.stringify(this.state)}</Text>
                // key is bike, run... as it loops // rest is an Object
                {Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key];
                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === "sliders" ? (
                                <UdaciSliders
                                    value={value}
                                    onChange={value => this.slide(key, value)}
                                    {...rest}
                                />
                            ) : (
                                <UdaciSteppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            )}
                            }
                        </View>
                    );
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        );
    }
}
