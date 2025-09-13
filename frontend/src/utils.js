import { toast } from "sonner"

export const handleSuccess = (mssg)=>{
    toast.success(mssg, {
        postion: 'top-right'
    })
}

export const handleFailure = (mssg)=>{
    toast.error(mssg, {
        postion: 'top-right'
    })
}

export const handleDefault = (mssg)=>{
    toast(mssg, {
        postion: 'top-right'
    })
}

