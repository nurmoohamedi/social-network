import * as axios from "axios";

const axiosObj = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "1d1f1695-6061-4adc-affd-81af46deb59d"
    }
});

export const userAPI = {
    getUsers(currentPage, userCount) {
        debugger
        return axiosObj.get(`users?page=${currentPage}&count=${userCount}`)
            .then(response => {
                return response.data;
            });
    },
    unfollow(id) {
        return axiosObj.delete('follow/' + id)
            .then(response => {
                return response.data
            })
    },
    follow(id) {
        return axiosObj.post('follow/' + id)
            .then(response => {
                console.log(response)
                return response.data
            })
    },
    getProfileUser(userId) {
        return axiosObj.get('profile/' + userId)
            .then(response => {
            return response.data;
        });
    },
    getProfileStatus(userId) {
        debugger
        return axiosObj.get('profile/status/' + userId);
    },
    setProfileStatus(status) {
        debugger
        return axiosObj.put('profile/status', {status:status});
    },
    savePhoto(photos) {
        const formData = new FormData()
        formData.append("image", photos)
        return axiosObj.put('profile/photo', formData, {headers:{'Content-Type':'multipart/form-data'}})
            .then(response => {
            return response.data;
        });
    },
    saveProfileData(formData) {
        return axiosObj.put('profile', formData)
    }
}

export const loginAPI = {
    authMe(){
        return axiosObj.get(`auth/me`)
    },

    login(formData) {
        return axiosObj.post('auth/login', formData)
            .then(response => {
                return response.data;
            })
    },

    logout(){
        return axiosObj.delete(`auth/login`);
    },
    getCaptchaUrl(){
        return axiosObj.get(`security/get-captcha-url`);
    },
}
