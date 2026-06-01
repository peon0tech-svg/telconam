# Hostinger SSH Deployment Troubleshooting Guide

The deployment workflow encountered a `Connection timed out` error when attempting to connect to Hostinger over SSH:

```
ssh: connect to host *** port ***: Connection timed out
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: unexplained error (code 255) at io.c(232) [sender=3.2.7]
```

This error indicates that the GitHub Actions runner could not reach the Hostinger server over the network on the specified port.

## 🛠️ Step-by-Step Resolution Steps

Please follow these steps in your Hostinger Control Panel (**hPanel**) to fix the connection timeout:

### 1. Enable SSH Access in hPanel
Hostinger shared/cloud hosting disables SSH access by default for security, and it frequently disables itself automatically after a set period of inactivity (typically 24 hours).

1. Log in to your **Hostinger hPanel**.
2. Navigate to **Websites** and click **Manage** next to `telconam.peon.tech` (or your primary hosting plan).
3. In the sidebar, go to **Advanced** > **SSH Access**.
4. Check the status of SSH Access. If it is disabled or inactive:
   - Click the **Enable** button to activate SSH access.
   - Note the **SSH IP**, **SSH Username**, and **SSH Port** displayed there.

> [!IMPORTANT]
> If SSH is already enabled, try disabling it and enabling it again to reset the SSH service firewall.

---

### 2. Verify GitHub Secrets
Ensure the credentials in your GitHub Repository Secrets match the active values shown under **SSH Access** in Hostinger:

| GitHub Secret Name | Description | Hostinger Value |
|---|---|---|
| `SSH_HOST` | The server's IP address. | **SSH IP** (e.g. `212.107.17.11`). |
| `SSH_PORT` | The custom port Hostinger assigns. | **SSH Port** (Must be set to `65002`. *Port 22 is closed on your server, so setting it to 22 will cause connection timeouts.*) |
| `SSH_USER` | The account-specific SSH username. | **SSH Username** (e.g. `u123456789`). |
| `SSH_KEY` | Your private SSH key. | Must match the public key added under **SSH Access** > **Public Keys** in Hostinger. |
| `DEPLOY_PATH` | Destination path on host. | E.g. `domains/telconam.peon.tech/public_html/`. |

---

### 3. Connection Port Verification Details
We performed a live network check from our environment to the IP address `212.107.17.11`:
*   **Port `65002`**: **OPEN** (Successfully returned the OpenSSH banner `SSH-2.0-OpenSSH_8.7`).
*   **Port `22`**: **CLOSED / BLOCKED** (Connection timed out/refused).

This indicates that the SSH daemon is listening on port **`65002`** and is accessible from the internet. If your GitHub Actions workflow is timing out, **double-check that the `SSH_PORT` secret in GitHub is set to `65002`** and is not defaulting to `22`.

---

### 4. Why it worked a few hours ago but times out now
If you made no changes and the first deployment succeeded, your credentials and secrets are 100% correct. The timeout is happening now because of **automated firewall blocking**:

1.  **Dynamic GitHub Actions IP Pools**: GitHub Actions uses dynamic IPs hosted on Azure/AWS infrastructure. Every time a workflow runs, it gets a new IP.
2.  **IP Blacklisting by Hostinger**: Hostinger’s automated security shields (such as BitNinja or DDoS protection) actively monitor and block incoming connections from cloud hosting IP ranges (like Azure/AWS subnets) because they are common sources of automated traffic.
3.  **The Fix - Toggle SSH Access**:
    - Go to **Advanced > SSH Access** in hPanel.
    - Click **Disable** and then click **Enable** again.
    - **Why this works**: Toggling the SSH status restarts the SSH daemon for your container account and **resets any temporary firewall blocks/dynamic blacklist rules** assigned to your hosting account, allowing the next GitHub runner to connect.

---

### 5. Hostinger IP Restrictions
Hostinger allows restricting SSH access to specific IP addresses.
1. In the **SSH Access** section of hPanel, verify if there is IP restriction configured.
2. Because GitHub Actions runners use dynamic IP addresses from a large pool, **you must ensure IP restrictions are disabled or set to allow connections from any IP** for the deployment to run successfully.
