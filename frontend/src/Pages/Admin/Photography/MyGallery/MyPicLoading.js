import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

const MyPicLoading = () => (
    <Card.Group itemsPerRow={4}>
        <Card>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </Card.Content>
        </Card>
    </Card.Group>
)

export default MyPicLoading