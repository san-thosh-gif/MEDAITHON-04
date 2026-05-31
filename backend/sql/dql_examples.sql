USE medaithon57;

SELECT id, name, mobile, otp, created_at
FROM callback_requests
ORDER BY created_at DESC;

SELECT id, uhid, diagnosis, severity, next_follow_up, created_at
FROM patient_followups
ORDER BY created_at DESC;

SELECT severity, COUNT(*) AS total_patients
FROM patient_followups
GROUP BY severity
ORDER BY total_patients DESC;

SELECT uhid, diagnosis, next_follow_up
FROM patient_followups
WHERE next_follow_up >= CURDATE();
