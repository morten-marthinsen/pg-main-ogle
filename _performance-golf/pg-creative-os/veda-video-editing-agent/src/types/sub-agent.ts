/**
 * Universal sub-agent contract types.
 * Every Veda sub-agent returns SubAgentResult<T> on completion.
 */

export type SubAgentStatus = "SUCCESS" | "FAILED" | "NEEDS_HUMAN_INPUT";

export type ErrorCategory =
  | "VALIDATION_ERROR"
  | "ROOT_ANGLE_ERROR"
  | "NAMING_ERROR"
  | "ICONIK_ERROR"
  | "EDIT_ERROR"
  | "SHEETS_ERROR"
  | "DUPLICATE_ERROR"
  | "OUTPUT_VALIDATION_ERROR"
  | "AI_GENERATION_ERROR"
  | "CREDENTIAL_ERROR";

export type Severity = "critical" | "error" | "warning";

export type RecoveryAction = "halt" | "retry" | "continue_with_warning";

export interface FailureResult {
  status: "FAILED";
  error_category: ErrorCategory;
  severity: Severity;
  message: string;
  recovery_action: RecoveryAction;
  context: {
    step: string;
    asset_ids?: string[];
    api_response?: string;
  };
}

export interface SuccessResult<T> {
  status: "SUCCESS";
  data: T;
}

export interface NeedsHumanInputResult {
  status: "NEEDS_HUMAN_INPUT";
  message: string;
  options?: string[];
  context: {
    step: string;
    asset_ids?: string[];
  };
}

export type SubAgentResult<T> =
  | SuccessResult<T>
  | FailureResult
  | NeedsHumanInputResult;
