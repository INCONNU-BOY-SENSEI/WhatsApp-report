class PhoneFormatter {
  static format(input) {
    if (!input || typeof input !== 'string') {
      return null;
    }
    
    // Remove whitespace
    let cleaned = input.trim();
    
    // Remove all formatting characters except digits and +
    cleaned = cleaned.replace(/[^\d+]/g, '');
    
    // Remove leading + if present
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    
    // Handle +62 format (remove + and keep 62)
    if (cleaned.startsWith('62')) {
      return cleaned;
    }
    
    // Handle 0 prefix (Indonesian format)
    if (cleaned.startsWith('0')) {
      return '62' + cleaned.substring(1);
    }
    
    // Handle plain digits starting with 8 or 9 (add 62)
    if (cleaned.match(/^[89]\d{7,12}$/)) {
      return '62' + cleaned;
    }
    
    // Default: if doesn't start with 62, add it
    if (!cleaned.startsWith('62')) {
      return '62' + cleaned;
    }
    
    return cleaned;
  }
  
  static validate(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return false;
    }
    
    const formatted = this.format(phoneNumber);
    
    // Valid if formatted and length between 10-15 digits
    if (formatted && formatted.length >= 10 && formatted.length <= 15) {
      return true;
    }
    
    return false;
  }
  
  static display(phoneNumber) {
    const formatted = this.format(phoneNumber);
    
    if (!formatted) {
      return 'Invalid';
    }
    
    // Display as: 62 812 1234 567
    const chunks = formatted.match(/(.{1,3})/g) || [];
    return chunks.join(' ');
  }
}

module.exports = PhoneFormatter;
