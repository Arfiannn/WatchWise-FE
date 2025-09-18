import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genreToArray(genre: string): string[] {
  return genre.split(',').map((g) => g.trim());
}