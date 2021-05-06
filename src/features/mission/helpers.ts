import _ from 'underscore'
import { NumDictionary } from '../banner/types'
import { Mission } from './types'

export const mapMissions = <T>(
  missions: NumDictionary<Mission> | undefined,
  handler: (mission: Mission | undefined, index: number) => T | undefined | null
): Array<T> => {
  if (!missions) return []
  const result: Array<T> = []
  const keys = Object.keys(missions)
    .map((k) => parseInt(k, 10))
    .sort((a, b) => a - b)
  const maxKey: number = _(keys).last() || 0
  for (let i = 0; i <= maxKey; i += 1) {
    const val = handler(missions[i], i)
    if (val) {
      result.push(val)
    }
  }
  return result
}

export const mapMissionsInverse = <T>(
  missions: NumDictionary<Mission> | undefined,
  handler: (mission: Mission | undefined, index: number) => T | undefined | null
): Array<T> => {
  if (!missions) return []
  const result: Array<T> = []
  const keys = Object.keys(missions)
    .map((k) => parseInt(k, 10))
    .sort((a, b) => a - b)
  const maxKey: number = _(keys).last() || 0
  for (let i = maxKey; i >= 0; i -= 1) {
    const val = handler(missions[i], i)
    if (val) {
      result.push(val)
    }
  }
  return result
}

export const searchMissionIndex = (
  missions: NumDictionary<Mission>,
  mission: Mission
) => {
  const key = Object.keys(missions).find(
    (k) => missions[Number(k)].id === mission.id
  )
  if (key) {
    return Number(key)
  }
  return undefined
}

export const getMissionBounds = (mission: Mission) => {
  let maxLatitude = mission.startLatitude
  let maxLongitude = mission.startLongitude
  let minLatitude = mission.startLatitude
  let minLongitude = mission.startLongitude
  if (mission.steps) {
    mission.steps.forEach((step) => {
      if (step.poi) {
        if (!maxLatitude || step.poi.latitude > maxLatitude) {
          maxLatitude = step.poi.latitude
        }
        if (!minLatitude || step.poi.latitude < minLatitude) {
          minLatitude = step.poi.latitude
        }
        if (!maxLongitude || step.poi.longitude > maxLongitude) {
          maxLongitude = step.poi.longitude
        }
        if (!minLongitude || step.poi.longitude < minLongitude) {
          minLongitude = step.poi.longitude
        }
      }
    })
  }
  return [
    [minLatitude, minLongitude],
    [maxLatitude, maxLongitude],
  ]
}
