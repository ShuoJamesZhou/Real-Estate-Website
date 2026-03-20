import React from 'react'

export default function SectionHeader({
  title,
  description,
  right,
}: {
  title: string
  description?: string
  right?: React.ReactNode
}) {
  return (
    <div className="sectionHeader">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  )
}

