import React from 'react'
import { Card } from '../Card'

const FloatingCard = ({
  header,
  subheader,
  avatar,
  title,
  name,
  link,
  tags,
}: Card) => (
  <article className="card">
    <header className="card-header">
      <h2>{header}</h2>
      <p>{subheader}</p>
    </header>

    <div className="card-author">
      <a
        className="author-avatar"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <img
          src={`https://api.adorable.io/avatars/91/${name}@adorable.io.png`}
          alt="avatar"
        /> */}
        <img
          src={`https://avatars.dicebear.com/api/human/${name}.svg`}
          alt="avatar"
        />
      </a>
      <svg className="half-circle" viewBox="0 0 106 57">
        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
      </svg>

      <div className="author-name">
        <div className="author-name-prefix">{name}</div>
        {title}
      </div>
    </div>
    <div className="tags">
      {tags?.map((tag: string, index: number) => (
        <a href={link} target="_blank" rel="noopener noreferrer" key={index}>
          {tag}
        </a>
      ))}
    </div>
  </article>
)

export default FloatingCard
