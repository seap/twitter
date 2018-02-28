import React from 'react'

export default [
  {
    path: '/twitter/twitters',
    component: () => import('@/containers/Twitter')
  },
  {
    path: '/twitter/tweet',
    component: () => import('@/containers/Tweet')
  },
  {
    path: '/twitter/authorize',
    component: () => import('@/containers/Authorize')
  }
]
