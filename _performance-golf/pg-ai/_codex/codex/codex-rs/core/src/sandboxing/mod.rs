/*
Module: sandboxing

Core-owned adapter types for exec/runtime plumbing. Policy selection and
command transformation live in the codex-sandboxing crate; this module keeps
the exec-only metadata and translates transformed sandbox commands back into
ExecRequest for execution.
*/

use crate::exec::ExecCapturePolicy;
use crate::exec::ExecExpiration;
use crate::exec::ExecToolCallOutput;
use crate::exec::StdoutStream;
use crate::exec::WindowsRestrictedTokenFilesystemOverlay;
use crate::exec::execute_exec_request;
<<<<<<< HEAD
use crate::protocol::SandboxPolicy;
=======
>>>>>>> origin/main
#[cfg(target_os = "macos")]
use crate::spawn::CODEX_SANDBOX_ENV_VAR;
use crate::spawn::CODEX_SANDBOX_NETWORK_DISABLED_ENV_VAR;
use codex_network_proxy::NetworkProxy;
use codex_protocol::config_types::WindowsSandboxLevel;
<<<<<<< HEAD
#[cfg(target_os = "macos")]
use codex_protocol::models::MacOsSeatbeltProfileExtensions;
use codex_protocol::models::PermissionProfile;
pub use codex_protocol::models::SandboxPermissions;
use codex_protocol::permissions::FileSystemSandboxPolicy;
use codex_protocol::permissions::NetworkSandboxPolicy;
use codex_sandboxing::landlock::allow_network_for_proxy;
use codex_sandboxing::landlock::create_linux_sandbox_command_args_for_policies;
use codex_sandboxing::policy_transforms::EffectiveSandboxPermissions;
use codex_sandboxing::policy_transforms::effective_file_system_sandbox_policy;
use codex_sandboxing::policy_transforms::effective_network_sandbox_policy;
use codex_sandboxing::policy_transforms::should_require_platform_sandbox;
#[cfg(target_os = "macos")]
use codex_sandboxing::seatbelt::MACOS_PATH_TO_SEATBELT_EXECUTABLE;
#[cfg(target_os = "macos")]
use codex_sandboxing::seatbelt::create_seatbelt_command_args_for_policies_with_extensions;
use std::collections::HashMap;
use std::path::Path;
=======
pub use codex_protocol::models::SandboxPermissions;
use codex_protocol::permissions::FileSystemSandboxPolicy;
use codex_protocol::permissions::NetworkSandboxPolicy;
use codex_protocol::protocol::SandboxPolicy;
use codex_sandboxing::SandboxExecRequest;
use codex_sandboxing::SandboxType;
use std::collections::HashMap;
>>>>>>> origin/main
use std::path::PathBuf;

#[derive(Debug)]
pub(crate) struct ExecOptions {
    pub(crate) expiration: ExecExpiration,
    pub(crate) capture_policy: ExecCapturePolicy,
}

#[derive(Debug)]
pub struct ExecRequest {
    pub command: Vec<String>,
    pub cwd: PathBuf,
    pub env: HashMap<String, String>,
    pub network: Option<NetworkProxy>,
    pub expiration: ExecExpiration,
    pub capture_policy: ExecCapturePolicy,
    pub sandbox: SandboxType,
    pub windows_sandbox_level: WindowsSandboxLevel,
    pub windows_sandbox_private_desktop: bool,
    pub sandbox_policy: SandboxPolicy,
    pub file_system_sandbox_policy: FileSystemSandboxPolicy,
    pub network_sandbox_policy: NetworkSandboxPolicy,
    pub(crate) windows_restricted_token_filesystem_overlay:
        Option<WindowsRestrictedTokenFilesystemOverlay>,
    pub arg0: Option<String>,
}

<<<<<<< HEAD
/// Bundled arguments for sandbox transformation.
///
/// This keeps call sites self-documenting when several fields are optional.
pub(crate) struct SandboxTransformRequest<'a> {
    pub spec: CommandSpec,
    pub policy: &'a SandboxPolicy,
    pub file_system_policy: &'a FileSystemSandboxPolicy,
    pub network_policy: NetworkSandboxPolicy,
    pub sandbox: SandboxType,
    pub enforce_managed_network: bool,
    // TODO(viyatb): Evaluate switching this to Option<Arc<NetworkProxy>>
    // to make shared ownership explicit across runtime/sandbox plumbing.
    pub network: Option<&'a NetworkProxy>,
    pub sandbox_policy_cwd: &'a Path,
    #[cfg(target_os = "macos")]
    pub macos_seatbelt_profile_extensions: Option<&'a MacOsSeatbeltProfileExtensions>,
    pub codex_linux_sandbox_exe: Option<&'a PathBuf>,
    pub use_legacy_landlock: bool,
    pub windows_sandbox_level: WindowsSandboxLevel,
    pub windows_sandbox_private_desktop: bool,
}

pub enum SandboxPreference {
    Auto,
    Require,
    Forbid,
}

#[derive(Debug, thiserror::Error)]
pub(crate) enum SandboxTransformError {
    #[error("missing codex-linux-sandbox executable path")]
    MissingLinuxSandboxExecutable,
    #[cfg(not(target_os = "macos"))]
    #[error("seatbelt sandbox is only available on macOS")]
    SeatbeltUnavailable,
}

#[derive(Default)]
pub struct SandboxManager;

impl SandboxManager {
    pub fn new() -> Self {
        Self
    }

    pub(crate) fn select_initial(
        &self,
        file_system_policy: &FileSystemSandboxPolicy,
        network_policy: NetworkSandboxPolicy,
        pref: SandboxablePreference,
=======
impl ExecRequest {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        command: Vec<String>,
        cwd: PathBuf,
        env: HashMap<String, String>,
        network: Option<NetworkProxy>,
        expiration: ExecExpiration,
        capture_policy: ExecCapturePolicy,
        sandbox: SandboxType,
>>>>>>> origin/main
        windows_sandbox_level: WindowsSandboxLevel,
        windows_sandbox_private_desktop: bool,
        sandbox_policy: SandboxPolicy,
        file_system_sandbox_policy: FileSystemSandboxPolicy,
        network_sandbox_policy: NetworkSandboxPolicy,
        arg0: Option<String>,
    ) -> Self {
        Self {
            command,
            cwd,
            env,
            network,
            expiration,
            capture_policy,
            sandbox,
            windows_sandbox_level,
            windows_sandbox_private_desktop,
            sandbox_policy,
            file_system_sandbox_policy,
            network_sandbox_policy,
            windows_restricted_token_filesystem_overlay: None,
            arg0,
        }
    }

    pub(crate) fn from_sandbox_exec_request(
        request: SandboxExecRequest,
        options: ExecOptions,
    ) -> Self {
        let SandboxExecRequest {
            command,
            cwd,
            mut env,
            network,
            sandbox,
            windows_sandbox_level,
            windows_sandbox_private_desktop,
            sandbox_policy,
            file_system_sandbox_policy,
            network_sandbox_policy,
            arg0,
        } = request;
<<<<<<< HEAD
        #[cfg(not(target_os = "macos"))]
        let macos_seatbelt_profile_extensions = None;
        let additional_permissions = spec.additional_permissions.take();
        let EffectiveSandboxPermissions {
            sandbox_policy: effective_policy,
            macos_seatbelt_profile_extensions: _effective_macos_seatbelt_profile_extensions,
        } = EffectiveSandboxPermissions::new(
            policy,
            macos_seatbelt_profile_extensions,
            additional_permissions.as_ref(),
        );
        let effective_file_system_policy = effective_file_system_sandbox_policy(
            file_system_policy,
            additional_permissions.as_ref(),
        );
        let effective_network_policy =
            effective_network_sandbox_policy(network_policy, additional_permissions.as_ref());
        let mut env = spec.env;
        if !effective_network_policy.is_enabled() {
=======
        let ExecOptions {
            expiration,
            capture_policy,
        } = options;
        if !network_sandbox_policy.is_enabled() {
>>>>>>> origin/main
            env.insert(
                CODEX_SANDBOX_NETWORK_DISABLED_ENV_VAR.to_string(),
                "1".to_string(),
            );
        }
        #[cfg(target_os = "macos")]
        if sandbox == SandboxType::MacosSeatbelt {
            env.insert(CODEX_SANDBOX_ENV_VAR.to_string(), "seatbelt".to_string());
        }
        Self {
            command,
            cwd,
            env,
            network,
            expiration,
            capture_policy,
            sandbox,
            windows_sandbox_level,
            windows_sandbox_private_desktop,
            sandbox_policy,
            file_system_sandbox_policy,
            network_sandbox_policy,
            windows_restricted_token_filesystem_overlay: None,
            arg0,
        }
    }
}

pub async fn execute_env(
    exec_request: ExecRequest,
    stdout_stream: Option<StdoutStream>,
) -> crate::error::Result<ExecToolCallOutput> {
    let effective_policy = exec_request.sandbox_policy.clone();
    execute_exec_request(
        exec_request,
        &effective_policy,
        stdout_stream,
        /*after_spawn*/ None,
    )
    .await
}

pub async fn execute_exec_request_with_after_spawn(
    exec_request: ExecRequest,
    stdout_stream: Option<StdoutStream>,
    after_spawn: Option<Box<dyn FnOnce() + Send>>,
) -> crate::error::Result<ExecToolCallOutput> {
    let effective_policy = exec_request.sandbox_policy.clone();
    execute_exec_request(exec_request, &effective_policy, stdout_stream, after_spawn).await
}
