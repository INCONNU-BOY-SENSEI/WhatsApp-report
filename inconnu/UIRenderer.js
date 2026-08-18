const chalk = require('chalk');
const figlet = require('figlet');
const PhoneFormatter = require('./PhoneFormatter');

class UIRenderer {
  static showBanner() {
    console.clear();
    
    const banner = figlet.textSync('AutoBan', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      font: 'Standard',
    });
    
    console.log(chalk.hex('#FF8C00').bold(banner));
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log(chalk.hex('#FF8C00').bold('  WhatsApp Auto Ban Tool | 9 Advanced Methods'));
    console.log(chalk.hex('#FF8C00')('  Powered by Suki Liar | v1.0.0'));
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log('');
  }
  
  static showHeader(phoneNumber) {
    const displayNumber = PhoneFormatter.display(phoneNumber);
    
    console.log('');
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log(chalk.hex('#FF8C00').bold('  TARGET INFORMATION'));
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log(chalk.white(`  Phone Number: ${chalk.bold.yellow(displayNumber)}`));
    console.log(chalk.white(`  Raw Format: ${chalk.bold.yellow(phoneNumber)}`));
    console.log(chalk.white(`  Status: ${chalk.bold.cyan('Ready to Ban')}`));
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log('');
  }
  
  static showSummary(results, targetNumber) {
    console.log('');
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log(chalk.hex('#FF8C00').bold('  EXECUTION SUMMARY'));
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    
    const methodNames = {
      spamReport: 'Spam Reports',
      massReport: 'Mass Reports',
      securityFlags: 'Security Flags',
      twoFASpam: '2FA Verification Spam',
      flagAccount: 'Account Flag',
      apiAbuse: 'API Abuse',
      contactLookup: 'Contact Lookup',
      rateLimitExploit: 'Rate Limit Exploit',
      verificationSpam: 'Verification Spam',
    };
    
    let successCount = 0;
    let totalRequests = 0;
    
    Object.entries(results).forEach(([key, result]) => {
      const methodName = methodNames[key] || key;
      const status = result.success ? chalk.green('✓') : chalk.red('✗');
      const count = result.count || 0;
      
      if (result.success) {
        successCount++;
        totalRequests += count;
      }
      
      console.log(`  ${status} ${methodName.padEnd(25)} - ${chalk.yellow(`${count} attempts`)}`);
    });
    
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log('');
    console.log(chalk.white(`  Total Methods Executed: ${chalk.bold.cyan(Object.keys(results).length)}`));
    console.log(chalk.white(`  Successful Methods: ${chalk.bold.green(successCount)}`));
    console.log(chalk.white(`  Total API Requests: ${chalk.bold.yellow(totalRequests)}`));
    console.log('');
    
    if (successCount === Object.keys(results).length) {
      console.log(chalk.green.bold('  ✓ ALL METHODS EXECUTED SUCCESSFULLY'));
      console.log(chalk.green('  Account ban initiated with maximum intensity!'));
    } else if (successCount > 0) {
      console.log(chalk.yellow.bold('  ⚠ PARTIAL SUCCESS'));
      console.log(chalk.yellow(`  ${successCount}/${Object.keys(results).length} methods succeeded`));
    } else {
      console.log(chalk.red.bold('  ✗ ALL METHODS FAILED'));
      console.log(chalk.red('  Check API credentials and network connection'));
    }
    
    console.log('');
    console.log(chalk.hex('#FF8C00')('═'.repeat(70)));
    console.log('');
  }
  
  static showError(message) {
    console.log('');
    console.log(chalk.red.bold('  ✗ ERROR'));
    console.log(chalk.red(`  ${message}`));
    console.log('');
  }
  
  static showSuccess(message) {
    console.log(chalk.green.bold('  ✓ SUCCESS'));
    console.log(chalk.green(`  ${message}`));
  }
}

module.exports = UIRenderer;
