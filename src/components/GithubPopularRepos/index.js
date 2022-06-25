import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    isActive: 'ALL',
    listToFetch: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getActiveList()
  }

  getActiveList = async () => {
    const {isActive} = this.state

    this.setState({apiStatus: apiStatusConstants.loading})

    const url = `https://apis.ccbp.in/popular-repos?language=${isActive}`
    console.log(url)
    const response = await fetch(url)

    console.log(response)

    if (response.ok) {
      const data = await response.json()
      const rawData = data.popular_repos

      const modifiedData = rawData.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        listToFetch: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      console.log('failuretriggered')
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveStatus = id => {
    console.log(id)
    this.setState({isActive: `${id}`}, this.getActiveList)
  }

  dataLoad = () => {
    const {apiStatus, listToFetch} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <ul className="repositories-list">
            {listToFetch.map(eachRepository => (
              <RepositoryItem
                key={eachRepository.id}
                repositoryDetails={eachRepository}
              />
            ))}
          </ul>
        )
      case apiStatusConstants.failure:
        return <h1>failed</h1>
      case apiStatusConstants.loading:
        return (
          <div testid="loader">
            <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {isActive, listToFetch} = this.state
    console.log(listToFetch)
    return (
      <div className="main-container">
        <h1>Popular</h1>
        <ul type="none" className="ul-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              eachItem={eachItem}
              isActive={isActive}
              changeActiveStatus={this.changeActiveStatus}
            />
          ))}
        </ul>
        {this.dataLoad()}
      </div>
    )
  }
}

export default GithubPopularRepos
