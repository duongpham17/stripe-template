import {useState} from 'react'

const useOpen = () => {

    const [open, setOpen] = useState<boolean>(false);

    const [openValue, setOpenValue] = useState<string>("");

    const onOpen = ():void => setOpen(!open);

    const onOpenValue = (value: string):void => openValue === value ? setOpenValue("") : setOpenValue(value); 

    return {
        open, setOpen, onOpen,
        openValue, setOpenValue, onOpenValue
    }
}

export default useOpen