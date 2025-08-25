function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function logError({ errorDescription, error, isLoggerError = false, time = Date.now() }, retries = 3, delayMs = 500) {
    try {
        console.log(`[${errorDescription}]`, isLoggerError, error, time);

        // For testing only: simulate logger failure
        if (isLoggerError) {
            throw new Error("Logger failed internally");
        }
    } catch (err) {
        console.error("logError failed:", err.message);

        if (retries > 0) {
            console.warn(`Retrying logError... attempts left: ${retries}`);

            await sleep(delayMs);

            return logError(
                { errorDescription: `errorlogger error,`, error: err, isLoggerError: true },
                retries - 1,
                delayMs
            );
        } else {
            console.error("logError gave up after max retries");
        }
    }
}

export default logError;