import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Profile() {
  const {id} = useParams();
  console.log(id)
  return (
    <div>Profile</div>
  )
}
