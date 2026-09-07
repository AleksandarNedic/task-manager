const localStorageEffects = (localStorageKey: any) => ({ setSelf, onSet }: any) => {
    const savedUser = localStorage.getItem(localStorageKey);

    if (savedUser) {
        setSelf(JSON.parse(savedUser));
    }

    onSet((newValue: { loggedIn: boolean }) => {
        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    });
};

export default localStorageEffects;
