import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Button, Card, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema, PersonalInfo } from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";

export default function PersonalDetails() {
    const { handleSubmit, control, formState: { errors } } = useForm<PersonalInfo>({
        resolver: zodResolver(PersonalInfoSchema)
    });
    const router = useRouter();
    const theme = useTheme();

    console.log(errors);

    const nextPage = (data) => {
        console.log('Form fields: ', data);

        router.push("/checkout/delivery");
    }
    return (
        <ScrollView 
            contentContainerStyle={{ gap: 15, maxWidth: 500, width: "100%", alignSelf: "center"  }} 
            showsVerticalScrollIndicator={false}
        >
            <Card style={{ backgroundColor: theme.colors.background }}>
                <Card.Title title="Personal infomation" titleVariant="titleLarge" />
                <Card.Content style={{ gap: 10 }}>
                    <ControlledInput
                        control={control} 
                        name="name"
                        placeholder="Name"
                        label="Name"
                    />

                    <ControlledInput
                        control={control}
                        name="email"
                        placeholder="hey@gmail.com"
                        label="Email"
                    />
                </Card.Content>
            </Card>

            <Button onPress={handleSubmit(nextPage)} mode="contained">
                Next
            </Button>
        </ScrollView>
    )
}