import _ from 'underscore'
import {
  BannerActionTypes,
  BROWSE_BANNERS,
  LOAD_BANNER,
  LOAD_BANNER_ERROR,
  LOAD_RECENT_BANNERS,
  LOAD_RECENT_BANNERS_ERROR,
  RESET_BROWSED_BANNERS,
  SEARCH_BANNERS,
  RESET_SEARCH_BANNERS,
} from './actionTypes'
import { Banner, BannerState } from './types'

const initialState: BannerState = {
  banners: [],
  recentBanners: [],
  browsedBanners: [],
  searchBanners: [],
  canBrowseMore: true,
  canSearchMore: true,
}

const extend = (
  source: Array<Partial<Banner>>,
  target: Array<Partial<Banner>>
): Array<Partial<Banner>> => {
  return _.uniq(
    _.flatten([source, target]),
    false,
    (a: Partial<Banner>) => a.uuid
  )
}

export default (state = initialState, action: BannerActionTypes) => {
  switch (action.type) {
    case LOAD_BANNER:
      return { ...state, banners: extend([action.payload], state.banners) }
    case LOAD_RECENT_BANNERS:
      return {
        ...state,
        banners: extend(state.banners, action.payload),
        recentBanners: action.payload,
      }
    case RESET_BROWSED_BANNERS:
      return { ...state, browsedBanners: [] }
    case BROWSE_BANNERS:
      return {
        ...state,
        banners: extend(state.banners, action.payload.banners),
        browsedBanners: extend(state.browsedBanners, action.payload.banners),
        canBrowseMore: action.payload.hasMore,
      }
    case SEARCH_BANNERS:
      return {
        ...state,
        banners: extend(state.banners, action.payload.banners),
        searchBanners: extend(state.searchBanners, action.payload.banners),
        canSearchMore: action.payload.hasMore,
      }
    case RESET_SEARCH_BANNERS:
      return { ...state, searchBanners: [] }
    case LOAD_BANNER_ERROR:
      return {}
    case LOAD_RECENT_BANNERS_ERROR:
      return state
    default:
      return state
  }
}
