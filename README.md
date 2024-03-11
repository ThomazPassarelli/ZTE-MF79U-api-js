# ZTE-MF79U-api-js

A JavaScript library, **built with Node.js**, for interacting with ZTE MF79 modems.

This library, adapted from the Python version, provides a comprehensive hardware detail retrieval (such as IMEI and hardware version), and connection status(including WAN IP address and LTE signal strength).


**Usage Example:**
```javascript
const ZTEapi = require('zte-mf79u-api');

// Example usage
async function manageModem() {
    try {
        const modemInfo = await ZTEapi.getModemInfo("192.168.0.1", "admin");
        console.log("Modem Info:", modemInfo);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

manageModem();
```
References:
Based on: https://github.com/pmcrwf-mid/ZTE-MF79U-api/blob/main/main.py
