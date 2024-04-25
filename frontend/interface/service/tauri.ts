import { invoke } from "@tauri-apps/api/tauri";
import {
  ClashConfig,
  ClashInfo,
  VergeConfig,
  Profile,
  SystemProxy,
} from "./types";
import { ManifestVersion } from "./core";

export const getNyanpasuConfig = async () => {
  return await invoke<VergeConfig>("get_verge_config");
};

export const patchNyanpasuConfig = async (payload: VergeConfig) => {
  return await invoke<void>("patch_verge_config", { payload });
};

export const getClashInfo = async () => {
  return await invoke<ClashInfo | null>("get_clash_info");
};

export const patchClashInfo = async (payload: Partial<ClashConfig>) => {
  return await invoke<void>("patch_clash_config", { payload });
};

export const getRuntimeExists = async () => {
  return await invoke<string[]>("get_runtime_exists");
};

export const getProfiles = async () => {
  return await invoke<Profile.Config>("get_profiles");
};

export const setProfiles = async (payload: {
  index: string;
  profile: Partial<Profile.Item>;
}) => {
  return await invoke<void>("patch_profile", payload);
};

export const setProfilesConfig = async (profiles: Profile.Config) => {
  return await invoke<void>("patch_profiles_config", { profiles });
};

export const getCoreVersion = async (
  coreType: Required<VergeConfig>["clash_core"],
) => {
  return await invoke<string>("get_core_version", { coreType });
};

export const setClashCore = async (
  clashCore: Required<VergeConfig>["clash_core"],
) => {
  return await invoke<void>("change_clash_core", { clashCore });
};

export const restartSidecar = async () => {
  return await invoke<void>("restart_sidecar");
};

export const fetchLatestCoreVersions = async () => {
  return await invoke<ManifestVersion["latest"]>("fetch_latest_core_versions");
};

export const updateCore = async (
  coreType: Required<VergeConfig>["clash_core"],
) => {
  return await invoke<void>("update_core", { coreType });
};

export const pullupUWPTool = async () => {
  return await invoke<void>("invoke_uwp_tool");
};

export const getSystemProxy = async () => {
  return await invoke<SystemProxy>("get_sys_proxy");
};

export const checkService = async () => {
  try {
    const result = await invoke<{ code: number }>("check_service");

    if (result?.code === 0) {
      return "active";
    } else if (result?.code === 400) {
      return "installed";
    } else {
      return "unknown";
    }
  } catch (e) {
    return "uninstall";
  }
};

export const installService = async () => {
  return await invoke<void>("install_service");
};

export const uninstallService = async () => {
  return await invoke<void>("uninstall_service");
};
