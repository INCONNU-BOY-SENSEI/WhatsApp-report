const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logsDir = path.join(process.cwd(), 'logs');
    this.ensureLogsDirectory();
    this.logFile = path.join(this.logsDir, `autoban_${Date.now()}.log`);
  }
  
  ensureLogsDirectory() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }
  
  writeToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(this.logFile, logMessage, (err) => {
      if (err) console.error('Logging error:', err);
    });
  }
  
  info(message) {
    const formatted = chalk.cyan(`[INFO] ${message}`);
    console.log(formatted);
    this.writeToFile(`[INFO] ${message}`);
  }
  
  success(message) {
    const formatted = chalk.green(`[SUCCESS] ${message}`);
    console.log(formatted);
    this.writeToFile(`[SUCCESS] ${message}`);
  }
  
  warn(message) {
    const formatted = chalk.yellow(`[WARN] ${message}`);
    console.log(formatted);
    this.writeToFile(`[WARN] ${message}`);
  }
  
  error(message) {
    const formatted = chalk.red(`[ERROR] ${message}`);
    console.log(formatted);
    this.writeToFile(`[ERROR] ${message}`);
  }
  
  debug(message) {
    if (process.env.DEBUG === 'true') {
      const formatted = chalk.gray(`[DEBUG] ${message}`);
      console.log(formatted);
      this.writeToFile(`[DEBUG] ${message}`);
    }
  }
}

module.exports = Logger;
