import React, { Component } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import UdaciSliders from "./UdaciSliders";
import UdaciSteppers from "./UdaciSteppers";
import { Slider } from "react-native-gesture-handler";

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
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
    render() {
        const metaInfo = getMetricMetaInfo();
        return (
            <View>
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
            </View>
        );
    }
}
