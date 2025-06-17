import { atom } from 'nanostores';
import { Receipt } from "@/lib/model/receipt";

export const receipt = atom<Receipt>(new Receipt());
