import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'

export const ConfirmationPage = () => {
    const token = useParams().id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTokenUserRequest({token}))
    }, [token])

    return (
        <div>
            ConfirmationPage
        </div>
    );
}