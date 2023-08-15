# ShadowVault 🌐

**ShadowVault** is an efficient and secure CLI tool designed to manage and synchronize environment files on cloud storage. Share environment configurations across your team without hassle, all while ensuring your data is safely encrypted.

## Table of Contents

- [Features](#features-)
- [Installation](#installation-)
- [AWS S3 Setup Guide](#aws-s3-setup-guide-)
  - [Creating an S3 Bucket](#creating-an-s3-bucket)
  - [Setting Up an IAM User](#setting-up-an-iam-user)
  - [Retrieving AWS Credentials for ShadowVault](#retrieving-aws-credentials-for-shadowvault)
  - [Updating ShadowVault's Configuration](#updating-shadowvaults-configuration)
- [Usage](#usage-)
- [Commands](#commands-)
  - [Upload](#upload-)
  - [Download](#download-)
- [Contributing](#contributing-)
- [Support & Feedback](#support--feedback-)
- [License](#license-)

## Features 🚀

- **Unified Environment Management:** Keep all your environment configurations in one place.
- **Team Synchronization:** Share the same environment settings across your team.
- **Secure:** All environment data are encrypted and safely stored in the cloud.
- **Intuitive Commands:** Simple and easy-to-use commands for upload and download operations.

## Installation 💽

To install ShadowVault globally, run the following command:

```bash
npm install -g shadowvault
```

## AWS S3 Setup Guide ☁️

To utilize ShadowVault with AWS S3, set up a dedicated S3 bucket and IAM user:

### Creating an S3 Bucket

1. Create an AWS S3 bucket named `shadowvault`. This is the default in `~/.shadowvault/config.json`.
  - _Note:_ If you choose a different name, ensure it matches your configuration.

### Setting Up an IAM User

1. Navigate to **IAM** in the AWS Console.
2. Select **Users**.
3. Click **Add User**.
4. Name your user.
5. For permissions, select **Attach existing policies directly**.
6. Click **Create Policy** and switch to the **JSON** tab.
  - Paste the required policy, adjusting `shadowvault` if you used a different bucket name.

```json
  {
    "Version": "2012-10-17",
    "Statement": [
    {
      "Sid": "ListBuckets",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::shadowvault"
    },
    {
      "Sid": "AllObjectActions",
      "Effect": "Allow",
      "Action": "s3:*Object",
      "Resource": "arn:aws:s3:::shadowvault/*"
      }
    ]
  }
```

7. Name your policy, e.g., `ShadowVaultS3BucketPolicy`.
8. Click **Create Policy**.
9. Return to the user creation, refresh to see your policy, select it, and proceed.
10. Finalize by clicking **Create User**.

### Retrieving AWS Credentials for ShadowVault

1. In IAM, click your user.
2. Under **Security credentials**, scroll down and click **Create access key**.
3. Press the local code option and proceed to create the access key.
4. Copy the displayed **Access key ID** and **Secret access key**.

### Creating ShadowVault Configuration

To configure ShadowVault to connect with your AWS S3 storage, create the necessary configuration file.

Create a file at the following path:

```bash
~/.shadowvault/config.json
```

Populate the file with the following content:

```json
{
  "aws": {
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
    "region": "YOUR_AWS_REGION",
    "bucket": "YOUR_BUCKET_NAME"
  }  
}
```
Replace the placeholders:
1. YOUR_ACCESS_KEY_ID: Your AWS access key ID.
2. YOUR_SECRET_ACCESS_KEY: Your AWS secret access key.
3. YOUR_AWS_REGION: The AWS region for your S3 bucket (e.g., eu-west-2, eu-west-1).
4. YOUR_BUCKET_NAME: The name of your S3 bucket. We recommend using `shadowvault` as the bucket name for consistency.

Ensure that your configuration is accurate to ensure seamless communication with your AWS resources.

## Usage 🛠

ShadowVault provides two main commands: `upload` and `download`.

When executed within a project directory that contains a `package.json`, the project name will automatically be extracted, making the `-n` or `--name` option optional. However, you can still specify the `-n` option if you wish to override the extracted name.

## ShadowVault Commands 📜

### 1. Upload

**Description:**  
Safely upload environment files to cloud storage.

**Usage:**  
```bash
shadowvault upload [options] [files...]
```

**Arguments:**
- `files`: List of `.env` files you wish to upload (e.g., `.env.production`, `.env.staging`).

**Options:**
- `-A, --all`:  
  Use this option to upload all `.env` files from the directory.  
  Example:
  ```bash
  shadowvault upload -A
  ```

- `-n, --name <projectName>`:  
  Specify the name of the project associated with the environment files. If executed within a directory with a `package.json`, this option becomes optional.  
  Example:
  ```bash
  shadowvault upload -n myAwesomeProject .env.production
  ```

- `-s, --stage <stage>`:  
  Indicate the deployment stage of the environment files (like `dev`, `prod`, `staging`). If you don't specify this option, it defaults to "default".  
  Example:
  ```bash
  shadowvault upload -s prod .env.production
  ```

- `-p, --provider <type>`:  
  Choose the storage provider. Currently supported options are `s3`. Default is `s3`.  
  Example:
  ```bash
  shadowvault upload -p s3 .env.dev
  ```

- `-h, --help`:  
  Display the help guide for the command.

### 2. Download

**Description:**  
Retrieve and save environment files from cloud storage to your local machine.

**Usage:**  
```bash
shadowvault download [options] [files...]
```

**Arguments:**
- `files`: List of `.env` files you wish to download (e.g., `.env.production`, `.env.staging`).

**Options:**
- `-A, --all`:  
  Use this option to download all `.env` files from the storage.  
  Example:
  ```bash
  shadowvault download -A
  ```

- `-n, --name <projectName>`:  
  Specify the name of the project associated with the environment files. If executed within a directory with a `package.json`, this option becomes optional.  
  Example:
  ```bash
  shadowvault download -n myAwesomeProject .env.production
  ```

- `-s, --stage <stage>`:  
  Indicate the deployment stage of the environment files (like `dev`, `prod`, `staging`). If you don't specify this option, it defaults to "default".  
  Example:
  ```bash
  shadowvault download -s prod .env.production
  ```

- `-p, --provider <type>`:  
  Choose the storage provider. Currently supported options are only `s3`. Default is `s3`.  
  Example:
  ```bash
  shadowvault download -p s3 .env.dev
  ```

- `-h, --help`:  
  Display the help guide for the command.

## Contributing 🤝

Contributions are welcome! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Support & Feedback 💌

For support or feedback, please raise an issue on our GitHub repository.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
