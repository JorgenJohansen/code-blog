import React from 'react'
import { Alert } from 'react-bootstrap'

const PreviewAlert = () => {
  return (
    <Alert variant='secondary'>
        This is the preview mode!
        <Alert.Link href='/api/exit-preview'>Leave preview mode</Alert.Link>
    </Alert>
  )
}

export default PreviewAlert