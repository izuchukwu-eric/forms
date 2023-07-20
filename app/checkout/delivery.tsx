import { View, Text } from "react-native"
import { Link } from "expo-router"

export default function DeliveryDetails() {
    return (
        <View>
            <Text>
                Delivery Details
            </Text>

            <Link href={"/checkout/payment"}>Next</Link>
        </View>
    )
}