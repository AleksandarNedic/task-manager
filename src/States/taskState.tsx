import {atom} from "recoil";
import localStorageEffects from "../Effects/localStorageEffects";

type Task = {
    id: number;
    task: string;
    comment:string;
    category: string;
};
const taskState = atom<{ array: Task[] }>({
    key: "tasks",
    default: {
        array: []
    },
    effects: [localStorageEffects("tasks")]
});
export default taskState;