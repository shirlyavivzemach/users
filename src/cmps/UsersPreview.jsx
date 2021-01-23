import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'


export function UsersPreview(props) {
    const { users, userName, userEmail, avatar, followers, following, repos } = props;

    return (
        <div className="user-preview">
            <Card>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={avatar}
                    />
                    <Card.Header>{userName}</Card.Header>

                    <Card.Header>{userEmail}</Card.Header>

                </Card.Content>
                <Card.Content extra>
                    <a>
                        {repos} Repositories
      </a>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {followers} Followers
      </a>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {following} following
      </a>
                </Card.Content>

            </Card>





        </div>

    )
}
