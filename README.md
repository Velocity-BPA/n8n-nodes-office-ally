# n8n-nodes-office-ally

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Office Ally's healthcare management platform. With 6 resources covering eligibility verification, claims management, ERA processing, and patient/provider administration, this node enables healthcare organizations to automate critical workflows including insurance verification, claims submission and tracking, payment processing, and patient record management.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Healthcare](https://img.shields.io/badge/Healthcare-Management-green)
![Claims](https://img.shields.io/badge/Claims-Processing-orange)
![HIPAA](https://img.shields.io/badge/HIPAA-Compliant-red)

## Features

- **Eligibility Verification** - Real-time insurance eligibility checks and benefit verification
- **Claims Management** - Submit, track, and manage medical claims with detailed status updates
- **ERA Processing** - Electronic remittance advice processing and payment reconciliation
- **Patient Management** - Comprehensive patient record management and demographic updates
- **Provider Administration** - Provider enrollment, credentialing, and profile management
- **Payer Integration** - Access payer information, fee schedules, and contract details
- **HIPAA Compliance** - Secure data handling with healthcare industry standards
- **Batch Operations** - Process multiple records efficiently with bulk operations

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-office-ally`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-office-ally
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-office-ally.git
cd n8n-nodes-office-ally
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-office-ally
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Office Ally API authentication key | Yes |
| Environment | Production or Sandbox environment | Yes |
| Client ID | Office Ally client identifier | Yes |

## Resources & Operations

### 1. Eligibility Verification

| Operation | Description |
|-----------|-------------|
| Check Eligibility | Verify patient insurance eligibility and benefits |
| Get Coverage Details | Retrieve detailed coverage information |
| Batch Verification | Process multiple eligibility checks |
| Get Verification History | Retrieve past verification records |

### 2. Claims Management

| Operation | Description |
|-----------|-------------|
| Submit Claim | Submit new medical claims for processing |
| Get Claim Status | Check current status of submitted claims |
| Update Claim | Modify existing claim information |
| Search Claims | Find claims by various criteria |
| Get Claim Details | Retrieve comprehensive claim information |
| Cancel Claim | Cancel or void submitted claims |

### 3. Era Processing

| Operation | Description |
|-----------|-------------|
| Get ERA Documents | Retrieve electronic remittance advice documents |
| Process ERA | Parse and process ERA data |
| Get Payment Details | Extract payment information from ERAs |
| Download ERA Files | Download ERA documents in various formats |
| Search ERAs | Find ERAs by date range or criteria |

### 4. Patient Management

| Operation | Description |
|-----------|-------------|
| Create Patient | Add new patient records |
| Update Patient | Modify patient demographic information |
| Get Patient | Retrieve patient details |
| Search Patients | Find patients by name, ID, or other criteria |
| Delete Patient | Remove patient records |
| Get Patient History | Retrieve patient visit and claims history |

### 5. Provider Management

| Operation | Description |
|-----------|-------------|
| Create Provider | Add new provider profiles |
| Update Provider | Modify provider information and credentials |
| Get Provider | Retrieve provider details |
| Search Providers | Find providers by specialty, location, or ID |
| Get Provider Status | Check enrollment and credentialing status |
| Update Credentials | Manage provider licensing and certification |

### 6. Payer Information

| Operation | Description |
|-----------|-------------|
| Get Payers | Retrieve list of available payers |
| Get Payer Details | Access specific payer information |
| Get Fee Schedules | Retrieve payer fee schedules |
| Get Contract Terms | Access contract details with payers |
| Search Payers | Find payers by name or identifier |

## Usage Examples

```javascript
// Check patient insurance eligibility
{
  "patientId": "PT123456",
  "insuranceType": "primary",
  "serviceDate": "2024-01-15",
  "providerId": "PR789012"
}
```

```javascript
// Submit a medical claim
{
  "patientId": "PT123456",
  "providerId": "PR789012",
  "serviceDate": "2024-01-15",
  "diagnosisCodes": ["Z00.00"],
  "procedureCodes": [{"code": "99213", "amount": 125.00}],
  "insuranceInfo": {
    "payerId": "AETNA",
    "memberId": "ABC123456789"
  }
}
```

```javascript
// Create new patient record
{
  "firstName": "John",
  "lastName": "Smith",
  "dateOfBirth": "1985-03-15",
  "ssn": "123-45-6789",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "90210"
  },
  "phone": "555-123-4567"
}
```

```javascript
// Process ERA document
{
  "eraId": "ERA20240115001",
  "payerId": "BCBS",
  "checkNumber": "CHK789456",
  "paymentDate": "2024-01-15",
  "totalAmount": 1250.00
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key and client ID in credentials |
| Patient Not Found | Specified patient ID does not exist | Check patient ID format and verify existence |
| Claim Validation Error | Submitted claim data failed validation | Review claim fields for required information and format |
| Eligibility Service Unavailable | Payer eligibility service temporarily down | Retry request after delay or check payer status |
| Rate Limit Exceeded | Too many requests sent in time period | Implement request throttling and retry logic |
| Invalid Date Format | Date fields not in expected format | Use YYYY-MM-DD format for all date fields |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-office-ally/issues)
- **Office Ally Documentation**: [Office Ally Developer Portal](https://www.officeally.com/developers)
- **Healthcare Integration Community**: [Healthcare IT Forums](https://www.healthcare-it.org/forums)