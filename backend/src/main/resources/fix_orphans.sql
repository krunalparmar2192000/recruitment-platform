SET FOREIGN_KEY_CHECKS = 0;

-- Delete recruiters pointing to users that don't exist
DELETE FROM recruiters WHERE user_id NOT IN (SELECT id FROM users);

-- Delete candidates pointing to users that don't exist
DELETE FROM candidates WHERE user_id NOT IN (SELECT id FROM users);

-- Also clean up companies/jobs if they point to non-existent recruiters
DELETE FROM companies WHERE recruiter_id NOT IN (SELECT id FROM recruiters);
DELETE FROM jobs WHERE recruiter_id NOT IN (SELECT id FROM recruiters);

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'Orphans cleaned up successfully' as message;
