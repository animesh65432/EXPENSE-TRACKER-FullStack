import axios from "axios"
import { useState } from "react"
import { backendurl } from "../utils"
import { useSelector, useDispatch } from "react-redux"
import { getuser } from "../stroe/slices/user"
import { Rootstate } from "@/stroe"

type updatePayload = {
    name: string | null,
    email: string | null,
    image: string | null
}

type useUpdateProfilereturntypes = [
    loading: boolean,
    update: (data: updatePayload) => Promise<void>
]

const useUpdateProfile = (): useUpdateProfilereturntypes => {
    const [loading, setLoading] = useState(false)
    const idtoken = useSelector((state: Rootstate) => state.user.value)
    const dispatch = useDispatch()

    const update = async (data: updatePayload) => {
        setLoading(true)
        try {
            const response = await axios.put(`${backendurl}/userdeatils/Updateuser`, data, {
                headers: {
                    idtoken
                }
            })
            const user = response.data.user
            dispatch(getuser(user))
        } catch (error) {
            console.log(`errors in ${error} useUpdateUser Function`)
        }
        finally {
            setLoading(false)
        }
    }

    return [loading, update]
}

export default useUpdateProfile