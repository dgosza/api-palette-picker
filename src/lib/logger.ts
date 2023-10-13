import pino from 'pino';

const envProd = pino({
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
    serializers: {
        info: (info) => {
            const { pid, ...rest } = info;
            return rest;
        },
    },
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
});

const envLocalhost = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            ignore: 'pid,hostname',
        },
    },
});

const logger = (process.env.ENV as string) === 'localhost' ? envLocalhost : envProd;
class Logger {
    // TODO: add log to kibana

    public info(message: any) {
        return logger.info(message);
    }
    public error(message: any) {
        return logger.error(message);
    }
    public fatal(message: any) {
        return logger.fatal(message);
    }
}

export default new Logger();
