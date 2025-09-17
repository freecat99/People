import { toast } from "sonner"

export const handleSuccess = (mssg)=>{
    toast.success(mssg, {
        position: 'bottom-right'
    })
}

export const handleFailure = (mssg)=>{
    toast.error(mssg, {
        position: 'bottom-right'
    })
}

export const handleDefault = (mssg)=>{
    toast(mssg, {
        position: 'bottom-right'
    })
}

export const handleLoading = (mssg)=>{
    return toast.loading(mssg, {
        position: 'bottom-right'
    })
}

