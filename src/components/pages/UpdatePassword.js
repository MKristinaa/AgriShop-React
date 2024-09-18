import React, { Fragment, useState, useEffect } from 'react'
import { updatePassword } from '../../actions/userActions'

import Cookies from 'js-cookie';

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const storedUser = Cookies.get('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser._id);
        }
    }, [alert ])

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            "password": password,
            "oldPassword": oldPassword,
            "id": userId
        }

        console.log(data);
        
        updatePassword(data);
    }

    return (
        <Fragment>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                placeholder='old password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                placeholder='new password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdatePassword