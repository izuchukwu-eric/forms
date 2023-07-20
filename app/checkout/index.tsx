import { View, Text } from "react-native"
import { Link } from "expo-router"


export default function PersonalDetails() {
    return (
        <View>
            <Text>
                Personal Details
            </Text>

            <Link href={"/checkout/delivery"}>Next</Link>
        </View>
    )
}