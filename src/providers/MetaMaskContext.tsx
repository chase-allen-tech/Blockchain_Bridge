import React, { useEffect, useState } from 'react'
import { injected } from '../wallet/connectors'
import { useWeb3React } from '@web3-react/core'

function MetamaskProvider(props:any) {
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [])
  if (loaded) {
    return props.children
  }
  return ""
}

export default MetamaskProvider