const log = (level, message) => {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] ${message}`);
  };
  
  const logger = {
    info: (message) => log('info', message),
    warn: (message) => log('warn', message),
    error: (message) => log('error', message),
  };
  
  export default logger;
  