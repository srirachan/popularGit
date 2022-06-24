import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
// import RepositoryItem from '../RepositoryItem'

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

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${isActive}`,
    )
    const data = await response.json()

    console.log(data)
    console.log(response)

    const rawData = data.popular_repos

    const modifiedData = rawData.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    if (response.ok === true) {
      this.setState({
        listToFetch: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure}, this.dataLoad())
    }
  }

  changeActiveStatus = id => {
    this.setState({isActive: `${id}`})
  }

  dataLoad = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return <h1>Success</h1>
      case apiStatusConstants.failure:
        return <h1>failed</h1>
      default:
        return <h1>Loading</h1>
    }
  }

  render() {
    const {isActive} = this.state

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
