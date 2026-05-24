# Missing / Misaligned API Requirements — Create Campaign Flow

**Frontend Page:** `/admin/campaigns/create`  
**File:** `src/components/admin/campaigns/create-campaign-page.tsx`  
**Generated SDK:** `src/lib/api/generated/`  
**Date:** 2026-05-24

---

## Status: ✅ No Blocking Backend Gaps

After thorough analysis, **all required endpoints exist** in the generated SDK. The create campaign flow can be fully implemented with the current API contract. The items below are **observations and minor suggestions**, not blockers.

---

## Observations

### 1. `POST /admin/campaigns` — `panelCapacityKwp` is Required but No Frontend Field Exists

**Severity:** 🟡 Frontend fix needed (not backend)

The `PostAdminCampaignsData.body` requires `panelCapacityKwp: string` but the current form has no input for this field. **This is a frontend gap** — we need to add an input field.

**Question for backend team:** Is `panelCapacityKwp` truly required, or can it be made optional? If it must be required, what are typical values? (e.g. "5.0", "10.5" kWp)

---

### 2. `religionType` Enum vs Frontend "Agama" Values

**Severity:** 🟡 Frontend mapping issue

The worship place API uses `religionType: 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng'` — these are worship place **types**, not religions.

The current frontend dropdown labeled "Agama" has values: `Islam, Kristen, Katolik, Hindu, Buddha, Konghucu`.

**These are not 1:1 mappable** — e.g. both `Kristen` and `Katolik` could map to `Gereja`, and `Islam` could map to either `Masjid` or `Mushalla`.

**Recommendation:** Frontend will change the dropdown from "Agama" to "Tipe Rumah Ibadah" with the exact enum values from the API. **No backend change needed.**

---

### 3. Upload Flow — Two Endpoints Available

**Severity:** ℹ️ Informational

Two upload endpoints exist:

- `POST /assets/upload` (public)
- `POST /admin/uploads/presign` (admin)

Both return identical response shapes. **Frontend will use `/admin/uploads/presign`** since this is an admin-only flow.

**Question for backend team:** Is `/assets/upload` intended for public users? Should admin flows always use `/admin/uploads/presign`?

---

### 4. `estimatedKwhAnnual` vs `energyProducedKwhMonthly`

**Severity:** ℹ️ Informational

The API has both fields on the campaign:

- `estimatedKwhAnnual: string` — appears to be pre-installation estimate
- `energyProducedKwhMonthly: string` — appears to be post-installation actual

The form currently only has "Energi yang Dihasilkan (kWh/Bulan)" which maps to `energyProducedKwhMonthly`. We will also derive `estimatedKwhAnnual = energyProducedKwhMonthly * 12` unless the backend wants these to be independent values.

**Question for backend team:** Should `estimatedKwhAnnual` be calculated server-side, or should the frontend send it explicitly?

---

## Available Endpoints — Full Mapping

All endpoints needed for the create campaign flow exist:

| Step                         | Endpoint                            | Status       |
| ---------------------------- | ----------------------------------- | ------------ |
| Create worship place         | `POST /admin/worship-places`        | ✅ Available |
| Get presigned upload URL     | `POST /admin/uploads/presign`       | ✅ Available |
| Create campaign              | `POST /admin/campaigns`             | ✅ Available |
| Attach cover image           | `POST /admin/campaigns/{id}/assets` | ✅ Available |
| List worship places (search) | `GET /admin/worship-places`         | ✅ Available |
| Update campaign (draft)      | `PATCH /campaigns/{id}`             | ✅ Available |

---

## No Action Required From Backend

The frontend can proceed with implementation. The questions above are **nice-to-know** clarifications but do not block development.
