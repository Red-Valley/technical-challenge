# API Testing Examples

This file contains examples of how to test the Medwork API using curl commands.

## Prerequisites
Make sure the application is running on `http://localhost:3000`

## 1. Get Status Hierarchy
```bash
curl -X GET http://localhost:3000/statuses/hierarchy
```

## 2. Create a Provider
```bash
curl -X POST http://localhost:3000/providers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Dr. Sarah Johnson",
    "specialty": "Internal Medicine"
  }'
```

## 3. Get All Providers
```bash
curl -X GET http://localhost:3000/providers
```

## 4. Create a Patient (use actual provider and status IDs)
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Alice Cooper",
    "email": "alice.cooper@example.com",
    "phone": "+1987654321",
    "providerId": "YOUR_PROVIDER_ID",
    "statusId": "YOUR_STATUS_ID"
  }'
```

## 5. Get All Patients
```bash
curl -X GET http://localhost:3000/patients
```

## 6. Change Patient Status (use actual patient and status IDs)
```bash
curl -X PATCH http://localhost:3000/patients/YOUR_PATIENT_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "statusId": "YOUR_NEW_STATUS_ID"
  }'
```

## 7. Get Patient Status History (use actual patient ID)
```bash
curl -X GET http://localhost:3000/patients/YOUR_PATIENT_ID/status-history
```

## 8. Get Specific Patient (use actual patient ID)
```bash
curl -X GET http://localhost:3000/patients/YOUR_PATIENT_ID
```

## 9. Get Specific Provider (use actual provider ID)
```bash
curl -X GET http://localhost:3000/providers/YOUR_PROVIDER_ID
```

## Status Hierarchy Structure
```
Scheduled
├── Checked-In
│   ├── In Consultation
│   └── Cancelled
└── No-Show
```

## Error Testing
Test validation by sending invalid data:

### Invalid Email
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "invalid-email",
    "phone": "+1234567890",
    "providerId": "some-uuid",
    "statusId": "some-uuid"
  }'
```

### Non-existent Provider
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "providerId": "00000000-0000-0000-0000-000000000000",
    "statusId": "some-valid-status-id"
  }'
```
