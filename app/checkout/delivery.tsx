import { ScrollView, View } from "react-native"
import { useRouter } from "expo-router"
import { Button, Card, useTheme, RadioButton, HelperText } from "react-native-paper"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryInfoSchema, DeliveryInfo } from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";
import { useCheckoutContext } from "../../src/context/CheckoutContext";

export default function DeliveryDetails() {
    const { handleSubmit, control, formState: { errors } } = useForm<DeliveryInfo>({
        resolver: zodResolver(DeliveryInfoSchema),
        defaultValues: {
            shipping: "free"
        }
    });
    const { setDelivery } = useCheckoutContext()
    const router = useRouter();
    const theme = useTheme();

    const nextPage = (data: DeliveryInfo) => {
        setDelivery(data);

        router.push("/checkout/payment")
    }

    return (
        <ScrollView contentContainerStyle={{ gap: 15, maxWidth: 500, width: "100%", alignSelf: "center" }} showsVerticalScrollIndicator={false}>
            <Card style={{ backgroundColor: theme.colors.background }} >
                <Card.Title title={"Delivery address"} titleVariant="titleLarge" />
                <Card.Content style={{ gap: 10 }}>
                    <ControlledInput 
                        control={control}
                        name="city"
                        label="City"
                    />
                    <ControlledInput 
                        control={control}
                        name="postalCode"
                        label="Postal Code"
                    />
                    <ControlledInput 
                        control={control}
                        name="address"
                        label="Address"
                    />
                </Card.Content>
            </Card>

            <Card style={{ backgroundColor: theme.colors.background }} >
                <Card.Title title={"Shipping options"} titleVariant="titleLarge" />
                <Card.Content style={{ gap: 10 }}>
                    <Controller 
                        control={control} 
                        name="shipping"
                        render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                            <View>
                                <HelperText type="error" visible={invalid}>
                                    {error?.message}
                                </HelperText>
                                <RadioButton.Group value={value} onValueChange={(value) => onChange(value)}>
                                    <RadioButton.Item label="Free" value="free" />
                                    <RadioButton.Item label="Fast" value="fast" />
                                    <RadioButton.Item label="Same day" value="same day" />
                                </RadioButton.Group>
                            </View>

                        )}
                    />
                </Card.Content>
            </Card>

            <Button onPress={handleSubmit(nextPage)} mode="contained">
                Next
            </Button>
        </ScrollView>
    )
}