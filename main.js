const { fork } = require('child_process');

// Function to create a child process
function createChildProcess() {
    return new Promise((resolve, reject) => {
        const child = fork('./worker.js');
        child.on('message', (result) => {
            console.log(`Result from child process: ${result}`);
            resolve(result);
        });

        child.on('error', (err) => {
            reject(err);
        });

        child.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Child process exited with code ${code}`));
            }
        });

        child.send('start');
    });
}

// Create multiple child processes
async function run() {
    try {
        const results = await Promise.all([
            createChildProcess(),
            createChildProcess(),
            createChildProcess()
        ]);
        console.log('All results:', results);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();