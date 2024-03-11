const axios = require('axios');

function base64Encode(string) {
  return Buffer.from(string).toString('base64');
}

async function auth(ipAddress, password) {
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
    if (response.data.result !== "0") {
      throw new Error("Auth Error");
    }

    return response.headers['set-cookie'];
  } catch (error) {
    throw new Error("Auth Error: " + error.message);
  }
}

async function getData1(cookie, ipAddress) {
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

async function getData2(cookie, ipAddress) {
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

async function getModemInfo(ipAddress, password) {
  try {
    const cookies = await auth(ipAddress, password);
    const data1 = await getData1(cookies, ipAddress);
    const data2 = await getData2(cookies, ipAddress);
    const combinedData = { ...data1, ...data2 };
    return combinedData;    
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Call main function
const ip = "192.168.0.1";
const pass = "admin";

resultado = getModemInfo(ip, pass)
  .then(result => {
    console.log("Combined data:", result);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });

