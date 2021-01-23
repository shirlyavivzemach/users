import { Form } from 'semantic-ui-react';
import { getUsersAfterFilter } from '../services/usersService';

export function UsersFilter({
  onDataChange,
  onNumberOfItemChange,
  onSearchFieldChange
}) {
  const handleSearch = e => {
    const val = e.target.value;
    if (val.length < 1) return;
    onSearchFieldChange(val);
    getUsersAfterFilter(val).then(result => {
      const { items, total_count } = result;
      onDataChange(items);
      onNumberOfItemChange(total_count);
    });
  };


    return (
        <div className="search-box">
            <Form >
                <Form.Group>
                    <Form.Input
                        type="text"
                        placeholder="Search Github user" 
                        name='Github user'
                        onChange={handleSearch}
                        /> 
                </Form.Group>
            </Form>
        </div>
    )
}
