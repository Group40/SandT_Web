import React from 'react'
import {  Item, Label,Segment,Header } from 'semantic-ui-react'
import { Table,Row,Col } from 'reactstrap';


const ItemExampleDivided = props => (
  
  <Item.Group divided>
  
    <Item>
      <Item.Image src={props.url} />
      
      <Item.Content>
        <Item.Header as='a'><Header as='h2'>{props.title}</Header></Item.Header>
        <Item.Meta>
        <span className='cinema'>{props.name}</span>
        <Label>{props.email}</Label>
        </Item.Meta>
        <Item.Description>
          <Row>
            <Col  sm="4">
            <Table borderless >
            <tbody>
              <tr>
                <td ><Header as='h5'>Date :</Header></td>
                <td>2015-03-11</td>
              </tr>
              <tr>
                <td><Header as='h5'>Time :</Header></td>
                <td>22:22</td>
              </tr>
              <tr>
                <td><Header as='h5'>Location :</Header></td>
                <td>{props.id}</td>
              </tr>
            </tbody>
          </Table>
            </Col>
          </Row>
          
        </Item.Description>

        <Item.Description> 
          <Header as='h5' attached='top'>Description</Header>
          <Segment attached>
            {props.detail}    
          </Segment></Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
  
  
)

export default ItemExampleDivided
