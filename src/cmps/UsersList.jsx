import React, { Fragment} from 'react'
import { UsersPreview } from './UsersPreview';


export function UsersList(props) {
   
    const { users, count} = props;

    return (
        <div className="users-list">
           {count > 0 && <div className="count-users"> Total Count: {count} </div>}
            {users.map((user,index) => {
                const { login,
                     email,
                     avatar_url,
                     followers,
                     following,
                      public_repos } = user
                return (
                    <Fragment key={login + index}>
                        <UsersPreview
                            userName={login}
                            avatar={avatar_url}
                            userEmail={email}
                            followers={followers} 
                            following={following}
                            repos={public_repos}
                        />
                      
                    </Fragment>
                )
            })}
        </div>
    )
}
