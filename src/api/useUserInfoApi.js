import React, { useState, useCallback, useEffect } from 'react';

export default function useUserInfoApi(){
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = useCallback(()=>{
        setUserInfo({ name: '陈非' });
    });

    useEffect(()=>{
        console.log('副作用执行');
    }, [])

    return {
        userInfo,
        getUserInfo,
        setUserInfo
    }
}