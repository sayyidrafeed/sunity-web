# Refactoring Plan: create-campaign-page.tsx → API Integration & Code Organization

**Goal:** Refactor the 1300+ line campaign creation page to use real API endpoints, improve state management, extract components, and add proper validation.

**Deployment:** Cloudflare Pages (static SPA)  
**Dependencies:** TanStack Query, Hey-API (OpenAPI code gen), Zod  
**Related Skills:** `react-vite-best-practices`, `tanstack-query-best-practices`

---

## Phase 1: API Contract & Validation (Discovery)

### 1.1 Analyze Generated API Endpoints

**Purpose:** Identify available endpoints and their schemas  
**Files to Review:**

- `src/lib/api/generated/@tanstack/react-query.gen.ts` → Find query/mutation options
- `src/lib/api/generated/types.gen.ts` → Understand request/response types
- `src/lib/api/generated/zod.gen.ts` → Extract Zod validation schemas

**Key Endpoints Needed:**

- `postCampaigns` → Create campaign (main endpoint)
- `postAssetsUpload` → Upload cover image first, get URL
- `patchCampaignsById` → Update campaign (optional, for drafts)
- `getAdminWorshipPlaces` → Pre-fill worship place info (optional)

**Deliverable:** Document the API contract (params, response shape, error codes)

---

### 1.2 Create Validation Utilities

**Purpose:** Extract validation logic into reusable modules  
**Location:** `src/lib/validation/campaign.ts`  
**Actions:**

- Extract `getValidationErrors()` function logic
- Create separate validator functions per step (step1, step2, step3)
- Use Zod schemas from generated API types where applicable
- Export as `validateStep1()`, `validateStep2()`, `validateStep3()`

**Deliverable:**

```
src/lib/validation/
├── campaign.ts          (validation functions)
└── types.ts             (TypeScript types/interfaces)
```

---

## Phase 2: Component Architecture & State Management

### 2.1 Extract Form State Management

**Purpose:** Move form state logic out of component, prepare for TanStack Query  
**Location:** `src/hooks/useCampaignForm.ts`  
**Includes:**

- `formValues` state and setter
- Form handlers (handlePhoneChange, handleTargetDanaChange, etc.)
- Step navigation (handleNext, handlePrev)
- Formatting helpers (formatNumberString, etc.)

**Deliverable:**

```typescript
// Hook returns:
{
  formValues,
  setFormValues,
  step,
  setStep,
  showErrors,
  setShowErrors,
  handlers: { handlePhoneChange, handleTargetDanaChange, ... }
  formatters: { formatNumberString, ... }
}
```

---

### 2.2 Extract File Upload Logic

**Purpose:** Separate image upload into a custom hook with API integration  
**Location:** `src/hooks/useCampaignImageUpload.ts`  
**Includes:**

- File validation (size, type)
- Mutation hook wrapping `postAssetsUpload`
- Convert base64 to File/FormData
- Return `{ imageUrl, uploadImage, isLoading, error }`

**Deliverable:**

```typescript
const { imageUrl, uploadImage, isLoading, error } = useCampaignImageUpload();

// Usage:
const handleImageUpload = async (file) => {
  await uploadImage(file); // Returns URL or throws
};
```

---

### 2.3 Break UI into Sub-Components

**Purpose:** Split 1300-line file into focused, reusable components  
**New Files:**

```
src/components/admin/campaigns/
├── create-campaign-page.tsx          (main container, 200 lines)
├── steps/
│   ├── Step1WorshipPlaceInfo.tsx     (200 lines)
│   ├── Step2CampaignDetails.tsx      (250 lines)
│   ├── Step3ImpactEstimate.tsx       (200 lines)
│   └── Step4Review.tsx               (300 lines)
├── common/
│   ├── CampaignStepper.tsx           (50 lines)
│   ├── FormField.tsx                 (40 lines - generic text/textarea wrapper)
│   ├── FormSelect.tsx                (40 lines - generic select wrapper)
│   ├── ImageUploader.tsx             (80 lines)
│   └── SuccessModal.tsx              (50 lines)
└── shared.ts                          (types, constants, shared styles)
```

**Each step component receives:**

- `formValues` (props)
- `onFieldChange` (callback)
- `showErrors` (boolean)
- `errors` (object)

---

## Phase 3: API Integration & Data Flow

### 3.1 Implement Campaign Mutation Hook

**Purpose:** Wrap `postCampaigns` with TanStack Query, handle errors  
**Location:** `src/hooks/useCampaignMutation.ts`  
**Includes:**

- `useMutation` wrapping generated `postCampaigns`
- Request transformation (convert form data → API payload)
- Error handling (toast messages for validation/server errors)
- Success handling (show modal, redirect)

**Deliverable:**

```typescript
const createCampaignMutation = useCampaignMutation();

// Usage:
const handleSubmit = async () => {
  const payload = transformFormToCampaignPayload(formValues);
  await createCampaignMutation.mutateAsync(payload);
};
```

---

### 3.2 Update Form Submission Flow

**Current (localStorage mock):**

```
handleSubmit()
  → serialize form
  → localStorage.setItem()
  → show modal
  → navigate()
```

**New (API-driven):**

```
handleSubmit()
  → validate all steps
  → uploadImage() [if new image]
  → transformFormToCampaignPayload()
  → createCampaignMutation.mutateAsync()
  → On success: show modal → navigate()
  → On error: show toast error → stay on form
```

**Deliverable:** Replace `handleSubmit` logic in main component

---

## Phase 4: Component Refactoring & Cleanup

### 4.1 Main Component Refactor

**File:** `src/components/admin/campaigns/create-campaign-page.tsx`  
**Changes:**

- Remove ~900 lines of step UI markup
- Keep only:
  - Header/breadcrumb
  - `<CampaignStepper />`
  - Conditional step component render (e.g., `{step === 1 && <Step1WorshipPlaceInfo />}`)
  - Navigation buttons
  - Success modal (or extract to separate component)
- Use extracted hooks (`useCampaignForm`, `useCampaignImageUpload`, `useCampaignMutation`)

**Result:** ~150–200 lines total

---

### 4.2 Reusable Component Library

**Create shared form components:**

- **`FormField.tsx`** – Text input wrapper
  - Props: `label`, `value`, `onChange`, `error`, `placeholder`, `required`
- **`FormSelect.tsx`** – Select wrapper
  - Props: `label`, `value`, `onChange`, `options`, `error`, `required`
- **`FormTextarea.tsx`** – Textarea with char counter
  - Props: `label`, `value`, `onChange`, `error`, `maxLength`, `required`
- **`CurrencyInput.tsx`** – Currency input (Rp prefix, formatted)
  - Props: `value`, `onChange`, `error`
- **`ImageUploader.tsx`** – File upload with preview
  - Props: `imageUrl`, `onUpload`, `isLoading`, `error`, `maxSizeMB`
- **`CampaignStepper.tsx`** – Step indicator
  - Props: `steps`, `currentStep`, `onStepClick` (optional)

---

## Phase 5: Error Handling & UX

### 5.1 API Error Handling

**Implement:**

- Catch validation errors from backend → show per-field errors
- Catch network errors → toast message + retry option
- Timeout handling
- Loading states for image upload and campaign creation

**Deliverable:** Centralized error handler in mutation hook

---

### 5.2 Loading & Optimistic Updates (Optional)

**Consider:**

- Show loading spinner during image upload
- Disable submit button during campaign creation
- Optimistic modal close if desired (vs. waiting for API response)

---

## Phase 6: Testing & Validation

### 6.1 Unit Tests

**Test coverage:**

- Validation functions (all error cases + success)
- Form state hook (field changes, step navigation)
- Image upload hook (file validation, API calls)

**Location:** `src/**/*.test.ts` (Vitest)

---

### 6.2 Integration Tests

**Test flow:**

- Fill form → upload image → submit campaign → success modal
- Fill form → validation error → stay on form
- Network error → retry

---

## Phase 7: Implementation Checklist

- [ ] **Discovery:** Review API endpoints and Zod schemas
- [ ] **Validation:** Create `src/lib/validation/campaign.ts`
- [ ] **Hooks:**
  - [ ] `src/hooks/useCampaignForm.ts`
  - [ ] `src/hooks/useCampaignImageUpload.ts`
  - [ ] `src/hooks/useCampaignMutation.ts`
- [ ] **Components:**
  - [ ] `src/components/admin/campaigns/common/FormField.tsx`
  - [ ] `src/components/admin/campaigns/common/FormSelect.tsx`
  - [ ] `src/components/admin/campaigns/common/FormTextarea.tsx`
  - [ ] `src/components/admin/campaigns/common/CurrencyInput.tsx`
  - [ ] `src/components/admin/campaigns/common/ImageUploader.tsx`
  - [ ] `src/components/admin/campaigns/common/CampaignStepper.tsx`
  - [ ] `src/components/admin/campaigns/common/SuccessModal.tsx`
- [ ] **Step Components:**
  - [ ] `src/components/admin/campaigns/steps/Step1WorshipPlaceInfo.tsx`
  - [ ] `src/components/admin/campaigns/steps/Step2CampaignDetails.tsx`
  - [ ] `src/components/admin/campaigns/steps/Step3ImpactEstimate.tsx`
  - [ ] `src/components/admin/campaigns/steps/Step4Review.tsx`
- [ ] **Integration:**
  - [ ] Refactor `create-campaign-page.tsx` main component
  - [ ] Update API mutation flow
  - [ ] Wire up image upload to `postAssetsUpload`
  - [ ] Wire up campaign creation to `postCampaigns`
- [ ] **Testing:**
  - [ ] Write validation tests
  - [ ] Write hook tests
  - [ ] Integration test full flow
- [ ] **Cleanup:**
  - [ ] Remove localStorage mock data
  - [ ] Remove unused imports
  - [ ] Run `bun run fl` (format + lint)
  - [ ] Run `bun run check` (TypeScript)
  - [ ] Run `bun run test` (tests)
- [ ] **Documentation:**
  - [ ] Add JSDoc comments to hooks
  - [ ] Document API payload transformation
  - [ ] Update component props documentation

---

## Expected Outcomes

**Before:**

- Single 1300+ line component
- localStorage mock data (not persisted)
- Form validation mixed with UI
- Tightly coupled concerns

**After:**

- 7 focused step components (~200 lines each)
- Real API integration
- Reusable validation utilities
- Separate state management hooks
- 150–200 line main component
- Full test coverage
- Better maintainability & scalability

---

## Risks & Mitigation

| Risk                        | Impact                  | Mitigation                                        |
| --------------------------- | ----------------------- | ------------------------------------------------- |
| **API schema mismatch**     | Broken submission       | Review OpenAPI schema first; test with mock API   |
| **Image upload failures**   | User frustration        | Clear error messages; show upload progress        |
| **Form state bugs**         | Lost user data          | Add browser `beforeunload` warning for dirty form |
| **Performance (rendering)** | Slow on low-end devices | Lazy load steps; memoize sub-components           |

---

## Timeline Estimate

| Phase                        | Est. Time    |
| ---------------------------- | ------------ |
| Discovery & Validation Setup | 30 min       |
| Hooks Development            | 1 hour       |
| Reusable Components          | 1.5 hours    |
| Step Components              | 2 hours      |
| Integration & API Wiring     | 1.5 hours    |
| Testing                      | 1 hour       |
| Cleanup & Polish             | 30 min       |
| **Total**                    | **~8 hours** |

---

## Next Steps

1. **Confirm this plan** with stakeholders
2. **Review API schema** (endpoints, types, error codes)
3. **Begin Phase 1** (discovery & validation utilities)
4. **Proceed phase-by-phase** with git commits after each phase
5. **Run `bun run test && bun run fl && bun run check`** before each commit
