import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Results } from "./Results";
import { Test } from "../components/Test/Test";

type TestStackParamList = {
    Test: undefined;
    Results: { score: number };
};

const TestStack = createNativeStackNavigator<TestStackParamList>();

const TestScreen = () => {
    return (
        <TestStack.Navigator>
            <TestStack.Screen options={{ headerShown: false }} name="Test" component={Test} />
            <TestStack.Screen options={{ headerShown: false }} name="Results" component={Results} />
        </TestStack.Navigator>
    )
}

export default TestScreen