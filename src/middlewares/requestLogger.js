import fs from 'fs'

const requestLogger = (req,res, next) => {
    const current_date_time = new Date();
    const formatted_date = 
        String(current_date_time.getFullYear()).padStart(2, '0') +
        '-' +
        String(current_date_time.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(current_date_time.getDate()).padStart(2, '0');
    const method = String(req.method).padEnd(8);
    const url = req.url;

    const log = `[${formatted_date}] ${method} ${url}`;

    console.log(log);

    fs.appendFile('logs/requestLogs.txt', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });

    next();
};

export default requestLogger;