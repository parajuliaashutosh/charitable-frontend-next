import { MediaType } from '@/constants/media.enum'
import { IBaseInterface } from './base.interface'

export interface IMedia extends IBaseInterface {
    name?: string
    type?: MediaType
    path?: string
}

export interface AppState {
    selectedFiles: File[]
    mediaGroup: IMedia[]
    deleteMedia: IMedia[] | string[]
}