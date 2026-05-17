# Security Specification for Citizen Governance Contract System (CGCS)

## 1. Data Invariants
- A `User` can only be created by the owner of the auth UID. Once created, only the owner can update their profile (except for `isVerified` which is admin-only).
- A `PriorityDemand` must be linked to a valid `authorId` which matches the `request.auth.uid`.
- `GovernanceContract` can only be created by `candidate`, `governor`, `mp`, or `mca` roles.
- `Project` updates can only be performed by the assigned official or an admin.
- `CivilReport` can be created by any signed-in citizen, but cannot be modified once submitted.
- `Budget` data is read-only for citizens and can only be updated by `auditor` or `admin`.

## 2. The Dirty Dozen Payloads
1. **Identity Theft**: Attempt to create a user profile with a UID that doesn't match the auth token.
2. **Privilege Escalation**: Citizen attempting to set `role: "admin"` or `isVerified: true` on their own profile.
3. **Ghost Demand**: Creating a priority demand without an `authorId` or with someone else's `authorId`.
4. **Voter Manipulation**: Updating the `votesCount` of a demand directly from the client.
5. **Contract Forgery**: A citizen attempting to create or sign a `GovernanceContract`.
6. **Project Sabotage**: Unauthorized user attempting to update the `progress` or `budget` of a project.
7. **Budget Tampering**: Citizen attempting to overwrite budget data.
8. **Evidence Injection**: Submitting a report linked to a non-existent project.
9. **Shadow Field Injection**: Adding `isCorrupt: false` to a project document where it's not defined in the schema.
10. **Immutable Field Update**: Attempting to change `createdAt` on any document.
11. **Resource Exhaustion**: Sending a 1MB string as a demand title.
12. **Unauthorized PII Access**: A user attempting to read the private contact info (if added later) of another user.

## 3. Test Runner Concept (Draft)
```typescript
import { assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
// ... (Implementation would follow in a real test file)
```
