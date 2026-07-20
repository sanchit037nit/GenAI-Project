import {create} from 'zustand';
import { axiosinstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';    

export const useInterviewStore = create((Set, get) => ({
    report: null,
    reports: [],
    
}))