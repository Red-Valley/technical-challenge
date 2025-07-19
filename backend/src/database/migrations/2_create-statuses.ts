const createStatuses = `
    INSERT INTO statuses (id, name, parent_id, order_number)
        VALUES ('1f064c20-4219-6c70-9df9-ede9b1caca6e', 'Scheduled', null, 1);
    INSERT INTO statuses (id, name, parent_id, order_number)
        VALUES ('1f064c2a-ddc6-62e0-a2bc-671332c59b42', 'Checked-In', '1f064c20-4219-6c70-9df9-ede9b1caca6e', 2);
    INSERT INTO statuses (id, name, parent_id, order_number)
        VALUES ('1f064c2b-b8da-62a0-abae-f53c18af3f46', 'No-Show', '1f064c20-4219-6c70-9df9-ede9b1caca6e', 2);
    INSERT INTO statuses (id, name, parent_id, order_number)
        VALUES ('1f064c2d-b1d7-6820-961e-4825c3a5e25a', 'In Consultation', '1f064c2a-ddc6-62e0-a2bc-671332c59b42', 3);
    INSERT INTO statuses (id, name, parent_id, order_number)
        VALUES ('1f064c2e-594c-6290-bd5f-76ea69564784', 'Cancelled', '1f064c2a-ddc6-62e0-a2bc-671332c59b42', 3);
`;

export default createStatuses;
