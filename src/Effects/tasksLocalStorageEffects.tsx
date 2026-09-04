const tasksLocalStorageEffects = ({ setSelf, onSet }: any) => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        setSelf(JSON.parse(savedTasks));
    }

    onSet((newValue: { array: string[] }) => {
        localStorage.setItem("tasks", JSON.stringify(newValue));
    });
};

export default tasksLocalStorageEffects;
