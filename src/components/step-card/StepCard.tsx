import React, { FC } from 'react'

import { POI, Step, Objective } from '../../features/mission'
import {
  createExternalNavigationUri,
  getExternalLinkAttributes,
} from '../../features/utils'

import './step-card.less'

const toObjective = (objective: Objective) => {
  switch (objective) {
    case 'hack':
      return 'Hack'
    case 'captureOrUpgrade':
      return 'Capture / Upgrade'
    case 'createLink':
      return 'Link'
    case 'createField':
      return 'Field'
    case 'installMod':
      return 'Mod'
    case 'takePhoto':
      return 'Photo'
    case 'viewWaypoint':
      return 'View'
    case 'enterPassphrase':
      return 'Passphrase'
    default:
      return undefined
  }
}

const getStepNameLink = (title: string, poi?: POI) => {
  if (poi && poi.type !== 'unavailable') {
    return (
      <a
        {...getExternalLinkAttributes()}
        href={createExternalNavigationUri(poi.latitude, poi.longitude)}
      >
        {title}
      </a>
    )
  }

  return title
}

const StepCard: FC<StepProps> = ({ step }) => {
  let className
  let title
  if (step.objective && step.poi) {
    if (step.poi.type === 'unavailable') {
      className = 'step-card-unavailable'
      title = '(unavailable)'
    } else {
      className = ''
      title = step.poi.title
    }
  } else {
    className = 'step-card-hidden'
    title = '(hidden)'
  }
  return (
    <div className={`step-card ${className}`}>
      <div className="step-card-title">{getStepNameLink(title, step.poi)}</div>
      <div className="step-card-objective">
        {step.objective && toObjective(step.objective)}
      </div>
    </div>
  )
}

export interface StepProps {
  step: Step
}

export default StepCard
