process.on('message', (message) => {
    if (message === 'start') {
        let result = 0;
        for (let i = 0; i < 1e9; i++) {
            result += i;
        }
        process.send(result);
    }
});
