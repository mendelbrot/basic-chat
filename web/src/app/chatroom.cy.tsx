import Chatroom from './chatroom'
 
describe('<Chatroom />', () => {
  it('should render and display expected content', () => {
    cy.mount(<Chatroom />)
    cy.get('h1').contains('Chatroom Page')
  })
})