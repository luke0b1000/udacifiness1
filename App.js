import React from "react";
import { View, Text } from "react-native";
import AddEntry from "./Components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./Components/History";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <History />
                </View>
            </Provider>
        );
    }
}
