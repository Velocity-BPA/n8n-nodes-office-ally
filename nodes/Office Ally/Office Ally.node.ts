/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-officeally/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class OfficeAlly implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Office Ally',
    name: 'officeally',
    icon: 'file:officeally.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Office Ally API',
    defaults: {
      name: 'Office Ally',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'officeallyApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'EligibilityVerification',
            value: 'eligibilityVerification',
          },
          {
            name: 'ClaimsManagement',
            value: 'claimsManagement',
          },
          {
            name: 'EraProcessing',
            value: 'eraProcessing',
          },
          {
            name: 'PatientManagement',
            value: 'patientManagement',
          },
          {
            name: 'Provider Management',
            value: 'providerManagement',
          },
          {
            name: 'Payer Information',
            value: 'payerInformation',
          }
        ],
        default: 'eligibilityVerification',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['eligibilityVerification'] } },
  options: [
    { name: 'Create Verification', value: 'createVerification', description: 'Submit eligibility verification request', action: 'Create eligibility verification' },
    { name: 'Get Verification', value: 'getVerification', description: 'Get eligibility verification result', action: 'Get eligibility verification' },
    { name: 'List Verifications', value: 'listVerifications', description: 'List all eligibility verifications', action: 'List eligibility verifications' },
    { name: 'Update Verification', value: 'updateVerification', description: 'Update eligibility verification request', action: 'Update eligibility verification' },
    { name: 'Delete Verification', value: 'deleteVerification', description: 'Cancel eligibility verification request', action: 'Delete eligibility verification' }
  ],
  default: 'createVerification',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
		},
	},
	options: [
		{
			name: 'Create Claim',
			value: 'createClaim',
			description: 'Submit new healthcare claim',
			action: 'Create a claim',
		},
		{
			name: 'Get Claim',
			value: 'getClaim',
			description: 'Get claim details and status',
			action: 'Get a claim',
		},
		{
			name: 'List Claims',
			value: 'listClaims',
			description: 'List claims with filtering options',
			action: 'List claims',
		},
		{
			name: 'Update Claim',
			value: 'updateClaim',
			description: 'Update existing claim information',
			action: 'Update a claim',
		},
		{
			name: 'Delete Claim',
			value: 'deleteClaim',
			description: 'Cancel or void a claim',
			action: 'Delete a claim',
		},
		{
			name: 'Resubmit Claim',
			value: 'resubmitClaim',
			description: 'Resubmit a previously rejected claim',
			action: 'Resubmit a claim',
		},
	],
	default: 'createClaim',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
		},
	},
	options: [
		{
			name: 'List Remittances',
			value: 'listRemittances',
			description: 'List ERA remittance files',
			action: 'List remittances',
		},
		{
			name: 'Get Remittance',
			value: 'getRemittance',
			description: 'Get specific ERA remittance details',
			action: 'Get remittance',
		},
		{
			name: 'Download Remittance',
			value: 'downloadRemittance',
			description: 'Download ERA file',
			action: 'Download remittance',
		},
		{
			name: 'List Payments',
			value: 'listPayments',
			description: 'List payment details from ERAs',
			action: 'List payments',
		},
		{
			name: 'Get Payment',
			value: 'getPayment',
			description: 'Get specific payment details',
			action: 'Get payment',
		},
	],
	default: 'listRemittances',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['patientManagement'] } },
	options: [
		{
			name: 'Create Patient',
			value: 'createPatient',
			description: 'Add new patient record',
			action: 'Create patient',
		},
		{
			name: 'Get Patient',
			value: 'getPatient',
			description: 'Get patient details',
			action: 'Get patient',
		},
		{
			name: 'List Patients',
			value: 'listPatients',
			description: 'List patients with search options',
			action: 'List patients',
		},
		{
			name: 'Update Patient',
			value: 'updatePatient',
			description: 'Update patient information',
			action: 'Update patient',
		},
		{
			name: 'Delete Patient',
			value: 'deletePatient',
			description: 'Remove patient record',
			action: 'Delete patient',
		},
	],
	default: 'createPatient',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['providerManagement'] } },
  options: [
    { name: 'Create Provider', value: 'createProvider', description: 'Add new provider record', action: 'Create provider' },
    { name: 'Get Provider', value: 'getProvider', description: 'Get provider details', action: 'Get provider' },
    { name: 'List Providers', value: 'listProviders', description: 'List providers with filtering', action: 'List providers' },
    { name: 'Update Provider', value: 'updateProvider', description: 'Update provider information', action: 'Update provider' },
    { name: 'Delete Provider', value: 'deleteProvider', description: 'Remove provider record', action: 'Delete provider' }
  ],
  default: 'createProvider',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['payerInformation'] } },
  options: [
    { name: 'List Payers', value: 'listPayers', description: 'List available insurance payers', action: 'List payers' },
    { name: 'Get Payer', value: 'getPayer', description: 'Get specific payer details and requirements', action: 'Get payer' },
    { name: 'Get Payer Requirements', value: 'getPayerRequirements', description: 'Get payer-specific claim requirements', action: 'Get payer requirements' },
    { name: 'Search Payers', value: 'searchPayers', description: 'Search payers by name or identifier', action: 'Search payers' },
  ],
  default: 'listPayers',
},
{
  displayName: 'Patient ID',
  name: 'patientId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['createVerification'] } },
  default: '',
  description: 'The ID of the patient for eligibility verification',
},
{
  displayName: 'Insurance Information',
  name: 'insuranceInfo',
  type: 'fixedCollection',
  required: true,
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['createVerification'] } },
  default: {},
  typeOptions: { multipleValues: false },
  options: [
    {
      displayName: 'Insurance Details',
      name: 'insuranceDetails',
      values: [
        { displayName: 'Insurance Company', name: 'company', type: 'string', default: '', required: true },
        { displayName: 'Policy Number', name: 'policyNumber', type: 'string', default: '', required: true },
        { displayName: 'Group Number', name: 'groupNumber', type: 'string', default: '' },
        { displayName: 'Member ID', name: 'memberId', type: 'string', default: '', required: true }
      ]
    }
  ],
  description: 'Insurance information for verification',
},
{
  displayName: 'Service Date',
  name: 'serviceDate',
  type: 'dateTime',
  required: true,
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['createVerification'] } },
  default: '',
  description: 'Date of service for eligibility verification',
},
{
  displayName: 'Verification ID',
  name: 'verificationId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['getVerification', 'updateVerification', 'deleteVerification'] } },
  default: '',
  description: 'The ID of the eligibility verification',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['listVerifications'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['listVerifications'] } },
  default: 50,
  description: 'Number of results per page',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['listVerifications'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'pending' },
    { name: 'Completed', value: 'completed' },
    { name: 'Failed', value: 'failed' }
  ],
  default: '',
  description: 'Filter by verification status',
},
{
  displayName: 'Date Range',
  name: 'dateRange',
  type: 'fixedCollection',
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['listVerifications'] } },
  default: {},
  typeOptions: { multipleValues: false },
  options: [
    {
      displayName: 'Date Range',
      name: 'range',
      values: [
        { displayName: 'Start Date', name: 'startDate', type: 'dateTime', default: '' },
        { displayName: 'End Date', name: 'endDate', type: 'dateTime', default: '' }
      ]
    }
  ],
  description: 'Filter by date range',
},
{
  displayName: 'Updated Data',
  name: 'updatedData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['eligibilityVerification'], operation: ['updateVerification'] } },
  default: '{}',
  description: 'JSON object containing fields to update',
},
{
	displayName: 'Patient Information',
	name: 'patientInfo',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['createClaim'],
		},
	},
	default: '{}',
	description: 'Patient information object containing demographics and insurance details',
},
{
	displayName: 'Provider Information',
	name: 'providerInfo',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['createClaim'],
		},
	},
	default: '{}',
	description: 'Healthcare provider information',
},
{
	displayName: 'Services',
	name: 'services',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['createClaim'],
		},
	},
	default: '[]',
	description: 'Array of services provided with CPT codes and charges',
},
{
	displayName: 'Diagnosis Codes',
	name: 'diagnosisCodes',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['createClaim'],
		},
	},
	default: '[]',
	description: 'Array of ICD-10 diagnosis codes',
},
{
	displayName: 'Claim ID',
	name: 'claimId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['getClaim', 'updateClaim', 'deleteClaim', 'resubmitClaim'],
		},
	},
	default: '',
	description: 'The ID of the claim',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['listClaims'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['listClaims'],
		},
	},
	default: 50,
	description: 'Number of claims per page',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['listClaims'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Submitted',
			value: 'submitted',
		},
		{
			name: 'Processing',
			value: 'processing',
		},
		{
			name: 'Paid',
			value: 'paid',
		},
		{
			name: 'Rejected',
			value: 'rejected',
		},
		{
			name: 'Denied',
			value: 'denied',
		},
	],
	default: '',
	description: 'Filter claims by status',
},
{
	displayName: 'Date Range',
	name: 'dateRange',
	type: 'json',
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['listClaims'],
		},
	},
	default: '{}',
	description: 'Date range filter with start_date and end_date',
},
{
	displayName: 'Patient ID',
	name: 'patientId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['listClaims'],
		},
	},
	default: '',
	description: 'Filter claims by patient ID',
},
{
	displayName: 'Updated Claim Data',
	name: 'updatedClaimData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['updateClaim'],
		},
	},
	default: '{}',
	description: 'Updated claim information',
},
{
	displayName: 'Corrections',
	name: 'corrections',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['claimsManagement'],
			operation: ['resubmitClaim'],
		},
	},
	default: '{}',
	description: 'Corrections to be made before resubmission',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['listRemittances', 'listPayments'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['listRemittances', 'listPayments'],
		},
	},
	default: 50,
	description: 'Maximum number of results per page',
},
{
	displayName: 'Date Range',
	name: 'dateRange',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['listRemittances', 'listPayments'],
		},
	},
	default: '',
	description: 'Date range filter (e.g., 2023-01-01,2023-12-31)',
},
{
	displayName: 'Payer ID',
	name: 'payerId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['listRemittances'],
		},
	},
	default: '',
	description: 'Filter remittances by payer ID',
},
{
	displayName: 'Remittance ID',
	name: 'remittanceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['getRemittance', 'downloadRemittance'],
		},
	},
	default: '',
	description: 'ID of the remittance to retrieve or download',
},
{
	displayName: 'Format',
	name: 'format',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['downloadRemittance'],
		},
	},
	options: [
		{
			name: 'PDF',
			value: 'pdf',
		},
		{
			name: 'EDI',
			value: 'edi',
		},
		{
			name: 'CSV',
			value: 'csv',
		},
	],
	default: 'pdf',
	description: 'Format for the downloaded remittance file',
},
{
	displayName: 'Claim ID',
	name: 'claimId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['listPayments'],
		},
	},
	default: '',
	description: 'Filter payments by claim ID',
},
{
	displayName: 'Payment ID',
	name: 'paymentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['eraProcessing'],
			operation: ['getPayment'],
		},
	},
	default: '',
	description: 'ID of the payment to retrieve',
},
{
	displayName: 'Demographics',
	name: 'demographics',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['createPatient'],
		},
	},
	default: '{}',
	description: 'Patient demographic information',
},
{
	displayName: 'Insurance Info',
	name: 'insurance_info',
	type: 'json',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['createPatient'],
		},
	},
	default: '{}',
	description: 'Patient insurance information',
},
{
	displayName: 'Contact Details',
	name: 'contact_details',
	type: 'json',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['createPatient'],
		},
	},
	default: '{}',
	description: 'Patient contact details',
},
{
	displayName: 'Patient ID',
	name: 'patient_id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['getPatient'],
		},
	},
	default: '',
	description: 'The ID of the patient to retrieve',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['listPatients'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['listPatients'],
		},
	},
	default: 50,
	description: 'Number of results per page',
},
{
	displayName: 'Search Term',
	name: 'search_term',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['listPatients'],
		},
	},
	default: '',
	description: 'Search term to filter patients',
},
{
	displayName: 'Date of Birth',
	name: 'date_of_birth',
	type: 'dateTime',
	required: false,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['listPatients'],
		},
	},
	default: '',
	description: 'Filter patients by date of birth',
},
{
	displayName: 'Patient ID',
	name: 'patient_id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['updatePatient'],
		},
	},
	default: '',
	description: 'The ID of the patient to update',
},
{
	displayName: 'Updated Patient Data',
	name: 'updated_patient_data',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['updatePatient'],
		},
	},
	default: '{}',
	description: 'Updated patient information',
},
{
	displayName: 'Patient ID',
	name: 'patient_id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['patientManagement'],
			operation: ['deletePatient'],
		},
	},
	default: '',
	description: 'The ID of the patient to delete',
},
{
  displayName: 'NPI',
  name: 'npi',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['providerManagement'], operation: ['createProvider'] } },
  default: '',
  description: 'National Provider Identifier',
},
{
  displayName: 'Provider Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['providerManagement'], operation: ['createProvider'] } },
  default: '',
  description: 'Full name of the provider',
},
{
  displayName: 'Credentials',
  name: 'credentials',
  type: 'string',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['createProvider'] } },
  default: '',
  description: 'Provider credentials (e.g., MD, RN, PA)',
},
{
  displayName: 'Specialties',
  name: 'specialties',
  type: 'string',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['createProvider'] } },
  default: '',
  description: 'Provider specialties (comma-separated)',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'json',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['createProvider'] } },
  default: '{}',
  description: 'Provider address information',
},
{
  displayName: 'Provider ID',
  name: 'providerId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['providerManagement'], operation: ['getProvider', 'updateProvider', 'deleteProvider'] } },
  default: '',
  description: 'Unique identifier of the provider',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['listProviders'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['listProviders'] } },
  default: 50,
  description: 'Number of records per page',
},
{
  displayName: 'Specialty Filter',
  name: 'specialty',
  type: 'string',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['listProviders'] } },
  default: '',
  description: 'Filter providers by specialty',
},
{
  displayName: 'NPI Filter',
  name: 'npiFilter',
  type: 'string',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['listProviders'] } },
  default: '',
  description: 'Filter providers by NPI',
},
{
  displayName: 'Status Filter',
  name: 'status',
  type: 'options',
  displayOptions: { show: { resource: ['providerManagement'], operation: ['listProviders'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Pending', value: 'pending' }
  ],
  default: '',
  description: 'Filter providers by status',
},
{
  displayName: 'Updated Provider Data',
  name: 'updatedProviderData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['providerManagement'], operation: ['updateProvider'] } },
  default: '{}',
  description: 'Updated provider information',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['payerInformation'], operation: ['listPayers'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['payerInformation'], operation: ['listPayers'] } },
  default: 50,
  description: 'Number of items to return per page',
},
{
  displayName: 'State',
  name: 'state',
  type: 'string',
  displayOptions: { show: { resource: ['payerInformation'], operation: ['listPayers', 'searchPayers'] } },
  default: '',
  description: 'Filter by state code',
},
{
  displayName: 'Payer Type',
  name: 'payerType',
  type: 'options',
  displayOptions: { show: { resource: ['payerInformation'], operation: ['listPayers', 'searchPayers'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Commercial', value: 'commercial' },
    { name: 'Medicare', value: 'medicare' },
    { name: 'Medicaid', value: 'medicaid' },
    { name: 'Self Pay', value: 'self_pay' },
  ],
  default: '',
  description: 'Type of payer to filter by',
},
{
  displayName: 'Payer ID',
  name: 'payerId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['payerInformation'], operation: ['getPayer', 'getPayerRequirements'] } },
  default: '',
  description: 'ID of the payer to retrieve',
},
{
  displayName: 'Service Type',
  name: 'serviceType',
  type: 'string',
  displayOptions: { show: { resource: ['payerInformation'], operation: ['getPayerRequirements'] } },
  default: '',
  description: 'Type of service to get requirements for',
},
{
  displayName: 'Query',
  name: 'query',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['payerInformation'], operation: ['searchPayers'] } },
  default: '',
  description: 'Search query for payer name or identifier',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'eligibilityVerification':
        return [await executeEligibilityVerificationOperations.call(this, items)];
      case 'claimsManagement':
        return [await executeClaimsManagementOperations.call(this, items)];
      case 'eraProcessing':
        return [await executeEraProcessingOperations.call(this, items)];
      case 'patientManagement':
        return [await executePatientManagementOperations.call(this, items)];
      case 'providerManagement':
        return [await executeProviderManagementOperations.call(this, items)];
      case 'payerInformation':
        return [await executePayerInformationOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeEligibilityVerificationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('officeallyApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      const baseHeaders = {
        'Authorization': `Bearer ${credentials.accessToken}`,
        'Content-Type': 'application/json',
        'X-API-Version': '1.0'
      };

      switch (operation) {
        case 'createVerification': {
          const patientId = this.getNodeParameter('patientId', i) as string;
          const insuranceInfo = this.getNodeParameter('insuranceInfo', i) as any;
          const serviceDate = this.getNodeParameter('serviceDate', i) as string;

          const requestBody = {
            patient_id: patientId,
            insurance_info: insuranceInfo.insuranceDetails,
            service_date: serviceDate
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/eligibility/verification`,
            headers: baseHeaders,
            body: requestBody,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getVerification': {
          const verificationId = this.getNodeParameter('verificationId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/eligibility/verification/${verificationId}`,
            headers: baseHeaders,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listVerifications': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          const status = this.getNodeParameter('status', i) as string;
          const dateRange = this.getNodeParameter('dateRange', i) as any;

          const queryParams: any = {
            page: page.toString(),
            limit: limit.toString()
          };

          if (status) {
            queryParams.status = status;
          }

          if (dateRange.range && dateRange.range.startDate) {
            queryParams.start_date = dateRange.range.startDate;
          }

          if (dateRange.range && dateRange.range.endDate) {
            queryParams.end_date = dateRange.range.endDate;
          }

          const queryString = new URLSearchParams(queryParams).toString();

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/eligibility/verifications?${queryString}`,
            headers: baseHeaders,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateVerification': {
          const verificationId = this.getNodeParameter('verificationId', i) as string;
          const updatedData = this.getNodeParameter('updatedData', i) as string;

          let parsedData: any;
          try {
            parsedData = JSON.parse(updatedData);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), 'Invalid JSON in Updated Data field');
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/eligibility/verification/${verificationId}`,
            headers: baseHeaders,
            body: parsedData,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteVerification': {
          const verificationId = this.getNodeParameter('verificationId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/eligibility/verification/${verificationId}`,
            headers: baseHeaders,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeClaimsManagementOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('officeallyApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseOptions: any = {
				headers: {
					'Authorization': `Bearer ${credentials.accessToken}`,
					'Content-Type': 'application/json',
					'X-API-Version': '1.0',
				},
				json: true,
			};

			switch (operation) {
				case 'createClaim': {
					const patientInfo = this.getNodeParameter('patientInfo', i) as any;
					const providerInfo = this.getNodeParameter('providerInfo', i) as any;
					const services = this.getNodeParameter('services', i) as any;
					const diagnosisCodes = this.getNodeParameter('diagnosisCodes', i) as any;

					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/claims`,
						body: {
							patient_info: typeof patientInfo === 'string' ? JSON.parse(patientInfo) : patientInfo,
							provider_info: typeof providerInfo === 'string' ? JSON.parse(providerInfo) : providerInfo,
							services: typeof services === 'string' ? JSON.parse(services) : services,
							diagnosis_codes: typeof diagnosisCodes === 'string' ? JSON.parse(diagnosisCodes) : diagnosisCodes,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getClaim': {
					const claimId = this.getNodeParameter('claimId', i) as string;

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/claims/${claimId}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'listClaims': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const status = this.getNodeParameter('status', i) as string;
					const dateRange = this.getNodeParameter('dateRange', i) as any;
					const patientId = this.getNodeParameter('patientId', i) as string;

					const queryParams: string[] = [];
					queryParams.push(`page=${page}`);
					queryParams.push(`limit=${limit}`);
					
					if (status) {
						queryParams.push(`status=${status}`);
					}
					
					if (patientId) {
						queryParams.push(`patient_id=${patientId}`);
					}
					
					if (dateRange && typeof dateRange === 'object' && Object.keys(dateRange).length > 0) {
						const dateRangeObj = typeof dateRange === 'string' ? JSON.parse(dateRange) : dateRange;
						if (dateRangeObj.start_date) {
							queryParams.push(`start_date=${dateRangeObj.start_date}`);
						}
						if (dateRangeObj.end_date) {
							queryParams.push(`end_date=${dateRangeObj.end_date}`);
						}
					}

					const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/claims${queryString}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateClaim': {
					const claimId = this.getNodeParameter('claimId', i) as string;
					const updatedClaimData = this.getNodeParameter('updatedClaimData', i) as any;

					const options: any = {
						...baseOptions,
						method: 'PUT',
						url: `${credentials.baseUrl}/claims/${claimId}`,
						body: typeof updatedClaimData === 'string' ? JSON.parse(updatedClaimData) : updatedClaimData,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteClaim': {
					const claimId = this.getNodeParameter('claimId', i) as string;

					const options: any = {
						...baseOptions,
						method: 'DELETE',
						url: `${credentials.baseUrl}/claims/${claimId}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'resubmitClaim': {
					const claimId = this.getNodeParameter('claimId', i) as string;
					const corrections = this.getNodeParameter('corrections', i) as any;

					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/claims/${claimId}/resubmit`,
						body: typeof corrections === 'string' ? JSON.parse(corrections) : corrections,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeEraProcessingOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('officeallyApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseHeaders = {
				'Authorization': `Bearer ${credentials.accessToken}`,
				'Content-Type': 'application/json',
				'X-API-Version': '1.0',
			};

			switch (operation) {
				case 'listRemittances': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const dateRange = this.getNodeParameter('dateRange', i) as string;
					const payerId = this.getNodeParameter('payerId', i) as string;

					const queryParams = new URLSearchParams();
					queryParams.append('page', page.toString());
					queryParams.append('limit', limit.toString());
					if (dateRange) queryParams.append('date_range', dateRange);
					if (payerId) queryParams.append('payer_id', payerId);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/era/remittances?${queryParams.toString()}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getRemittance': {
					const remittanceId = this.getNodeParameter('remittanceId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/era/remittances/${remittanceId}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'downloadRemittance': {
					const remittanceId = this.getNodeParameter('remittanceId', i) as string;
					const format = this.getNodeParameter('format', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/era/remittances/download`,
						headers: baseHeaders,
						body: {
							remittance_id: remittanceId,
							format: format,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'listPayments': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const dateRange = this.getNodeParameter('dateRange', i) as string;
					const claimId = this.getNodeParameter('claimId', i) as string;

					const queryParams = new URLSearchParams();
					queryParams.append('page', page.toString());
					queryParams.append('limit', limit.toString());
					if (dateRange) queryParams.append('date_range', dateRange);
					if (claimId) queryParams.append('claim_id', claimId);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/era/payments?${queryParams.toString()}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPayment': {
					const paymentId = this.getNodeParameter('paymentId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/era/payments/${paymentId}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executePatientManagementOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('officeallyApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'createPatient': {
					const demographics = this.getNodeParameter('demographics', i, {}) as object;
					const insurance_info = this.getNodeParameter('insurance_info', i, {}) as object;
					const contact_details = this.getNodeParameter('contact_details', i, {}) as object;

					const body = {
						demographics,
						insurance_info,
						contact_details,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl || 'https://api.officeally.com/v1'}/patients`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'X-API-Version': '1.0',
						},
						body,
						json: true,
					};

					result = await this.helpers.requestWithAuthentication.call(this, 'officeallyApi', options) as any;
					break;
				}

				case 'getPatient': {
					const patient_id = this.getNodeParameter('patient_id', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl || 'https://api.officeally.com/v1'}/patients/${patient_id}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'X-API-Version': '1.0',
						},
						json: true,
					};

					result = await this.helpers.requestWithAuthentication.call(this, 'officeallyApi', options) as any;
					break;
				}

				case 'listPatients': {
					const page = this.getNodeParameter('page', i, 1) as number;
					const limit = this.getNodeParameter('limit', i, 50) as number;
					const search_term = this.getNodeParameter('search_term', i, '') as string;
					const date_of_birth = this.getNodeParameter('date_of_birth', i, '') as string;

					const qs: any = {
						page,
						limit,
					};

					if (search_term) {
						qs.search_term = search_term;
					}

					if (date_of_birth) {
						qs.date_of_birth = date_of_birth;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl || 'https://api.officeally.com/v1'}/patients`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'X-API-Version': '1.0',
						},
						qs,
						json: true,
					};

					result = await this.helpers.requestWithAuthentication.call(this, 'officeallyApi', options) as any;
					break;
				}

				case 'updatePatient': {
					const patient_id = this.getNodeParameter('patient_id', i) as string;
					const updated_patient_data = this.getNodeParameter('updated_patient_data', i, {}) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl || 'https://api.officeally.com/v1'}/patients/${patient_id}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'X-API-Version': '1.0',
						},
						body: updated_patient_data,
						json: true,
					};

					result = await this.helpers.requestWithAuthentication.call(this, 'officeallyApi', options) as any;
					break;
				}

				case 'deletePatient': {
					const patient_id = this.getNodeParameter('patient_id', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl || 'https://api.officeally.com/v1'}/patients/${patient_id}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'X-API-Version': '1.0',
						},
						json: true,
					};

					result = await this.helpers.requestWithAuthentication.call(this, 'officeallyApi', options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeProviderManagementOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('officeallyApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'createProvider': {
          const npi = this.getNodeParameter('npi', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const credentials_param = this.getNodeParameter('credentials', i) as string;
          const specialties = this.getNodeParameter('specialties', i) as string;
          const address = this.getNodeParameter('address', i) as object;

          const body = {
            npi,
            name,
            credentials: credentials_param,
            specialties: specialties ? specialties.split(',').map((s: string) => s.trim()) : [],
            address,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/providers`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
              'X-API-Version': '1.0',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getProvider': {
          const providerId = this.getNodeParameter('providerId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/providers/${providerId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
              'X-API-Version': '1.0',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listProviders': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          const specialty = this.getNodeParameter('specialty', i) as string;
          const npiFilter = this.getNodeParameter('npiFilter', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          const queryParams: any = { page, limit };
          if (specialty) queryParams.specialty = specialty;
          if (npiFilter) queryParams.npi = npiFilter;
          if (status) queryParams.status = status;

          const queryString = new URLSearchParams(queryParams).toString();

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/providers?${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
              'X-API-Version': '1.0',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateProvider': {
          const providerId = this.getNodeParameter('providerId', i) as string;
          const updatedProviderData = this.getNodeParameter('updatedProviderData', i) as object;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/providers/${providerId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
              'X-API-Version': '1.0',
            },
            body: updatedProviderData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteProvider': {
          const providerId = this.getNodeParameter('providerId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/providers/${providerId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
              'X-API-Version': '1.0',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executePayerInformationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('officeallyApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      const baseUrl = credentials.baseUrl || 'https://api.officeally.com/v1';
      const baseOptions: any = {
        headers: {
          'Authorization': `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-API-Version': '1.0',
        },
        json: true,
      };

      switch (operation) {
        case 'listPayers': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          const state = this.getNodeParameter('state', i) as string;
          const payerType = this.getNodeParameter('payerType', i) as string;

          const queryParams = new URLSearchParams();
          queryParams.append('page', page.toString());
          queryParams.append('limit', limit.toString());
          if (state) queryParams.append('state', state);
          if (payerType) queryParams.append('payer_type', payerType);

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${baseUrl}/payers?${queryParams.toString()}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPayer': {
          const payerId = this.getNodeParameter('payerId', i) as string;

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${baseUrl}/payers/${payerId}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPayerRequirements': {
          const payerId = this.getNodeParameter('payerId', i) as string;
          const serviceType = this.getNodeParameter('serviceType', i) as string;

          const queryParams = new URLSearchParams();
          if (serviceType) queryParams.append('service_type', serviceType);

          const url = `${baseUrl}/payers/${payerId}/requirements${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'searchPayers': {
          const query = this.getNodeParameter('query', i) as string;
          const state = this.getNodeParameter('state', i) as string;
          const payerType = this.getNodeParameter('payerType', i) as string;

          const queryParams = new URLSearchParams();
          queryParams.append('query', query);
          if (state) queryParams.append('state', state);
          if (payerType) queryParams.append('payer_type', payerType);

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${baseUrl}/payers/search?${queryParams.toString()}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
