import axiosInstance from "./axiosInstance";

const apiService = async (httpMethod,url,reqBody)=>{
    const reqConfig = {
        method:httpMethod,
        url,
        data:reqBody
    }
    try{
        const response = await axiosInstance(reqConfig)
        return response
    }catch(err){
        return err
    }
}

export default apiService
