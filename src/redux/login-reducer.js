import {loginAPI} from "../api/Api";

export const userLogin = (formData) => {
    return () => {
        loginAPI.submitUser(formData)
            .then(data =>{
                console.log(data)
                if (data.resultCode === 0 )
                    alert('You logged successfully - ID - '+data.data.userId);
                else
                    alert('Something Wrong!');
            })
    }
}
