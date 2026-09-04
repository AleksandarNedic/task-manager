const localStorageEffects = ({ setSelf, onSet }: any) => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        setSelf(JSON.parse(savedUser));
    }

    onSet((newValue: { loggedIn: boolean }) => {
        localStorage.setItem("user", JSON.stringify(newValue));
    });
};

export default localStorageEffects;
