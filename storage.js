import AsyncStorage from "@react-native-async-storage/async-storage";

const STATS_KEY = "@app_stats_v1";
const SETTINGS_KEY = "@app_settings_v1";

export async function loadStats() {
  try {
    const raw = await AsyncStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Erro ao carregar stats", e);
    return {};
  }
}

export async function saveStats(stats) {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn("Erro ao salvar stats", e);
  }
}

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { sound: true, darkMode: false };
  } catch (e) {
    return { sound: true, darkMode: false };
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn("Erro ao salvar settings", e);
  }
}
