// import Browser from 'webextension-polyfill'
// // import { defaults } from 'lodash-es'

// export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
// export const isFirefox = navigator.userAgent.indexOf('Firefox') != -1
// export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
// export const AppName = 'Beyond Bard - AI  chat for any website'

// export enum TriggerMode {
//   Always = 'always',
//   QuestionMark = 'questionMark',
//   Manually = 'manually',
// }

// export const TRIGGER_MODE_TEXT = {
//   [TriggerMode.Always]: { title: 'Always', desc: 'Bard is queried on every search' },
//   [TriggerMode.Manually]: {
//     title: 'Manually',
//     desc: 'Bard is queried when you manually click a button',
//   },
// }

// export enum Theme {
//   Auto = 'auto',
//   Light = 'light',
//   Dark = 'dark',
// }

// export enum Language {
//   Auto = 'auto',
//   English = 'en-US',
//   ChineseSimplified = 'zh-Hans',
//   ChineseTraditional = 'zh-Hant',
//   Spanish = 'es-ES',
//   French = 'fr-FR',
//   Korean = 'ko-KR',
//   Japanese = 'ja-JP',
//   German = 'de-DE',
//   Portuguese = 'pt-PT',
//   Russian = 'ru-RU',
// }

// const userConfigWithDefaultValue: {
//   triggerMode: TriggerMode
//   theme: Theme
//   language: Language
//   prompt: string
//   promptSearch: string
//   promptPage: string
//   promptComment: string
//   enableSites: string[] | null
//   pageSummaryEnable: boolean
//   pageSummaryWhitelist: string
//   pageSummaryBlacklist: string
//   continueConversation: boolean
// } = {
//   triggerMode: TriggerMode.Always,
//   theme: Theme.Auto,
//   language: Language.Auto,
//   prompt: '',
//   promptSearch: '',
//   promptPage: '',
//   promptComment: '',
//   enableSites: null,
//   pageSummaryEnable: true,
//   pageSummaryWhitelist: '',
//   pageSummaryBlacklist: '',
//   continueConversation: true
// }

// export type UserConfig = typeof userConfigWithDefaultValue

// export async function getUserConfig(): Promise<UserConfig> {
//   const result = await Browser.storage.local.get(Object.keys(userConfigWithDefaultValue))
//   return defaults(result, userConfigWithDefaultValue)
// }

// export async function updateUserConfig(updates: Partial<UserConfig>) {
//   console.debug('update configs', updates)
//   return Browser.storage.local.set(updates)
// }

// export enum ProviderType {
//   ChatGPT = 'chatgpt',
//   GPT3 = 'gpt3',
//   BARD = 'bard',
// }

// interface GPT3ProviderConfig {
//   model: string
//   apiKey: string
//   apiHost: string
// }

// export interface ProviderConfigs {
//   provider: ProviderType
//   configs: {
//     [ProviderType.BARD]: GPT3ProviderConfig | undefined
//   }
// }

// export async function getProviderConfigs(): Promise<ProviderConfigs> {
//   const { provider = ProviderType.BARD } = await Browser.storage.local.get('provider')
//   const configKey = `provider:${ProviderType.BARD}`
//   const result = await Browser.storage.local.get(configKey)
//   return {
//     provider,
//     configs: {
//       [ProviderType.BARD]: result[configKey],
//     },
//   }
// }

// export async function saveProviderConfigs(
//   provider: ProviderType,
//   configs: ProviderConfigs['configs'],
// ) {
//   return Browser.storage.local.set({
//     provider,
//     [`provider:${ProviderType.GPT3}`]: configs[ProviderType.GPT3],
//   })
// }

// export const BASE_URL = 'https://bard.google.com'

// export const DEFAULT_PAGE_SUMMARY_BLACKLIST = `https://translate.google.com
// https://www.deepl.com
// https://www.youtube.com
// https://youku.com
// https://v.qq.com
// https://www.iqiyi.com
// https://www.bilibili.com
// https://www.tudou.com
// https://www.tiktok.com
// https://vimeo.com
// https://www.dailymotion.com
// https://www.twitch.tv
// https://www.hulu.com
// https://www.netflix.com
// https://www.hbomax.com
// https://www.disneyplus.com
// https://www.peacocktv.com
// https://www.crunchyroll.com
// https://www.funimation.com
// https://www.viki.com
// `
// export const APP_TITLE = `BeyondBard Summary`

// export const DEFAULT_MODEL = 'gpt-3.5-turbo'
// export const DEFAULT_API_HOST = 'api.openai.com'


// export function detectSystemColorScheme() {
//   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     return Theme.Dark
//   }
//   return Theme.Light
// }

// export function getExtensionVersion() {
//   return Browser.runtime.getManifest().version
// }

// export const changeToast: { type: 'success'; text: string } = {
//   text: 'Changes saved',
//   type: 'success',
// }

// export function tabSendMsg(tab) {
//   const { id, url } = tab
//   if (url.includes(`${BASE_URL}/chat`)) {
//     Browser.tabs
//       .sendMessage(id, { type: 'CHATGPT_TAB_CURRENT', data: { isLogin: true } })
//       .catch(() => {})
//   } else {
//     Browser.tabs
//       .sendMessage(id, { type: 'CHATGPT_TAB_CURRENT', data: { isLogin: false } })
//       .catch(() => {})
//   }
// }
