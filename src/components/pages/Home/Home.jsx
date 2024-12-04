import { useEffect } from 'react'
import Card from '../../molecules/Card/Card'
import CardsList from '../../../jsons/Cards.json'
import Container from '../../layouts/Container/Container'
import './Home.css'

const Home = () => {
  useEffect(() => {
    document.title = 'Edemco'
  }, [])

  return (
    <Container>
      {CardsList.map(({ id, title, href, icon, linkText }) => {
        return (
          <Card
            key={id}
            title={title}
            href={href}
            icon={icon}
            linkText={linkText}
          />
        )
      })}
    </Container>
  )
}

export default Home
