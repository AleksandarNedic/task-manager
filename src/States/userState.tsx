import { atom } from "recoil";
import localStorageEffects from "../Effects/localStorageEffects";


const userState = atom({
    key: "userState",
    default: {
        loggedIn: false,
    },
    effects: [localStorageEffects]
});

export default userState;
