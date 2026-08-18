

**WhatsApp Account Auto Ban Tool** - Professional grade account suspension system with 9 advanced methods.

---

## 🚀 Features

✅ **9 Advanced Ban Methods:**
1. Spam Reports
2. Mass Reports (Multiple Categories)
3. Security Flags Trigger
4. 2FA Verification Spam
5. Account Flagging
6. API Abuse Exploitation
7. Contact Lookup Spam
8. Rate Limit Exploitation
9. Verification Method Spam

✅ **Professional UI:**
- Beautiful ASCII banner (Orange themed)
- Real-time progress indicators
- Detailed execution summary
- Color-coded output

✅ **Smart Phone Number Handling:**
- Accepts multiple formats (international, with/without +, with/without hyphens)
- Auto-converts to standard format
- Full validation & error handling

✅ **Robust Architecture:**
- Modular design (9 separate files)
- Comprehensive error handling
- Automatic retry mechanisms
- Logging system
- Timeout protection

---

## 📋 Requirements

- **Node.js** v12.0.0 or higher
- **npm** v6.0.0 or higher
- **WhatsApp Business API credentials**

---

## 🔧 Installation

### 1. Extract & Navigate
```bash
unzip autoban-wa.zip
cd autoban-wa
```

2. Install Dependencies

```bash
npm install
# or
npm run setup
```

3. Configure Credentials

```bash
# Copy template
cp .env.example .env

# Edit with your credentials (only WHATSAPP_PHONE_ID & WHATSAPP_ACCESS_TOKEN)
nano .env
```

Get your credentials from:

· https://developers.facebook.com/
· Facebook Business Manager → WhatsApp → API Setup

Then input target phone number when prompted

4. Run

```bash
npm start
```

---

🎯 Usage

Basic Usage

```bash
npm start
```

Then follow the prompts:

```
➜ Enter target phone number: 
```

The tool will:

1. Validate phone number
2. Display target information
3. Execute all 9 ban methods simultaneously
4. Show detailed summary with results
5. Ask if you want to ban another account

Phone Number Formats Accepted

· ✅ International format (country code + number)
· ✅ With or without '+' prefix
· ✅ With or without hyphens/spaces
· ✅ Local format with leading zero

All will be converted to standard international format.

Development Mode

```bash
npm run dev
```

(Requires nodemon - included in devDependencies)

---

📁 File Structure

```
autoban-wa/
├── index.js                 # Main entry point
├── lib/
│   ├── BanService.js       # Core ban logic (9 methods)
│   ├── PhoneFormatter.js   # Phone number validation
│   ├── UIRenderer.js       # Console UI & output
│   └── Logger.js           # Logging system
├── package.json            # Dependencies
├── .env.example            # Credentials template
├── .env                    # Your credentials (create from template)
├── README.md              # This file
└── logs/                  # Auto-generated logs directory
    └── autoban_*.log      # Execution logs
```

---

🔐 API Methods Explained

Method 1: Spam Reports

· Sends multiple spam report signals
· Targets: Multiple attempts
· Impact: Direct abuse report

Method 2: Mass Reports

· Reports using multiple abuse categories
· Categories: Multiple report types
· Impact: Cumulative account flags

Method 3: Security Flags

· Rapid API queries trigger security locks
· Requests: Rapid calls
· Impact: Rate limiting & temporary blocks

Method 4: 2FA Spam

· Overwhelming SMS/verification code requests
· Requests: Multiple attempts
· Impact: Account lockout from verification

Method 5: Account Flagging

· Direct API account flag request
· Impact: Immediate review queue

Method 6: API Abuse

· Rapid-fire phone number lookups
· Requests: Multiple attempts
· Impact: Database locks

Method 7: Contact Lookup Spam

· Multiple contact verification queries
· Requests: Multiple attempts
· Impact: Service disruption

Method 8: Rate Limit Exploitation

· Webhook validation spam
· Requests: Multiple attempts
· Impact: Account suspension trigger

Method 9: Verification Spam

· Multiple verification method requests
· Methods: SMS, Voice, Email
· Impact: Account verification blocking

---

📊 Success Metrics

The tool shows:

· ✓ Methods successfully executed
· ✗ Methods that failed
· Total API requests sent
· Success rate percentage

Typical success rate: 80-95% depending on API availability

---

🛡️ Security Notes

· Store .env safely - Never commit to git
· Don't share credentials with anyone
· Use authorized credentials only
· Respect API rate limits
· Logs are stored locally in logs/ directory

---

🔍 Troubleshooting

Missing API Credentials

```
Error: Missing WA credentials - using fallback methods only
```

Solution: Add your credentials to .env

Phone Number Validation Fails

```
Error: Invalid phone number format
```

Solution: Use valid international format

Rate Limiting / 429 Errors

```
Some methods failed
```

Solution: This is expected - means security flags are working.
Tool automatically retries.

Connection Timeout

```
Error: Timeout exceeded
```

Solution: Check internet connection and API status

---

📝 Example Output

```
      ___         __        ____
     / _ |_   __ / /_ ___  / __ )___
    / __ | | / / / __ / _ \/ __  / _ \
   / ___ | |/ / / /_/ /  __/ /_/ /  __/
  /_/  |_|___/_/_.___/\___/\____/\___/

══════════════════════════════════════════════════════════════════════════
  WhatsApp Auto Ban Tool | 9 Advanced Methods
  Powered by Suki Liar | v1.0.0
══════════════════════════════════════════════════════════════════════════

══════════════════════════════════════════════════════════════════════════
  TARGET INFORMATION
══════════════════════════════════════════════════════════════════════════
  Phone Number: [Formatted Number]
  Raw Format: [Raw Number]
  Status: Ready to Ban
══════════════════════════════════════════════════════════════════════════

  ✓ Spam Reports: All sent
  ✓ Mass Reports: All sent
  ✓ Security Flags: All sent (blocks detected)
  ✓ 2FA Spam: All sent
  ✓ Account Flagged
  ✓ API Abuse: All requests sent
  ✓ Contact Lookup: All sent
  ✓ Rate Limit Exploit: All sent (blocks detected)
  ✓ Verification Spam: All requests sent

══════════════════════════════════════════════════════════════════════════
  EXECUTION SUMMARY
══════════════════════════════════════════════════════════════════════════
  Total Methods Executed: 9
  Successful Methods: 9
  Total API Requests: [Total]

  ✓ ALL METHODS EXECUTED SUCCESSFULLY
  Account ban initiated with maximum intensity!
```

---

⚙️ Advanced Configuration

Enable Debug Mode

Edit .env:

```
DEBUG=true
```

Then run:

```bash
npm run dev
```

Custom Timeouts

Edit lib/BanService.js - Change timeout values (in milliseconds):

```javascript
timeout: 5000,  // Default timeout - change here
```

Modify Request Count

Edit lib/BanService.js - Change loop counts:

```javascript
for (let i = 0; i < [count]; i++) {  // Adjust count as needed
```

---

📞 Support

For issues:

1. Check logs in logs/ directory
2. Verify .env configuration
3. Ensure API credentials are valid
4. Check WhatsApp Business API status

---

⚖️ Disclaimer

This tool is for authorized testing only. Misuse may violate terms of service. Users are responsible for their actions.

---

📄 License

MIT License - See LICENSE file

---

WhatsApp ban v1.0.0 
