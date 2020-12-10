import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

// 读取 localStorage Boolean
function getParse(data, init) {
  if (data == 'true') {
    return true
  }

  if (data == 'false') {
    return false
  }

  return init
}

const state = {
  theme: localStorage.tremePackers || variables.theme,
  showSettings: showSettings,
  tagsView: getParse(localStorage.tagsView, tagsView),
  fixedHeader: getParse(localStorage.fixedHeader, fixedHeader),
  sidebarLogo: getParse(localStorage.sidebarLogo, sidebarLogo)
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value

      // 存储到本地
      localStorage[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

