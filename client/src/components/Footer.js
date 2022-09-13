import { Box, Container } from '@mui/system'

const Footer = () => {
  return (
    <Box component="footer" className="fixed-bottom" >
      <Container>
        <p>Created by
          <a target='_blank' rel="noreferrer" href='https://github.com/florastocks'> Flora</a>
        </p>
      </Container>
    </Box>
  )
}

export default Footer