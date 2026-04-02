/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { OfficeAlly } from '../nodes/Office Ally/Office Ally.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('OfficeAlly Node', () => {
  let node: OfficeAlly;

  beforeAll(() => {
    node = new OfficeAlly();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Office Ally');
      expect(node.description.name).toBe('officeally');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('EligibilityVerification Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://api.officeally.com/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  describe('createVerification operation', () => {
    it('should create verification successfully', async () => {
      const mockResponse = { id: '123', status: 'pending' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createVerification')
        .mockReturnValueOnce('patient123')
        .mockReturnValueOnce({ insuranceDetails: { company: 'Test Insurance' } })
        .mockReturnValueOnce('2024-01-01');

      const result = await executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.officeally.com/v1/eligibility/verification',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
          'X-API-Version': '1.0'
        },
        body: {
          patient_id: 'patient123',
          insurance_info: { company: 'Test Insurance' },
          service_date: '2024-01-01'
        },
        json: true
      });
    });

    it('should handle createVerification error', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.getNodeParameter.mockReturnValue('createVerification');

      await expect(executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      )).rejects.toThrow('API Error');
    });
  });

  describe('getVerification operation', () => {
    it('should get verification successfully', async () => {
      const mockResponse = { id: '123', status: 'completed' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getVerification')
        .mockReturnValueOnce('123');

      const result = await executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });

    it('should handle getVerification error', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Not found'));
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getVerification');

      await expect(executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      )).rejects.toThrow('Not found');
    });
  });

  describe('listVerifications operation', () => {
    it('should list verifications successfully', async () => {
      const mockResponse = { data: [], total: 0 };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listVerifications')
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(50)
        .mockReturnValueOnce('pending')
        .mockReturnValueOnce({ range: { startDate: '2024-01-01', endDate: '2024-01-31' } });

      const result = await executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('updateVerification operation', () => {
    it('should update verification successfully', async () => {
      const mockResponse = { id: '123', status: 'updated' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateVerification')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('{"status":"updated"}');

      const result = await executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });

    it('should handle invalid JSON in updateVerification', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateVerification')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('invalid json');

      await expect(executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      )).rejects.toThrow('Invalid JSON in Updated Data field');
    });
  });

  describe('deleteVerification operation', () => {
    it('should delete verification successfully', async () => {
      const mockResponse = { success: true };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteVerification')
        .mockReturnValueOnce('123');

      const result = await executeEligibilityVerificationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});

describe('ClaimsManagement Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-access-token',
				baseUrl: 'https://api.officeally.com/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('createClaim operation', () => {
		it('should create a claim successfully', async () => {
			const mockResponse = { id: 'claim-123', status: 'submitted' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createClaim')
				.mockReturnValueOnce({ patient_id: 'pat-123' })
				.mockReturnValueOnce({ provider_id: 'prov-123' })
				.mockReturnValueOnce([{ cpt_code: '99213' }])
				.mockReturnValueOnce(['M79.3']);

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'POST',
					url: 'https://api.officeally.com/v1/claims',
					headers: expect.objectContaining({
						'X-API-Version': '1.0'
					})
				})
			);
		});

		it('should handle create claim error', async () => {
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid patient data'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.getNodeParameter.mockReturnValue('createClaim');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json.error).toContain('Invalid patient data');
		});
	});

	describe('getClaim operation', () => {
		it('should get claim successfully', async () => {
			const mockResponse = { id: 'claim-123', status: 'processing' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getClaim')
				.mockReturnValueOnce('claim-123');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'GET',
					url: 'https://api.officeally.com/v1/claims/claim-123'
				})
			);
		});

		it('should handle get claim error', async () => {
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Claim not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getClaim');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json.error).toContain('Claim not found');
		});
	});

	describe('listClaims operation', () => {
		it('should list claims with filters successfully', async () => {
			const mockResponse = { claims: [], total: 0, page: 1 };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listClaims')
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(50)
				.mockReturnValueOnce('submitted')
				.mockReturnValueOnce({ start_date: '2023-01-01', end_date: '2023-12-31' })
				.mockReturnValueOnce('pat-123');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'GET',
					url: expect.stringContaining('status=submitted&patient_id=pat-123')
				})
			);
		});
	});

	describe('updateClaim operation', () => {
		it('should update claim successfully', async () => {
			const mockResponse = { id: 'claim-123', status: 'updated' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateClaim')
				.mockReturnValueOnce('claim-123')
				.mockReturnValueOnce({ status: 'corrected' });

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'PUT',
					url: 'https://api.officeally.com/v1/claims/claim-123'
				})
			);
		});
	});

	describe('deleteClaim operation', () => {
		it('should delete claim successfully', async () => {
			const mockResponse = { message: 'Claim deleted successfully' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteClaim')
				.mockReturnValueOnce('claim-123');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'DELETE',
					url: 'https://api.officeally.com/v1/claims/claim-123'
				})
			);
		});
	});

	describe('resubmitClaim operation', () => {
		it('should resubmit claim successfully', async () => {
			const mockResponse = { id: 'claim-123', status: 'resubmitted' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('resubmitClaim')
				.mockReturnValueOnce('claim-123')
				.mockReturnValueOnce({ corrected_diagnosis: 'M79.1' });

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'POST',
					url: 'https://api.officeally.com/v1/claims/claim-123/resubmit'
				})
			);
		});

		it('should handle resubmit claim error', async () => {
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid corrections'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.getNodeParameter.mockReturnValue('resubmitClaim');

			const result = await executeClaimsManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result[0].json.error).toContain('Invalid corrections');
		});
	});
});

describe('EraProcessing Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://api.officeally.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should list remittances successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			const params: any = {
				operation: 'listRemittances',
				page: 1,
				limit: 50,
				dateRange: '2023-01-01,2023-12-31',
				payerId: 'payer123',
			};
			return params[param];
		});

		const mockResponse = {
			remittances: [{ id: '1', payer_name: 'Test Payer' }],
			total: 1,
		};
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeEraProcessingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([
			{ json: mockResponse, pairedItem: { item: 0 } },
		]);
	});

	it('should get remittance successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			const params: any = {
				operation: 'getRemittance',
				remittanceId: 'rem123',
			};
			return params[param];
		});

		const mockResponse = {
			id: 'rem123',
			payer_name: 'Test Payer',
			total_amount: 1000,
		};
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeEraProcessingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([
			{ json: mockResponse, pairedItem: { item: 0 } },
		]);
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			return param === 'operation' ? 'listRemittances' : 1;
		});
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
			new Error('API Error'),
		);

		const result = await executeEraProcessingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([
			{ json: { error: 'API Error' }, pairedItem: { item: 0 } },
		]);
	});
});

describe('PatientManagement Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://api.officeally.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('createPatient', () => {
		it('should create a patient successfully', async () => {
			const mockResponse = { id: '12345', status: 'created' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createPatient')
				.mockReturnValueOnce({ firstName: 'John', lastName: 'Doe' })
				.mockReturnValueOnce({ provider: 'Blue Cross' })
				.mockReturnValueOnce({ phone: '555-1234' });
			mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});

		it('should handle createPatient error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('createPatient');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getPatient', () => {
		it('should get a patient successfully', async () => {
			const mockResponse = { id: '12345', firstName: 'John', lastName: 'Doe' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPatient')
				.mockReturnValueOnce('12345');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});

		it('should handle getPatient error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getPatient');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('Patient not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('Patient not found');
		});
	});

	describe('listPatients', () => {
		it('should list patients successfully', async () => {
			const mockResponse = { patients: [{ id: '1' }, { id: '2' }], total: 2 };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listPatients')
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(50)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});

		it('should handle listPatients error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('listPatients');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('Access denied'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('Access denied');
		});
	});

	describe('updatePatient', () => {
		it('should update a patient successfully', async () => {
			const mockResponse = { id: '12345', status: 'updated' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updatePatient')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce({ firstName: 'Jane' });
			mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});

		it('should handle updatePatient error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updatePatient');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('Update failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('Update failed');
		});
	});

	describe('deletePatient', () => {
		it('should delete a patient successfully', async () => {
			const mockResponse = { status: 'deleted' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deletePatient')
				.mockReturnValueOnce('12345');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});

		it('should handle deletePatient error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('deletePatient');
			mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('Delete failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePatientManagementOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('Delete failed');
		});
	});
});

describe('Provider Management Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        accessToken: 'test-token', 
        baseUrl: 'https://api.officeally.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should create a provider successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createProvider')
      .mockReturnValueOnce('1234567890')
      .mockReturnValueOnce('Dr. John Smith')
      .mockReturnValueOnce('MD')
      .mockReturnValueOnce('Cardiology, Internal Medicine')
      .mockReturnValueOnce({ street: '123 Main St', city: 'Anytown', state: 'CA' });

    const mockResponse = { id: 'provider-123', npi: '1234567890', name: 'Dr. John Smith' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: mockResponse, 
      pairedItem: { item: 0 } 
    }]);
  });

  it('should get a provider successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getProvider')
      .mockReturnValueOnce('provider-123');

    const mockResponse = { id: 'provider-123', npi: '1234567890', name: 'Dr. John Smith' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: mockResponse, 
      pairedItem: { item: 0 } 
    }]);
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getProvider');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Provider not found'));

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: { error: 'Provider not found' }, 
      pairedItem: { item: 0 } 
    }]);
  });

  it('should list providers with filters', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listProviders')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('Cardiology')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('active');

    const mockResponse = { 
      providers: [{ id: 'provider-123', name: 'Dr. Smith' }], 
      total: 1 
    };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: mockResponse, 
      pairedItem: { item: 0 } 
    }]);
  });

  it('should update a provider successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateProvider')
      .mockReturnValueOnce('provider-123')
      .mockReturnValueOnce({ name: 'Dr. John Smith Updated' });

    const mockResponse = { id: 'provider-123', name: 'Dr. John Smith Updated' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: mockResponse, 
      pairedItem: { item: 0 } 
    }]);
  });

  it('should delete a provider successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('deleteProvider')
      .mockReturnValueOnce('provider-123');

    const mockResponse = { success: true, message: 'Provider deleted' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeProviderManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([{ 
      json: mockResponse, 
      pairedItem: { item: 0 } 
    }]);
  });
});

describe('Payer Information Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://api.officeally.com/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  describe('listPayers operation', () => {
    it('should list payers successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listPayers')
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(50)
        .mockReturnValueOnce('CA')
        .mockReturnValueOnce('commercial');

      const mockResponse = {
        payers: [{ id: '1', name: 'Blue Cross', type: 'commercial' }],
        total: 1,
        page: 1
      };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executePayerInformationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.officeally.com/v1/payers?page=1&limit=50&state=CA&payer_type=commercial',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
          'X-API-Version': '1.0',
        },
        json: true,
      });
    });

    it('should handle listPayers error', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listPayers')
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(50)
        .mockReturnValueOnce('')
        .mockReturnValueOnce('');

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executePayerInformationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('API Error');
    });
  });

  describe('getPayer operation', () => {
    it('should get payer successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getPayer')
        .mockReturnValueOnce('payer123');

      const mockResponse = {
        id: 'payer123',
        name: 'Blue Cross',
        type: 'commercial',
        requirements: {}
      };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executePayerInformationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.officeally.com/v1/payers/payer123',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
          'X-API-Version': '1.0',
        },
        json: true,
      });
    });
  });

  describe('getPayerRequirements operation', () => {
    it('should get payer requirements successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getPayerRequirements')
        .mockReturnValueOnce('payer123')
        .mockReturnValueOnce('office_visit');

      const mockResponse = {
        requirements: {
          prior_auth_required: true,
          referral_required: false
        }
      };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executePayerInformationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.officeally.com/v1/payers/payer123/requirements?service_type=office_visit',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
          'X-API-Version': '1.0',
        },
        json: true,
      });
    });
  });

  describe('searchPayers operation', () => {
    it('should search payers successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('searchPayers')
        .mockReturnValueOnce('Blue Cross')
        .mockReturnValueOnce('CA')
        .mockReturnValueOnce('commercial');

      const mockResponse = {
        payers: [{ id: '1', name: 'Blue Cross CA', type: 'commercial' }],
        total: 1
      };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executePayerInformationOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.officeally.com/v1/payers/search?query=Blue+Cross&state=CA&payer_type=commercial',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
          'X-API-Version': '1.0',
        },
        json: true,
      });
    });
  });
});
});
