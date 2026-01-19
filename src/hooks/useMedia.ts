import { AppState } from '@/interface/media.interface'
import { useState } from 'react'

const useMedia = (): [AppState, React.Dispatch<React.SetStateAction<AppState>>] => {
    const [media, setMedia] = useState<AppState>({
        selectedFiles: [],
        mediaGroup: [],
        deleteMedia: [],
    })

    return [media, setMedia]
}

export default useMedia
