# OdiaTTS Backend Setup (Phase 1)

This backend relies on a serverless Google Apps Script (GAS) architecture. It creates an API endpoint that receives audio payloads and saves them securely into a specific Google Drive folder.

## Setup Instructions

1.  Go to [Google Apps Script](https://script.google.com/) and sign in with your Google account.
2.  Click **New Project**.
3.  Name the project something like `OdiaTTS-Backend`.
4.  Copy the entire contents of the `Code.gs` file in this directory and paste it into the editor (replacing the default `myFunction`).
5.  Save the file (Ctrl+S).
6.  Click the **Deploy** button at the top right, then select **New deployment**.
7.  Click the gear icon next to "Select type" and choose **Web app**.
8.  Configure the deployment:
    *   **Description:** Phase 1 Data Collection API
    *   **Execute as:** Me (your email)
    *   **Who has access:** Anyone (This is necessary so the React frontend can hit the API without requiring users to log into Google).
9.  Click **Deploy**.
10. You will be prompted to authorize access. Follow the prompts to allow the script to manage your Google Drive files (it needs this to create the folder and save the `.wav` files).
11. Once deployed, you will be given a **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

**Copy this URL!** You will need it to configure the React frontend to point to this backend.
