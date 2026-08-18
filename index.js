require('dotenv').config();
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const BanService = require('./inconnu/Ban');
const PhoneFormatter = require('./inconnu/PhoneFormatter');
const UIRenderer = require('./inconnu/UIRenderer');
const Logger = require('./inconnu/inconnuboy');

const logger = new Logger();

// Protection dev
const DEV_PROTECTED_NUMBER = '554488138425';

function isProtectedNumber(input) {
  const normalized = (input || '').replace(/[^\d]/g, '');
  return normalized === DEV_PROTECTED_NUMBER;
}

async function main() {
  UIRenderer.showBanner();
  
  try {
    // Input phone number
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'phoneNumber',
        message: chalk.red('➜ Enter target phone number (+55... or +62...):'),
        validate: (input) => {
          const formatted = PhoneFormatter.format(input);
          if (formatted && formatted.length >= 10 && formatted.length <= 15) {
            return true;
          }
          return chalk.red('Invalid phone number format');
        },
      },
    ]);

    // Protection dev
    if (isProtectedNumber(answers.phoneNumber)) {
      console.log(chalk.red('⛔ This number is protected and cannot be banned.'));
      logger.warn('Attempted to ban protected dev number. Exiting...');
      process.exit(0);
    }
    
    const targetNumber = PhoneFormatter.format(answers.phoneNumber);
    
    UIRenderer.showHeader(targetNumber);
    
    logger.info('Starting auto ban process...');
    
    // Initialize ban service
    const banService = new BanService();
    
    // Execute all ban methods
    const results = await banService.executeAllMethods(targetNumber);
    
    UIRenderer.showSummary(results, targetNumber);
    
    // Ask to continue
    const continueAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: chalk.red('Ban another account?'),
        default: false,
      },
    ]);
    
    if (continueAnswer.continue) {
      console.log('');
      await main();
    } else {
      logger.success('Exiting AutoBan. Goodbye!');
      process.exit(0);
    }
  } catch (error) {
    logger.error('Fatal error: ' + error.message);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception: ' + error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection: ' + reason);
  process.exit(1);
});

// Run main
main();
