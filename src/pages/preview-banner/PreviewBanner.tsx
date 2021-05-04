import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Prompt, RouteComponentProps, withRouter } from 'react-router'
import { Location } from 'history'
import { Helmet } from 'react-helmet'

import { RootState } from '../../storeTypes'
import {
  Banner,
  getCreatedBanner,
  submitBanner as submitBannerAction,
} from '../../features/banner'
import BannerCard from '../../components/banner-card'
import MissionList from '../../components/mission-list'
import LoadingOverlay from '../../components/loading-overlay'
import { MapDetail } from '../map-detail'

import './preview-banner.less'

class PreviewBanner extends React.Component<
  PreviewBannerProps,
  PreviewBannerState
> {
  constructor(props: PreviewBannerProps) {
    super(props)
    this.state = {
      loading: false,
      expanded: false,
    }
  }

  componentDidMount() {
    const { history, banner } = this.props
    if (!banner) {
      history.goBack()
    }
  }

  onSubmitBanner = () => {
    const { submitBanner, history } = this.props
    this.setState({ loading: true })
    submitBanner()
      .then((bannerId) => {
        history.push(`/banner/${bannerId}`)
      })
      .catch(() => this.setState({ loading: false }))
  }

  onExpand = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  getPromptMessage = (location: Location<unknown>) => {
    const { loading } = this.state
    if (loading || location.pathname.includes('new-banner')) {
      return true
    }
    return 'Are you sure you want to leave and discard this banner?'
  }

  render() {
    const { banner, history } = this.props
    const { loading, expanded } = this.state
    if (!banner) {
      return <Fragment />
    }
    const { missions } = banner

    return (
      <div className="banner-info">
        <Helmet>Create Banner</Helmet>
        <Prompt message={this.getPromptMessage} />
        <LoadingOverlay
          active={loading}
          text="Saving..."
          spinner
          fadeSpeed={500}
        />
        <div className="banner-info-overview">
          <button type="button" onClick={() => history.goBack()}>
            &lt;
          </button>
          <BannerCard banner={banner} selected={false} />
          {missions && (
            <MissionList
              missions={missions}
              expanded={expanded}
              onExpand={this.onExpand}
            />
          )}
        </div>
        <div className="banner-info-additional">
          <MapDetail banner={banner} />
          <button
            type="button"
            className="positive-action-button"
            onClick={this.onSubmitBanner}
          >
            Submit Banner
          </button>
        </div>
      </div>
    )
  }
}

export interface PreviewBannerProps extends RouteComponentProps {
  banner: Banner | undefined
  submitBanner: () => Promise<string>
}

interface PreviewBannerState {
  loading: boolean
  expanded: boolean
}

const mapStateToProps = (state: RootState) => ({
  banner: getCreatedBanner(state),
})

const mapDispatchToProps = {
  submitBanner: submitBannerAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PreviewBanner))
