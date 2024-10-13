export function stringToSlug(str: string) {
    if (!str) return ''; 
    return str
    .trim()
    .toLowerCase() 
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function truncateText(str: string, maxLength: number){
   if (!str) return '';
   if (str.length <= maxLength) return str;
   return str.slice(0,maxLength) + '...'
}