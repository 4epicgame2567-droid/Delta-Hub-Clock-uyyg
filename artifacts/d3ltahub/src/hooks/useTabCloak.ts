import { useEffect } from "react";

export interface TabCloakSettings {
  enabled: boolean;
  title: string;
  faviconUrl: string;
}

const DEFAULT_CLOAK: TabCloakSettings = {
  enabled: false,
  title: "",
  faviconUrl: "",
};

export function loadCloakSettings(): TabCloakSettings {
  try {
    const raw = localStorage.getItem("d3ltahub_cloak");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return DEFAULT_CLOAK;
}

export function saveCloakSettings(settings: TabCloakSettings) {
  localStorage.setItem("d3ltahub_cloak", JSON.stringify(settings));
}

export function applyCloak(settings: TabCloakSettings) {
  if (!settings.enabled) return;
  if (settings.title) {
    document.title = settings.title;
  }
  if (settings.faviconUrl) {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = settings.faviconUrl;
  }
}

export function removeCloak() {
  document.title = "D3LTAHUB";
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = "/favicon.ico";
}

export function useTabCloak() {
  useEffect(() => {
    const settings = loadCloakSettings();
    if (settings.enabled) {
      applyCloak(settings);
    }
  }, []);
}
