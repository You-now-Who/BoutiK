import React from 'react'
import Map from './Map'


export default function MapDemo() {
  return (
    <div>

            <h1 className="text-3xl font-medium text-center mb-8">Places like such around you</h1>
          <Map place={prediction.toLowerCase()}/>
            

    </div>
  )
}
