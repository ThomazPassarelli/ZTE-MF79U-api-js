const axios = require('axios');

// Define the IP address and password (hardcoded)
const ipAddress = "192.168.0.1";
const password = "admin";

// Function to encode string to base64
function base64Encode(string) {
  return Buffer.from(string).toString('base64');
}

// Function for authentication
async function auth() {
  try {
    const response = await axios.post(`http://${ipAddress}/goform/goform_set_cmd_process`, {
      isTest: 'false',
      goformId: 'LOGIN',
      password: base64Encode(password)
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 OPR/85.0.4341.60 (Edition Yx 05)",
        "Origin": `http://${ipAddress}`,
        "Referer": `http://${ipAddress}/index.html`
      }
    });

    //console.log("Authentication response data:", response.data);
    //console.log("Authentication response headers:", response.headers);

    if (response.data.result !== "0") {
      throw new Error("Auth Error");
    }

    return response.headers['set-cookie'];
  } catch (error) {
    throw new Error("Auth Error: " + error.message);
  }
}

// Function to get data from endpoint 1
async function getData1(cookie) {
  try {
    const response = await axios.get(`http://${ipAddress}/goform/goform_get_cmd_process`, {
      params: {
        isTest: 'false',
        cmd: 'm_ssid_enable,RadioOff,NoForwarding,m_NoForwarding,WPAPSK1,m_WPAPSK1,wifi_attr_max_station_number,SSID1,AuthMode,HideSSID,MAX_Access_num,EncrypType,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,qrcode_display_switch,m_qrcode_display_switch',
        multi_data: 1
      },
      headers: {
        "Referer": `http://${ipAddress}/index.html`,
        "Cookie": cookie
      }
    });

    return response.data;
  } catch (error) {
    throw new Error("Error getting data from endpoint 1: " + error.message);
  }
}

// Function to get data from endpoint 2
async function getData2(cookie) {
  try {
    const response = await axios.get(`http://${ipAddress}/goform/goform_get_cmd_process`, {
      params: {
        isTest: 'false',
        cmd: 'apn_interface_version,wifi_coverage,m_ssid_enable,imei,modem_msn,BSSID,sim_iccid,network_type,network_provider,network_provider_fullname,prefer_dns_auto,standby_dns_auto,rssi,rscp,lte_rsrp,lte_rssi,lte_snr,ecio,net_select,wan_active_band,mdm_mcc,mdm_mnc,cell_id,lac_code,lte_pci,lte_rsrq,imsi,sim_imsi,rplmn_num,cr_version,wa_version,hardware_version,web_version,wa_inner_version,MAX_Access_num,SSID1,AuthMode,WPAPSK1_encode,m_SSID,m_AuthMode,m_HideSSID,m_WPAPSK1_encode,m_MAX_Access_num,lan_ipaddr,lan_netmask,mac_address,msisdn,LocalDomain,m_profile_name,enodeb_id,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,ipv6_pdp_type_ui,pdp_type,pdp_type_ui,opms_wan_mode,ppp_status,cable_wan_ipaddr,roam_setting_option,router_mode_gateway,dhcpStart,dhcpEnd',
        multi_data: 1
      },
      headers: {
        "Referer": `http://${ipAddress}/index.html`,
        "Cookie": cookie
      }
    });

    return response.data;
  } catch (error) {
    throw new Error("Error getting data from endpoint 2: " + error.message);
  }
}

// Main function to perform authentication and retrieve data
async function main() {
  try {
    console.log("Settings loaded:", { ipAddress, password });

    const cookies = await auth();
    console.log("Authenticated successfully:", cookies);

    // Assuming getData1 and getData2 functions are similar to the Python script
    // Implement those functions if not already done

    const data1 = await getData1(cookies);
    const data2 = await getData2(cookies);

    console.log("Data from endpoint 1:", data1);
    console.log("Data from endpoint 2:", data2);
    console.log("SSID1:", data1.SSID1);

  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Call main function
main();
