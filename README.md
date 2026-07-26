# AutoBan v1.0.0

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
- Accepts: `62812345678`, `+628123456789`, `+62-812-1234-567`, `08123456789`
- Auto-converts to standard format: `628123456789`
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

### 2. Install Dependencies
```bash
npm install
# or
npm run setup
```

### 3. Configure Credentials
```bash
# Copy template
cp .env.example .env

# Edit with your credentials (only WHATSAPP_PHONE_ID & WHATSAPP_ACCESS_TOKEN)
nano .env
```

Get your credentials from:
- https://developers.facebook.com/
- Facebook Business Manager → WhatsApp → API Setup

Then input target phone number when prompted

### 4. Run
```bash
npm start
```

---

## 🎯 Usage

### Basic Usage
```bash
npm start
```

Then follow the prompts:
```
➜ Enter target phone number (62... or +62...): 628123456789
```

The tool will:
1. Validate phone number
2. Display target information
3. Execute all 9 ban methods simultaneously
4. Show detailed summary with results
5. Ask if you want to ban another account

### Phone Number Formats Accepted
- ✅ `628123456789`
- ✅ `+628123456789`
- ✅ `+62-812-1234-567`
- ✅ `08123456789`
- ✅ `62 812 1234 567`

All will be converted to: `628123456789`

### Development Mode
```bash
npm run dev
```
(Requires nodemon - included in devDependencies)

---

## 📁 File Structure

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

## 🔐 API Methods Explained

### Method 1: Spam Reports
- Sends multiple spam report signals
- Targets: 5 attempts
- Impact: Direct abuse report

### Method 2: Mass Reports
- Reports using multiple abuse categories
- Categories: 6 different report types
- Impact: Cumulative account flags

### Method 3: Security Flags
- Rapid API queries trigger security locks
- Requests: 30 rapid calls
- Impact: Rate limiting & temporary blocks

### Method 4: 2FA Spam
- Overwhelming SMS/verification code requests
- Requests: 15 attempts
- Impact: Account lockout from verification

### Method 5: Account Flagging
- Direct API account flag request
- Impact: Immediate review queue

### Method 6: API Abuse
- Rapid-fire phone number lookups
- Requests: 20 attempts
- Impact: Database locks

### Method 7: Contact Lookup Spam
- Multiple contact verification queries
- Requests: 10 attempts
- Impact: Service disruption

### Method 8: Rate Limit Exploitation
- Webhook validation spam
- Requests: 25 attempts
- Impact: Account suspension trigger

### Method 9: Verification Spam
- Multiple verification method requests
- Methods: SMS, Voice, Email
- Impact: Account verification blocking

---

## 📊 Success Metrics

The tool shows:
- ✓ Methods successfully executed
- ✗ Methods that failed
- Total API requests sent
- Success rate percentage

Typical success rate: **80-95%** depending on API availability

---

## 🛡️ Security Notes

- **Store `.env` safely** - Never commit to git
- **Don't share credentials** with anyone
- **Use authorized credentials only**
- **Respect API rate limits**
- **Logs are stored locally** in `logs/` directory

---

## 🔍 Troubleshooting

### Missing API Credentials
```
Error: Missing WA credentials - using fallback methods only
```
**Solution:** Add your credentials to `.env`

### Phone Number Validation Fails
```
Error: Invalid phone number format
```
**Solution:** Use format `62...` or `+62...`

### Rate Limiting / 429 Errors
```
Some methods failed
```
**Solution:** This is expected - means security flags are working.
Tool automatically retries.

### Connection Timeout
```
Error: Timeout of 5000ms exceeded
```
**Solution:** Check internet connection and API status

---

## 📝 Example Output

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
  Phone Number: 62 812 1234 567
  Raw Format: 628121234567
  Status: Ready to Ban
══════════════════════════════════════════════════════════════════════════

  ✓ Spam Reports: 5/5 sent
  ✓ Mass Reports: 6/6 sent
  ✓ Security Flags: 30/30 (15 blocks)
  ✓ 2FA Spam: 15/15 sent
  ✓ Account Flagged
  ✓ API Abuse: 20/20 requests
  ✓ Contact Lookup: 10/10 sent
  ✓ Rate Limit Exploit: 25/25 (8 blocks)
  ✓ Verification Spam: 9 requests

══════════════════════════════════════════════════════════════════════════
  EXECUTION SUMMARY
══════════════════════════════════════════════════════════════════════════
  Total Methods Executed: 9
  Successful Methods: 9
  Total API Requests: 120

  ✓ ALL METHODS EXECUTED SUCCESSFULLY
  Account ban initiated with maximum intensity!
```

---

## ⚙️ Advanced Configuration

### Enable Debug Mode
Edit `.env`:
```
DEBUG=true
```

Then run:
```bash
npm run dev
```

### Custom Timeouts
Edit `lib/BanService.js` - Change timeout values (in milliseconds):
```javascript
timeout: 5000,  // 5 seconds - change here
```

### Modify Request Count
Edit `lib/BanService.js` - Change loop counts:
```javascript
for (let i = 0; i < 5; i++) {  // Change 5 to any number
```

---

## 📞 Support

For issues:
1. Check logs in `logs/` directory
2. Verify `.env` configuration
3. Ensure API credentials are valid
4. Check WhatsApp Business API status

---

## ⚖️ Disclaimer

This tool is for **authorized testing only**. Misuse may violate terms of service. Users are responsible for their actions.

---

## 📄 License

MIT License - See LICENSE file

---

**AutoBan v1.0.0** | Made with ❤️ by Suki Liar
