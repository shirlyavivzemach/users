import React, { useState, useEffect } from 'react';
import { UsersFilter } from '../cmps/UsersFilter';
import { UsersList } from '../cmps/UsersList';
import { Waypoint } from "react-waypoint";
import { FaSpinner } from 'react-icons/fa';
import { getUsersAfterFilter } from '../services/usersService';

export function UsersApp() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true);
    const [searchFeild, setSearchField] = useState('');
    const ITEMS_PER_PAGE = 20


    useEffect(() => {
        checkPages();
    }, []);



    //check page and update
    const checkPages = () => {
        if (!hasNextPage) return;
        getUsersAfterFilter(
            searchFeild === '' ? 'decoder' : searchFeild,
            page,
            ITEMS_PER_PAGE,
            hasNextPage
        ).then(res => {
            if (res) {
                const { items, total_count } = res;

                if (items) {
                    if (total_count === users.length + items.length) {
                        setHasNextPage(false);
                    }
                    setUsers(users => [...users, ...items]);
                    setPage(page => page + 1);
                }
            }
        });
    };

    //load more data from the service
    const loadMoreData = () => {
        if (page > 1) {
            checkPages();
        }
    };


    return (

        <div className="user-app">
            <UsersFilter
                onSearchFieldChange={setSearchField}
                onDataChange={setUsers}
                onNumberOfItemChange={setCount}
            />
            <UsersList users={users} count={count} />
            {hasNextPage && (
                <Waypoint onEnter={loadMoreData}>
                    <h5 className="text-muted mt-5">
                        Loading data <FaSpinner className='spinner' />
                    </h5>
                </Waypoint>
            )}
        </div>
    )
}
