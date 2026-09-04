import { atom } from "recoil";
import tasksLocalStorageEffects from "../Effects/tasksLocalStorageEffects";

const taskState = atom<{ array: string[] }>({
    key: "tasks",
    default: {
        array: []
    },
    effects: [tasksLocalStorageEffects]
});

export default taskState;