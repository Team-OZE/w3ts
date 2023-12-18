/** @noSelfInFile */

declare let main: () => void;
declare let config: () => void;
declare let OnPlayerLeave: () => void;

const oldMain = main;
const oldConfig = config;
const oldOnPlayerLeave = OnPlayerLeave;

type scriptHookSignature = () => void;

const hooksMainBefore: scriptHookSignature[] = [];
const hooksMainAfter: scriptHookSignature[] = [];
const hooksConfigBefore: scriptHookSignature[] = [];
const hooksConfigAfter: scriptHookSignature[] = [];
const hooksOnPlayerLeaveBefore: scriptHookSignature[] = [];
const hooksOnPlayerLeaveAfter: scriptHookSignature[] = [];

export const executeHooksMainBefore = () =>
  hooksMainBefore.forEach((func) => func());
export const executeHooksMainAfter = () =>
  hooksMainAfter.forEach((func) => func());

export function hookedMain() {
  executeHooksMainBefore();
  oldMain();
  executeHooksMainAfter();
}

export const executeHooksConfigBefore = () =>
  hooksConfigBefore.forEach((func) => func());
export const executeHooksConfigAfter = () =>
  hooksConfigAfter.forEach((func) => func());

export function hookedConfig() {
  executeHooksConfigBefore();
  oldConfig();
  executeHooksConfigAfter();
}

export const executeHooksOnPlayerLeaveBefore = () =>
  hooksOnPlayerLeaveBefore.forEach((func) => func());
export const executeHooksOnPlayerLeaveAfter = () =>
  hooksOnPlayerLeaveAfter.forEach((func) => func());

export function hookedOnPlayerLeave() {
  executeHooksOnPlayerLeaveBefore();
  oldOnPlayerLeave();
  executeHooksOnPlayerLeaveAfter();
}

main = hookedMain;
config = hookedConfig;
OnPlayerLeave = hookedOnPlayerLeave;

type W3tsHookType =
  | "main::before"
  | "main::after"
  | "config::before"
  | "config::after"
  | "OnPlayerLeave::before"
  | "OnPlayerLeave::after";

export enum W3TS_HOOK {
  MAIN_BEFORE = "main::before",
  MAIN_AFTER = "main::after",
  CONFIG_BEFORE = "config::before",
  CONFIG_AFTER = "config::after",
  ONPLAYERLEAVE_BEFORE = "OnPlayerLeave::before",
  ONPLAYERLEAVE_AFTER = "OnPlayerLeave::after",
}

const entryPoints: { [key: string]: scriptHookSignature[] } = {
  [W3TS_HOOK.MAIN_BEFORE]: hooksMainBefore,
  [W3TS_HOOK.MAIN_AFTER]: hooksMainAfter,
  [W3TS_HOOK.CONFIG_BEFORE]: hooksConfigBefore,
  [W3TS_HOOK.CONFIG_AFTER]: hooksConfigAfter,
  [W3TS_HOOK.ONPLAYERLEAVE_BEFORE]: hooksOnPlayerLeaveBefore,
  [W3TS_HOOK.ONPLAYERLEAVE_AFTER]: hooksOnPlayerLeaveAfter,
};

export function addScriptHook(
  entryPoint: W3tsHookType,
  hook: scriptHookSignature
): boolean {
  if (!(entryPoint in entryPoints)) {
    return false;
  }
  entryPoints[entryPoint].push(hook);
  return true;
}
