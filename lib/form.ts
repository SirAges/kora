import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export const authFields = [
    {
        id: "email",
        input: "text",
        name: "email",
        label: "Email",
        placeholder: "Enter your Email",
        Icon: Entypo,
        leftIcon: "mail"
    },
    {
        id: "password",
        input: "text",
        name: "password",
        label: "Password",
        placeholder: "Enter your password",

        leftIcon: "key",
        rightIcon: function (params: any) {
            const { showPassword } = params;
            console.log("params", showPassword);
            return showPassword ? "eye" : "eye-off";
        },
        Icon: Ionicons
    },
    {
        id: "terms",
        input: "checkbox",
        name: "terms",
        label: "I agree to kora",
        placeholder: "Enter your Email"
    }
];
