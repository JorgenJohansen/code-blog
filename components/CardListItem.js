import React from 'react'
import Link from 'next/link'
import { Card } from 'react-bootstrap'

const CardListItem = ({title, subtitle, author, link, date, mode = 'normal'}) => {
  return (
    <Card className={`fj-card fj-card-list ${mode}`}>
    <div className="card-body-wrapper">
        <Card.Header
        className="d-flex flex-row">
        <img
            src={author?.avatar}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"/>
            {
              mode === 'placeholder' ?
              <div>
                <Card.Title className="font-weight-bold mb-1">Placeholder Author</Card.Title>
                <Card.Text className="card-date">Placeholder Date</Card.Text>
              </div>
              :
              <div>
                <Card.Title className="font-weight-bold mb-1">{author.className}</Card.Title>
                <Card.Text className="card-date">{date}</Card.Text>
              </div>
            }
            
        </Card.Header>
        <Card.Body>
          {
            mode === 'placeholder' ?
            <>
              <Card.Title className="card-main-title">Placeholder title</Card.Title>
              <Card.Text>Placeholder subtitle</Card.Text>
            </>
            :
            <>
              <Card.Title className="card-main-title">{title}</Card.Title>
              <Card.Text>{subtitle}</Card.Text>
            </>
          }
        
        </Card.Body>
    </div>
    {link &&
        <Link {...link} className="card-button">
                Read More
        </Link>
    }
    </Card>
  )
}

export default CardListItem